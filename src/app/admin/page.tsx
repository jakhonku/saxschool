import Link from "next/link";
import { Package, ShoppingBag, Clock, DollarSign, ArrowRight } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const sb = createAdminClient();

  const [
    { count: productsCount },
    { count: ordersCount },
    { count: pendingCount },
    { data: paidOrders },
    { data: recentOrders },
  ] = await Promise.all([
    sb.from("products").select("id", { count: "exact", head: true }),
    sb.from("orders").select("id", { count: "exact", head: true }),
    sb.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
    sb.from("orders").select("amount").eq("status", "paid"),
    sb
      .from("orders")
      .select("id, status, amount, created_at, products(title), profiles(email)")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const totalRevenue =
    paidOrders?.reduce((sum, o) => sum + Number(o.amount || 0), 0) ?? 0;

  const stats = [
    {
      label: "Mahsulotlar",
      value: productsCount ?? 0,
      Icon: Package,
      href: "/admin/products",
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Buyurtmalar",
      value: ordersCount ?? 0,
      Icon: ShoppingBag,
      href: "/admin/orders",
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Kutilayotgan",
      value: pendingCount ?? 0,
      Icon: Clock,
      href: "/admin/orders?status=pending",
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Daromad",
      value: formatPrice(totalRevenue),
      Icon: DollarSign,
      href: "/admin/orders?status=paid",
      color: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            Boshqaruv paneli
          </h1>
          <p className="mt-1 text-ink-600 text-sm">Sayt umumiy holati</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-ink-50 hover:bg-ink-800 px-5 py-2.5 text-sm font-medium transition"
        >
          + Yangi mahsulot
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl bg-white border border-black/[0.06] p-5 hover:shadow-md transition"
          >
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}>
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-2xl font-semibold text-ink-900">{value}</p>
            <p className="mt-0.5 text-sm text-ink-500">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-white border border-black/[0.06] overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-black/[0.06]">
          <h2 className="font-semibold text-ink-900">Oxirgi buyurtmalar</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-ink-600 hover:text-ink-900 inline-flex items-center gap-1"
          >
            Hammasi
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-500">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Mahsulot</th>
              <th className="text-left px-5 py-3 font-medium">Foydalanuvchi</th>
              <th className="text-left px-5 py-3 font-medium">Summa</th>
              <th className="text-left px-5 py-3 font-medium">Holat</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders?.length ? (
              recentOrders.map((o) => {
                const product = Array.isArray(o.products)
                  ? (o.products[0] as { title?: string } | undefined)
                  : (o.products as { title?: string } | null);
                const profile = Array.isArray(o.profiles)
                  ? (o.profiles[0] as { email?: string } | undefined)
                  : (o.profiles as { email?: string } | null);
                return (
                  <tr key={o.id} className="border-t border-black/[0.06]">
                    <td className="px-5 py-3 font-medium text-ink-900">
                      {product?.title ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-ink-700">
                      {profile?.email ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-ink-900">
                      {formatPrice(Number(o.amount))}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={o.status as string} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-ink-500">
                  Hali buyurtmalar yo'q
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    paid: "bg-emerald-50 text-emerald-700",
    rejected: "bg-red-50 text-red-700",
    cancelled: "bg-ink-100 text-ink-700",
  };
  const labels: Record<string, string> = {
    pending: "Kutilmoqda",
    paid: "To'langan",
    rejected: "Rad etilgan",
    cancelled: "Bekor qilingan",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status] ?? "bg-ink-100"}`}
    >
      {labels[status] ?? status}
    </span>
  );
}
