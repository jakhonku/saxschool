"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aziz Karimov",
    role: "27 yosh, Toshkent",
    text: "30 kunda haqiqatdan ham gamma va birinchi jazz standartni o'rganib oldim. Ustozlarning yondashuvi a'lo darajada.",
    rating: 5,
    initials: "AK",
  },
  {
    name: "Madina Yusupova",
    role: "Talaba, Samarqand",
    text: "PDF notalar juda chiroyli tayyorlangan. Videolar HD sifatda, har bir barmoq harakati ko'rinib turadi.",
    rating: 5,
    initials: "MY",
  },
  {
    name: "Doniyor Saidov",
    role: "Musiqachi, Buxoro",
    text: "Kursdan keyin kafe-restoranlarda chiqishni boshladim. Investitsiya 1 oyda qaytdi.",
    rating: 5,
    initials: "DS",
  },
  {
    name: "Lola Tursunova",
    role: "Hobby, Toshkent",
    text: "Hech qachon musiqa bilan shug'ullanmagan edim. SaxSchool meni 30 kunda butunlay o'zgartirdi.",
    rating: 5,
    initials: "LT",
  },
  {
    name: "Bekzod Rahimov",
    role: "32 yosh, Andijon",
    text: "Ish bilan band bo'lsam-da, har kun kechqurun 3 soat ajratdim. Natija meni hayratga soldi.",
    rating: 5,
    initials: "BR",
  },
  {
    name: "Nigora Ahmedova",
    role: "O'qituvchi, Farg'ona",
    text: "Bolalarimga musiqa o'rgatish uchun o'zim o'rgandim. Kurs metodologiyasi mukammal.",
    rating: 5,
    initials: "NA",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-brass-300">
            O'quvchilar fikri
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            <span className="brass-text">2,400+</span> o'quvchi tanlagan
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl glass p-6"
            >
              <div className="flex gap-1 text-brass-300">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm text-midnight-100 leading-relaxed">
                "{t.text}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brass-shine text-midnight-950 font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-midnight-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
