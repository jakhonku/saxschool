import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice, cn } from "@/lib/utils";
import { OrderRow } from "./order-row";

const STATUS_TABS = [
  { value: "all", label: "Hammasi" },
  { value: "pending", label: "Kutilmoqda" },
  { value: "paid", label: "To'langan" },
  { value: "rejected", label: "Rad etilgan" },
];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "all";

  const sb = createAdminClient();
  let query = sb
    .from("orders")
    .select(
      "id, status, amount, currency, payment_method, payment_proof_url, user_note, admin_note, created_at, products(id, title, type), profiles(id, email, full_name)",
    )
    .order("created_at", { ascending: false });

  if (status !== "all") query = query.eq("status", status);

  const { data: orders } = await query;

  return (
    <div>
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">
          Buyurtmalar
        </h1>
        <p className="mt-1 text-sm text-ink-600">Jami: {orders?.length ?? 0} ta</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {STATUS_TABS.map((t) => (
          <Link
            key={t.value}
            href={t.value === "all" ? "/admin/orders" : `/admin/orders?status=${t.value}`}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm transition",
              status === t.value
                ? "bg-ink-900 text-ink-50"
                : "bg-white border border-black/[0.08] text-ink-700 hover:border-ink-900/40",
            )}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {!orders || orders.length === 0 ? (
          <div className="rounded-2xl bg-white border border-dashed border-black/[0.12] py-16 text-center text-ink-500">
            Buyurtmalar yo'q
          </div>
        ) : (
          orders.map((o) => {
            const product = Array.isArray(o.products)
              ? (o.products[0] as { id: string; title: string; type: string } | undefined)
              : (o.products as { id: string; title: string; type: string } | null);
            const profile = Array.isArray(o.profiles)
              ? (o.profiles[0] as { id: string; email: string; full_name: string } | undefined)
              : (o.profiles as { id: string; email: string; full_name: string } | null);

            return (
              <OrderRow
                key={o.id}
                order={{
                  id: o.id,
                  status: o.status as string,
                  amount: Number(o.amount),
                  currency: o.currency as string,
                  payment_method: o.payment_method as string,
                  payment_proof_url: o.payment_proof_url as string | null,
                  user_note: o.user_note as string | null,
                  admin_note: o.admin_note as string | null,
                  created_at: o.created_at as string,
                  product: product
                    ? { id: product.id, title: product.title, type: product.type }
                    : null,
                  profile: profile
                    ? { email: profile.email, full_name: profile.full_name }
                    : null,
                }}
                priceLabel={formatPrice(Number(o.amount), o.currency as string)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
