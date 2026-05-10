import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="text-center max-w-md">
        <div className="font-display text-9xl font-semibold text-ink-900 leading-none">
          404
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold text-ink-900">
          Sahifa topilmadi
        </h1>
        <p className="mt-3 text-ink-600">
          Qidirayotgan sahifangiz mavjud emas yoki ko'chirilgan.
        </p>
        <Link href="/" className="inline-block mt-8">
          <Button size="lg">Bosh sahifaga qaytish</Button>
        </Link>
      </div>
    </div>
  );
}
