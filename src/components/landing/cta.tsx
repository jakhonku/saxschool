import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
      <div className="rounded-3xl bg-gradient-to-br from-amber-100 via-amber-50 to-ink-50 border border-black/[0.06] p-10 sm:p-16 text-center">
        <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ink-900">
          Birinchi mahsulotingizni tanlang
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-ink-600">
          Yuzlab notalar, kitoblar va audio yozuvlar — bir joyda. Onlayn xarid,
          tezkor yuklab olish.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/shop">
            <Button size="lg" className="px-10">Do'konga o'tish</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
