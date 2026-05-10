import Link from "next/link";
import Image from "next/image";
import { Music2 } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand panel with saxophone image */}
      <div className="hidden lg:flex relative overflow-hidden flex-col justify-between p-12">
        <Image
          src="https://images.unsplash.com/photo-1573871924421-c321b1e8cabb?w=1600&auto=format&fit=crop&q=85"
          alt="Saksafon"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-midnight-950 via-midnight-950/70 to-midnight-950/40" />

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-brass-shine text-midnight-950">
            <Music2 className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold">
            Sax<span className="brass-text">School</span>
          </span>
        </Link>

        <div className="relative z-10">
          <div className="text-6xl text-brass-400/60 mb-4 font-serif leading-none">"</div>
          <p className="font-display text-3xl text-midnight-50 leading-tight max-w-md">
            Musiqa o'rganishning eng zamonaviy va to'liq yo'li. 30 kunda haqiqiy o'zgarish.
          </p>
          <p className="mt-6 text-sm text-brass-200">
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
