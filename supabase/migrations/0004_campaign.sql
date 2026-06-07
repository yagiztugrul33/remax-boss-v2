-- FAZ 9 — "Altın Kampanyası": campaign_applications + campaign_settings + RLS
--
-- Güvenlik deseni 0001/0002/0003 ile birebir:
--   applications: anon SADECE INSERT; admin (is_admin()) SELECT/UPDATE/DELETE.
--   settings:     anon SELECT (aktif + kontenjan herkese açık bilgi); admin UPDATE.
--   is_admin() 0002'de tanımlı.
--
-- Çalıştırma: Supabase Dashboard → SQL Editor → bu dosyayı yapıştır → Run.
-- NOT: fees / listings / contact_messages tablolarına DOKUNULMAZ — tamamen ayrı.

create extension if not exists "pgcrypto";

-- ════════════════════ campaign_settings (singleton config) ════════════════════
create table if not exists public.campaign_settings (
  id                int primary key default 1,
  aktif             boolean not null default false,   -- PASİF default
  toplam_kontenjan  int not null default 50,
  onaylanan_sayisi  int not null default 0,
  updated_at        timestamptz not null default now(),
  constraint campaign_settings_singleton check (id = 1)
);

insert into public.campaign_settings (id) values (1)
  on conflict (id) do nothing;

alter table public.campaign_settings enable row level security;

-- aktiflik + kontenjan herkese açık (landing sayfası gösterir).
drop policy if exists "public_read_campaign_settings" on public.campaign_settings;
create policy "public_read_campaign_settings" on public.campaign_settings
  for select
  using (true);

-- Yalnız admin günceller (aç/kapa, kontenjan, sayaç).
drop policy if exists "admin_update_campaign_settings" on public.campaign_settings;
create policy "admin_update_campaign_settings" on public.campaign_settings
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ════════════════════ campaign_applications ════════════════════
create table if not exists public.campaign_applications (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  ad_soyad        text not null,
  telefon         text not null,
  email           text,
  mulk_konumu     text not null,
  tahmini_deger   numeric,                 -- tahmini TL değer (ofis onaylar)
  yetki_kabul     boolean not null default false,  -- 3 ay münhasır yetki kabulü
  mesaj           text,
  kvkk_onay       boolean not null default false,

  status          text not null default 'yeni'
                  check (status in ('yeni', 'inceleniyor', 'onaylandi',
                                    'reddedildi', 'satildi', 'odul_verildi')),
  admin_notu      text
);

create index if not exists idx_campaign_apps_created
  on public.campaign_applications (created_at desc);
create index if not exists idx_campaign_apps_status
  on public.campaign_applications (status);

alter table public.campaign_applications enable row level security;

-- Herkes başvurabilir → yalnız INSERT (geri okuyamaz; sealed).
drop policy if exists "anyone_insert_campaign_app" on public.campaign_applications;
create policy "anyone_insert_campaign_app" on public.campaign_applications
  for insert
  with check (true);

-- Yalnız admin okur.
drop policy if exists "admin_read_campaign_apps" on public.campaign_applications;
create policy "admin_read_campaign_apps" on public.campaign_applications
  for select
  to authenticated
  using (public.is_admin());

-- Yalnız admin durum/not günceller.
drop policy if exists "admin_update_campaign_apps" on public.campaign_applications;
create policy "admin_update_campaign_apps" on public.campaign_applications
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Yalnız admin siler.
drop policy if exists "admin_delete_campaign_apps" on public.campaign_applications;
create policy "admin_delete_campaign_apps" on public.campaign_applications
  for delete
  to authenticated
  using (public.is_admin());
