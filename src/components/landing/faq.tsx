"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Saksafon menda yo'q. Avval qaysi turini sotib olishim kerak?",
    a: "Boshlovchilar uchun Alto saksafonni tavsiya qilamiz — qulay o'lchamda va eng ko'p materiallar shu turga mo'ljallangan. 1-darsda saksafon turlari bo'yicha to'liq ko'rsatma beriladi.",
  },
  {
    q: "Kursni qancha vaqtda tugataman?",
    a: "Dastur 30 kunga mo'ljallangan: har kuni 1 soat nazariya va 2 soat amaliyot. Ammo umrbod kirish huquqingiz bo'lgani uchun o'zingizning tezligingizda davom ettira olasiz.",
  },
  {
    q: "Hech qachon musiqa bilan shug'ullanmaganman. Tushuna olamanmi?",
    a: "Ha, kurs noldan boshlanadi. Birinchi haftada nota o'qish, ritm va asosiy texnika to'liq tushuntiriladi.",
  },
  {
    q: "Videolarni yuklab olib offline ko'rish mumkinmi?",
    a: "Mobil ilova orqali darslarni saqlab, internetsiz ko'rish mumkin. PDF notalar esa har doim yuklab olinadi.",
  },
  {
    q: "To'lovni qanday amalga oshiraman?",
    a: "Click, Payme, Humo, Uzcard yoki xalqaro kartalar (Visa/Mastercard) qabul qilamiz. 3 oyga bo'lib to'lash imkoniyati ham bor.",
  },
  {
    q: "Pulimni qaytarib bera olamanmi?",
    a: "Albatta. 14 kun ichida birinchi 5 ta darsni ko'rib, agar sizga yoqmasa to'liq pulingiz qaytariladi.",
  },
  {
    q: "Sertifikat berasizmi?",
    a: "Ha, kursni muvaffaqiyatli tugatib yakuniy testdan o'tganlarga rasmiy sertifikat beriladi.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-brass-300">
            Savol-javob
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Tez-tez beriladigan{" "}
            <span className="brass-text">savollar</span>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl glass overflow-hidden transition-all",
                open === i && "border-brass-400/40",
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-brass-300 shrink-0 transition-transform",
                    open === i && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all",
                  open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-midnight-300 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
