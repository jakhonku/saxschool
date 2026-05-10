import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { Categories } from "@/components/landing/categories";
import { FeaturedProducts } from "@/components/landing/featured-products";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTA } from "@/components/landing/cta";
import { getCurrentUser, isAdmin } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();
  const admin = await isAdmin();

  return (
    <>
      <Nav
        user={user ? { email: user.email! } : null}
        isAdmin={admin}
      />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
