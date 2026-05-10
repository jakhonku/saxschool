import Link from "next/link";
import { Music, BookOpen, Headphones, ArrowUpRight } from "lucide-react";

const cats = [
  {
    href: "/shop?type=note",
    title: "Notalar",
    description: "PDF formatdagi musiqa notalari — solo, ansambl, orkestr",
    Icon: Music,
    accent: "bg-amber-100 text-amber-700",
  },
  {
    href: "/shop?type=book",
    title: "Kitoblar",
    description: "Musiqa darsliklari va metodik qo'llanmalar",
    Icon: BookOpen,
    accent: "bg-ink-900 text-ink-50",
  },
  {
    href: "/shop?type=audio",
    title: "Audio",
    description: "Backing track va mashq audiolari (MP3)",
    Icon: Headphones,
    accent: "bg-ink-100 text-ink-800",
  },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-900">
            Kategoriyalar
          </h2>
          <p className="mt-2 text-ink-600">Sizga mos turdagi mahsulotni tanlang</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {cats.map(({ href, title, description, Icon, accent }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-black/[0.06] bg-white p-6 hover:shadow-lg hover:border-black/[0.12] transition-all"
          >
            <div className="flex items-start justify-between">
              <span className={`grid h-12 w-12 place-items-center rounded-xl ${accent}`}>
                <Icon className="h-6 w-6" />
              </span>
              <ArrowUpRight className="h-5 w-5 text-ink-400 group-hover:text-ink-900 transition" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink-900">
              {title}
            </h3>
            <p className="mt-2 text-sm text-ink-600">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
