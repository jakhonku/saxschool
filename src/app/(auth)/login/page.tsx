"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-ink-500 text-sm">Yuklanmoqda...</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? "/account";

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      
      // Agar login'da @ bo'lmasa, uni admin@notashop.uz ko'rinishiga keltiramiz
      const finalEmail = login.includes("@") ? login : `${login}@notashop.uz`;
      
      const { error } = await supabase.auth.signInWithPassword({ 
        email: finalEmail, 
        password 
      });
      
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
      <h1 className="font-display text-3xl font-semibold text-ink-900">
        Xush kelibsiz
      </h1>
      <p className="mt-2 text-sm text-ink-600">
        Boshqaruv paneliga kirish uchun ma'lumotlarni kiriting
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field
          icon={<Mail className="h-4 w-4" />}
          label="Login yoki Email"
          type="text"
          value={login}
          onChange={setLogin}
          placeholder="admin"
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

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Kirish <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
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
      <label className="block text-xs font-medium text-ink-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-black/[0.1] focus:border-ink-900 focus:outline-none transition text-sm placeholder:text-ink-400"
        />
      </div>
    </div>
  );
}
