import Link from "next/link";
import { Music2, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink-900 text-ink-50">
                <Music2 className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <span className="font-display text-xl font-semibold tracking-tight">
                NotaShop
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-ink-600">
              Klassik, jazz, pop va boshqa janrlardagi musiqa notalari, kitoblar
              va audio yozuvlar onlayn do'koni.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900 mb-4">Do'kon</h3>
            <ul className="space-y-2 text-sm text-ink-600">
              <li>
                <Link href="/shop?type=note" className="hover:text-ink-900">
                  Notalar
                </Link>
              </li>
              <li>
                <Link href="/shop?type=book" className="hover:text-ink-900">
                  Kitoblar
                </Link>
              </li>
              <li>
                <Link href="/shop?type=audio" className="hover:text-ink-900">
                  Audio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900 mb-4">Aloqa</h3>
            <ul className="space-y-2 text-sm text-ink-600">
              <li className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                <a
                  href="https://t.me/your_admin_username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink-900"
                >
                  Telegram orqali
                </a>
              </li>
              <li>+998 90 123 45 67</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-black/[0.06] flex flex-col md:flex-row gap-4 justify-between items-center text-xs text-ink-500">
          <p>© {new Date().getFullYear()} NotaShop. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-ink-900">
              Biz haqimizda
            </Link>
            <Link href="/terms" className="hover:text-ink-900">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
