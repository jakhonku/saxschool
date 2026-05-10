"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const songs = [
  { day: 10, title: "Mary Had a Little Lamb", genre: "Boshlang'ich", color: "from-brass-300/20 to-brass-500/5" },
  { day: 15, title: "Ode to Joy", composer: "L. van Beethoven", genre: "Klassik", color: "from-brass-400/20 to-brass-600/5" },
  { day: 20, title: "Autumn Leaves", composer: "J. Kosma", genre: "Jazz Standard", color: "from-brass-500/20 to-brass-700/5" },
  { day: 22, title: "Take Five", composer: "Paul Desmond", genre: "Bebop", color: "from-brass-300/20 to-brass-500/5" },
  { day: 24, title: "Pick Up the Pieces", composer: "AWB", genre: "Funk", color: "from-brass-400/20 to-brass-600/5" },
  { day: 28, title: "Careless Whisper", composer: "George Michael", genre: "Pop", color: "from-brass-500/20 to-brass-700/5" },
];

export function Songs() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-widest text-brass-300">
              Repertuar
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
              Quyidagi kuylarni{" "}
              <span className="brass-text">chala olasiz</span>
            </h2>
            <p className="mt-4 text-midnight-300 text-lg">
              30 kun davomida 6 ta mashhur asarni to'liq o'zlashtiring.
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <div className="h-1 w-12 rounded-full bg-brass-400" />
            <div className="h-1 w-6 rounded-full bg-brass-400/40" />
            <div className="h-1 w-3 rounded-full bg-brass-400/20" />
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl glass p-6 hover:border-brass-400/40 transition-all`}
            >
              <div
                className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${s.color} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-xs font-mono text-brass-300/80">
                    {s.day}-KUN
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-brass-shine text-midnight-950 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold leading-tight">
                  {s.title}
                </h3>
                {s.composer && (
                  <p className="mt-1 text-sm text-midnight-300">{s.composer}</p>
                )}
                <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-midnight-800/60 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-brass-200">
                  {s.genre}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
