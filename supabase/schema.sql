-- =========================================================
-- SaxSchool — Supabase schema
-- =========================================================
-- Run inside Supabase SQL editor.

-- Foydalanuvchi profillari
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  has_access boolean default false,        -- kursga to'lov qilingan / ochiq
  created_at timestamptz default now()
);

-- Kurs darslari (30 ta dars)
create table if not exists public.lessons (
  id serial primary key,
  day int not null unique,                 -- 1..30
  title text not null,
  description text,
  theory_video_url text,                   -- Supabase Storage path / signed URL
  practice_video_url text,
  pdf_notes_url text,                      -- nota PDF
  theory_minutes int default 60,
  practice_minutes int default 120,
  preview boolean default false,           -- bepul preview bo'lsami
  created_at timestamptz default now()
);

-- Foydalanuvchining har bir darsdagi progressi
create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id int not null references public.lessons(id) on delete cascade,
  watched_seconds int default 0,
  completed boolean default false,
  completed_at timestamptz,
  unique (user_id, lesson_id)
);

-- To'lovlar tarixi
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(10,2) not null,
  currency text default 'UZS',
  status text default 'pending',           -- pending | succeeded | failed
  provider text,                           -- stripe | payme | click | manual
  provider_ref text,
  created_at timestamptz default now()
);

-- =========================================================
-- Row Level Security
-- =========================================================
alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.progress enable row level security;
alter table public.payments enable row level security;

-- profiles
create policy "profiles: o'zini o'qiy oladi"
  on public.profiles for select using (auth.uid() = id);
create policy "profiles: o'zini yangilay oladi"
  on public.profiles for update using (auth.uid() = id);

-- lessons (har kim metadatani ko'radi, video URL'larini faqat to'lagan ko'radi — app darajasida)
create policy "lessons: hamma o'qiy oladi"
  on public.lessons for select using (true);

-- progress
create policy "progress: faqat o'ziniki"
  on public.progress for select using (auth.uid() = user_id);
create policy "progress: o'zi yozadi"
  on public.progress for insert with check (auth.uid() = user_id);
create policy "progress: o'zi yangilaydi"
  on public.progress for update using (auth.uid() = user_id);

-- payments
create policy "payments: faqat o'ziniki"
  on public.payments for select using (auth.uid() = user_id);

-- =========================================================
-- Auto profile yaratish trigger
-- =========================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- Seed: 30 kunlik dars rejasi
-- =========================================================
insert into public.lessons (day, title, description, preview) values
  (1,  'Tanishuv: Saksafon turlari va tuzilishi', 'Alto, Tenor, Soprano va Baritone — qaysi biridan boshlash kerak.', true),
  (2,  'Mundshtuk va qamish (reed) sozlamalari', 'To''g''ri o''rnatish, qamish tanlash va parvarish.', false),
  (3,  'To''g''ri pozitsiya va nafas olish texnikasi', 'Diafragma nafasi va tana holati.', false),
  (4,  'Birinchi tovush: Embouchure', 'Lab pozitsiyasi va sof tovush hosil qilish.', false),
  (5,  'Qo''l holati va barmoq joylashuvi', 'Klapanlar bilan tanishuv.', false),
  (6,  'Birinchi notalar: Si, La, Sol', 'Eng oddiy notalar va mashq.', false),
  (7,  'Nota o''qish asoslari', 'Skripka kaliti, ritm va o''lchov.', false),
  (8,  'Do major gammasi', 'Birinchi gamma — har kuni mashq.', false),
  (9,  'Stakkato va legato', 'Tovushlar orasidagi bog''lanish.', false),
  (10, 'Birinchi kuy: "Mary Had a Little Lamb"', 'Oddiy melodiya bilan amaliyot.', false),
  (11, 'Ritm va metronom bilan ishlash', 'Tempo, BPM va doimiy mashq.', false),
  (12, 'Sol major gammasi', 'Yangi gamma va arpedjio.', false),
  (13, 'Dinamika: piano va forte', 'Tovushni boshqarish.', false),
  (14, 'Vibrato texnikasi (kirish)', 'Diafragma va lab vibratosi.', false),
  (15, 'Klassik kuy: "Ode to Joy"', 'Bethoven asari moslashgan.', false),
  (16, 'Fa major va Re major gammalari', 'Yangi tonalliklar.', false),
  (17, 'Blues skala asoslari', 'Jazz va blues uchun zamin.', false),
  (18, 'Birinchi improvizatsiya', 'Pentatonika asosida solo.', false),
  (19, 'Swing ritmi', 'Jazz ritmining asosi.', false),
  (20, 'Jazz standart: "Autumn Leaves" (tema)', 'Mashhur standart bilan tanishuv.', false),
  (21, 'Akkord progressiyalari va saksafon', 'ii-V-I bog''lamasi.', false),
  (22, 'Bebop frazalari', 'Klassik jazz tilini o''rganish.', false),
  (23, 'Ballada o''ynash: tovush rangi', 'Sekin kuylarda ifoda.', false),
  (24, 'Funk va R&B uslubi', 'Zamonaviy janrlar.', false),
  (25, 'Yuqori registr (altissimo) — kirish', 'Yuqori notalarga chiqish.', false),
  (26, 'Soundcheck va mikrofon bilan ishlash', 'Sahna va studiya uchun.', false),
  (27, 'Auditsiya uchun tayyorgarlik', 'Asar tanlash va tayyorlanish.', false),
  (28, 'Birgalikda chalish (ansambl)', 'Boshqa cholg''ular bilan.', false),
  (29, 'Yakuniy asar — repetitsiya', 'O''zlashtirgan barcha texnikalarni birlashtirish.', false),
  (30, 'Yakuniy konsert va sertifikat', 'Yakuniy chiqish va keyingi qadamlar.', false)
on conflict (day) do nothing;
