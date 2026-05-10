"use client";

import { motion } from "framer-motion";
import { Lock, Play, FileText, Clock } from "lucide-react";
import { useState } from "react";
import { FALLBACK_LESSONS } from "@/lib/course";
import { cn } from "@/lib/utils";

const weeks = [
  { num: 1, title: "Asoslar", days: [1, 2, 3, 4, 5, 6, 7], color: "from-brass-400 to-brass-600" },
  { num: 2, title: "Texnika", days: [8, 9, 10, 11, 12, 13, 14], color: "from-brass-300 to-brass-500" },
  { num: 3, title: "Stil va Improvizatsiya", days: [15, 16, 17, 18, 19, 20, 21], color: "from-brass-400 to-brass-700" },
  { num: 4, title: "Mahorat", days: [22, 23, 24, 25, 26, 27, 28, 29, 30], color: "from-brass-500 to-brass-800" },
];

export function Curriculum() {
  const [activeWeek, setActiveWeek] = useState(1);
  const lessons = FALLBACK_LESSONS;

  return (
    <section id="curriculum" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-medium uppercase tracking-widest text-brass-300">
            30 kunlik dastur
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Har bir kun — yangi <span className="brass-text">bosqich</span>
          </h2>
          <p className="mt-4 text-midnight-300 text-lg">
            Kurs 4 haftaga bo'lingan: asoslar, texnika, stil va mahorat. Har kuni 1 soat nazariya va 2 soat amaliyot.
          </p>
        </div>

        {/* Week tabs */}
        <div className="mt-12 flex flex-wrap gap-2">
          {weeks.map((w) => (
            <button
              key={w.num}
              onClick={() => setActiveWeek(w.num)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                activeWeek === w.num
                  ? "bg-brass-shine text-midnight-950 shadow-lg shadow-brass-500/20"
                  : "glass text-midnight-200 hover:text-brass-200",
              )}
            >
              {w.num}-hafta · {w.title}
            </button>
          ))}
        </div>

        {/* Lessons grid */}
        <motion.div
          key={activeWeek}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {weeks
            .find((w) => w.num === activeWeek)!
            .days.map((day) => {
              const lesson = lessons.find((l) => l.day === day);
              if (!lesson) return null;
              return (
                <div
                  key={day}
                  className="group relative rounded-2xl glass p-5 hover:border-brass-400/40 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-xs font-medium text-brass-300">
                      {day}-kun
                    </div>
                    {lesson.preview ? (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-brass-400 bg-brass-400/10 px-2 py-0.5 rounded-full">
                        Bepul
                      </span>
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-midnight-400" />
                    )}
                  </div>
                  <h3 className="font-display text-base font-semibold mb-2 leading-tight">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-midnight-300 line-clamp-2">
                    {lesson.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-[11px] text-midnight-400">
                    <span className="flex items-center gap-1">
                      <Play className="h-3 w-3" />
                      Video
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      PDF
                    </span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Clock className="h-3 w-3" />
                      3 soat
                    </span>
                  </div>
                </div>
              );
            })}
        </motion.div>
      </div>
    </section>
  );
}
