"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function deleteProductAction(id: string) {
  if (!(await isAdmin())) return { error: "Ruxsat etilmagan" };

  const sb = createAdminClient();
  const { error } = await sb.from("products").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { ok: true };
}
