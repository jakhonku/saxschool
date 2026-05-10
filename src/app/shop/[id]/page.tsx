import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Music, BookOpen, Headphones, Download, ArrowLeft, FileText } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser, isAdmin } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";
import { type Product, TYPE_LABELS } from "@/lib/types";

const TypeIcon = {
  note: Music,
  book: BookOpen,
  audio: Headphones,
} as const;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const admin = await isAdmin();

  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (!product) notFound();

  const p = product as Product;
  const Icon = TypeIcon[p.type];

  // Foydalanuvchi shu mahsulotni allaqachon sotib olganmi?
  let alreadyOwned = false;
  if (user) {
    const { data: existing } = await supabase
      .from("orders")
      .select("id, status")
      .eq("user_id", user.id)
      .eq("product_id", p.id)
      .eq("status", "paid")
      .maybeSingle();
    alreadyOwned = !!existing;
  }

  return (
    <>
      <Nav
        user={user ? { email: user.email! } : null}
        isAdmin={admin}
      />
      <main className="mx-auto max-w-7xl px-6 lg:px-8 pt-8 pb-24">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-ink-600 hover:text-ink-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Do'konga qaytish
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-ink-100">
            {p.preview_image_url ? (
              <Image
                src={p.preview_image_url}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-ink-300">
                <Icon className="h-32 w-32" strokeWidth={1} />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-medium text-ink-800">
                <Icon className="h-3.5 w-3.5" />
                {TYPE_LABELS[p.type]}
              </span>
            </div>
          </div>

          <div>
            {p.composer && (
              <p className="text-sm text-ink-500 uppercase tracking-wide">
                {p.composer}
              </p>
            )}
            <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink-900 leading-tight">
              {p.title}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-ink-900">
                {p.price > 0 ? formatPrice(p.price, p.currency) : "Bepul"}
              </span>
            </div>

            {p.description && (
              <p className="mt-6 text-ink-700 leading-relaxed whitespace-pre-line">
                {p.description}
              </p>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              {p.category && (
                <div>
                  <dt className="text-ink-500">Kategoriya</dt>
                  <dd className="mt-1 text-ink-900 font-medium">{p.category}</dd>
                </div>
              )}
              {p.difficulty && (
                <div>
                  <dt className="text-ink-500">Daraja</dt>
                  <dd className="mt-1 text-ink-900 font-medium">{p.difficulty}</dd>
                </div>
              )}
              {p.pages && (
                <div>
                  <dt className="text-ink-500">Bet soni</dt>
                  <dd className="mt-1 text-ink-900 font-medium">{p.pages} bet</dd>
                </div>
              )}
              {p.duration_seconds && (
                <div>
                  <dt className="text-ink-500">Davomiyligi</dt>
                  <dd className="mt-1 text-ink-900 font-medium">
                    {Math.round(p.duration_seconds / 60)} daqiqa
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {alreadyOwned ? (
                <Link href="/account" className="flex-1">
                  <Button size="lg" className="w-full">
                    <Download className="h-5 w-5" />
                    Yuklash uchun kabinetga
                  </Button>
                </Link>
              ) : p.price === 0 ? (
                <Link
                  href={user ? `/checkout/${p.id}` : `/login?redirect=/checkout/${p.id}`}
                  className="flex-1"
                >
                  <Button size="lg" className="w-full">
                    <Download className="h-5 w-5" />
                    Bepul yuklash
                  </Button>
                </Link>
              ) : (
                <Link
                  href={user ? `/checkout/${p.id}` : `/login?redirect=/checkout/${p.id}`}
                  className="flex-1"
                >
                  <Button size="lg" className="w-full">
                    <Download className="h-5 w-5" />
                    Yuklab olish — {formatPrice(p.price, p.currency)}
                  </Button>
                </Link>
              )}
            </div>

            <p className="mt-4 text-xs text-ink-500 flex items-center gap-2">
              <FileText className="h-3.5 w-3.5" />
              {p.type === "audio"
                ? "MP3 audio fayl"
                : p.type === "book"
                ? "PDF kitob"
                : "PDF nota"}
              {" · "}To'lov tasdiqlangach yuklab olish mumkin
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
