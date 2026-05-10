import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

export async function FeaturedProducts() {
  let products: Product[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(8);
    products = (data ?? []) as Product[];
  } catch {
    // Supabase ulanmagan bo'lsa, bo'sh ko'rsatiladi
  }

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-900">
            Yangi qo'shilgan mahsulotlar
          </h2>
          <p className="mt-2 text-ink-600">Eng so'nggi notalar, kitoblar va audiolar</p>
        </div>
        <Link
          href="/shop"
          className="hidden sm:inline-flex items-center gap-1 text-sm text-ink-700 hover:text-ink-900"
        >
          Hammasini ko'rish
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/[0.12] py-16 text-center text-ink-500">
          Hozircha mahsulot qo'shilmagan. Admin yangi mahsulot yuklashi bilan
          shu yerda paydo bo'ladi.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
