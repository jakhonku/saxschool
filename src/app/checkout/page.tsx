"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Lock, CreditCard, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURSE_PRICE, COURSE_OLD_PRICE } from "@/lib/course";
import { formatPrice } from "@/lib/utils";

const methods = [
  { id: "click", name: "Click", logo: "🟢" },
  { id: "payme", name: "Payme", logo: "🔵" },
  { id: "card", name: "Bank kartasi", logo: "💳" },
  { id: "stripe", name: "Visa / Mastercard", logo: "🌐" },
];

export default function CheckoutPage() {
  const [method, setMethod] = useState("click");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(true);

  async function pay() {
    setLoading(true);
    // TODO: shu yerga to'lov provayder API'sini ulang (Click, Payme, Stripe)
    // Misol: const res = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({ method }) });
    setTimeout(() => {
      setLoading(false);
      alert(
        `${method.toUpperCase()} orqali to'lov sahifasiga o'tasiz. Backend integratsiyasini /api/checkout ga ulang.`,
      );
    }, 800);
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-midnight-300 hover:text-brass-300 mb-6">
          <ArrowLeft className="h-4 w-4" /> Bosh sahifaga
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          To'lovni yakunlash
        </h1>
        <p className="mt-1 text-midnight-300">
          Bir martalik to'lov, kursga umrbod kirish.
        </p>

        <div className="mt-10 grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Form */}
          <div className="space-y-6">
            <div className="rounded-2xl glass p-6">
              <h2 className="font-display text-lg font-semibold mb-4">To'lov usuli</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                      method === m.id
                        ? "border-brass-400 bg-brass-400/5"
                        : "border-midnight-700 hover:border-midnight-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{m.logo}</div>
                      <div className="font-medium">{m.name}</div>
                    </div>
                    {method === m.id && (
                      <div className="absolute top-3 right-3 grid h-5 w-5 place-items-center rounded-full bg-brass-shine text-midnight-950">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl glass p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Billing ma'lumotlari</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="To'liq ism" placeholder="Ali Valiyev" />
                <FormField label="Telefon raqam" placeholder="+998 90 123 45 67" />
                <div className="sm:col-span-2">
                  <FormField label="Email" placeholder="siz@example.com" type="email" />
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 accent-brass-400"
              />
              <span className="text-xs text-midnight-300">
                Men <Link href="#" className="text-brass-300">Foydalanish shartlarini</Link> va{" "}
                <Link href="#" className="text-brass-300">Maxfiylik siyosatini</Link> o'qib chiqdim va roziman.
              </span>
            </label>

            <Button onClick={pay} disabled={!agreed || loading} size="lg" className="w-full">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  {formatPrice(COURSE_PRICE)} to'lash
                </>
              )}
            </Button>
            <p className="text-xs text-center text-midnight-400">
              <Lock className="inline h-3 w-3 mr-1" />
              To'lov shifrlangan va xavfsiz
            </p>
          </div>

          {/* Order summary */}
          <div>
            <div className="sticky top-6 rounded-2xl brass-border glass-strong p-6">
              <h2 className="font-display text-lg font-semibold">Buyurtma</h2>

              <div className="mt-6 space-y-3 pb-6 border-b border-brass-400/10">
                <Row label="SaxSchool — to'liq kurs" value={formatPrice(COURSE_OLD_PRICE)} strike />
                <Row label="Erta-bron chegirma" value={`-${formatPrice(COURSE_OLD_PRICE - COURSE_PRICE)}`} accent />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="text-xs text-midnight-300">Jami</div>
                  <div className="font-display text-3xl font-bold brass-text">
                    {formatPrice(COURSE_PRICE)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-midnight-400">yoki</div>
                  <div className="text-sm">3 oyga bo'lib</div>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-xs text-midnight-300">
                {[
                  "30 kunlik to'liq video kurs",
                  "60+ PDF nota va material",
                  "Backing-track yozuvlari",
                  "Yopiq Telegram jamoasi",
                  "Yakuniy sertifikat",
                ].map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-brass-300" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-midnight-200 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-xl bg-midnight-900 border border-midnight-700 focus:border-brass-400/60 focus:outline-none focus:ring-2 focus:ring-brass-400/20 transition text-sm placeholder:text-midnight-500"
      />
    </div>
  );
}

function Row({
  label,
  value,
  strike,
  accent,
}: {
  label: string;
  value: string;
  strike?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-midnight-200">{label}</span>
      <span
        className={`${strike ? "line-through text-midnight-500" : ""} ${accent ? "text-brass-300 font-medium" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
