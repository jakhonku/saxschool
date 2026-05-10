import { createClient } from "@/lib/supabase/server";
import { Mail, User, Calendar, CreditCard } from "lucide-react";

export default async function AccountPage() {
  let email = "";
  let fullName = "";
  let createdAt = "";
  let hasAccess = false;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      email = data.user.email ?? "";
      fullName = (data.user.user_metadata?.full_name as string) ?? "";
      createdAt = new Date(data.user.created_at).toLocaleDateString("uz-UZ");

      const { data: profile } = await supabase
        .from("profiles")
        .select("has_access")
        .eq("id", data.user.id)
        .single();
      hasAccess = profile?.has_access ?? false;
    }
  } catch {}

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
        Profil
      </h1>
      <p className="mt-1 text-midnight-300">Hisob ma'lumotlari va sozlamalar</p>

      <div className="mt-8 rounded-2xl glass p-6 md:p-8">
        <div className="flex items-center gap-4 pb-6 border-b border-brass-400/10">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brass-shine text-midnight-950 font-bold text-2xl">
            {(fullName || email).charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">{fullName || "O'quvchi"}</h2>
            <p className="text-sm text-midnight-300">{email}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Row icon={<User className="h-4 w-4" />} label="To'liq ism" value={fullName || "—"} />
          <Row icon={<Mail className="h-4 w-4" />} label="Email" value={email} />
          <Row icon={<Calendar className="h-4 w-4" />} label="Ro'yxatdan o'tgan sana" value={createdAt} />
          <Row
            icon={<CreditCard className="h-4 w-4" />}
            label="Tarif"
            value={hasAccess ? "Premium · faol" : "Bepul"}
            badge={hasAccess ? "active" : undefined}
          />
        </div>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: "active";
}) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-brass-400/10 text-brass-300 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-midnight-300">{label}</div>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
      {badge === "active" && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-brass-400 bg-brass-400/10 px-2 py-0.5 rounded-full">
          Faol
        </span>
      )}
    </div>
  );
}
