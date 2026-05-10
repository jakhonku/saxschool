import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const { orderId } = await params;
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    );
  }

  const sb = createAdminClient();
  const { data: order } = await sb
    .from("orders")
    .select("id, user_id, status, product_id, products(id, file_url, title, downloads_count)")
    .eq("id", orderId)
    .maybeSingle();

  if (!order || order.user_id !== user.id) {
    return new NextResponse("Topilmadi", { status: 404 });
  }
  if (order.status !== "paid") {
    return new NextResponse("To'lov tasdiqlanmagan", { status: 403 });
  }

  const product = Array.isArray(order.products)
    ? order.products[0]
    : (order.products as { id: string; file_url: string | null; title: string; downloads_count: number } | null);

  const filePath = product?.file_url;
  if (!filePath) {
    return new NextResponse("Fayl yuklanmagan", { status: 404 });
  }

  const { data, error } = await sb.storage
    .from("files")
    .createSignedUrl(filePath, 60 * 5, { download: product?.title ?? true });

  if (error || !data) {
    return new NextResponse("Yuklab olishda xato", { status: 500 });
  }

  // Yuklab olish hisobini oshiramiz (best-effort)
  if (product?.id) {
    await sb
      .from("products")
      .update({ downloads_count: (product.downloads_count ?? 0) + 1 })
      .eq("id", product.id);
  }

  return NextResponse.redirect(data.signedUrl);
}
