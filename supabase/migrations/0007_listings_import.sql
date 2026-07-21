-- FAZ — listings toplu içe aktarma desteği (external_ref)
--
-- Amaç: CSV/XLSX import'unda aynı ilanın tekrar yüklenmesi duplicate
-- yaratmasın. Dış sistemin (MYRE / RE/MAX export) ilan referans numarası
-- external_ref kolonunda tutulur; aynı referans tekrar gelirse UPDATE edilir.
--
-- Not: listing_no (iç referans) SERBEST kalır — unique DEĞİL; external_ref
-- yalnızca dolu olduğunda benzersizdir (partial unique index).
--
-- Çalıştırma:
--   Supabase Dashboard → SQL editor → bu dosyayı yapıştır → Run.
--
-- RLS DEĞİŞMEZ: 0001/0002'deki policy'ler aynen geçerli (yazma admin-only).

alter table public.listings
  add column if not exists external_ref text;

-- Aynı dış referans iki kez kaydedilemesin (NULL'lar hariç).
create unique index if not exists uq_listings_external_ref
  on public.listings (external_ref)
  where external_ref is not null;

-- Import sonrası "dış kaynaktan mı geldi" filtrelemesi için yardımcı index.
create index if not exists idx_listings_external_ref
  on public.listings (external_ref);
