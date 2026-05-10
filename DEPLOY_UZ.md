# 🚀 GitHub + Vercel Deploy Yo'riqnomasi (10 daqiqa)

## ✅ Hozirgi holat

- Git repo yaratildi (1 ta commit, 48 ta fayl)
- `.env.local` xavfsiz (gitignore'da)
- Supabase ulandi va tekshirildi
- Sayt deploy uchun tayyor

---

## 1️⃣ GitHub'ga push qilish

### A — GitHub'da repo yarating

1. [github.com/new](https://github.com/new) saytini oching
2. **Repository name:** `saxschool` (yoki istalgan nom)
3. **Public** yoki **Private** — xohishingizcha
4. ⚠️ **MUHIM:** "Add a README", "Add .gitignore", "Choose a license" — **HECH BIRINI** belgilamang (bo'sh repo kerak)
5. **Create repository** tugmasini bosing

### B — Terminalda push qiling

GitHub'da yaratganingizdan keyin chiqqan ko'rsatmalardan **`...or push an existing repository`** bo'limidagi buyruqlarni ishlatamiz:

```powershell
cd C:\Users\user\Desktop\joxa
git remote add origin https://github.com/SIZNING-USERNAME/saxschool.git
git push -u origin main
```

> `SIZNING-USERNAME` o'rniga GitHub username'ingizni yozing.

GitHub paroli o'rniga **Personal Access Token** so'rashi mumkin. Yaratish: [github.com/settings/tokens](https://github.com/settings/tokens) → **Generate new token (classic)** → `repo` scope.

---

## 2️⃣ Vercel'ga deploy qilish

### A — Vercel hisobi

1. [vercel.com/signup](https://vercel.com/signup) → **Continue with GitHub**
2. GitHub'ga ruxsat bering

### B — Loyihani import qilish

1. Vercel Dashboard → **Add New...** → **Project**
2. GitHub repolar ro'yxatidan `saxschool` ni tanlang → **Import**
3. **Framework Preset:** Next.js (avtomatik aniqlanadi)
4. **Root Directory:** `./` (o'zgartirmang)

### C — Environment Variables qo'shish ⚠️ MUHIM

Deploy tugmasini bosishdan oldin **Environment Variables** bo'limini oching va shularni qo'shing:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://SIZNING_PROYEKT_ID.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `SIZNING_ANON_KALITINGIZ` |
| `SUPABASE_SERVICE_ROLE_KEY` | `SIZNING_SERVICE_ROLE_KALITINGIZ` |
| `NEXT_PUBLIC_SITE_URL` | `https://saxschool.vercel.app` _(deploy bo'lgach yangilanadi)_ |

Har birini qo'shish: **Add Another** → Name va Value yozing → **Add**.

### D — Deploy 🎯

**Deploy** tugmasini bosing → 2-3 daqiqada tayyor!

Vercel sizga URL beradi: `https://saxschool-xyz.vercel.app`

---

## 3️⃣ Supabase'da Site URL yangilash

Vercel URL'ini olganingizdan keyin:

1. Supabase Dashboard → **Authentication** → **URL Configuration**
2. **Site URL:** `https://saxschool.vercel.app` (yoki o'zingizning Vercel URL)
3. **Redirect URLs:** qo'shing:
   ```
   https://saxschool.vercel.app/**
   https://saxschool.vercel.app/auth/callback
   ```
4. **Save**

Bu kerak — aks holda email tasdiqlash linki localhost'ga olib boradi.

### Vercel'da ham yangilang

Vercel → Project → **Settings** → **Environment Variables** → `NEXT_PUBLIC_SITE_URL` → haqiqiy domen bilan yangilang → **Redeploy**.

---

## 4️⃣ Custom domain (ixtiyoriy)

Agar `.uz` yoki boshqa domen ulamoqchi bo'lsangiz:

1. Vercel → Project → **Settings** → **Domains**
2. **Add** → domeningizni yozing (masalan, `saxschool.uz`)
3. Vercel ko'rsatgan DNS yozuvlarni domain provayderingizga qo'shing
4. ~5-30 daqiqa kutib turing

Supabase Site URL'ini yana yangi domen bilan yangilang.

---

## 🔄 Keyingi yangilanishlar

Kod o'zgartirgan har safar:

```powershell
cd C:\Users\user\Desktop\joxa
git add .
git commit -m "ozgartirish tafsiloti"
git push
```

Vercel avtomatik 1-2 daqiqada yangi deploy qiladi.

---

## ⚠️ Xavfsizlik tekshiruvi

- ✅ `.env.local` GitHub'ga yuklanmagan (`.gitignore`'da)
- ✅ `service_role` kalit faqat Vercel server ortida
- ❌ **HECH QACHON** `service_role` kalitni `NEXT_PUBLIC_*` o'zgaruvchiga qo'ymang — bu uni brauzerga oshkor qiladi

---

## 🆘 Xato chiqsa

| Muammo | Yechim |
|--------|--------|
| `Module not found` | Vercel'da: Settings → General → Build & Development → Build Command: `npm install && npm run build` |
| Auth ishlamayapti | Supabase'da Site URL va Redirect URLs to'g'rilangan? |
| Database ulanmaydi | Vercel env vars to'g'ri qo'yilganligini tekshiring → Redeploy |
| 500 xato | Vercel → Deployments → so'nggi deploy → **Logs** ni ko'ring |

Omad! 🎷
