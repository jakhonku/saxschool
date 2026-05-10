"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/shop", label: "Do'kon" },
  { href: "/shop?type=note", label: "Notalar" },
  { href: "/shop?type=book", label: "Kitoblar" },
  { href: "/shop?type=audio", label: "Audio" },
];

export function Nav({
  user,
  isAdmin,
}: {
  user?: { email: string } | null;
  isAdmin?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ink-50/85 backdrop-blur-xl border-b border-black/[0.06]"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink-900 text-ink-50">
              <Music2 className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              NotaShop
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] text-ink-700 hover:text-ink-900 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}
                <Link href="/account">
                  <Button size="sm">Kabinet</Button>
                </Link>
              </>
            ) : (
              <>
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Kirish
                  </Button>
                </Link>
              </>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 -mr-2"
            aria-label="Menyu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            open ? "max-h-96 pb-6" : "max-h-0",
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-base text-ink-800 border-b border-black/[0.04]"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-4">
              {user ? (
                <>
                  {isAdmin && (
                    <Link href="/admin" className="flex-1">
                      <Button variant="outline" size="md" className="w-full">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link href="/account" className="flex-1">
                    <Button size="md" className="w-full">
                      Kabinet
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex-1">
                    <Button variant="secondary" size="md" className="w-full">
                      Kirish
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
