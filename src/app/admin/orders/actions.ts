"use server";

import { revalidatePath } from "next/cache";
import { isAdmin, getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function approveOrderAction(id: string, note: string | null) {
  if (!(await isAdmin())) return { error: "Ruxsat etilmagan" };
  const user = await getCurrentUser();
  const sb = createAdminClient();

  const { error } = await sb
    .from("orders")
    .update({
      status: "paid",
      admin_note: note,
      approved_by: user?.id ?? null,
      approved_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  revalidatePath("/account");
  return { ok: true };
}

export async function rejectOrderAction(id: string, note: string | null) {
  if (!(await isAdmin())) return { error: "Ruxsat etilmagan" };
  const sb = createAdminClient();
  const { error } = await sb
    .from("orders")
    .update({ status: "rejected", admin_note: note })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/orders");
  revalidatePath("/account");
  return { ok: true };
}

export async function getProofSignedUrlAction(path: string) {
  if (!(await isAdmin())) return { error: "Ruxsat etilmagan" };
  const sb = createAdminClient();
  const { data, error } = await sb.storage
    .from("proofs")
    .createSignedUrl(path, 60 * 10); // 10 daqiqa
  if (error) return { error: error.message };
  return { url: data.signedUrl };
}
