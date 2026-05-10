"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function CompleteButton({
  lessonId,
  initiallyCompleted,
}: {
  lessonId: number;
  initiallyCompleted: boolean;
}) {
  const router = useRouter();
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [loading, setLoading] = useState(false);

  async function markComplete() {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      await supabase.from("progress").upsert(
        {
          user_id: u.user.id,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,lesson_id" },
      );
      setCompleted(true);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (completed) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-brass-400/15 px-5 py-2.5 text-sm font-medium text-brass-300">
        <CheckCircle2 className="h-4 w-4" fill="currentColor" />
        Dars tugatildi
      </div>
    );
  }

  return (
    <Button onClick={markComplete} disabled={loading}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
      Darsni tugatish
    </Button>
  );
}
