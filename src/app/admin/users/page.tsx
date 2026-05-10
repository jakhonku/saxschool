import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminUsersPage() {
  const sb = createAdminClient();
  const { data: users } = await sb
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900">
        Foydalanuvchilar
      </h1>
      <p className="mt-1 text-sm text-ink-600">Jami: {users?.length ?? 0} ta</p>

      <div className="mt-8 rounded-2xl bg-white border border-black/[0.06] overflow-hidden">
        {!users || users.length === 0 ? (
          <div className="py-20 text-center text-ink-500">Foydalanuvchilar yo'q</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-ink-500">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Email</th>
                <th className="text-left px-5 py-3 font-medium">Ism</th>
                <th className="text-left px-5 py-3 font-medium">Rol</th>
                <th className="text-left px-5 py-3 font-medium">Ro'yxatdan o'tgan</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-black/[0.06]">
                  <td className="px-5 py-3 font-medium text-ink-900">{u.email}</td>
                  <td className="px-5 py-3 text-ink-700">{u.full_name ?? "—"}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        u.role === "admin"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-ink-100 text-ink-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-700">
                    {new Date(u.created_at).toLocaleDateString("uz-UZ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
