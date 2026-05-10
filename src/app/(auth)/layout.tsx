import Link from "next/link";
import { Music2 } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden lg:flex relative overflow-hidden bg-jazz-gradient flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-brass-shine text-midnight-950">
            <Music2 className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold">
            Sax<span className="brass-text">School</span>
          </span>
        </Link>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-brass-500 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-brass-700 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="text-6xl text-brass-400/40 mb-4">"</div>
          <p className="font-display text-2xl text-midnight-100 leading-relaxed max-w-md">
            Musiqa o'rganishning eng zamonaviy va to'liq yo'li. 30 kunda haqiqiy o'zgarish.
          </p>
          <p className="mt-6 text-sm text-midnight-300">
            — SaxSchool jamoasi
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-midnight-950">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
