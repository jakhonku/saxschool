"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, User, Loader2, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  return (
    <div className="text-center py-12">
      <h1 className="font-display text-3xl font-semibold text-ink-900">
        Ro'yxatdan o'tish yopiq
      </h1>
      <p className="mt-4 text-sm text-ink-600">
        Ushbu saytda yangi hisob yaratish imkoniyati cheklangan.
      </p>
      <div className="mt-8">
        <Link href="/login">
          <Button variant="outline" size="lg" className="w-full">
            Kirish sahifasiga o'tish
          </Button>
        </Link>
      </div>
    </div>
  );
}
