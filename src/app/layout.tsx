import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SaxSchool — 30 kunda saksafon chalishni o'rganing",
  description:
    "Online saksafon kursi: 30 kun davomida har kuni 1 soat nazariy, 2 soat amaliy mashg'ulot. HD video darslar va PDF notalar.",
  keywords: [
    "saksafon",
    "saxophone",
    "online kurs",
    "musiqa",
    "jazz",
    "nota o'qish",
  ],
  openGraph: {
    title: "SaxSchool — Saksafon online akademiyasi",
    description: "30 kunlik mukammal saksafon kursi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-jazz-gradient font-sans">
        {children}
      </body>
    </html>
  );
}
