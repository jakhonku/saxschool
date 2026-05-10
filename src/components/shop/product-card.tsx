import Link from "next/link";
import Image from "next/image";
import { Music, BookOpen, Headphones } from "lucide-react";
import { type Product, TYPE_LABELS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const TypeIcon = {
  note: Music,
  book: BookOpen,
  audio: Headphones,
} as const;

export function ProductCard({ product }: { product: Product }) {
  const Icon = TypeIcon[product.type];

  return (
    <Link
      href={`/shop/${product.id}`}
      className="group block rounded-2xl bg-white border border-black/[0.06] overflow-hidden hover:shadow-lg hover:border-black/[0.12] transition-all"
    >
      <div className="relative aspect-[4/5] bg-ink-100 overflow-hidden">
        {product.preview_image_url ? (
          <Image
            src={product.preview_image_url}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-ink-300">
            <Icon className="h-16 w-16" strokeWidth={1.2} />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-ink-800">
            <Icon className="h-3 w-3" />
            {TYPE_LABELS[product.type]}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-ink-900 line-clamp-2 leading-snug">
          {product.title}
        </h3>
        {product.composer && (
          <p className="mt-1 text-xs text-ink-500 line-clamp-1">
            {product.composer}
          </p>
        )}
        <div className="mt-3 flex items-end justify-between">
          <span className="text-lg font-semibold text-ink-900">
            {product.price > 0 ? formatPrice(product.price, product.currency) : "Bepul"}
          </span>
          {product.difficulty && (
            <span className="text-[11px] uppercase tracking-wide text-ink-400">
              {product.difficulty}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
