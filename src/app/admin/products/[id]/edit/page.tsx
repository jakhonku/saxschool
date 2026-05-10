import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Product } from "@/lib/types";
import { ProductForm } from "../../product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sb = createAdminClient();
  const { data } = await sb.from("products").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-ink-600 hover:text-ink-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Mahsulotlar ro'yxatiga
      </Link>
      <h1 className="font-display text-3xl font-semibold text-ink-900">
        Mahsulotni tahrirlash
      </h1>

      <div className="mt-8">
        <ProductForm product={data as Product} />
      </div>
    </div>
  );
}
