"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURSE_PRICE, COURSE_OLD_PRICE } from "@/lib/course";
import { formatPrice } from "@/lib/utils";

const includes = [
  "30 kunlik to'liq video kurs (90+ soat)",
  "60+ ta professional PDF nota",
  "Barcha backing-track yozuvlari",
  "Yopiq Telegram jamoaga kirish",
  "Ustozdan haftalik feedback",
  "Yakuniy sertifikat",
  "Umrbod kirish huquqi",
  "Yangilanishlar bepul",
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-brass-300">
            Narx
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Bir martalik <span className="brass-text">to'lov</span>, umrbod kirish
          </h2>
          <p className="mt-4 text-midnight-300 text-lg max-w-2xl mx-auto">
            Hech qanday oylik obuna yo'q. Kursga bir marta to'laysiz va barcha materiallarga umrbod ega bo'lasiz.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative rounded-3xl brass-border glass-strong p-1 overflow-hidden"
        >
          <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-brass-300 to-transparent" />

          <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brass-400/10 px-3 py-1 text-xs text-brass-200">
                <Sparkles className="h-3 w-3" />
                50% chegirma — birinchi 100 ta o'quvchi
              </div>

              <h3 className="mt-6 font-display text-3xl font-bold">
                SaxSchool — to'liq kurs
              </h3>
              <p className="mt-2 text-midnight-300">
                Saksafon chalishni noldan jazz solosigacha o'rgating.
              </p>

              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-5xl font-bold brass-text">
                  {formatPrice(COURSE_PRICE)}
                </span>
                <span className="text-xl text-midnight-400 line-through">
                  {formatPrice(COURSE_OLD_PRICE)}
                </span>
              </div>
              <p className="mt-2 text-xs text-midnight-400">
                Yoki 3 oyga bo'lib to'lash mumkin
              </p>

              <Link href="/checkout" className="block mt-8">
                <Button size="lg" className="w-full">
                  Hoziroq sotib olish
                </Button>
              </Link>
              <p className="mt-3 text-center text-xs text-midnight-400">
                14 kun ichida pulni qaytarish kafolati
              </p>
            </div>

            <div className="lg:border-l lg:border-brass-400/10 lg:pl-12">
              <h4 className="text-sm font-semibold text-brass-200 uppercase tracking-widest">
                Kurs ichida
              </h4>
              <ul className="mt-6 space-y-3">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-brass-400/15 text-brass-300 shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-midnight-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
