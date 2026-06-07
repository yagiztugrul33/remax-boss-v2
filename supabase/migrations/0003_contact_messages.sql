-- FAZ 8 — contact_messages (lead) tablosu + RLS
--
-- Amaç: iletişim/değerleme/alıcı-talebi formları mailto yerine BURAYA yazsın.
-- Güvenlik deseni 0001/0002 ile birebir aynı:
--   - anon SADECE INSERT edebilir (form gönderir) — okuyamaz/güncelleyemez/silemez.
--   - admin (public.is_admin()) SELECT/UPDATE/DELETE yapabilir.
--   - is_admin() fonksiyonu 0002'de tanımlı (admins tablosu + auth.uid()).
--
-- Çalıştırma:
--   (CLI varsa)  supabase db push
--   (CLI yoksa)  Supabase Dashboard → SQL editor → bu dosyayı yapıştır → Run.
--
-- NOT: fees / listings / admins tablolarına DOKUNULMAZ — bu tamamen ayrı tablo.

create extension if not exists "pgcrypto";

create table if not exists public.contact_messages (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- Form içeriği
  name          text not null,
  email         text,                       -- opsiyonel
  phone         text not null,
  message       text not null,

  -- Hangi form gönderdi
  source        text not null default 'iletisim'
                check (source in ('iletisim', 'degerleme', 'alici-talebi', 'genel')),

  -- İşleme durumu
  status        text not null default 'yeni'
                check (status in ('yeni', 'okundu', 'islendi')),

  -- KVKK açık rıza (Türkiye yasal gereklilik)
  kvkk_consent  boolean not null default false
);

-- Admin panelinde sıralama/sayım için index'ler
create index if not exists idx_contact_messages_created
  on public.contact_messages (created_at desc);
create index if not exists idx_contact_messages_status
  on public.contact_messages (status);

-- ════════════════════ RLS ════════════════════
alter table public.contact_messages enable row level security;

-- Herkes (anon dahil) form gönderebilir → yalnız INSERT.
-- with check (true): satır içeriğine kısıt yok; ama SELECT policy olmadığı
-- için gönderen kendi yazdığını bile geri OKUYAMAZ (sealed).
drop policy if exists "anyone_insert_message" on public.contact_messages;
create policy "anyone_insert_message" on public.contact_messages
  for insert
  with check (true);

-- Yalnız admin okur.
drop policy if exists "admin_read_messages" on public.contact_messages;
create policy "admin_read_messages" on public.contact_messages
  for select
  to authenticated
  using (public.is_admin());

-- Yalnız admin durum günceller (yeni → okundu → işlendi).
drop policy if exists "admin_update_messages" on public.contact_messages;
create policy "admin_update_messages" on public.contact_messages
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Yalnız admin silebilir (temizlik için; opsiyonel kullanım).
drop policy if exists "admin_delete_messages" on public.contact_messages;
create policy "admin_delete_messages" on public.contact_messages
  for delete
  to authenticated
  using (public.is_admin());

-- INSERT dışında anon'a HİÇBİR policy yok → SELECT/UPDATE/DELETE anon'da DENIED.
