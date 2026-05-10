# SaxSchool — Saksafon Online Akademiyasi

30 kunlik to'liq saksafon kursini sotuvchi zamonaviy web-platforma. Next.js 16 + Supabase + Tailwind asosida qurilgan.

## Xususiyatlari

- **Saksafon-jazz dizayni** — oltin (brass) va tungi (midnight) ranglar, animatsiyalar
- **30 kunlik kurs strukturasi** — 4 ta haftaga bo'lingan, har kuni 1 soat nazariya + 2 soat amaliyot
- **HD video pleyer** — maxsus, brending qilingan player (play/pause/seek/fullscreen)
- **PDF nota viewer** — har bir dars uchun yuklab olinadigan notalar
- **Foydalanuvchi auth** — Supabase Auth (email/parol)
- **Progress tracking** — har bir o'quvchining individual progressi saqlanadi
- **To'lov tizimi** — Click, Payme, Bank kartasi, Stripe (interfeys tayyor, API'ni ulash kifoya)
- **Responsive** — telefon, planshet, kompyuter
- **Dashboard** — o'quvchi kabineti, statistika, davom etish
- **SEO-tayyor** — metadata, Open Graph

## Texnologiyalar

- **Next.js 16** (App Router, Server Components)
- **TypeScript** strict mode
- **Tailwind CSS 3** + maxsus saksafon palitra
- **Framer Motion** — animatsiyalar
- **Supabase** — Auth, Database (Postgres), Storage (video va PDF)
- **Lucide React** — ikonkalar
- **Vercel** — deploy uchun (vercel.ts konfiguratsiyasi tayyor)

## O'rnatish

### 1. Loyiha klonlash va dependencies

```bash
npm install
```

### 2. Supabase loyihasini yarating

[https://supabase.com](https://supabase.com) saytida yangi loyiha yarating. Keyin SQL editorga `supabase/schema.sql` fayl mazmunini ko'chirib qo'ying va ishga tushiring. U:

- `profiles`, `lessons`, `progress`, `payments` jadvallarini yaratadi
- Row Level Security (RLS) yoqadi
- 30 ta dars uchun seed ma'lumotlarni kiritadi
- Auto profile yaratuvchi trigger qo'shadi

### 3. Storage bucket yarating

Supabase Dashboard'da Storage → Create bucket:

- `videos` (private) — dars videolari uchun
- `notes` (private) — PDF notalar uchun

### 4. Environment variables

`.env.local.example` faylni `.env.local` deb nusxalang va to'ldiring:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Ushbu qiymatlar Supabase Dashboard → Settings → API'da bor.

### 5. Dev serverni ishga tushiring

```bash
npm run dev
```

Saytni [http://localhost:3000](http://localhost:3000) da ochib ko'ring.

## Video va PDF darslarni yuklash

1. Supabase Dashboard → Storage → `videos` bucket'ni oching
2. Har bir dars uchun video yuklang, masalan: `day-01-theory.mp4`, `day-01-practice.mp4`
3. Public URL oling (yoki signed URL yarating)
4. `lessons` jadvalidagi tegishli yozuvni yangilang:

```sql
update lessons
set theory_video_url = 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/videos/day-01-theory.mp4',
    practice_video_url = 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/videos/day-01-practice.mp4',
    pdf_notes_url = 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/notes/day-01.pdf'
where day = 1;
```

## To'lov tizimini ulash

`src/app/api/checkout/route.ts` faylida tayyor stub bor. Quyidagi provayderlardan birini ulang:

### Click (O'zbekiston)
- [https://docs.click.uz](https://docs.click.uz)
- Merchant ID, Service ID kerak
- Shopping API yoki Click Pass

### Payme
- [https://developer.help.paycom.uz](https://developer.help.paycom.uz)
- Merchant API + Subscribe API

### Stripe (xalqaro)
```ts
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const session = await stripe.checkout.sessions.create({ ... });
```

To'lov muvaffaqiyatli o'tgach, `profiles.has_access` ni `true` qiling.

## Deploy (Vercel)

```bash
npm i -g vercel
vercel
```

`vercel.ts` konfiguratsiyasi tayyor. Environment variables'ni Vercel Dashboard'da qo'shing.

## Loyiha strukturasi

```
src/
├── app/
│   ├── (auth)/              # login, register, forgot-password
│   ├── api/checkout/        # to'lov endpointi
│   ├── auth/                # OAuth callback va signout
│   ├── checkout/            # to'lov sahifasi
│   ├── dashboard/           # foydalanuvchi kabineti
│   ├── lesson/[day]/        # individual dars sahifasi
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx             # bosh sahifa (landing)
├── components/
│   ├── landing/             # hero, features, pricing, FAQ ...
│   ├── layout/              # nav, footer
│   ├── lesson/              # video-player, pdf-viewer
│   └── ui/                  # button
├── lib/
│   ├── supabase/            # client, server, middleware
│   ├── course.ts            # 30 ta dars ro'yxati va narx
│   └── utils.ts
└── middleware.ts            # himoyalangan yo'llar
supabase/
└── schema.sql               # ma'lumotlar bazasi sxemasi + seed
```

## Sahifalar ro'yxati

| URL | Tavsif |
|-----|--------|
| `/` | Landing page (hero, kurs, narx, FAQ) |
| `/login` | Kirish |
| `/register` | Ro'yxatdan o'tish |
| `/forgot-password` | Parol tiklash |
| `/dashboard` | Kabinet — barcha darslar va progress |
| `/dashboard/account` | Profil sozlamalari |
| `/lesson/[1-30]` | Individual dars (video + PDF + amaliyot) |
| `/checkout` | To'lov sahifasi |

## Keyingi qadamlar

- [ ] Click yoki Payme webhook ulash (`/api/checkout/webhook`)
- [ ] Email yuborish (Resend yoki Supabase Email)
- [ ] Sertifikat PDF generatsiyasi (kursni tugatgach)
- [ ] Telegram bot (yopiq jamoa uchun)
- [ ] Yutuqlar (achievements) tizimi
- [ ] Admin panel (darslar va o'quvchilarni boshqarish)

## Litsenziya

Shaxsiy/tijorat foydalanish uchun siz uchun yaratilgan.
