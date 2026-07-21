/**
 * /ilanlar arama-filtre altyapısı — URL query param tabanlı (SEO +
 * paylaşılabilir link). Saf parse/build yardımcıları; Supabase sorgusu
 * queries.ts'teki searchListings'te.
 */

export const LISTING_PAGE_SIZE = 12;

export type ListingSort = "new" | "price-asc" | "price-desc";

export interface ListingFilters {
  /** satilik | kiralik — yoksa tümü. */
  kind?: "satilik" | "kiralik";
  /** property_type (daire, villa, …) — yoksa tümü. */
  type?: string;
  /** regions.ts slug'ı (bestepe, cukurambar, …) — district/neighborhood araması. */
  region?: string;
  /** Oda notasyonu (1+1, 2+1, …). */
  rooms?: string;
  minPrice?: number;
  maxPrice?: number;
  /** Brüt m² aralığı. */
  minArea?: number;
  maxArea?: number;
  sort: ListingSort;
  page: number;
}

export const PROPERTY_TYPE_OPTIONS = [
  { value: "daire", tr: "Daire", en: "Apartment" },
  { value: "villa", tr: "Villa", en: "Villa" },
  { value: "mustakil", tr: "Müstakil", en: "Detached" },
  { value: "ofis", tr: "Ofis", en: "Office" },
  { value: "dukkan", tr: "Dükkan", en: "Shop" },
  { value: "arsa", tr: "Arsa", en: "Land" },
  { value: "isyeri", tr: "İş Yeri", en: "Commercial" },
] as const;

export const ROOM_OPTIONS = ["1+1", "2+1", "3+1", "4+1", "5+1"] as const;

type SP = Record<string, string | string[] | undefined>;

function first(sp: SP, key: string): string {
  const v = sp[key];
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}

function posInt(s: string): number | undefined {
  const n = Number(s.replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/** URL searchParams → doğrulanmış filtre nesnesi. Geçersiz değerler yok sayılır. */
export function parseListingFilters(sp: SP): ListingFilters {
  const kindRaw = first(sp, "islem");
  const kind =
    kindRaw === "satilik" || kindRaw === "kiralik" ? kindRaw : undefined;

  const typeRaw = first(sp, "tip");
  const type = PROPERTY_TYPE_OPTIONS.some((o) => o.value === typeRaw)
    ? typeRaw
    : undefined;

  const regionRaw = first(sp, "bolge");
  const region = /^[a-z0-9-]{2,40}$/.test(regionRaw) ? regionRaw : undefined;

  const roomsRaw = first(sp, "oda");
  const rooms = (ROOM_OPTIONS as readonly string[]).includes(roomsRaw)
    ? roomsRaw
    : undefined;

  const sortRaw = first(sp, "sirala");
  const sort: ListingSort =
    sortRaw === "price-asc" || sortRaw === "price-desc" ? sortRaw : "new";

  const pageRaw = posInt(first(sp, "sayfa"));
  const page = pageRaw && pageRaw <= 500 ? pageRaw : 1;

  let minPrice = posInt(first(sp, "min-fiyat"));
  let maxPrice = posInt(first(sp, "max-fiyat"));
  if (minPrice && maxPrice && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  let minArea = posInt(first(sp, "min-m2"));
  let maxArea = posInt(first(sp, "max-m2"));
  if (minArea && maxArea && minArea > maxArea) {
    [minArea, maxArea] = [maxArea, minArea];
  }

  return {
    kind,
    type,
    region,
    rooms,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    sort,
    page,
  };
}

/** Filtrelerden /ilanlar query string'i üretir (sayfalama/sıralama linkleri için). */
export function buildListingQuery(
  f: ListingFilters,
  overrides: Partial<ListingFilters> = {},
): string {
  const m = { ...f, ...overrides };
  const q = new URLSearchParams();
  if (m.kind) q.set("islem", m.kind);
  if (m.type) q.set("tip", m.type);
  if (m.region) q.set("bolge", m.region);
  if (m.rooms) q.set("oda", m.rooms);
  if (m.minPrice) q.set("min-fiyat", String(m.minPrice));
  if (m.maxPrice) q.set("max-fiyat", String(m.maxPrice));
  if (m.minArea) q.set("min-m2", String(m.minArea));
  if (m.maxArea) q.set("max-m2", String(m.maxArea));
  if (m.sort !== "new") q.set("sirala", m.sort);
  if (m.page > 1) q.set("sayfa", String(m.page));
  const s = q.toString();
  return s ? `?${s}` : "";
}

/** Herhangi bir filtre aktif mi (sayfa/sıralama hariç)? */
export function hasActiveFilters(f: ListingFilters): boolean {
  return Boolean(
    f.kind ||
      f.type ||
      f.region ||
      f.rooms ||
      f.minPrice ||
      f.maxPrice ||
      f.minArea ||
      f.maxArea,
  );
}
