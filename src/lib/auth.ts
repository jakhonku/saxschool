import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

export async function getCurrentProfile() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("profiles")
      .select("id, email, full_name, avatar_url, role, created_at")
      .eq("id", user.id)
      .maybeSingle();

    return data;
  } catch {
    return null;
  }
}

export async function isAdmin() {
  const profile = await getCurrentProfile();
  return profile?.role === "admin";
}
