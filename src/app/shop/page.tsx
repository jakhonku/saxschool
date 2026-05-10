import Link from "next/link";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/shop/product-card";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser, isAdmin } from "@/lib/auth";
import type { Product, ProductType } from "@/lib/types";
import { TYPE_LABELS_PLURAL } from "@/lib/types";
import { cn } from "@/lib/utils";

const TABS: { value: ProductType | "all"; label: string }[] = [
  { value: "all", label: "Hammasi" },
  { value: "note", label: "Notalar" },
  { value: "book", label: "Kitoblar" },
  { value: "audio", label: "Audio" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  const params = await searchParams;
  const type = (params.type as ProductType | undefined) ?? null;
  const q = params.q?.trim() || null;

  const user = await getCurrentUser();
  const admin = await isAdmin();

  let products: Product[] = [];
  try {
    const supabase = await createClient();
    let query = supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (type) query = query.eq("type", type);
    if (q) query = query.ilike("title", `%${q}%`);

    const { data } = await query;
    products = (data ?? []) as Product[];
  } catch {
    // ignore
  }

  const heading = type ? TYPE_LABELS_PLURAL[type] : "Barcha mahsulotlar";

  return (
    <>
      <Nav
        user={user ? { email: user.email! } : null}
        isAdmin={admin}
      />
      <main className="mx-auto max-w-7xl px-6 lg:px-8 pt-12 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm text-ink-500">Do'kon</p>
            <h1 className="mt-1 font-display text-4xl sm:text-5xl font-semibold text-ink-900">
              {heading}
            </h1>
          </div>
          <form className="w-full sm:w-72">
            <input
              type="search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Qidirish..."
              className="w-full h-11 rounded-full border border-black/[0.1] bg-white px-5 text-sm focus:outline-none focus:border-ink-900"
            />
            {type && <input type="hidden" name="type" value={type} />}
          </form>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = (t.value === "all" && !type) || type === t.value;
            const href = t.value === "all" ? "/shop" : `/shop?type=${t.value}`;
            return (
              <Link
                key={t.value}
                href={href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition",
                  active
                    ? "bg-ink-900 text-ink-50"
                    : "bg-white border border-black/[0.08] text-ink-700 hover:border-ink-900/40",
                )}
              >
                {t.label}
              </Link>
            );
          })}
        </div>

        {products.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-black/[0.12] py-20 text-center text-ink-500">
            Hozircha bu kategoriyada mahsulot yo'q.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
