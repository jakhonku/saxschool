-- =========================================================
-- NotaShop — Supabase schema (musiqa notalar do'koni)
-- =========================================================
-- Supabase SQL editor'da ishga tushiring.
-- Avval o'zining ESKI lessons/progress jadvallari bo'lsa, ularni o'chiradi.

-- ESKI jadvallarni tozalash (ixtiyoriy — birinchi marta ishlatsangiz xato bermaydi)
drop table if exists public.progress cascade;
drop table if exists public.lessons cascade;
drop table if exists public.payments cascade;

-- =========================================================
-- Foydalanuvchi profillari (admin role bilan)
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);

-- =========================================================
-- Mahsulotlar — notalar, kitoblar, audio
-- =========================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text,
  type text not null check (type in ('note', 'book', 'audio')),
  category text,                              -- 'jazz', 'klassik', 'pop' va h.k.
  composer text,                              -- bastakor
  difficulty text,                            -- 'oson', 'o''rta', 'qiyin'
  price numeric(12,2) not null default 0,
  currency text default 'UZS',
  preview_image_url text,                     -- ko'rinadigan rasm (Supabase Storage)
  preview_audio_url text,                     -- ixtiyoriy: qisqa preview audio
  file_url text,                              -- asl fayl (PDF/MP3) — sotib olganlar uchun
  pages int,                                  -- nota bet soni (notes uchun)
  duration_seconds int,                       -- audio davomiyligi
  downloads_count int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists products_type_idx on public.products(type);
create index if not exists products_published_idx on public.products(is_published);

-- =========================================================
-- Buyurtmalar / to'lovlar
-- =========================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  amount numeric(12,2) not null,
  currency text default 'UZS',
  status text default 'pending' check (status in ('pending', 'paid', 'rejected', 'cancelled')),
  payment_method text default 'click_manual' check (payment_method in ('click_manual', 'admin_contact', 'free')),
  payment_proof_url text,                     -- foydalanuvchi yuklagan chek rasmi
  user_note text,                             -- foydalanuvchi izohi (telefon, qo'shimcha)
  admin_note text,                            -- admin izohi
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists orders_user_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);

-- =========================================================
-- Sayt sozlamalari (admin tomonidan o'zgartirilishi mumkin)
-- =========================================================
create table if not exists public.settings (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now()
);

insert into public.settings (key, value) values
  ('payment_card', '{"card_number": "8600 1234 5678 9012", "holder": "JAKHONGIR B.", "phone": "+998 90 123 45 67"}'::jsonb),
  ('admin_telegram', '"https://t.me/your_admin_username"'::jsonb),
  ('site', '{"title": "NotaShop", "tagline": "Musiqa notalar do''koni"}'::jsonb)
on conflict (key) do nothing;

-- =========================================================
-- Row Level Security
-- =========================================================
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.settings enable row level security;

-- Helper: joriy foydalanuvchi admin'mi?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- profiles
drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_self_update" on public.profiles;
create policy "profiles_self_update" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all" on public.profiles
  for all using (public.is_admin());

-- products: hamma o'qiy oladi (faqat is_published)
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (is_published = true or public.is_admin());

drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

-- orders: foydalanuvchi o'zinikini ko'radi va yaratadi, admin hammasini boshqaradi
drop policy if exists "orders_self_read" on public.orders;
create policy "orders_self_read" on public.orders
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "orders_self_insert" on public.orders;
create policy "orders_self_insert" on public.orders
  for insert with check (auth.uid() = user_id);

drop policy if exists "orders_admin_update" on public.orders;
create policy "orders_admin_update" on public.orders
  for update using (public.is_admin()) with check (public.is_admin());

-- settings: hamma o'qiy oladi (public sozlamalar), faqat admin yangilaydi
drop policy if exists "settings_public_read" on public.settings;
create policy "settings_public_read" on public.settings
  for select using (true);

drop policy if exists "settings_admin_write" on public.settings;
create policy "settings_admin_write" on public.settings
  for all using (public.is_admin()) with check (public.is_admin());

-- =========================================================
-- Auto profile yaratish (admin email — avtomatik admin)
-- =========================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    case
      when new.email = 'jakhongirbakhtiyarov0130@gmail.com' then 'admin'
      when new.email = 'admin@notashop.uz' then 'admin'
      else 'user'
    end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Mavjud foydalanuvchini admin qilish (agar ro'yxatdan o'tgan bo'lsangiz)
update public.profiles
set role = 'admin'
where email = 'jakhongirbakhtiyarov0130@gmail.com';

-- =========================================================
-- Storage buckets — Supabase Studio'da qo'lda yaratish kerak:
--   1) "previews" (public)   — mahsulot rasmlari uchun
--   2) "files"    (private)  — sotib olinadigan fayllar (PDF/MP3)
--   3) "proofs"   (private)  — to'lov chek rasmlari
-- =========================================================
-- Storage policy'lar (SQL editor'da):

-- previews — hamma o'qiy oladi
insert into storage.buckets (id, name, public)
values ('previews', 'previews', true)
on conflict (id) do nothing;

-- files — faqat admin yuklaydi, foydalanuvchilar signed URL orqali
insert into storage.buckets (id, name, public)
values ('files', 'files', false)
on conflict (id) do nothing;

-- proofs — foydalanuvchi yuklaydi, admin ko'radi
insert into storage.buckets (id, name, public)
values ('proofs', 'proofs', false)
on conflict (id) do nothing;

-- previews policy'lari
drop policy if exists "previews_public_read" on storage.objects;
create policy "previews_public_read" on storage.objects
  for select using (bucket_id = 'previews');

drop policy if exists "previews_admin_write" on storage.objects;
create policy "previews_admin_write" on storage.objects
  for insert with check (bucket_id = 'previews' and public.is_admin());

drop policy if exists "previews_admin_update" on storage.objects;
create policy "previews_admin_update" on storage.objects
  for update using (bucket_id = 'previews' and public.is_admin());

drop policy if exists "previews_admin_delete" on storage.objects;
create policy "previews_admin_delete" on storage.objects
  for delete using (bucket_id = 'previews' and public.is_admin());

-- files policy'lari (faqat admin)
drop policy if exists "files_admin_all" on storage.objects;
create policy "files_admin_all" on storage.objects
  for all using (bucket_id = 'files' and public.is_admin())
  with check (bucket_id = 'files' and public.is_admin());

-- proofs policy'lari
drop policy if exists "proofs_user_insert" on storage.objects;
create policy "proofs_user_insert" on storage.objects
  for insert with check (bucket_id = 'proofs' and auth.role() = 'authenticated');

drop policy if exists "proofs_admin_read" on storage.objects;
create policy "proofs_admin_read" on storage.objects
  for select using (bucket_id = 'proofs' and public.is_admin());
