"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Star, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image of saxophone */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1573871924421-c321b1e8cabb?w=2400&auto=format&fit=crop&q=85"
          alt="Saksafon"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-950 via-midnight-950/85 to-midnight-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-midnight-950/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-32 lg:pt-32 lg:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brass-400/30 bg-midnight-950/60 backdrop-blur-md px-4 py-1.5">
            <span className="flex h-2 w-2 rounded-full bg-brass-400 animate-pulse" />
            <span className="text-xs font-medium text-brass-200">
              2,400+ o'quvchi tanladi · 4.9 ⭐
            </span>
          </div>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight">
            Saksafon
            <br />
            chalishni
            <br />
            <span className="brass-text">o'rganing.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg sm:text-xl text-midnight-100 leading-relaxed">
            30 kunda noldan jazz solosigacha. Har kuni{" "}
            <span className="text-brass-300 font-semibold">1 soat nazariya</span>{" "}
            va{" "}
            <span className="text-brass-300 font-semibold">2 soat amaliyot</span>.
            HD video darslar, professional notalar.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/register">
              <Button size="lg">
                <Play className="h-4 w-4" fill="currentColor" />
                Hoziroq boshlash
              </Button>
            </Link>
            <Link href="/#curriculum">
              <Button variant="outline" size="lg">
                Dasturni ko'rish
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6">
            <Stat icon={<Clock />} value="90+" label="soat dars" />
            <div className="hidden sm:block w-px bg-brass-400/20" />
            <Stat icon={<Award />} value="30" label="kun rejasi" />
            <div className="hidden sm:block w-px bg-brass-400/20" />
            <Stat icon={<Star />} value="4.9" label="reyting" />
          </div>
        </motion.div>

        {/* Floating note decorations */}
        <motion.div
          className="hidden lg:block absolute right-12 top-1/4 text-brass-400/40 text-7xl font-serif"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          ♪
        </motion.div>
        <motion.div
          className="hidden lg:block absolute right-32 top-1/2 text-brass-300/30 text-6xl font-serif"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          ♫
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-full border border-brass-400/30 bg-midnight-950/60 text-brass-300 backdrop-blur-md [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </div>
      <div>
        <div className="font-display text-2xl font-bold">{value}</div>
        <div className="text-xs text-midnight-300">{label}</div>
      </div>
    </div>
  );
}
