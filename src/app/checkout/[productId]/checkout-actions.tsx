"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";

export function CheckoutActions({
  productId,
  amount,
  currency,
  hasPendingOrder,
  alreadyPaid,
}: {
  productId: string;
  amount: number;
  currency: string;
  hasPendingOrder: boolean;
  alreadyPaid: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [userNote, setUserNote] = useState("");

  if (alreadyPaid) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          <h3 className="font-semibold">Siz bu mahsulotga egasiz</h3>
        </div>
        <p className="mt-2 text-sm">
          Faylni kabinetingizdan yuklab olishingiz mumkin.
        </p>
        <Button
          className="mt-4"
          onClick={() => router.push("/account")}
        >
          Kabinetga o'tish
        </Button>
      </div>
    );
  }

  async function submit() {
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("Iltimos, qaytadan kiring.");
        setLoading(false);
        return;
      }

      let proofUrl: string | null = null;
      if (proofFile) {
        const ext = proofFile.name.split(".").pop() || "jpg";
        const path = `${user.id}/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("proofs")
          .upload(path, proofFile, {
            contentType: proofFile.type,
            upsert: false,
          });
        if (upErr) {
          setError("Chek yuklanmadi: " + upErr.message);
          setLoading(false);
          return;
        }
        proofUrl = path;
      }

      const { error: insertErr } = await supabase.from("orders").insert({
        user_id: user.id,
        product_id: productId,
        amount,
        currency,
        status: "pending",
        payment_method: "click_manual",
        payment_proof_url: proofUrl,
        user_note: userNote || null,
      });

      if (insertErr) {
        setError(insertErr.message);
        setLoading(false);
        return;
      }

      router.push("/account?ordered=1");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xato yuz berdi");
      setLoading(false);
    }
  }

  if (hasPendingOrder) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
        <h3 className="font-semibold">Buyurtma kutilmoqda</h3>
        <p className="mt-2 text-sm">
          Sizning to'lovingiz admin tomonidan tekshirilmoqda. Tasdiqlangach,
          mahsulot kabinetingizga qo'shiladi.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push("/account")}
        >
          Kabinetga o'tish
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/[0.08] bg-white p-6">
      <h2 className="text-lg font-semibold text-ink-900">To'lovni tasdiqlash</h2>
      <p className="mt-2 text-sm text-ink-600">
        {formatPrice(amount, currency)} miqdorida to'lov qilganingizdan so'ng,
        chek rasmini yuklang va izoh qoldiring.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label className="text-sm font-medium text-ink-800">
            Chek rasmi (ixtiyoriy)
          </label>
          <label className="mt-2 flex items-center gap-3 rounded-xl border border-dashed border-black/[0.15] hover:border-ink-900/40 bg-ink-50/50 px-4 py-4 cursor-pointer transition">
            <Upload className="h-5 w-5 text-ink-500" />
            <span className="text-sm text-ink-600">
              {proofFile ? proofFile.name : "Rasm tanlash (JPG, PNG)"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <div>
          <label className="text-sm font-medium text-ink-800">
            Izoh / aloqa raqami
          </label>
          <textarea
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            placeholder="Telefon raqamingiz yoki qo'shimcha izoh"
            rows={3}
            className="mt-2 w-full rounded-xl border border-black/[0.1] bg-white px-4 py-3 text-sm focus:outline-none focus:border-ink-900"
          />
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <Button
          size="lg"
          onClick={submit}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Yuborilmoqda...
            </>
          ) : (
            "To'lovni tasdiqlash"
          )}
        </Button>
        <p className="text-xs text-ink-500 text-center">
          Tasdiqlash bilan siz buyurtma qoldirayapsiz. Admin to'lovni tekshirgach
          mahsulot ochiladi.
        </p>
      </div>
    </div>
  );
}
