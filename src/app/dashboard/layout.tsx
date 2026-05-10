import Link from "next/link";
import { Music2, LayoutGrid, BookOpen, User, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userName = "O'quvchi";
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      userName =
        (data.user.user_metadata?.full_name as string) ?? data.user.email!;
    }
  } catch {}

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-brass-400/10 bg-midnight-950/80 backdrop-blur-xl">
        <div className="p-6 border-b border-brass-400/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brass-shine text-midnight-950">
              <Music2 className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold">
              Sax<span className="brass-text">School</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/dashboard" icon={<LayoutGrid className="h-4 w-4" />}>
            Bosh sahifa
          </NavLink>
          <NavLink href="/dashboard/lessons" icon={<BookOpen className="h-4 w-4" />}>
            Darslar
          </NavLink>
          <NavLink href="/dashboard/account" icon={<User className="h-4 w-4" />}>
            Profil
          </NavLink>
        </nav>

        <div className="p-4 border-t border-brass-400/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brass-shine text-midnight-950 font-bold text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">{userName}</div>
              <div className="text-xs text-midnight-400">Premium</div>
            </div>
          </div>
          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-midnight-300 hover:bg-midnight-800 hover:text-brass-300 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Chiqish
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-midnight-200 hover:bg-brass-400/5 hover:text-brass-300 transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}
