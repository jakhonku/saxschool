import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { COURSE_PRICE } from "@/lib/course";

// To'lov provayderlari (Click, Payme, Stripe) integratsiyasi shu joyda qilinadi.
// Hozir esa to'lovni qo'lda tasdiqlash uchun "pending" yozuvi yaratiladi.

export async function POST(request: Request) {
  try {
    const { method } = await request.json();
    const supabase = await createClient();
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) {
      return NextResponse.json({ error: "Avtorizatsiya talab qilinadi" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("payments")
      .insert({
        user_id: u.user.id,
        amount: COURSE_PRICE,
        currency: "UZS",
        status: "pending",
        provider: method,
      })
      .select()
      .single();

    if (error) throw error;

    // Bu joyda haqiqiy to'lov provayderiga redirect URL yaratiladi:
    // - Click: https://my.click.uz/services/pay
    // - Payme: https://checkout.paycom.uz
    // - Stripe: stripe.checkout.sessions.create()

    return NextResponse.json({
      payment: data,
      redirect_url: `/checkout/processing?id=${data.id}`,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server xatosi" },
      { status: 500 },
    );
  }
}
