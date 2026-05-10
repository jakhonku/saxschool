"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kirishda xatolik");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Xush kelibsiz!</h1>
      <p className="mt-2 text-sm text-midnight-300">
        Kursingizni davom ettirish uchun kiring.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="siz@example.com"
          required
        />
        <Field
          icon={<Lock className="h-4 w-4" />}
          label="Parol"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          required
        />

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-xs text-brass-300 hover:text-brass-200">
            Parolni unutdingizmi?
          </Link>
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Kirish <ArrowRight className="h-4 w-4" /></>}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-midnight-300">
        Hisobingiz yo'qmi?{" "}
        <Link href="/register" className="text-brass-300 hover:text-brass-200 font-medium">
          Ro'yxatdan o'tish
        </Link>
      </p>
    </div>
  );
}

function Field({
  icon,
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-midnight-200 mb-1.5">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight-400">{icon}</div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full h-12 pl-10 pr-4 rounded-xl bg-midnight-900 border border-midnight-700 focus:border-brass-400/60 focus:outline-none focus:ring-2 focus:ring-brass-400/20 transition text-sm placeholder:text-midnight-500"
        />
      </div>
    </div>
  );
}
