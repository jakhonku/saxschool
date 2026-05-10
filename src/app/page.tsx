import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Curriculum } from "@/components/landing/curriculum";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user ? { email: data.user.email! } : null;
  } catch {
    // Supabase ulanmagan bo'lsa, foydalanuvchisiz davom etadi
  }

  return (
    <>
      <Nav user={user} />
      <main>
        <Hero />
        <Features />
        <Curriculum />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
