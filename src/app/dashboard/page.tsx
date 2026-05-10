import Link from "next/link";
import { Play, FileText, Clock, Lock, Trophy, Flame, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { FALLBACK_LESSONS, type Lesson } from "@/lib/course";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  let lessons: Lesson[] = FALLBACK_LESSONS;
  let progress: { lesson_id: number; completed: boolean }[] = [];
  let userName = "O'quvchi";
  let hasAccess = true; // demo uchun true; Supabase ulanganda profile.has_access dan olinadi

  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      userName =
        (userData.user.user_metadata?.full_name as string) ??
        userData.user.email!;

      const [{ data: l }, { data: p }, { data: profile }] = await Promise.all([
        supabase.from("lessons").select("*").order("day"),
        supabase.from("progress").select("lesson_id, completed").eq("user_id", userData.user.id),
        supabase.from("profiles").select("has_access").eq("id", userData.user.id).single(),
      ]);
      if (l && l.length) lessons = l as Lesson[];
      if (p) progress = p;
      if (profile) hasAccess = profile.has_access ?? false;
    }
  } catch {}

  const completedCount = progress.filter((p) => p.completed).length;
  const completedSet = new Set(progress.filter((p) => p.completed).map((p) => p.lesson_id));
  const percent = Math.round((completedCount / lessons.length) * 100);
  const nextLesson = lessons.find((l) => !completedSet.has(l.id)) ?? lessons[0];

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Salom, <span className="brass-text">{userName.split(" ")[0]}</span> 👋
          </h1>
          <p className="mt-1 text-midnight-300">
            Bugun {nextLesson.day}-darsda davom eting.
          </p>
        </div>
        {!hasAccess && (
          <Link
            href="/checkout"
            className="rounded-full bg-brass-shine text-midnight-950 px-5 py-2.5 text-sm font-medium hover:shadow-lg hover:shadow-brass-500/30 transition"
          >
            Kursga kirish ochish
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <StatCard
          icon={<Flame className="h-5 w-5" />}
          label="Streak (qator)"
          value={`${completedCount} kun`}
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Tugatilgan darslar"
          value={`${completedCount} / ${lessons.length}`}
        />
        <StatCard
          icon={<Trophy className="h-5 w-5" />}
          label="Umumiy progress"
          value={`${percent}%`}
        />
      </div>

      {/* Progress bar */}
      <div className="mt-6 rounded-2xl glass p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium">Kurs progressi</span>
          <span className="text-sm text-brass-300">{percent}%</span>
        </div>
        <div className="h-2 rounded-full bg-midnight-800 overflow-hidden">
          <div
            className="h-full bg-brass-shine transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Continue card */}
      <Link
        href={`/lesson/${nextLesson.day}`}
        className="mt-6 block group rounded-2xl brass-border glass-strong p-6 md:p-8 hover:shadow-2xl hover:shadow-brass-500/10 transition"
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brass-shine text-midnight-950 group-hover:scale-110 transition-transform">
            <Play className="h-7 w-7" fill="currentColor" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-xs font-medium text-brass-300">DAVOM ETISH · {nextLesson.day}-kun</div>
            <h3 className="mt-1 font-display text-2xl font-bold">{nextLesson.title}</h3>
            <p className="mt-1 text-sm text-midnight-300 line-clamp-1">{nextLesson.description}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-midnight-300">
            <Clock className="h-4 w-4" />
            {nextLesson.theory_minutes + nextLesson.practice_minutes} daq
          </div>
        </div>
      </Link>

      {/* All lessons */}
      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold mb-6">Barcha darslar</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => {
            const isCompleted = completedSet.has(lesson.id);
            const isLocked = !hasAccess && !lesson.preview;
            return (
              <Link
                key={lesson.id}
                href={isLocked ? "/checkout" : `/lesson/${lesson.day}`}
                className={cn(
                  "group rounded-2xl glass p-5 transition-all",
                  isLocked ? "opacity-60" : "hover:border-brass-400/40 hover:-translate-y-1",
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-brass-300">{lesson.day}-kun</span>
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-brass-300" fill="currentColor" />
                  ) : isLocked ? (
                    <Lock className="h-3.5 w-3.5 text-midnight-400" />
                  ) : null}
                </div>
                <h3 className="font-display text-base font-semibold mb-1.5 leading-tight">
                  {lesson.title}
                </h3>
                <p className="text-xs text-midnight-300 line-clamp-2">{lesson.description}</p>
                <div className="mt-4 flex items-center gap-3 text-[11px] text-midnight-400">
                  <span className="flex items-center gap-1"><Play className="h-3 w-3" />Video</span>
                  <span className="flex items-center gap-1"><FileText className="h-3 w-3" />PDF</span>
                  <span className="ml-auto">{lesson.theory_minutes + lesson.practice_minutes} daq</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-brass-400/10 text-brass-300">
        {icon}
      </div>
      <div className="mt-4 text-xs text-midnight-300">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold">{value}</div>
    </div>
  );
}
