import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "../product-form";

export default function NewProductPage() {
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
        Yangi mahsulot
      </h1>
      <p className="mt-1 text-sm text-ink-600">
        Mahsulot ma'lumotlarini to'ldiring va fayllarni yuklang
      </p>

      <div className="mt-8">
        <ProductForm />
      </div>
    </div>
  );
}
