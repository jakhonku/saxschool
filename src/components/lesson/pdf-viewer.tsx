"use client";

import { Download, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PdfViewer({ url, title }: { url: string | null; title: string }) {
  if (!url) {
    return (
      <div className="rounded-2xl glass p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brass-400/10 text-brass-300 mb-4">
          <FileText className="h-7 w-7" />
        </div>
        <h3 className="font-display text-lg font-semibold">PDF tez orada</h3>
        <p className="mt-2 text-sm text-midnight-300 max-w-sm mx-auto">
          Ushbu darsning notalari hozirda tayyorlanmoqda. Supabase Storage'ga yuklang.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl glass overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b border-brass-400/10">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-brass-400/10 text-brass-300">
          <FileText className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{title} — Notalar</h4>
          <p className="text-xs text-midnight-400">PDF format</p>
        </div>
        <a href={url} download>
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" /> Yuklab olish
          </Button>
        </a>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </a>
      </div>
      <iframe
        src={url}
        className="w-full h-[600px] bg-white"
        title={`${title} notalari`}
      />
    </div>
  );
}
