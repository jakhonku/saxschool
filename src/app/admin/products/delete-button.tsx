"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProductAction } from "./actions";

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (!confirm("Mahsulotni o'chirishga ishonchingiz komilmi?")) return;
        startTransition(async () => {
          const res = await deleteProductAction(id);
          if (res?.error) alert(res.error);
          else router.refresh();
        });
      }}
      disabled={pending}
      className="inline-flex items-center gap-1 rounded-lg border border-red-200 text-red-700 px-3 py-1.5 text-xs hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
      O'chirish
    </button>
  );
}
