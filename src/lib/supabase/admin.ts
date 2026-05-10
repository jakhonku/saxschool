import { createClient } from "@supabase/supabase-js";

// Service-role klient — faqat server-side admin amallar uchun.
// HEch qachon brauzerga eksport qilmang.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
