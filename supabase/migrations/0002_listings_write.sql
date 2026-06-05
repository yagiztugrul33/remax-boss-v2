-- FAZ 5c — listings yazma RLS + admins tablosu + Storage bucket policy
--
-- Politika yaklaşımı: app-level allowlist'in YANINDA, DB seviyesinde
-- ayrı bir admins tablosu (auth.users.id ile FK). Yazma policy'leri
-- "exists (select 1 from admins where id = auth.uid())" üzerinden işler.
-- GUC (current_setting) yerine bu tercih edildi çünkü:
--   - Connection-scoped GUC'lar Supabase pooler ile brittle.
--   - admins tablosu = DB'nin tek doğruluk kaynağı; env env kayıp olsa bile.
--   - Yeni admin eklemek için sadece bir INSERT, restart gerekmez.
--   - app-level ADMIN_EMAILS sadece UI guard görevi görür (savunma derinliği).
--
-- Çalıştırma:
--   (CLI varsa)  supabase db push
--   (CLI yoksa)  Supabase Dashboard → SQL editor → bu dosyayı yapıştır → Run.

-- ════════════════════ admins tablosu ════════════════════
create table if not exists public.admins (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  created_at  timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Admin sadece kendi satırını görür; public görmez.
drop policy if exists "admin_self_read" on public.admins;
create policy "admin_self_read" on public.admins
  for select
  to authenticated
  using (id = auth.uid());

-- Yardımcı: çağıran kullanıcı admin mi?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins where id = auth.uid()
  );
$$;

-- ════════════════════ listings yazma policy'leri ════════════════════
-- 5a public_read_published DOKUNULMUYOR.

drop policy if exists "admin_insert" on public.listings;
create policy "admin_insert" on public.listings
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "admin_update" on public.listings;
create policy "admin_update" on public.listings
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin_delete" on public.listings;
create policy "admin_delete" on public.listings
  for delete
  to authenticated
  using (public.is_admin());

-- Admin tüm satırları (draft dahil) görebilsin — public_read_published'in yanına.
drop policy if exists "admin_select_all" on public.listings;
create policy "admin_select_all" on public.listings
  for select
  to authenticated
  using (public.is_admin());

-- ════════════════════ Storage bucket ════════════════════
insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do nothing;

-- Public READ (görseller dışarıdan erişilebilsin)
drop policy if exists "listing_images_public_read" on storage.objects;
create policy "listing_images_public_read" on storage.objects
  for select
  using (bucket_id = 'listing-images');

-- Yalnız admin INSERT/UPDATE/DELETE
drop policy if exists "listing_images_admin_insert" on storage.objects;
create policy "listing_images_admin_insert" on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'listing-images' and public.is_admin());

drop policy if exists "listing_images_admin_update" on storage.objects;
create policy "listing_images_admin_update" on storage.objects
  for update
  to authenticated
  using (bucket_id = 'listing-images' and public.is_admin())
  with check (bucket_id = 'listing-images' and public.is_admin());

drop policy if exists "listing_images_admin_delete" on storage.objects;
create policy "listing_images_admin_delete" on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'listing-images' and public.is_admin());
