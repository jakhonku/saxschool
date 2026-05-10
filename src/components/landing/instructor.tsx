"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Users, Music2, Sparkles } from "lucide-react";

const stats = [
  { icon: Users, value: "2,400+", label: "O'quvchilar" },
  { icon: Award, value: "15 yil", label: "Tajriba" },
  { icon: Music2, value: "200+", label: "Konsert" },
  { icon: Sparkles, value: "4.9", label: "Reyting" },
];

export function Instructor() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1200&auto=format&fit=crop&q=85"
                alt="Saksafon ustozi"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/60 via-transparent to-transparent" />
            </div>
            {/* Decorative brass border */}
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-brass-shine opacity-20 blur-2xl" />

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 rounded-2xl glass-strong p-4 max-w-[220px]">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-brass-shine text-midnight-950">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-brass-300">
                    Sertifikatlangan
                  </div>
                  <div className="text-xs font-semibold">Berklee College of Music</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium uppercase tracking-widest text-brass-300">
              Sizning ustozingiz
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
              <span className="brass-text">Bobur Aliyev</span>
              <br />
              bilan tanishing
            </h2>
            <p className="mt-6 text-midnight-200 leading-relaxed">
              15 yildan ortiq sahna tajribasiga ega professional saksafonchi.
              Berklee College of Music bitiruvchisi. Toshkent, Moskva va Istanbulda
              200+ konsert qilgan.
            </p>
            <p className="mt-4 text-midnight-300 leading-relaxed">
              "Mening maqsadim — har bir o'quvchini o'z ovozini topishga yordam berish.
              30 kun davomida sizni qo'lingizdan ushlab, professional darajaga olib chiqaman."
            </p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-brass-400/10 text-brass-300 mb-3">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div className="font-display text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-midnight-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
