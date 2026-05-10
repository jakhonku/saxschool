import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Product } from "@/lib/types";
import { TYPE_LABELS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { DeleteProductButton } from "./delete-button";

export default async function AdminProductsPage() {
  const sb = createAdminClient();
  const { data } = await sb
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  const products = (data ?? []) as Product[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            Mahsulotlar
          </h1>
          <p className="mt-1 text-sm text-ink-600">
            Jami: {products.length} ta
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-ink-50 hover:bg-ink-800 px-5 py-2.5 text-sm font-medium transition"
        >
          <Plus className="h-4 w-4" />
          Yangi
        </Link>
      </div>

      <div className="mt-8 rounded-2xl bg-white border border-black/[0.06] overflow-hidden">
        {products.length === 0 ? (
          <div className="py-20 text-center text-ink-500">
            Hali mahsulot qo'shilmagan
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-ink-500">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Mahsulot</th>
                <th className="text-left px-5 py-3 font-medium">Tur</th>
                <th className="text-left px-5 py-3 font-medium">Narx</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Yuklab olishlar</th>
                <th className="text-right px-5 py-3 font-medium">Amal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-black/[0.06]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-10 rounded bg-ink-100 overflow-hidden flex-shrink-0">
                        {p.preview_image_url && (
                          <Image
                            src={p.preview_image_url}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-ink-900 line-clamp-1">
                          {p.title}
                        </p>
                        {p.composer && (
                          <p className="text-xs text-ink-500">{p.composer}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ink-700">{TYPE_LABELS[p.type]}</td>
                  <td className="px-5 py-3 text-ink-900">
                    {p.price > 0 ? formatPrice(p.price, p.currency) : "Bepul"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        p.is_published
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-ink-100 text-ink-600"
                      }`}
                    >
                      {p.is_published ? "Faol" : "Yashirin"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-700">{p.downloads_count}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg border border-black/[0.1] px-3 py-1.5 text-xs hover:bg-ink-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Tahrirlash
                      </Link>
                      <DeleteProductButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
