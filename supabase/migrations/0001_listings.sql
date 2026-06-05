-- FAZ 5a — listings tablosu + RLS (public yalnız 'published' okur).
-- Çalıştırma:
--   (CLI varsa)  supabase db push
--   (CLI yoksa)  Supabase Dashboard → SQL editor → bu dosyayı yapıştır → Run.
--
-- Bu migration auth/yazma içermez; INSERT/UPDATE/DELETE policy yok →
-- anon role default olarak yazma kapalı. Yazma 5b/5c'de auth ile gelir.

create extension if not exists "pgcrypto";

create table if not exists public.listings (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  -- Yayın kapısı: anon yalnız published görür (RLS aşağıda).
  status          text not null default 'draft'
                  check (status in ('draft', 'published')),
  featured        boolean not null default false,

  -- İlan tipi
  listing_type    text not null
                  check (listing_type in ('satilik', 'kiralik')),
  property_type   text,  -- daire, villa, mustakil, ofis, dukkan, arsa, isyeri

  -- İçerik
  title           text not null,
  description     text,

  -- Fiyat
  price           numeric not null check (price >= 0),
  currency        text not null default 'TRY'
                  check (currency in ('TRY', 'USD', 'EUR')),

  -- Konum (TR adres yapısı)
  city            text not null default 'Ankara',
  district        text,           -- ilçe (örn. Yenimahalle)
  neighborhood    text,           -- mahalle (örn. Beştepe)
  address         text,           -- açık adres opsiyonel

  -- Özellikler
  rooms           text,           -- TR notasyonu: '3+1', '4.5+1', 'stüdyo'
  gross_area      numeric,        -- brüt m²
  net_area        numeric,        -- net m²
  building_age    int,
  floor           text,           -- '5', 'zemin', '5/12'
  total_floors    int,
  heating         text,           -- kombi, merkezi, klima, yok
  furnished       boolean,
  balcony         boolean,
  parking         boolean,

  -- Görseller (yükleme 5c)
  image_urls      text[] not null default '{}',

  -- Referans no (opsiyonel iç kullanım)
  listing_no      text
);

-- updated_at için touch trigger
create or replace function public.touch_listings_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_listings_touch_updated_at on public.listings;
create trigger trg_listings_touch_updated_at
  before update on public.listings
  for each row execute function public.touch_listings_updated_at();

-- Yararlı index'ler
create index if not exists idx_listings_status_created
  on public.listings (status, created_at desc);
create index if not exists idx_listings_featured
  on public.listings (featured) where featured = true;
create index if not exists idx_listings_listing_type
  on public.listings (listing_type);

-- ════════════════════ RLS ════════════════════
alter table public.listings enable row level security;

-- Public/anon yalnız yayınlanmış ilanları okur.
drop policy if exists "public_read_published" on public.listings;
create policy "public_read_published" on public.listings
  for select
  using (status = 'published');

-- INSERT/UPDATE/DELETE için policy YOK → anon'a default DENIED.
-- Yazma policy'leri 5b/5c'de auth ile gelir.
