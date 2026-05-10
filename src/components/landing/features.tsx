"use client";

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
    desc: "Har bir nuance ko'rinadigan, professional studiyada yozilgan 4K video darslar.",
  },
  {
    icon: FileText,
    title: "PDF notalar va materiallar",
    desc: "Har bir dars uchun bosib chiqariladigan notalar, mashq daftarchalari va checklist.",
  },
  {
    icon: Calendar,
    title: "30 kunlik tizimli reja",
    desc: "Har kuni 1 soat nazariy va 2 soat amaliy mashg'ulot. Aniq natijaga olib boradigan dasturni.",
  },
  {
    icon: Music,
    title: "Jazz va klassik repertuari",
    desc: "Bebop, swing, ballada va klassik asarlarni o'zlashtirish.",
  },
  {
    icon: Headphones,
    title: "Backing track'lar",
    desc: "Har bir mashq uchun studiya sifatidagi minus-yozuvlar.",
  },
  {
    icon: Award,
    title: "Yakuniy sertifikat",
    desc: "Kursni muvaffaqiyatli tugatganlarga rasmiy sertifikat.",
  },
  {
    icon: Smartphone,
    title: "Istalgan qurilmada",
    desc: "Kompyuter, planshet va telefondan qulay tomosha qiling.",
  },
  {
    icon: Users,
    title: "Yopiq jamoa",
    desc: "Telegram va Discord'da boshqa o'rganuvchilar va ustozlar bilan muloqot.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-widest text-brass-300">
            Imkoniyatlar
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Saksafonni o'rganish uchun{" "}
            <span className="brass-text">barchasi</span> bir joyda
          </h2>
          <p className="mt-4 text-midnight-300 text-lg">
            Zamonaviy ta'lim platformasining barcha funksiyalari — siz faqat chalishni o'rganasiz.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-2xl glass p-6 hover:border-brass-400/40 transition-all hover:-translate-y-1"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brass-400/10 text-brass-300 group-hover:bg-brass-400/20 transition-colors">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-midnight-300 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
