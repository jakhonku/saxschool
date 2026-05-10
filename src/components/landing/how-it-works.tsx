import { ShoppingCart, CreditCard, Download } from "lucide-react";

const steps = [
  {
    Icon: ShoppingCart,
    title: "1. Tanlang",
    text: "Do'kondan kerakli notani, kitobni yoki audioni tanlang va batafsil sahifaga o'ting.",
  },
  {
    Icon: CreditCard,
    title: "2. To'lang",
    text: "Click karta orqali to'lov qiling yoki adminga to'g'ridan-to'g'ri yozing.",
  },
  {
    Icon: Download,
    title: "3. Yuklang",
    text: "To'lov tasdiqlangach, kabinetingizdan faylni darhol yuklab olishingiz mumkin.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-ink-900 text-ink-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            Qanday ishlaydi
          </h2>
          <p className="mt-2 text-ink-300">3 oddiy qadamda mahsulotni qo'lingizga oling</p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {steps.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500 text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-ink-300 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
