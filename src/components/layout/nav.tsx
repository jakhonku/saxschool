"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#features", label: "Imkoniyatlar" },
  { href: "/#curriculum", label: "Dasturni" },
  { href: "/#pricing", label: "Narx" },
  { href: "/#faq", label: "Savol-javob" },
];

export function Nav({ user }: { user?: { email: string } | null }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brass-400/10 backdrop-blur-xl bg-midnight-950/70">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brass-shine text-midnight-950 shadow-lg shadow-brass-500/30">
              <Music2 className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              Sax<span className="brass-text">School</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-midnight-200 hover:text-brass-300 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link href="/dashboard">
                <Button size="sm">Kabinetga</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Kirish</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Boshlash</Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-midnight-100"
            aria-label="Menyu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all",
            open ? "max-h-96 pb-4" : "max-h-0",
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-midnight-200 hover:text-brass-300"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 px-3">
              {user ? (
                <Link href="/dashboard" className="flex-1">
                  <Button size="sm" className="w-full">Kabinetga</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">Kirish</Button>
                  </Link>
                  <Link href="/register" className="flex-1">
                    <Button size="sm" className="w-full">Boshlash</Button>
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
