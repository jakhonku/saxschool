"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  X,
  Loader2,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
} from "lucide-react";
import { approveOrderAction, rejectOrderAction, getProofSignedUrlAction } from "./actions";

type OrderUI = {
  id: string;
  status: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_proof_url: string | null;
  user_note: string | null;
  admin_note: string | null;
  created_at: string;
  product: { id: string; title: string; type: string } | null;
  profile: { email: string; full_name: string } | null;
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  paid: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
  cancelled: "bg-ink-100 text-ink-600",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Kutilmoqda",
  paid: "To'langan",
  rejected: "Rad etilgan",
  cancelled: "Bekor qilingan",
};

export function OrderRow({
  order,
  priceLabel,
}: {
  order: OrderUI;
  priceLabel: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(order.status === "pending");
  const [pending, startTransition] = useTransition();
  const [adminNote, setAdminNote] = useState(order.admin_note ?? "");
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [loadingProof, setLoadingProof] = useState(false);

  async function loadProof() {
    if (!order.payment_proof_url || proofUrl) return;
    setLoadingProof(true);
    const res = await getProofSignedUrlAction(order.payment_proof_url);
    if (res.url) setProofUrl(res.url);
    setLoadingProof(false);
  }

  function approve() {
    startTransition(async () => {
      const res = await approveOrderAction(order.id, adminNote || null);
      if (res?.error) alert(res.error);
      else router.refresh();
    });
  }

  function reject() {
    if (!confirm("To'lovni rad etishga ishonchingiz komilmi?")) return;
    startTransition(async () => {
      const res = await rejectOrderAction(order.id, adminNote || null);
      if (res?.error) alert(res.error);
      else router.refresh();
    });
  }

  return (
    <div className="rounded-2xl bg-white border border-black/[0.06] overflow-hidden">
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          if (!open) loadProof();
        }}
        className="w-full flex items-center gap-4 p-4 hover:bg-ink-50/50 transition text-left"
      >
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[order.status] ?? "bg-ink-100"}`}
        >
          {STATUS_LABELS[order.status] ?? order.status}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-ink-900 truncate">
            {order.product?.title ?? "—"}
          </p>
          <p className="text-xs text-ink-500 truncate">
            {order.profile?.email ?? "—"} · {new Date(order.created_at).toLocaleString("uz-UZ")}
          </p>
        </div>
        <span className="font-semibold text-ink-900">{priceLabel}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-ink-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-ink-500" />
        )}
      </button>

      {open && (
        <div className="border-t border-black/[0.06] p-5 bg-ink-50/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-ink-900">
                To'lov ma'lumoti
              </h4>
              <dl className="mt-3 space-y-2 text-sm">
                <Row label="Usul" value={order.payment_method === "click_manual" ? "Click manual" : order.payment_method} />
                <Row label="Foydalanuvchi" value={order.profile?.full_name || order.profile?.email || "—"} />
                <Row label="Email" value={order.profile?.email ?? "—"} />
                <Row
                  label="Sana"
                  value={new Date(order.created_at).toLocaleString("uz-UZ")}
                />
                {order.user_note && (
                  <div>
                    <dt className="text-ink-500 mb-1">Foydalanuvchi izohi:</dt>
                    <dd className="rounded-lg bg-white border border-black/[0.06] p-3 text-ink-800 whitespace-pre-line">
                      {order.user_note}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-ink-900">Chek rasmi</h4>
              <div className="mt-3">
                {order.payment_proof_url ? (
                  loadingProof ? (
                    <div className="rounded-xl bg-white border border-black/[0.06] p-6 text-center text-ink-500">
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    </div>
                  ) : proofUrl ? (
                    <a
                      href={proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl overflow-hidden border border-black/[0.06]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={proofUrl}
                        alt="To'lov cheki"
                        className="w-full max-h-72 object-contain bg-ink-900"
                      />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={loadProof}
                      className="w-full rounded-xl bg-white border border-black/[0.06] p-6 text-center text-sm text-ink-700 hover:bg-ink-50"
                    >
                      <ImageIcon className="h-5 w-5 mx-auto mb-1" />
                      Chekni ko'rish
                    </button>
                  )
                ) : (
                  <p className="rounded-xl bg-white border border-dashed border-black/[0.12] p-6 text-center text-sm text-ink-500">
                    Chek yuklanmagan
                  </p>
                )}
              </div>
            </div>
          </div>

          {order.status === "pending" && (
            <div className="mt-6 pt-6 border-t border-black/[0.06]">
              <label className="block">
                <span className="text-sm font-medium text-ink-800">Admin izohi</span>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={2}
                  placeholder="Ixtiyoriy"
                  className="mt-1.5 w-full rounded-xl border border-black/[0.1] bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-ink-900"
                />
              </label>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={approve}
                  disabled={pending}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 text-sm font-medium disabled:opacity-50"
                >
                  {pending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Tasdiqlash
                </button>
                <button
                  type="button"
                  onClick={reject}
                  disabled={pending}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 text-sm font-medium disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                  Rad etish
                </button>
              </div>
            </div>
          )}

          {order.admin_note && order.status !== "pending" && (
            <div className="mt-4 rounded-lg bg-white border border-black/[0.06] p-3 text-sm">
              <p className="text-ink-500 text-xs mb-1">Admin izohi:</p>
              <p className="text-ink-800 whitespace-pre-line">{order.admin_note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-500">{label}</dt>
      <dd className="text-ink-900 text-right">{value}</dd>
    </div>
  );
}
