-- FAZ 12 — Lead Formları: valuation_requests + buyer_requests + RLS
--
-- Güvenlik deseni 0001-0004 ile birebir:
--   anon SADECE INSERT; admin (is_admin() — 0002'deki public.is_admin) SELECT/UPDATE/DELETE.
--   Tablolar tamamen ayrı — listings / contact_messages / campaign_* dokunulmaz.
--
-- AMAÇ:
--   valuation_requests = "mülkümün değerini öğrenmek istiyorum" (ücretsiz değerleme)
--   buyer_requests     = "şu kriterlerde ev arıyorum, beni bulun" (alıcı kayıt)
--
-- Çalıştırma: Supabase Dashboard → SQL Editor → bu dosyayı yapıştır → Run.

create extension if not exists "pgcrypto";

-- ════════════════════ valuation_requests (ücretsiz değerleme talebi) ════════════════════
create table if not exists public.valuation_requests (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  ad_soyad        text not null,
  telefon         text not null,
  email           text,

  -- Mülk bilgileri
  mulk_tipi       text not null
                  check (mulk_tipi in ('daire', 'mustakil', 'villa',
                                       'isyeri', 'arsa', 'diger')),
  ilce            text not null,
  mahalle         text,
  oda_sayisi      text,             -- "1+1", "2+1", "stüdyo" gibi serbest
  brut_m2         int,
  net_m2          int,
  bina_yasi       int,
  kat             text,             -- "3. kat", "zemin", "bahçe" gibi serbest

  amac            text not null default 'satis'
                  check (amac in ('satis', 'kiralama', 'sadece_ogrenmek')),

  not_text        text,
  kvkk_onay       boolean not null default false,

  status          text not null default 'yeni'
                  check (status in ('yeni', 'inceleniyor', 'iletildi',
                                    'kapatildi', 'iptal')),
  admin_notu      text
);

create index if not exists idx_valuation_created
  on public.valuation_requests (created_at desc);
create index if not exists idx_valuation_status
  on public.valuation_requests (status);

alter table public.valuation_requests enable row level security;

-- Anon insert (yalnız INSERT — geri okuma yok)
drop policy if exists "anyone_insert_valuation" on public.valuation_requests;
create policy "anyone_insert_valuation" on public.valuation_requests
  for insert
  with check (true);

-- Admin select
drop policy if exists "admin_read_valuation" on public.valuation_requests;
create policy "admin_read_valuation" on public.valuation_requests
  for select
  to authenticated
  using (public.is_admin());

-- Admin update (durum/not)
drop policy if exists "admin_update_valuation" on public.valuation_requests;
create policy "admin_update_valuation" on public.valuation_requests
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Admin delete
drop policy if exists "admin_delete_valuation" on public.valuation_requests;
create policy "admin_delete_valuation" on public.valuation_requests
  for delete
  to authenticated
  using (public.is_admin());

-- ════════════════════ buyer_requests (alıcı talep kayıt) ════════════════════
create table if not exists public.buyer_requests (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  ad_soyad        text not null,
  telefon         text not null,
  email           text,

  -- Aradığı mülk kriterleri
  islem_tipi      text not null
                  check (islem_tipi in ('satilik', 'kiralik')),
  mulk_tipi       text not null
                  check (mulk_tipi in ('daire', 'mustakil', 'villa',
                                       'isyeri', 'arsa', 'diger')),
  ilce            text not null,
  mahalleler      text,                            -- virgüllü serbest liste
  oda_sayisi      text,                            -- "2+1" / "3+1" / "fark etmez"
  min_m2          int,
  max_m2          int,
  min_butce       numeric,                         -- TL
  max_butce       numeric,                         -- TL

  ihtiyaclar      text,                            -- "asansör + otopark + bahçe"
  zaman_planlama  text not null default 'esnek'
                  check (zaman_planlama in ('hemen', '1_3_ay',
                                            '3_6_ay', 'esnek')),

  not_text        text,
  kvkk_onay       boolean not null default false,

  status          text not null default 'yeni'
                  check (status in ('yeni', 'inceleniyor', 'iletildi',
                                    'esleme', 'kapatildi', 'iptal')),
  admin_notu      text
);

create index if not exists idx_buyer_created
  on public.buyer_requests (created_at desc);
create index if not exists idx_buyer_status
  on public.buyer_requests (status);

alter table public.buyer_requests enable row level security;

-- Anon insert
drop policy if exists "anyone_insert_buyer" on public.buyer_requests;
create policy "anyone_insert_buyer" on public.buyer_requests
  for insert
  with check (true);

-- Admin select
drop policy if exists "admin_read_buyer" on public.buyer_requests;
create policy "admin_read_buyer" on public.buyer_requests
  for select
  to authenticated
  using (public.is_admin());

-- Admin update
drop policy if exists "admin_update_buyer" on public.buyer_requests;
create policy "admin_update_buyer" on public.buyer_requests
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Admin delete
drop policy if exists "admin_delete_buyer" on public.buyer_requests;
create policy "admin_delete_buyer" on public.buyer_requests
  for delete
  to authenticated
  using (public.is_admin());
