import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CreditCard, MessageCircle, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser, isAdmin } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { CheckoutActions } from "./checkout-actions";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?redirect=/checkout/${productId}`);
  }

  const admin = await isAdmin();

  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .eq("is_published", true)
    .maybeSingle();

  if (!product) notFound();

  const p = product as Product;

  // To'lov sozlamalari
  const { data: cardSetting } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "payment_card")
    .maybeSingle();

  const { data: tgSetting } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "admin_telegram")
    .maybeSingle();

  const card = (cardSetting?.value ?? {
    card_number: "8600 1234 5678 9012",
    holder: "ADMIN",
    phone: "+998 90 000 00 00",
  }) as { card_number: string; holder: string; phone: string };

  const adminTelegram =
    (tgSetting?.value as string | undefined) ?? "https://t.me/your_admin_username";

  // Foydalanuvchining bu mahsulot bo'yicha pending buyurtmasi bormi?
  const { data: existingOrder } = await supabase
    .from("orders")
    .select("id, status")
    .eq("user_id", user.id)
    .eq("product_id", p.id)
    .in("status", ["pending", "paid"])
    .maybeSingle();

  return (
    <>
      <Nav
        user={user ? { email: user.email! } : null}
        isAdmin={admin}
      />
      <main className="mx-auto max-w-4xl px-6 lg:px-8 pt-8 pb-24">
        <Link
          href={`/shop/${p.id}`}
          className="inline-flex items-center gap-2 text-sm text-ink-600 hover:text-ink-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Mahsulotga qaytish
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink-900">
          To'lov
        </h1>
        <p className="mt-2 text-ink-600">
          Quyidagi karta yoki telefon raqamiga to'lov qiling, so'ng tasdiqlang.
        </p>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-black/[0.08] bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-ink-900">
                <CreditCard className="h-5 w-5" />
                Click karta orqali to'lov
              </h2>
              <p className="mt-2 text-sm text-ink-600">
                Quyidagi karta raqamiga{" "}
                <strong>{formatPrice(p.price, p.currency)}</strong> miqdorida
                to'lov o'tkazing.
              </p>

              <div className="mt-5 rounded-xl bg-gradient-to-br from-ink-900 to-ink-700 text-ink-50 p-6">
                <p className="text-xs text-ink-300 uppercase tracking-wider">
                  Karta raqami
                </p>
                <p className="mt-2 font-mono text-2xl tracking-wider">
                  {card.card_number}
                </p>
                <div className="mt-5 flex justify-between text-sm">
                  <div>
                    <p className="text-xs text-ink-300 uppercase">Egasi</p>
                    <p className="mt-0.5 font-medium">{card.holder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-ink-300 uppercase">Telefon</p>
                    <p className="mt-0.5 font-medium">{card.phone}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
                <p className="font-medium">Eslatma:</p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li>
                    Click ilovasidan yuqoridagi raqamga{" "}
                    {formatPrice(p.price, p.currency)} o'tkazing.
                  </li>
                  <li>To'lov qilgach, "To'lovni tasdiqlash" tugmasini bosing.</li>
                  <li>Admin chekni tekshirib, mahsulotni faollashtiradi (odatda 1-2 soat).</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-black/[0.08] bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-ink-900">
                <MessageCircle className="h-5 w-5" />
                Yoki adminga yozing
              </h2>
              <p className="mt-2 text-sm text-ink-600">
                Boshqa to'lov usullari yoki savollar uchun adminga to'g'ridan-to'g'ri
                Telegram orqali murojaat qiling.
              </p>
              <a
                href={`${adminTelegram}?text=Salom, "${encodeURIComponent(p.title)}" mahsulotini sotib olmoqchiman`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#229ED9] hover:bg-[#1c87b8] text-white px-5 py-2.5 text-sm font-medium transition"
              >
                <Send />
                Telegram orqali yozish
              </a>
            </div>

            <CheckoutActions
              productId={p.id}
              amount={p.price}
              currency={p.currency}
              hasPendingOrder={existingOrder?.status === "pending"}
              alreadyPaid={existingOrder?.status === "paid"}
            />
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-black/[0.08] bg-white p-6 sticky top-20">
              <h3 className="text-sm font-medium text-ink-500 uppercase tracking-wide">
                Buyurtma
              </h3>
              <p className="mt-3 font-medium text-ink-900 line-clamp-2">{p.title}</p>
              {p.composer && (
                <p className="mt-1 text-sm text-ink-500">{p.composer}</p>
              )}
              <div className="mt-5 pt-5 border-t border-black/[0.06]">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-600">Mahsulot narxi</span>
                  <span className="text-ink-900">
                    {formatPrice(p.price, p.currency)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-ink-600">Komissiya</span>
                  <span className="text-ink-900">0</span>
                </div>
                <div className="mt-4 pt-4 border-t border-black/[0.06] flex justify-between font-semibold">
                  <span className="text-ink-900">Jami</span>
                  <span className="text-ink-900 text-lg">
                    {formatPrice(p.price, p.currency)}
                  </span>
                </div>
              </div>
              <p className="mt-5 flex items-start gap-2 text-xs text-ink-500">
                <ShieldCheck className="h-4 w-4 mt-0.5 flex-shrink-0" />
                To'lov tasdiqlangach mahsulot kabinetingizga qo'shiladi
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Send() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}
