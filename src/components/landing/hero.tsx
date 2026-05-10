"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Sparkles, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Dekorativ saksafon shakli orqada */}
      <div className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-brass-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-brass-700/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-brass-200">
              <Sparkles className="h-3.5 w-3.5" />
              2026 yilning eng to'liq saksafon kursi
            </div>

            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              30 kunda{" "}
              <span className="brass-text">saksafon</span>
              <br />
              chalishni o'rganing
            </h1>

            <p className="mt-6 max-w-xl text-lg text-midnight-200 leading-relaxed">
              Har kuni 1 soat nazariya va 2 soat amaliyot. HD video darslar,
              professional notalar (PDF) va tajribali ustozlardan jonli
              yondashuv. Noldan jazz solosigacha.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg">
                  <Play className="h-4 w-4" fill="currentColor" />
                  Kursni boshlash
                </Button>
              </Link>
              <Link href="/#curriculum">
                <Button variant="outline" size="lg">
                  30 kunlik dasturni ko'rish
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <Stat icon={<Clock className="h-4 w-4" />} value="90+" label="soat dars" />
              <Stat icon={<Award className="h-4 w-4" />} value="30" label="kun rejasi" />
              <Stat icon={<Sparkles className="h-4 w-4" />} value="60+" label="PDF nota" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <SaxophoneArt />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-brass-300">
        {icon}
        <span className="font-display text-2xl font-bold">{value}</span>
      </div>
      <div className="text-xs text-midnight-300 mt-1">{label}</div>
    </div>
  );
}

function SaxophoneArt() {
  return (
    <div className="relative aspect-square max-w-lg mx-auto">
      <div className="absolute inset-0 bg-brass-shine opacity-20 blur-3xl rounded-full animate-float" />
      <svg
        viewBox="0 0 400 400"
        className="relative w-full h-full drop-shadow-[0_20px_60px_rgba(239,196,78,0.3)]"
        fill="none"
      >
        <defs>
          <linearGradient id="brass1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5dd8d" />
            <stop offset="35%" stopColor="#efc44e" />
            <stop offset="65%" stopColor="#d28e16" />
            <stop offset="100%" stopColor="#864c11" />
          </linearGradient>
          <linearGradient id="brass2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a86810" />
            <stop offset="50%" stopColor="#efc44e" />
            <stop offset="100%" stopColor="#f5dd8d" />
          </linearGradient>
          <radialGradient id="bell" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#f5dd8d" />
            <stop offset="40%" stopColor="#efc44e" />
            <stop offset="80%" stopColor="#a86810" />
            <stop offset="100%" stopColor="#341a07" />
          </radialGradient>
        </defs>

        {/* Mundshtuk */}
        <rect x="190" y="20" width="20" height="35" rx="3" fill="url(#brass1)" />
        <rect x="186" y="50" width="28" height="15" rx="4" fill="#1f2440" stroke="url(#brass2)" strokeWidth="1.5" />

        {/* Bo'yin */}
        <path d="M195 65 Q 200 100, 220 130 Q 235 150, 240 170" stroke="url(#brass1)" strokeWidth="22" fill="none" strokeLinecap="round" />

        {/* Asosiy tana */}
        <path
          d="M240 170 L 250 280 Q 255 340, 220 360 L 140 360 Q 90 360, 90 305 L 90 270 Q 90 240, 130 235 L 230 235"
          stroke="url(#brass2)"
          strokeWidth="28"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bell (ovoz chiqaradigan qism) */}
        <ellipse cx="155" cy="320" rx="80" ry="55" fill="url(#bell)" opacity="0.95" />
        <ellipse cx="155" cy="320" rx="60" ry="40" fill="#341a07" opacity="0.4" />

        {/* Klapanlar (knopkalar) */}
        {[
          [215, 195], [225, 220], [232, 245], [235, 270], [232, 295]
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="9" fill="url(#brass1)" />
            <circle cx={cx} cy={cy} r="6" fill="#5b3215" />
            <circle cx={cx - 1} cy={cy - 1} r="2.5" fill="#f5dd8d" opacity="0.7" />
          </g>
        ))}

        {/* Tepa knopkalar */}
        {[[180, 130], [200, 150], [215, 168]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="6" fill="url(#brass1)" stroke="#5b3215" strokeWidth="1" />
        ))}

        {/* Yorug'lik aksi */}
        <path d="M100 270 L 100 320 Q 100 345, 130 350" stroke="#f5dd8d" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
      </svg>

      {/* Floating muzika notalari */}
      <motion.div
        className="absolute top-10 -left-4 text-brass-300 text-4xl"
        animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ♪
      </motion.div>
      <motion.div
        className="absolute top-32 -right-2 text-brass-400 text-5xl"
        animate={{ y: [0, -25, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        ♫
      </motion.div>
      <motion.div
        className="absolute bottom-20 -left-2 text-brass-300 text-3xl"
        animate={{ y: [0, -15, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
      >
        ♩
      </motion.div>
    </div>
  );
}

