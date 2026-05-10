"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export function VideoPlayer({
  src,
  poster,
  onProgress,
  onComplete,
}: {
  src: string | null;
  poster?: string;
  onProgress?: (seconds: number) => void;
  onComplete?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      setProgress(v.currentTime);
      onProgress?.(v.currentTime);
      if (v.duration && v.currentTime / v.duration > 0.95) onComplete?.();
    };
    const onMeta = () => setDuration(v.duration);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
    };
  }, [onProgress, onComplete]);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  function fullscreen() {
    videoRef.current?.requestFullscreen();
  }

  function restart() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
    setPlaying(true);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * duration;
  }

  // Demo placeholder agar src bo'lmasa
  if (!src) {
    return (
      <div className="aspect-video rounded-2xl glass-strong overflow-hidden grid place-items-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight-900 via-midnight-950 to-brass-900/30" />
        <div className="relative text-center px-6">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brass-shine text-midnight-950 mb-4 animate-pulse">
            <Play className="h-9 w-9" fill="currentColor" />
          </div>
          <h3 className="font-display text-xl font-semibold">Video tez orada yuklanadi</h3>
          <p className="mt-2 text-sm text-midnight-300 max-w-md">
            Ustoz video darslarni hozirda tayyorlamoqda. Supabase Storage'ga yuklab qo'ying — bu yerda ko'rinadi.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={toggle}
      />

      {/* Controls overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-auto">
          {/* Progress bar */}
          <div
            onClick={seek}
            className="h-1 rounded-full bg-white/20 mb-3 cursor-pointer hover:h-1.5 transition-all"
          >
            <div
              className="h-full bg-brass-400 rounded-full"
              style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
            />
          </div>

          <div className="flex items-center gap-3 text-white">
            <button onClick={toggle} className="hover:text-brass-300 transition-colors">
              {playing ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5" fill="currentColor" />}
            </button>
            <button onClick={restart} className="hover:text-brass-300 transition-colors">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button onClick={toggleMute} className="hover:text-brass-300 transition-colors">
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <span className="text-xs ml-1">
              {formatTime(progress)} / {formatTime(duration)}
            </span>
            <button onClick={fullscreen} className="ml-auto hover:text-brass-300 transition-colors">
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Center play button when paused */}
      {!playing && (
        <button
          onClick={toggle}
          className={cn(
            "absolute inset-0 grid place-items-center bg-black/30",
            "group-hover:bg-black/50 transition-colors",
          )}
        >
          <div className="grid h-20 w-20 place-items-center rounded-full bg-brass-shine text-midnight-950 shadow-2xl shadow-brass-500/30">
            <Play className="h-8 w-8 ml-1" fill="currentColor" />
          </div>
        </button>
      )}
    </div>
  );
}

function formatTime(s: number) {
  if (!s || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}
