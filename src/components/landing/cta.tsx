import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl brass-border glass-strong p-12 md:p-20 text-center">
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-brass-500/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-brass-700/30 blur-3xl" />

          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              30 kundan keyin{" "}
              <span className="brass-text">siz ham</span> chaolasiz
            </h2>
            <p className="mt-4 text-midnight-200 text-lg max-w-2xl mx-auto">
              Hech qachon kech emas. Bugun boshlang, bir oydan keyin sevimli kuyingizni chalib yuring.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link href="/register">
                <Button size="lg">Kursni boshlash</Button>
              </Link>
              <Link href="/#curriculum">
                <Button variant="outline" size="lg">
                  Dasturni ko'rish
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
