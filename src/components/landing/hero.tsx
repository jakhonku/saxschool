import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-50/50 via-ink-50 to-ink-50" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/60 backdrop-blur px-3 py-1 text-xs text-ink-700">
              <Music className="h-3 w-3" />
              Notalar · Kitoblar · Audio
            </span>
            <h1 className="mt-6 font-display display text-5xl sm:text-6xl lg:text-7xl font-semibold text-ink-900">
              Musiqa notalar do'koni
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-600 leading-relaxed">
              Klassik, jazz, pop va boshqa janrlardagi sifatli notalar va musiqa
              kitoblari. Onlayn xarid qiling, bir necha soniyada yuklab oling.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop">
                <Button size="lg">
                  Do'konga kirish
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shop?type=note">
                <Button variant="outline" size="lg">
                  Notalarni ko'rish
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-ink-600">
              <div>
                <div className="text-2xl font-semibold text-ink-900">100+</div>
                <div className="mt-0.5 text-xs">Mahsulotlar</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-ink-900">PDF / MP3</div>
                <div className="mt-0.5 text-xs">Yuqori sifat</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-ink-900">Click</div>
                <div className="mt-0.5 text-xs">Tezkor to'lov</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] rounded-3xl bg-gradient-to-br from-ink-900 to-ink-700 p-8 shadow-2xl shadow-ink-900/20 overflow-hidden">
              <svg
                viewBox="0 0 400 500"
                className="absolute inset-0 w-full h-full opacity-90"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <pattern
                    id="staff"
                    x="0"
                    y="0"
                    width="400"
                    height="80"
                    patternUnits="userSpaceOnUse"
                  >
                    <line x1="0" y1="10" x2="400" y2="10" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                    <line x1="0" y1="22" x2="400" y2="22" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                    <line x1="0" y1="34" x2="400" y2="34" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                    <line x1="0" y1="46" x2="400" y2="46" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                    <line x1="0" y1="58" x2="400" y2="58" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="400" height="500" fill="url(#staff)" />
                <text x="50" y="120" fontSize="140" fill="#e69f24" fontFamily="serif">
                  ♪
                </text>
                <text x="180" y="200" fontSize="100" fill="#e69f24" fontFamily="serif">
                  ♫
                </text>
                <text x="80" y="320" fontSize="120" fill="#f4d488" fontFamily="serif">
                  ♩
                </text>
                <text x="240" y="400" fontSize="110" fill="#e69f24" fontFamily="serif">
                  ♬
                </text>
              </svg>
              <div className="relative z-10 h-full flex flex-col justify-end">
                <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5">
                  <p className="text-xs text-amber-200 uppercase tracking-wider">
                    Tavsiya etilgan
                  </p>
                  <p className="mt-1 text-white font-display text-xl">
                    Klassik notalar to'plami
                  </p>
                  <p className="mt-1 text-white/70 text-sm">Mozart · Bach · Chopin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
