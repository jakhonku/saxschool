import Link from "next/link";
import { Music2 } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ink-50">
      <div className="hidden lg:flex relative overflow-hidden flex-col justify-between p-12 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-700 text-ink-50">
        <svg
          viewBox="0 0 600 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full opacity-25"
        >
          <defs>
            <pattern id="staff2" x="0" y="0" width="600" height="80" patternUnits="userSpaceOnUse">
              <line x1="0" y1="10" x2="600" y2="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1="0" y1="22" x2="600" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1="0" y1="34" x2="600" y2="34" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1="0" y1="46" x2="600" y2="46" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1="0" y1="58" x2="600" y2="58" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="600" height="800" fill="url(#staff2)" />
          <text x="60" y="180" fontSize="180" fill="#e69f24" fontFamily="serif">♪</text>
          <text x="280" y="320" fontSize="160" fill="#f4d488" fontFamily="serif">♫</text>
          <text x="120" y="500" fontSize="180" fill="#e69f24" fontFamily="serif">♩</text>
          <text x="340" y="660" fontSize="160" fill="#f4d488" fontFamily="serif">♬</text>
        </svg>

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-500">
            <Music2 className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-xl font-semibold">NotaShop</span>
        </Link>

        <div className="relative z-10">
          <p className="font-display text-3xl leading-tight max-w-md">
            Klassik, jazz va pop notalar. Bir joyda — barcha musiqachi uchun.
          </p>
          <p className="mt-6 text-sm text-amber-200">— NotaShop</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
