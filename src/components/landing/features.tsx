"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Video,
  FileText,
  Calendar,
  Users,
  Award,
  Headphones,
  Smartphone,
  Music,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "HD video darslar",
    desc: "4K studiya sifatida yozilgan video darslar — har bir nuance ko'rinadi.",
  },
  {
    icon: FileText,
    title: "PDF notalar",
    desc: "Bosib chiqariladigan professional notalar va mashq daftarchalari.",
  },
  {
    icon: Calendar,
    title: "30 kunlik reja",
    desc: "Aniq natijaga olib boruvchi tizimli dastur. Kuniga 3 soat.",
  },
  {
    icon: Music,
    title: "Repertuar",
    desc: "Klassik, jazz, blues va funk asarlarini o'zlashtirish.",
  },
  {
    icon: Headphones,
    title: "Backing track'lar",
    desc: "Studiya sifatidagi minus-yozuvlar bilan amaliyot.",
  },
  {
    icon: Award,
    title: "Sertifikat",
    desc: "Yakuniy testdan o'tib rasmiy sertifikat oling.",
  },
  {
    icon: Smartphone,
    title: "Istalgan qurilma",
    desc: "Telefon, planshet, kompyuter — qulay tarzda kuzatish.",
  },
  {
    icon: Users,
    title: "Yopiq jamoa",
    desc: "Telegram va Discord'da boshqa o'rganuvchilar bilan.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Decorative saxophone image on the side */}
      <div className="absolute right-0 top-0 hidden xl:block w-[400px] h-full opacity-20 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1612271529916-3a4d22e6bbf6?w=800&auto=format&fit=crop&q=80"
          alt=""
          fill
          sizes="400px"
          className="object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-midnight-950/80 to-midnight-950" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-widest text-brass-300">
            Imkoniyatlar
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Saksafon o'rganish uchun{" "}
            <span className="brass-text">barchasi</span>
          </h2>
          <p className="mt-4 text-midnight-300 text-lg">
            Zamonaviy ta'lim platformasi. Siz faqat chalishni o'rganasiz.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brass-400/10 rounded-3xl overflow-hidden">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative bg-midnight-950 p-6 hover:bg-midnight-900 transition-colors"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brass-400/10 text-brass-300 group-hover:bg-brass-shine group-hover:text-midnight-950 transition-all">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-midnight-300 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
