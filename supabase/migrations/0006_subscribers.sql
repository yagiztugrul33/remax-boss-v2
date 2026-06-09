-- FAZ 14 — Newsletter / yeni-ilan bildirim toplama: subscribers + RLS
--
-- Güvenlik deseni 0001-0005 ile birebir:
--   anon SADECE INSERT; admin (is_admin() — 0002'deki public.is_admin)
--   SELECT/UPDATE/DELETE.
--   Tablolar tamamen ayrı — listings / contact_messages / campaign_* /
--   valuation_requests / buyer_requests dokunulmaz.
--
-- AMAÇ: e-posta + opsiyonel kriterler toplayıp yeni ilan eklendiğinde
--   bildirim göndermek. ŞU AN GÖNDERİM YOK — sadece TOPLAMA. Gönderim
--   katmanı (SMTP / Resend / cron) ileride eklenecek.
--
-- Çalıştırma: Supabase Dashboard → SQL Editor → bu dosyayı yapıştır → Run.

create extension if not exists "pgcrypto";

create table if not exists public.subscribers (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  email           text not null,

  -- Opsiyonel ilgi kriterleri
  ilgi_bolgeler   text,                        -- virgüllü serbest (örn. "bestepe, oran")
  ilgi_tip        text                          -- daire/mustakil/villa/isyeri/arsa/hepsi
                  check (ilgi_tip is null or ilgi_tip in
                         ('daire', 'mustakil', 'villa', 'isyeri', 'arsa', 'hepsi')),
  ilgi_islem      text                          -- satilik/kiralik/hepsi
                  check (ilgi_islem is null or ilgi_islem in
                         ('satilik', 'kiralik', 'hepsi')),
  max_butce       numeric,                      -- TL

  kvkk_onay       boolean not null default false,

  status          text not null default 'aktif'
                  check (status in ('aktif', 'pasif', 'iptal')),

  -- Aynı e-posta tekrar abone olamasın (idempotent kayıt)
  constraint subscribers_email_unique unique (email)
);

create index if not exists idx_subscribers_created
  on public.subscribers (created_at desc);
create index if not exists idx_subscribers_status
  on public.subscribers (status);

alter table public.subscribers enable row level security;

-- Anon insert (yalnız INSERT; geri okuma yok)
drop policy if exists "anyone_insert_subscriber" on public.subscribers;
create policy "anyone_insert_subscriber" on public.subscribers
  for insert
  with check (true);

-- Admin select
drop policy if exists "admin_read_subscribers" on public.subscribers;
create policy "admin_read_subscribers" on public.subscribers
  for select
  to authenticated
  using (public.is_admin());

-- Admin update (status: aktif/pasif/iptal)
drop policy if exists "admin_update_subscribers" on public.subscribers;
create policy "admin_update_subscribers" on public.subscribers
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Admin delete (KVKK silme talepleri için)
drop policy if exists "admin_delete_subscribers" on public.subscribers;
create policy "admin_delete_subscribers" on public.subscribers
  for delete
  to authenticated
  using (public.is_admin());
