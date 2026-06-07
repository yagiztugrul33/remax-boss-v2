-- ════════════════════════════════════════════════════════════════
-- FAZ 1A — v2 PLATFORM ÇEKİRDEK ŞEMA (TAZE / YENİ Supabase projesi için)
-- ════════════════════════════════════════════════════════════════
-- ⚠️ UYARI: Bu şema, repodaki AKTİF migrations/ klasöründen (0001_listings,
--   0002_listings_write, 0003_contact_messages, 0004_campaign — CANLI projeye
--   ait) AYRIDIR. Bu dosyayı YALNIZCA YENİ/boş bir Supabase projesinde çalıştır.
--   CANLI projede çalıştırma: is_admin() yeniden tanımlanır + listings zaten
--   farklı şemada var → canlı site KIRILIR.
--
-- Uygulama: Yeni proje → SQL Editor → bu dosyayı yapıştır → Run.
-- (CLI varsa, yeni projeye link sonrası migrations/ köküne taşıyıp db push.)
-- ════════════════════════════════════════════════════════════════

create extension if not exists vector;

-- ENUMS
create type user_role as enum ('user','agent','admin');
create type listing_status as enum ('draft','pending_review','published','rejected','reserved','sold_rented','archived');
create type listing_purpose as enum ('sale','rent','daily_rent','transfer');
create type listing_category as enum ('residential','commercial','land','tourism','project');
create type media_type as enum ('image','video','floor_plan','tour_360');
create type lead_status as enum ('new','contacted','qualified','viewing','negotiation','won','lost');
create type appt_status as enum ('requested','confirmed','completed','cancelled');
create type social_platform as enum ('instagram','facebook','youtube','tiktok','x','linkedin','whatsapp');

-- HELPERS (security definer → RLS özyinelemesini önler)
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.profiles where id=auth.uid() and role='admin'); $$;
create or replace function public.current_agent_id() returns uuid language sql stable security definer set search_path=public as $$
  select id from public.agents where profile_id=auth.uid(); $$;
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
  begin new.updated_at=now(); return new; end; $$;

-- PROFILES (+ auth.users tetikleyici)
create table public.profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'user',
  full_name text, phone text, avatar_url text,
  created_at timestamptz default now());
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
  begin insert into public.profiles(id,full_name) values(new.id,new.raw_user_meta_data->>'full_name'); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
create or replace function public.prevent_role_escalation() returns trigger language plpgsql security definer set search_path=public as $$
  begin if new.role<>old.role and not public.is_admin() then raise exception 'rol degistirilemez'; end if; return new; end; $$;
create trigger profiles_no_escalation before update on public.profiles for each row execute function public.prevent_role_escalation();

-- OFFICES
create table public.offices(
  id uuid primary key default gen_random_uuid(), slug text unique not null,
  name text not null, legal_name text, city text, district text, neighborhood text,
  address text, lat double precision, lng double precision, phone text, email text,
  about text, hero_video_url text, socials jsonb default '{}'::jsonb, created_at timestamptz default now());

-- AGENTS (login zorunlu değil; roster import için profile_id nullable)
create table public.agents(
  id uuid primary key default gen_random_uuid(), profile_id uuid references public.profiles(id) on delete set null,
  office_id uuid references public.offices(id) on delete cascade, slug text unique not null,
  full_name text not null, title text, bio text, photo_url text, phone text, whatsapp text, email text,
  departments text[] default '{}', socials jsonb default '{}'::jsonb, reel_video_url text,
  is_active boolean default true, sort int default 0, created_at timestamptz default now());

-- LISTINGS (tam künye + arama + embedding)
create table public.listings(
  id uuid primary key default gen_random_uuid(), ref_no text unique not null default ('BOSS-'||to_char(now(),'YY')||'-'||lpad((floor(random()*99999))::text,5,'0')),
  office_id uuid references public.offices(id) on delete cascade, agent_id uuid references public.agents(id) on delete set null,
  status listing_status not null default 'draft', purpose listing_purpose not null, category listing_category not null,
  title text not null, slug text, description text,
  price numeric, currency text default 'TRY',
  city text, district text, neighborhood text, address text, lat double precision, lng double precision,
  gross_m2 int, net_m2 int, rooms text, building_age int, floor int, total_floors int,
  heating text, bath_count int, balcony boolean, furnished boolean, in_site boolean, dues numeric,
  deed_status text, credit_eligible boolean, swap boolean, energy_class text, features text[] default '{}',
  video_url text, tour_360_url text, floor_plan_url text,
  view_count int default 0, is_featured boolean default false,
  search_tsv tsvector, embedding vector(1536),
  published_at timestamptz, created_by uuid references public.profiles(id), created_at timestamptz default now(), updated_at timestamptz default now());
create index on public.listings using gin(search_tsv);
create index on public.listings(status);
create trigger listings_touch before update on public.listings for each row execute function public.touch_updated_at();
create or replace function public.listings_tsv() returns trigger language plpgsql as $$
  begin new.search_tsv := to_tsvector('simple', coalesce(new.title,'')||' '||coalesce(new.description,'')||' '||coalesce(new.city,'')||' '||coalesce(new.district,'')||' '||coalesce(new.neighborhood,'')); return new; end; $$;
create trigger listings_tsv_trg before insert or update on public.listings for each row execute function public.listings_tsv();

-- İLAN DURUM STATE-MACHINE (admin dışı published'a geçemez)
create or replace function public.enforce_listing_transition() returns trigger language plpgsql security definer set search_path=public as $$
  begin
    if public.is_admin() then return new; end if;
    if new.status not in ('draft','pending_review','rejected','archived') then
      raise exception 'bu durum gecisini sadece yonetici yapabilir (%)', new.status; end if;
    return new; end; $$;
create trigger listings_transition before update on public.listings for each row execute function public.enforce_listing_transition();

-- Admin onay RPC (review_log yazar)
create table public.review_log(
  id uuid primary key default gen_random_uuid(), listing_id uuid references public.listings(id) on delete cascade,
  actor_id uuid, action text, reason text, from_status listing_status, to_status listing_status, created_at timestamptz default now());
create or replace function public.admin_set_listing_status(p_listing uuid, p_status listing_status, p_reason text default null)
  returns void language plpgsql security definer set search_path=public as $$
  declare old_s listing_status; begin
    if not public.is_admin() then raise exception 'yetki yok'; end if;
    select status into old_s from public.listings where id=p_listing;
    update public.listings set status=p_status, published_at=case when p_status='published' then now() else published_at end where id=p_listing;
    insert into public.review_log(listing_id,actor_id,action,reason,from_status,to_status) values(p_listing,auth.uid(),'set_status',p_reason,old_s,p_status);
  end; $$;

-- DİĞER ÇEKİRDEK TABLOLAR
create table public.listing_media(id uuid primary key default gen_random_uuid(), listing_id uuid references public.listings(id) on delete cascade, type media_type default 'image', url text not null, alt text, sort int default 0);
create table public.projects(id uuid primary key default gen_random_uuid(), office_id uuid references public.offices(id) on delete cascade, slug text unique, name text not null, developer text, city text, district text, lat double precision, lng double precision, description text, status text default 'active', cover_url text, created_at timestamptz default now());
create table public.leads(id uuid primary key default gen_random_uuid(), office_id uuid references public.offices(id), agent_id uuid references public.agents(id), listing_id uuid references public.listings(id), type text default 'contact', name text, phone text, email text, message text, source text, utm jsonb, kvkk_consent boolean default false, status lead_status default 'new', created_at timestamptz default now());
create table public.appointments(id uuid primary key default gen_random_uuid(), listing_id uuid references public.listings(id) on delete cascade, agent_id uuid references public.agents(id), user_id uuid references public.profiles(id), name text, phone text, datetime timestamptz, status appt_status default 'requested', note text, created_at timestamptz default now());
create table public.favorites(id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete cascade, listing_id uuid references public.listings(id) on delete cascade, created_at timestamptz default now(), unique(user_id,listing_id));
create table public.saved_searches(id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete cascade, name text, query jsonb, alert boolean default false, created_at timestamptz default now());
create table public.posts(id uuid primary key default gen_random_uuid(), office_id uuid references public.offices(id), type text default 'blog', title text, slug text unique, cover_url text, body text, author_id uuid, status text default 'draft', published_at timestamptz, created_at timestamptz default now());

-- VIDEO + SOSYAL
create table public.videos(id uuid primary key default gen_random_uuid(), owner_type text, owner_id uuid, provider text default 'mux', playback_id text, url text, aspect text default '16:9', poster_url text, title text, status text default 'draft', created_at timestamptz default now());
create table public.social_accounts(id uuid primary key default gen_random_uuid(), owner_type text, owner_id uuid, platform social_platform, handle text, url text, ig_business_id text, connected boolean default false, created_at timestamptz default now());
create table public.share_templates(id uuid primary key default gen_random_uuid(), office_id uuid references public.offices(id) on delete cascade, name text, format text, config jsonb default '{}'::jsonb, is_default boolean default false);
create table public.share_events(id uuid primary key default gen_random_uuid(), listing_id uuid references public.listings(id) on delete set null, agent_id uuid references public.agents(id) on delete set null, platform social_platform, format text, short_code text, utm jsonb, actor_id uuid, created_at timestamptz default now());
create table public.social_posts(id uuid primary key default gen_random_uuid(), office_id uuid references public.offices(id) on delete cascade, listing_id uuid references public.listings(id), platform social_platform, caption text, media_urls text[], scheduled_at timestamptz, published_at timestamptz, external_id text, status text default 'draft', created_by uuid, created_at timestamptz default now());
create table public.post_insights(id uuid primary key default gen_random_uuid(), social_post_id uuid references public.social_posts(id) on delete cascade, reach int, likes int, saves int, comments int, fetched_at timestamptz default now());

-- RLS: hepsini aç (deny-default)
alter table public.profiles enable row level security; alter table public.offices enable row level security;
alter table public.agents enable row level security; alter table public.listings enable row level security;
alter table public.listing_media enable row level security; alter table public.review_log enable row level security;
alter table public.projects enable row level security; alter table public.leads enable row level security;
alter table public.appointments enable row level security; alter table public.favorites enable row level security;
alter table public.saved_searches enable row level security; alter table public.posts enable row level security;
alter table public.videos enable row level security; alter table public.social_accounts enable row level security;
alter table public.share_templates enable row level security; alter table public.share_events enable row level security;
alter table public.social_posts enable row level security; alter table public.post_insights enable row level security;

-- profiles
create policy p_self on public.profiles for select using (id=auth.uid() or public.is_admin());
create policy p_self_upd on public.profiles for update using (id=auth.uid() or public.is_admin());
-- offices / agents / projects / posts / videos
create policy o_read on public.offices for select using (true);
create policy o_admin on public.offices for all using (public.is_admin()) with check (public.is_admin());
create policy ag_read on public.agents for select using (is_active or public.is_admin());
create policy ag_admin on public.agents for all using (public.is_admin()) with check (public.is_admin());
create policy pr_read on public.projects for select using (status='active' or public.is_admin());
create policy pr_admin on public.projects for all using (public.is_admin()) with check (public.is_admin());
create policy po_read on public.posts for select using (status='published' or public.is_admin());
create policy po_admin on public.posts for all using (public.is_admin()) with check (public.is_admin());
create policy vid_read on public.videos for select using (status='published' or public.is_admin());
create policy vid_admin on public.videos for all using (public.is_admin()) with check (public.is_admin());

-- LISTINGS (yetki modelinin kalbi)
create policy l_read_pub on public.listings for select using (status='published' or public.is_admin() or agent_id=public.current_agent_id());
create policy l_agent_ins on public.listings for insert with check (
  public.is_admin() or (public.current_agent_id() is not null and agent_id=public.current_agent_id() and status in ('draft','pending_review')));
create policy l_agent_upd on public.listings for update using (
  public.is_admin() or agent_id=public.current_agent_id())
  with check (public.is_admin() or agent_id=public.current_agent_id());
create policy l_admin_del on public.listings for delete using (public.is_admin());
create policy lm_read on public.listing_media for select using (exists(select 1 from public.listings l where l.id=listing_id and (l.status='published' or public.is_admin() or l.agent_id=public.current_agent_id())));
create policy lm_write on public.listing_media for all using (exists(select 1 from public.listings l where l.id=listing_id and (public.is_admin() or l.agent_id=public.current_agent_id()))) with check (true);
create policy rl_read on public.review_log for select using (public.is_admin() or exists(select 1 from public.listings l where l.id=listing_id and l.agent_id=public.current_agent_id()));

-- LEADS
create policy ld_ins on public.leads for insert with check (true);
create policy ld_read on public.leads for select using (public.is_admin() or agent_id=public.current_agent_id());
create policy ld_upd on public.leads for update using (public.is_admin() or agent_id=public.current_agent_id());
-- APPOINTMENTS
create policy ap_ins on public.appointments for insert with check (true);
create policy ap_read on public.appointments for select using (public.is_admin() or agent_id=public.current_agent_id() or user_id=auth.uid());
create policy ap_upd on public.appointments for update using (public.is_admin() or agent_id=public.current_agent_id());
-- FAVORITES / SAVED_SEARCHES
create policy fav_own on public.favorites for all using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy ss_own on public.saved_searches for all using (user_id=auth.uid()) with check (user_id=auth.uid());
-- SOSYAL
create policy sa_admin on public.social_accounts for all using (public.is_admin()) with check (public.is_admin());
create policy st_admin on public.share_templates for all using (public.is_admin()) with check (public.is_admin());
create policy st_read on public.share_templates for select using (true);
create policy se_ins on public.share_events for insert with check (true);
create policy se_read on public.share_events for select using (public.is_admin() or agent_id=public.current_agent_id());
create policy sp_admin on public.social_posts for all using (public.is_admin()) with check (public.is_admin());
create policy pi_admin on public.post_insights for all using (public.is_admin()) with check (public.is_admin());

-- SEED (sadece ofis + paylaşım şablonları — sahte kişi/ilan YOK)
insert into public.offices(slug,name,legal_name,city,district,neighborhood,address,lat,lng,phone,email,about)
values('remax-boss','RE/MAX BOSS','RE/MAX BOSS Gayrimenkul','Ankara','Yenimahalle','Beştepe','Beştepe, Yenimahalle / Ankara',39.9270,32.8050,'+90 312 598 00 00','info@remaxboss.com.tr','Beştepe''de, Külliye komşuluğunda modern gayrimenkul danışmanlığı.');
insert into public.share_templates(office_id,name,format,is_default)
select id,'Feed Kare','1:1',true from public.offices where slug='remax-boss'
union all select id,'Feed Dikey','4:5',false from public.offices where slug='remax-boss'
union all select id,'Story/Reel','9:16',false from public.offices where slug='remax-boss';
