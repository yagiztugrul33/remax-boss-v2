import { unstable_cache } from "next/cache";
import { createClient as createSupabaseJs } from "@supabase/supabase-js";
import { rowToListing, type Listing } from "@/lib/listings";
import { getRegionBySlug } from "@/lib/regions";
import {
  LISTING_PAGE_SIZE,
  type ListingFilters,
} from "@/lib/listing-search";

/**
 * İlan cache tag'ı — public listing okumaları bu tag ile data cache'e
 * alınır; admin mutasyonları revalidateTag(LISTINGS_CACHE_TAG) çağırır.
 * Ölçüm gerekçesi: her istekte Supabase round-trip'i dokümanı ~0.7-1.4s
 * geciktiriyordu (ana sayfa 1.3-1.6s, /ilanlar 1.9s; sorgusuz bölge
 * sayfası 0.4s). Public veri (yalnız published) oturumdan bağımsız.
 */
export const LISTINGS_CACHE_TAG = "listings";
const LISTINGS_CACHE_SECONDS = 300;

/**
 * Çerezsiz anon istemci — YALNIZ public okumalar için.
 * unstable_cache içinde cookies() kullanılamaz; RLS anon'a zaten sadece
 * published satırları gösterir, oturum bilgisine gerek yok.
 */
function publicClient() {
  return createSupabaseJs(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

/**
 * Supabase'a güvenli erişim sarmalayıcısı.
 * env yoksa veya bağlantı patlasa → boş fallback dön (dev/preview'da build patlamasın).
 * Hata sessize alınmaz: server log'a yazılır.
 */
async function safeRun<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return fallback;
  }
  try {
    return await fn();
  } catch (err) {
    console.error("[supabase:queries]", err);
    return fallback;
  }
}

export const LISTING_COLUMNS = `
  id, created_at, updated_at, status, featured,
  listing_type, property_type,
  title, description,
  price, currency,
  city, district, neighborhood, address,
  rooms, gross_area, net_area, building_age, floor, total_floors,
  heating, furnished, balcony, parking,
  image_urls, listing_no
`;

const getPublishedListingsCached = unstable_cache(
  async () => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("listings")
      .select(LISTING_COLUMNS)
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(rowToListing);
  },
  ["published-listings"],
  { tags: [LISTINGS_CACHE_TAG], revalidate: LISTINGS_CACHE_SECONDS },
);

/** Tüm yayınlanmış ilanlar (en yeni önce). */
export async function getPublishedListings(): Promise<Listing[]> {
  return safeRun(() => getPublishedListingsCached(), [] as Listing[]);
}

const getFeaturedListingsCached = unstable_cache(
  async (limit: number) => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("listings")
      .select(LISTING_COLUMNS)
      .eq("status", "published")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []).map(rowToListing);
  },
  ["featured-listings"],
  { tags: [LISTINGS_CACHE_TAG], revalidate: LISTINGS_CACHE_SECONDS },
);

/** Öne çıkan yayınlanmış ilanlar — anasayfa şeridi. */
export async function getFeaturedListings(limit = 4): Promise<Listing[]> {
  return safeRun(() => getFeaturedListingsCached(limit), [] as Listing[]);
}

const countPublishedListingsCached = unstable_cache(
  async () => {
    const supabase = publicClient();
    const { count, error } = await supabase
      .from("listings")
      .select("id", { count: "exact", head: true })
      .eq("status", "published");
    if (error) throw error;
    return count ?? 0;
  },
  ["published-listings-count"],
  { tags: [LISTINGS_CACHE_TAG], revalidate: LISTINGS_CACHE_SECONDS },
);

/** Yayınlanmış ilan toplamı — boş-durum / filtre çubuğu kararı için. */
export async function countPublishedListings(): Promise<number> {
  return safeRun(() => countPublishedListingsCached(), 0);
}

export interface ListingSearchResult {
  items: Listing[];
  total: number;
}

/** Arama çekirdeği — publicClient ile (oturum gerekmez, RLS published). */
async function runListingSearch(f: ListingFilters): Promise<ListingSearchResult> {
  const supabase = publicClient();
  let q = supabase
    .from("listings")
    .select(LISTING_COLUMNS, { count: "exact" })
    .eq("status", "published");

  if (f.kind) q = q.eq("listing_type", f.kind);
  if (f.type) q = q.eq("property_type", f.type);
  if (f.rooms) q = q.eq("rooms", f.rooms);
  if (f.minPrice != null) q = q.gte("price", f.minPrice);
  if (f.maxPrice != null) q = q.lte("price", f.maxPrice);
  if (f.minArea != null) q = q.gte("gross_area", f.minArea);
  if (f.maxArea != null) q = q.lte("gross_area", f.maxArea);

  if (f.region) {
    const region = getRegionBySlug(f.region);
    if (region) {
      // "Gaziosmanpaşa (GOP)" → "Gaziosmanpaşa" (parantezli ek atılır).
      const name = region.name.replace(/\s*\(.*\)\s*$/, "").trim();
      q = q.or(`district.ilike.%${name}%,neighborhood.ilike.%${name}%`);
    }
  }

  if (f.sort === "price-asc") q = q.order("price", { ascending: true });
  else if (f.sort === "price-desc") q = q.order("price", { ascending: false });
  else q = q.order("created_at", { ascending: false });

  const from = (f.page - 1) * LISTING_PAGE_SIZE;
  q = q.range(from, from + LISTING_PAGE_SIZE - 1);

  const { data, count, error } = await q;
  if (error) throw error;
  return {
    items: (data ?? []).map(rowToListing),
    total: count ?? 0,
  };
}

/** Filtresiz ilk sayfa — /ilanlar'ın en sık hali; cache'lenir. */
const searchListingsDefaultCached = unstable_cache(
  () => runListingSearch({ sort: "new", page: 1 }),
  ["listing-search-default"],
  { tags: [LISTINGS_CACHE_TAG], revalidate: LISTINGS_CACHE_SECONDS },
);

function isDefaultSearch(f: ListingFilters): boolean {
  return (
    !f.kind &&
    !f.type &&
    !f.rooms &&
    !f.region &&
    f.minPrice == null &&
    f.maxPrice == null &&
    f.minArea == null &&
    f.maxArea == null &&
    f.sort === "new" &&
    f.page === 1
  );
}

/**
 * Sunucu tarafı arama/filtre/sıralama/sayfalama.
 * Bölge filtresi regions.ts slug'ından bölge adına çevrilip district +
 * neighborhood üzerinde ilike ile aranır (listings'te bölge alanı serbest text).
 * Filtresiz varsayılan görünüm data cache'ten; filtreli aramalar canlı.
 */
export async function searchListings(
  f: ListingFilters,
): Promise<ListingSearchResult> {
  return safeRun(
    () =>
      isDefaultSearch(f) ? searchListingsDefaultCached() : runListingSearch(f),
    { items: [] as Listing[], total: 0 },
  );
}

/**
 * Benzer ilanlar — aynı işlem tipinde, öncelik aynı ilçede; yeterli sonuç
 * yoksa işlem tipi eşleşenlerle tamamlanır. Kendisi hariç.
 */
export async function getSimilarListings(
  listing: Listing,
  limit = 3,
): Promise<Listing[]> {
  return safeRun(async () => {
    const supabase = publicClient();

    const base = () =>
      supabase
        .from("listings")
        .select(LISTING_COLUMNS)
        .eq("status", "published")
        .eq("listing_type", listing.listingType)
        .neq("id", listing.id)
        .order("created_at", { ascending: false });

    const out: Listing[] = [];
    if (listing.district) {
      const { data, error } = await base()
        .ilike("district", `%${listing.district}%`)
        .limit(limit);
      if (error) throw error;
      out.push(...(data ?? []).map(rowToListing));
    }
    if (out.length < limit) {
      const { data, error } = await base().limit(limit + out.length);
      if (error) throw error;
      const seen = new Set(out.map((l) => l.id));
      for (const row of data ?? []) {
        const l = rowToListing(row);
        if (!seen.has(l.id)) {
          out.push(l);
          seen.add(l.id);
        }
        if (out.length >= limit) break;
      }
    }
    return out.slice(0, limit);
  }, [] as Listing[]);
}

/** Tek ilan — yalnız published. Bulunamaz/draft → null. */
export async function getListingById(id: string): Promise<Listing | null> {
  return safeRun(async () => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("listings")
      .select(LISTING_COLUMNS)
      .eq("id", id)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    return data ? rowToListing(data) : null;
  }, null);
}
