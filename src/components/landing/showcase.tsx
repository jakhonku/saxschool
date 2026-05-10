"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=800&auto=format&fit=crop&q=80",
    label: "Klassik",
    desc: "Bach, Mozart asarlari",
  },
  {
    src: "https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=800&auto=format&fit=crop&q=80",
    label: "Jazz",
    desc: "Bebop va swing",
  },
  {
    src: "https://images.unsplash.com/photo-1568717470140-58e2cb6f73f5?w=800&auto=format&fit=crop&q=80",
    label: "Blues",
    desc: "Soulful improvizatsiya",
  },
  {
    src: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=80",
    label: "Funk & Pop",
    desc: "Zamonaviy janrlar",
  },
];

export function Showcase() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-widest text-brass-300">
            Janrlar
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            4 ta janrda{" "}
            <span className="brass-text">ustamiz</span>
          </h2>
          <p className="mt-4 text-midnight-300 text-lg">
            Klassikadan jazz va funk'gacha — har bir janrning o'ziga xos texnika va frazalarini o'rganasiz.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src={p.src}
                alt={p.label}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-display text-2xl font-bold">{p.label}</div>
                <div className="mt-1 text-xs text-midnight-200">{p.desc}</div>
              </div>
              <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-brass-400 shadow-lg shadow-brass-400/50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
