import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, Music2 } from "lucide-react";
import { getCurrentUser, getCurrentProfile } from "@/lib/auth";

const navItems = [
  { href: "/admin", label: "Boshqaruv", Icon: LayoutDashboard },
  { href: "/admin/products", label: "Mahsulotlar", Icon: Package },
  { href: "/admin/orders", label: "Buyurtmalar", Icon: ShoppingBag },
  { href: "/admin/users", label: "Foydalanuvchilar", Icon: Users },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirect=/admin");

  const profile = await getCurrentProfile();
  if (profile?.role !== "admin") {
    redirect("/?error=not_admin");
  }

  return (
    <div className="min-h-screen bg-ink-50">
      <div className="flex">
        <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-ink-900 text-ink-50">
          <div className="px-6 h-16 flex items-center border-b border-white/10">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-500">
                <Music2 className="h-4 w-4" />
              </span>
              <span className="font-display text-lg font-semibold">NotaShop</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-300 hover:text-ink-50 hover:bg-white/5 transition"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-ink-400 truncate">{user.email}</p>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="mt-3 w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-300 hover:text-ink-50 hover:bg-white/5 transition"
              >
                <LogOut className="h-4 w-4" />
                Chiqish
              </button>
            </form>
          </div>
        </aside>

        <div className="md:hidden fixed top-0 inset-x-0 bg-ink-900 text-ink-50 z-40 border-b border-white/10">
          <div className="flex items-center justify-between px-4 h-14">
            <Link href="/" className="flex items-center gap-2">
              <Music2 className="h-5 w-5" />
              <span className="font-semibold">NotaShop Admin</span>
            </Link>
          </div>
          <nav className="flex overflow-x-auto px-2 pb-2 gap-1">
            {navItems.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-ink-300 hover:bg-white/5 whitespace-nowrap"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <main className="flex-1 md:ml-64 pt-28 md:pt-0">
          <div className="p-6 lg:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
