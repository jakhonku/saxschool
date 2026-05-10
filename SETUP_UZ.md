# Tezkor ishga tushirish (O'zbekcha)

Salom! Bu sayt 30 kunlik saksafon kursini sotish uchun tayyor. Quyidagi qadamlarni bajarib, saytni 15 daqiqada ishga tushirasiz.

## 1-qadam: Kerakli narsalar

- [Node.js 20+](https://nodejs.org) o'rnating
- [Supabase](https://supabase.com) hisob (bepul)
- Visual Studio Code yoki istalgan kod muharriri

## 2-qadam: Loyihani ishga tushirish

Terminal ochib (PowerShell):

```powershell
cd C:\Users\user\Desktop\joxa
npm install
```

Bu buyruq barcha kutubxonalarni o'rnatadi (1-3 daqiqa).

## 3-qadam: Supabase

1. [supabase.com](https://supabase.com)'ga kiring
2. **New project** tugmasini bosing
3. Loyiha nomi: `saxschool`, parol o'rnating va region tanlang (Frankfurt yaqin)
4. Loyiha tayyor bo'lgach **SQL Editor**'ga o'ting
5. `supabase/schema.sql` faylni oching va butunini ko'chirib qo'ying
6. **Run** tugmasini bosing → 30 ta dars seed bo'ladi

## 4-qadam: Storage (videolar va PDF uchun)

Supabase Dashboard → **Storage** → **New bucket**:

- Bucket nomi: `videos`, Public emas
- Yana bittasini yarating: `notes`, Public emas

## 5-qadam: API kalitlarini olish

Supabase Dashboard → **Settings** → **API**:

- **Project URL** ni nusxa oling (`https://xxx.supabase.co`)
- **anon public** kalitni nusxa oling
- **service_role** kalitni nusxa oling

## 6-qadam: .env.local fayl

`C:\Users\user\Desktop\joxa\.env.local.example` ni `.env.local` ga nusxalang va to'ldiring:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 7-qadam: Saytni ishga tushirish

```powershell
npm run dev
```

[http://localhost:3000](http://localhost:3000) ni brauzerda oching!

## Video va notalarni yuklash

### Variant A: Supabase Dashboard orqali

1. **Storage** → `videos` bucket
2. **Upload file** → `day-01-theory.mp4`, `day-01-practice.mp4` va h.k.
3. **Storage** → `notes` bucket → `day-01.pdf`, `day-02.pdf` ...
4. Har bir fayl uchun **Get URL** ni nusxa oling

### Variant B: SQL orqali yangilash

Supabase **SQL Editor**'da:

```sql
update lessons
set
  theory_video_url = 'https://xxx.supabase.co/storage/v1/object/public/videos/day-01-theory.mp4',
  practice_video_url = 'https://xxx.supabase.co/storage/v1/object/public/videos/day-01-practice.mp4',
  pdf_notes_url = 'https://xxx.supabase.co/storage/v1/object/public/notes/day-01.pdf'
where day = 1;
```

Har 30 ta dars uchun shuni takrorlang.

## Foydalanuvchini Premium qilish

Test uchun yoki to'lovni qo'lda tasdiqlash:

```sql
update profiles set has_access = true
where id = (select id from auth.users where email = 'foydalanuvchi@email.com');
```

## Saytni internetga chiqarish (Vercel)

1. [vercel.com](https://vercel.com)'ga kiring
2. **Add New** → **Project** → GitHub repongizni tanlang
3. Environment Variables qo'shing (yuqoridagi `.env.local` mazmuni)
4. **Deploy** → 2 daqiqada saytingiz tayyor!

Yoki terminal orqali:

```powershell
npm i -g vercel
vercel
```

## Yordam kerakmi?

Quyidagi narsalarni o'zgartirish mumkin:

| Nima o'zgartirish | Qaysi fayl |
|-------------------|-----------|
| Sayt nomi va logo | `src/components/layout/nav.tsx` |
| Kurs narxi | `src/lib/course.ts` (`COURSE_PRICE`) |
| Bosh sahifa matni | `src/components/landing/*.tsx` |
| Ranglar (oltin/qora) | `tailwind.config.ts` |
| Dars ro'yxati | `supabase/schema.sql` (seed qismi) |
| FAQ savollari | `src/components/landing/faq.tsx` |
| Aloqa ma'lumotlari | `src/components/layout/footer.tsx` |

## To'lovni ishga tushirish (Click, Payme)

`src/app/api/checkout/route.ts` faylida tayyor namuna bor. Click yoki Payme'ga ariza topshirib, merchant'ni oling, keyin TODO joylariga API kalitlarini qo'ying.

---

Omad! 🎷
