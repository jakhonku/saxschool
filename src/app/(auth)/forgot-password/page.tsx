"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Loader2, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xatolik");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <Check className="h-8 w-8" strokeWidth={3} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold text-ink-900">
          Xat yuborildi
        </h1>
        <p className="mt-3 text-sm text-ink-600">
          <span className="text-ink-900 font-medium">{email}</span> manziliga
          parolni tiklash havolasi yuborildi.
        </p>
        <Link href="/login" className="block mt-8">
          <Button variant="outline" size="lg" className="w-full">
            Kirish sahifasiga qaytish
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-xs text-ink-600 hover:text-ink-900 mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Kirish sahifasiga qaytish
      </Link>

      <h1 className="font-display text-3xl font-semibold text-ink-900">
        Parolni tiklash
      </h1>
      <p className="mt-2 text-sm text-ink-600">
        Email manzilingizni kiriting, sizga tiklash havolasi yuboramiz.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-xs font-medium text-ink-700 mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="siz@example.com"
              className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-black/[0.1] focus:border-ink-900 focus:outline-none transition text-sm placeholder:text-ink-400"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Havolani yuborish"}
        </Button>
      </form>
    </div>
  );
}
