"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, User, Loader2, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ro'yxatdan o'tishda xatolik");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brass-shine text-midnight-950">
          <Check className="h-8 w-8" strokeWidth={3} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Tasdiqlash xati yuborildi!</h1>
        <p className="mt-3 text-sm text-midnight-300">
          <span className="text-brass-300">{email}</span> manziliga tasdiqlash havolasi yuborildi.
          Iltimos, pochta qutingizni tekshiring.
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
      <h1 className="font-display text-3xl font-bold">Hisob yarating</h1>
      <p className="mt-2 text-sm text-midnight-300">
        30 kunlik saksafon sayohatingizni boshlang.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field
          icon={<User className="h-4 w-4" />}
          label="To'liq ism"
          type="text"
          value={name}
          onChange={setName}
          placeholder="Ali Valiyev"
          required
        />
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
          placeholder="Kamida 6 ta belgi"
          required
        />

        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Hisob yaratish <ArrowRight className="h-4 w-4" /></>}
        </Button>

        <p className="text-xs text-center text-midnight-400">
          Davom etish orqali siz{" "}
          <Link href="#" className="text-brass-300">Foydalanish shartlari</Link> va{" "}
          <Link href="#" className="text-brass-300">Maxfiylik siyosatiga</Link> roziligingizni bildirasiz.
        </p>
      </form>

      <p className="mt-8 text-center text-sm text-midnight-300">
        Hisobingiz bormi?{" "}
        <Link href="/login" className="text-brass-300 hover:text-brass-200 font-medium">
          Kirish
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
