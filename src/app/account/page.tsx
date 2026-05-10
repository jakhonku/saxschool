import Link from "next/link";
import { redirect } from "next/navigation";
import { Download, Clock, XCircle, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser, isAdmin } from "@/lib/auth";
import { formatPrice, cn } from "@/lib/utils";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ ordered?: string }>;
}) {
  const { ordered } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirect=/account");

  const admin = await isAdmin();
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select(
      "id, status, amount, currency, created_at, products(id, title, type, preview_image_url)",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const paid = orders?.filter((o) => o.status === "paid") ?? [];
  const pending = orders?.filter((o) => o.status === "pending") ?? [];
  const others = orders?.filter((o) => !["paid", "pending"].includes(o.status as string)) ?? [];

  return (
    <>
      <Nav user={{ email: user.email! }} isAdmin={admin} />
      <main className="mx-auto max-w-5xl px-6 lg:px-8 pt-12 pb-24">
        <div>
          <p className="text-sm text-ink-500">Kabinet</p>
          <h1 className="mt-1 font-display text-4xl font-semibold text-ink-900">
            Mening sotib olganlarim
          </h1>
          <p className="mt-2 text-ink-600">{user.email}</p>
        </div>

        {ordered && (
          <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-900">
            ✓ Buyurtmangiz qabul qilindi! Admin to'lovni tekshirgach, mahsulot
            yuklab olish uchun ochiladi.
          </div>
        )}

        {pending.length > 0 && (
          <Section title="Kutilayotganlar" icon={<Clock className="h-5 w-5 text-amber-600" />}>
            <div className="space-y-3">
              {pending.map((o) => (
                <OrderCard key={o.id} order={o} status="pending" />
              ))}
            </div>
          </Section>
        )}

        <Section
          title="Sotib olingan mahsulotlar"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
        >
          {paid.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/[0.12] py-16 text-center text-ink-500">
              <p>Hali mahsulot sotib olinmagan</p>
              <Link href="/shop" className="inline-block mt-4">
                <Button>Do'konga o'tish</Button>
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {paid.map((o) => (
                <OrderCard key={o.id} order={o} status="paid" />
              ))}
            </div>
          )}
        </Section>

        {others.length > 0 && (
          <Section title="Boshqalar" icon={<XCircle className="h-5 w-5 text-ink-500" />}>
            <div className="space-y-3">
              {others.map((o) => (
                <OrderCard key={o.id} order={o} status={o.status as string} />
              ))}
            </div>
          </Section>
        )}
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-ink-900">
        {icon}
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

type OrderListItem = {
  id: string;
  status: string;
  amount: number;
  currency: string;
  created_at: string;
  products:
    | { id: string; title: string; type: string; preview_image_url: string | null }
    | { id: string; title: string; type: string; preview_image_url: string | null }[]
    | null;
};

function OrderCard({
  order,
  status,
}: {
  order: OrderListItem;
  status: string;
}) {
  const product = Array.isArray(order.products) ? order.products[0] : order.products;
  const isPaid = status === "paid";

  return (
    <div
      className={cn(
        "rounded-2xl bg-white border p-4 flex gap-4",
        isPaid ? "border-emerald-200" : "border-black/[0.06]",
      )}
    >
      <div className="relative h-20 w-16 rounded-lg overflow-hidden bg-ink-100 flex-shrink-0">
        {product?.preview_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.preview_image_url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-ink-900 line-clamp-2">
          {product?.title ?? "—"}
        </p>
        <p className="mt-1 text-xs text-ink-500">
          {new Date(order.created_at).toLocaleDateString("uz-UZ")} ·{" "}
          {formatPrice(Number(order.amount), order.currency)}
        </p>
        <div className="mt-3">
          {isPaid && product ? (
            <a href={`/api/download/${order.id}`}>
              <Button size="sm">
                <Download className="h-4 w-4" />
                Yuklab olish
              </Button>
            </a>
          ) : status === "pending" ? (
            <span className="inline-flex items-center gap-1 text-xs text-amber-700">
              <Clock className="h-3.5 w-3.5" />
              Tekshirilmoqda
            </span>
          ) : status === "rejected" ? (
            <span className="inline-flex items-center gap-1 text-xs text-red-700">
              <XCircle className="h-3.5 w-3.5" />
              Rad etilgan
            </span>
          ) : (
            <span className="text-xs text-ink-500">{status}</span>
          )}
        </div>
      </div>
    </div>
  );
}
