import Link from "next/link";
import { Music2, Instagram, Youtube, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-brass-400/10 mt-32 bg-midnight-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-brass-shine text-midnight-950">
                <Music2 className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold">
                Sax<span className="brass-text">School</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-midnight-300">
              Saksafon chalishni 30 kunda professional darajada o'rgating. HD video darslar, PDF notalar va shaxsiy yondashuv.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="#" className="grid h-10 w-10 place-items-center rounded-full glass hover:border-brass-400/40 transition-colors">
                <Instagram className="h-4 w-4 text-brass-300" />
              </Link>
              <Link href="#" className="grid h-10 w-10 place-items-center rounded-full glass hover:border-brass-400/40 transition-colors">
                <Youtube className="h-4 w-4 text-brass-300" />
              </Link>
              <Link href="#" className="grid h-10 w-10 place-items-center rounded-full glass hover:border-brass-400/40 transition-colors">
                <Send className="h-4 w-4 text-brass-300" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brass-200 mb-4">Kurs</h3>
            <ul className="space-y-2 text-sm text-midnight-300">
              <li><Link href="/#curriculum" className="hover:text-brass-300">Dastur</Link></li>
              <li><Link href="/#pricing" className="hover:text-brass-300">Narxlar</Link></li>
              <li><Link href="/#faq" className="hover:text-brass-300">Savol-javob</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brass-200 mb-4">Aloqa</h3>
            <ul className="space-y-2 text-sm text-midnight-300">
              <li>info@saxschool.uz</li>
              <li>+998 90 123 45 67</li>
              <li>Toshkent, O'zbekiston</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brass-400/10 flex flex-col md:flex-row gap-4 justify-between items-center text-xs text-midnight-400">
          <p>© {new Date().getFullYear()} SaxSchool. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brass-300">Maxfiylik siyosati</Link>
            <Link href="#" className="hover:text-brass-300">Foydalanish shartlari</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
