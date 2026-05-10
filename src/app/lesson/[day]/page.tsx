import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, BookOpen, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/lesson/video-player";
import { PdfViewer } from "@/components/lesson/pdf-viewer";
import { CompleteButton } from "@/components/lesson/complete-button";
import { createClient } from "@/lib/supabase/server";
import { FALLBACK_LESSONS, type Lesson } from "@/lib/course";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const dayNum = parseInt(day, 10);
  if (isNaN(dayNum) || dayNum < 1 || dayNum > 30) notFound();

  let lesson: Lesson | undefined = FALLBACK_LESSONS.find((l) => l.day === dayNum);
  let isCompleted = false;
  let hasAccess = true; // demo
  let lessons: Lesson[] = FALLBACK_LESSONS;

  try {
    const supabase = await createClient();
    const { data: u } = await supabase.auth.getUser();

    if (u.user) {
      const [{ data: l }, { data: all }, { data: prog }, { data: profile }] =
        await Promise.all([
          supabase.from("lessons").select("*").eq("day", dayNum).single(),
          supabase.from("lessons").select("*").order("day"),
          supabase
            .from("progress")
            .select("completed")
            .eq("user_id", u.user.id)
            .eq("lesson_id", (lesson?.id ?? dayNum))
            .maybeSingle(),
          supabase.from("profiles").select("has_access").eq("id", u.user.id).single(),
        ]);
      if (l) lesson = l as Lesson;
      if (all && all.length) lessons = all as Lesson[];
      if (prog?.completed) isCompleted = true;
      if (profile) hasAccess = profile.has_access ?? false;
    }
  } catch {}

  if (!lesson) notFound();

  if (!hasAccess && !lesson.preview) {
    redirect(`/checkout?from=lesson-${dayNum}`);
  }

  const prevDay = dayNum > 1 ? dayNum - 1 : null;
  const nextDay = dayNum < 30 ? dayNum + 1 : null;

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-brass-400/10 bg-midnight-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-midnight-300 hover:text-brass-300">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="ml-auto flex items-center gap-2">
            {prevDay && (
              <Link href={`/lesson/${prevDay}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-3.5 w-3.5" /> Oldingi
                </Button>
              </Link>
            )}
            {nextDay && (
              <Link href={`/lesson/${nextDay}`}>
                <Button variant="secondary" size="sm">
                  Keyingi <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-medium text-brass-300 uppercase tracking-widest">
              {dayNum}-kun · 30 kunlik kurs
            </div>
            <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
              {lesson.title}
            </h1>
            <p className="mt-2 text-midnight-300 max-w-2xl">{lesson.description}</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-midnight-300">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> {lesson.theory_minutes} daq nazariya
              </span>
              <span className="flex items-center gap-1.5">
                <Dumbbell className="h-4 w-4" /> {lesson.practice_minutes} daq amaliyot
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Jami {lesson.theory_minutes + lesson.practice_minutes} daq
              </span>
            </div>
          </div>
          <CompleteButton lessonId={lesson.id} initiallyCompleted={isCompleted} />
        </div>

        {/* Theory section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-brass-400/10 text-brass-300">
              <BookOpen className="h-4 w-4" />
            </div>
            <h2 className="font-display text-xl font-semibold">Nazariy qism · 1 soat</h2>
          </div>
          <VideoPlayer src={lesson.theory_video_url} />
        </section>

        {/* PDF notes */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-xl font-semibold">Notalar va materiallar</h2>
          <PdfViewer url={lesson.pdf_notes_url} title={lesson.title} />
        </section>

        {/* Practice section */}
        <section className="mt-10 space-y-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-brass-400/10 text-brass-300">
              <Dumbbell className="h-4 w-4" />
            </div>
            <h2 className="font-display text-xl font-semibold">Amaliy qism · 2 soat</h2>
          </div>
          <p className="text-sm text-midnight-300 max-w-2xl">
            Quyidagi videodagi mashqlarni kuzatib, har bir mashqni metronom bilan kamida 3 marta takrorlang.
          </p>
          <VideoPlayer src={lesson.practice_video_url} />
        </section>

        {/* Tips */}
        <section className="mt-10 rounded-2xl glass p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Bugun uchun maslahatlar</h3>
          <ul className="space-y-3 text-sm text-midnight-200">
            <li className="flex gap-3">
              <span className="text-brass-300 font-semibold">01.</span>
              Mashqdan oldin lab va nafas ko'rinishlarini 5 daqiqa isitib oling.
            </li>
            <li className="flex gap-3">
              <span className="text-brass-300 font-semibold">02.</span>
              Amaliyotni metronom bilan boshlang, sekin tempodan tezgacha ko'taring.
            </li>
            <li className="flex gap-3">
              <span className="text-brass-300 font-semibold">03.</span>
              O'zingizni telefonga yozib oling va keyin tinglab xatolarni toping.
            </li>
            <li className="flex gap-3">
              <span className="text-brass-300 font-semibold">04.</span>
              Mashqdan keyin saksafonni quritish uchun tozalang (swab).
            </li>
          </ul>
        </section>

        {/* Bottom navigation */}
        <div className="mt-12 flex flex-wrap gap-3 justify-between">
          {prevDay ? (
            <Link href={`/lesson/${prevDay}`}>
              <Button variant="secondary" size="lg">
                <ArrowLeft className="h-4 w-4" /> {prevDay}-kun
              </Button>
            </Link>
          ) : (
            <span />
          )}
          {nextDay && (
            <Link href={`/lesson/${nextDay}`}>
              <Button size="lg">
                {nextDay}-kun davom etish <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
