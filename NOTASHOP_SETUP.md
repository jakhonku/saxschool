# NotaShop — ishga tushirish

Sayt SaxSchool dan **NotaShop** (musiqa notalar do'koni) ga aylantirildi.

## Asosiy o'zgarishlar
- Eski 30 kunlik kurs olib tashlandi
- Mahsulotlar (notalar / kitoblar / audio) sotuvchi do'kon
- Admin dashboard — mahsulot va buyurtmalarni boshqarish
- Click manual to'lov + Telegram orqali aloqa
- To'lov tasdiqlangach foydalanuvchi faylni yuklab oladi (signed URL)

## 1) Supabase'ni sozlash

### a) SQL'ni ishga tushiring
1. Supabase Dashboard → **SQL Editor** ga kiring
2. `supabase/schema.sql` faylidagi hamma kodni nusxalang va ishga tushiring
3. Bu quyidagilarni yaratadi:
   - jadvallar: `profiles`, `products`, `orders`, `settings`
   - storage buckets: `previews` (public), `files` (private), `proofs` (private)
   - RLS policies va admin trigger

### b) Admin akkauntini yaratish
Ro'yxatdan o'tish yopilganligi sababli, adminni Supabase Dashboard orqali qo'shish kerak:

1. **Supabase Dashboard** -> **Authentication** -> **Users** bo'limiga kiring.
2. **Add User** -> **Create new user** tugmasini bosing.
3. Ma'lumotlarni kiriting:
   - **Email:** `admin@notashop.uz` (xohlagan login, lekin oxirida `@notashop.uz` bo'lishi tavsiya etiladi)
   - **Password:** O'zingiz xohlagan parol.
   - **Auto-confirm user?** -> **YES** (belgilash shart!)
4. **Save** bosing.
5. Keyin **Table Editor** -> `profiles` jadvaliga kiring va o'sha userning `role` ustunini `admin` ga o'zgartiring.

### c) Kirish
Endi login sahifasida shunchaki `admin` deb yozib kirishingiz mumkin. Tizim uni avtomatik `admin@notashop.uz` deb qabul qiladi.

### c) To'lov karta raqamini o'zgartirish
SQL Editor'da:
```sql
update public.settings
set value = '{"card_number": "8600 1234 5678 9012", "holder": "FAMILIYA I.", "phone": "+998 90 000 00 00"}'::jsonb
where key = 'payment_card';

update public.settings
set value = '"https://t.me/SIZNING_USERNAME"'::jsonb
where key = 'admin_telegram';
```

## 2) Mahalliy ishga tushirish
```bash
npm install
npm run dev
```
Sayt `http://localhost:3000` da ochiladi.

## 3) Birinchi mahsulotni qo'shish
1. `http://localhost:3000/register` orqali ro'yxatdan o'ting (admin email bilan)
2. Sayt yuqorisida **Admin** tugmasi paydo bo'ladi
3. **Admin → Mahsulotlar → Yangi** bosing
4. Forma to'ldiring:
   - Sarlavha, narx (UZS)
   - Tur (Nota / Kitob / Audio)
   - **Ko'rinadigan rasm** — public ko'rinadi
   - **Fayl** — sotib olganlar uchun PDF yoki MP3
5. Saqlash

## 4) Foydalanuvchi tajribasi
1. `/shop` — barcha mahsulotlar
2. `/shop/[id]` — mahsulot detali, faqat preview rasm
3. **Yuklab olish** tugmasini bosadi → `/checkout/[id]` ga o'tadi
4. Karta raqamiga to'lov qiladi → chek rasmini yuklaydi → "To'lovni tasdiqlash"
5. Buyurtma `pending` holatida `/account` ga keladi

## 5) Admin: buyurtmani tasdiqlash
1. **Admin → Buyurtmalar** ga kiring
2. Pending buyurtmani oching, chek rasmini ko'ring
3. "Tasdiqlash" yoki "Rad etish"
4. Tasdiqlangach foydalanuvchi faylni darhol yuklab oladi

## Storage haqida
- **previews** (public) — preview rasmlar
- **files** (private) — asl fayllar, faqat tasdiqlangan buyurtma egasi 5 daqiqalik signed URL orqali
- **proofs** (private) — to'lov chek rasmlari, faqat admin

## Buckets qo'lda yaratish (agar SQL'dagi insert ishlamasa)
Supabase Dashboard → Storage → **New bucket**:
- `previews` — Public ✓
- `files` — Private
- `proofs` — Private

## Foydali jadvallar
- `products` — mahsulotlar
- `orders` — buyurtmalar (status: pending/paid/rejected/cancelled)
- `profiles` — foydalanuvchilar (role: user/admin)
- `settings` — sayt sozlamalari (karta raqami, telegram link)
