/**
 * CSV/XLSX ilan içe aktarma — saf yardımcılar (client + server paylaşımlı).
 *
 * Akış: dosya client'ta parse edilir (SheetJS) → kullanıcı sütunları hedef
 * alanlarla eşler → önizleme/validasyon (bu dosyadaki saf fonksiyonlar) →
 * server action toplu upsert yapar (import-actions.ts).
 *
 * 🔴 UYDURMA YOK: Bu modül veri üretmez; yalnızca kullanıcının dosyasındaki
 * değerleri normalize eder. Geçersiz satır ATLANIR ve raporlanır.
 */

// ─── Hedef alan tanımları ───

export type ImportFieldKey =
  | "external_ref"
  | "listing_no"
  | "status"
  | "listing_type"
  | "property_type"
  | "title"
  | "description"
  | "price"
  | "currency"
  | "city"
  | "district"
  | "neighborhood"
  | "address"
  | "rooms"
  | "gross_area"
  | "net_area"
  | "building_age"
  | "floor"
  | "total_floors"
  | "heating"
  | "furnished"
  | "balcony"
  | "parking"
  | "featured"
  | "image_urls";

export interface ImportFieldDef {
  key: ImportFieldKey;
  /** Eşleştirme ekranında görünen etiket. */
  label: string;
  required: boolean;
  hint?: string;
  /** Otomatik ön-eşleştirmede aranan başlık takma adları (normalize edilmiş). */
  aliases: readonly string[];
}

/** norm("İlan Başlığı") → "ilanbasligi" — başlık karşılaştırması için. */
export function norm(s: string): string {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ç/g, "c")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]/g, "");
}

export const IMPORT_FIELDS: readonly ImportFieldDef[] = [
  {
    key: "external_ref",
    label: "Harici İlan No (referans)",
    required: false,
    hint: "Aynı no tekrar yüklenirse ilan GÜNCELLENİR (upsert anahtarı).",
    aliases: ["ilanno", "ilannumarasi", "referans", "referansno", "refno", "portfoyno", "listingno", "id", "myreno"],
  },
  {
    key: "title",
    label: "Başlık",
    required: true,
    aliases: ["baslik", "ilanbaslik", "ilanbasligi", "title", "ad", "ilanadi"],
  },
  {
    key: "listing_type",
    label: "İşlem Tipi (satılık/kiralık)",
    required: true,
    aliases: ["islemtipi", "islem", "tip", "satiskiralik", "kategori", "listingtype", "durum"],
  },
  {
    key: "price",
    label: "Fiyat",
    required: true,
    aliases: ["fiyat", "price", "tutar", "bedel", "satisfiyati", "kirabedeli"],
  },
  {
    key: "currency",
    label: "Para Birimi",
    required: false,
    hint: "Boşsa TRY varsayılır.",
    aliases: ["parabirimi", "currency", "doviz"],
  },
  {
    key: "property_type",
    label: "Mülk Tipi",
    required: false,
    aliases: ["mulktipi", "emlaktipi", "gayrimenkultipi", "propertytype", "konuttipi"],
  },
  {
    key: "status",
    label: "Yayın Durumu",
    required: false,
    hint: "Boşsa 'taslak' olarak alınır; yayına almayı panelden yaparsınız.",
    aliases: ["yayindurumu", "durumu", "status", "aktif"],
  },
  {
    key: "description",
    label: "Açıklama",
    required: false,
    aliases: ["aciklama", "description", "detay", "ilanaciklamasi"],
  },
  {
    key: "city",
    label: "Şehir",
    required: false,
    hint: "Boşsa Ankara varsayılır.",
    aliases: ["sehir", "il", "city"],
  },
  {
    key: "district",
    label: "İlçe",
    required: false,
    aliases: ["ilce", "district", "semt"],
  },
  {
    key: "neighborhood",
    label: "Mahalle",
    required: false,
    aliases: ["mahalle", "neighborhood", "bolge"],
  },
  {
    key: "address",
    label: "Adres",
    required: false,
    aliases: ["adres", "address", "acikadres"],
  },
  {
    key: "rooms",
    label: "Oda Sayısı (örn. 3+1)",
    required: false,
    aliases: ["oda", "odasayisi", "rooms", "odasalon"],
  },
  {
    key: "gross_area",
    label: "Brüt m²",
    required: false,
    aliases: ["brutm2", "brut", "brutmetrekare", "grossarea", "m2brut", "metrekare", "m2"],
  },
  {
    key: "net_area",
    label: "Net m²",
    required: false,
    aliases: ["netm2", "net", "netmetrekare", "netarea", "m2net"],
  },
  {
    key: "building_age",
    label: "Bina Yaşı",
    required: false,
    aliases: ["binayasi", "yas", "buildingage", "binayas"],
  },
  {
    key: "floor",
    label: "Bulunduğu Kat",
    required: false,
    aliases: ["kat", "bulundugukat", "floor"],
  },
  {
    key: "total_floors",
    label: "Toplam Kat",
    required: false,
    aliases: ["toplamkat", "katsayisi", "totalfloors", "binakatsayisi"],
  },
  {
    key: "heating",
    label: "Isıtma",
    required: false,
    aliases: ["isitma", "heating", "isitmatipi"],
  },
  {
    key: "furnished",
    label: "Eşyalı (evet/hayır)",
    required: false,
    aliases: ["esyali", "furnished", "esya", "mobilyali"],
  },
  {
    key: "balcony",
    label: "Balkon (evet/hayır)",
    required: false,
    aliases: ["balkon", "balcony"],
  },
  {
    key: "parking",
    label: "Otopark (evet/hayır)",
    required: false,
    aliases: ["otopark", "parking", "garaj"],
  },
  {
    key: "featured",
    label: "Öne Çıkan (evet/hayır)",
    required: false,
    aliases: ["onecikan", "featured", "vitrin"],
  },
  {
    key: "image_urls",
    label: "Görsel URL'leri (virgülle)",
    required: false,
    hint: "Birden çok URL virgül veya noktalı virgülle ayrılır.",
    aliases: ["gorseller", "gorselurl", "resimler", "fotograflar", "images", "imageurls", "fotourl"],
  },
  {
    key: "listing_no",
    label: "İç İlan No",
    required: false,
    aliases: ["icilanno", "icreferans", "ofisno"],
  },
] as const;

/** Dosya başlıklarına göre otomatik ön-eşleştirme önerisi. */
export function autoMap(
  headers: readonly string[],
): Partial<Record<ImportFieldKey, string>> {
  const out: Partial<Record<ImportFieldKey, string>> = {};
  const normalized = headers.map((h) => ({ raw: h, n: norm(h) }));
  for (const field of IMPORT_FIELDS) {
    const hit = normalized.find(
      (h) => h.n && (field.aliases.includes(h.n) || h.n === norm(field.label)),
    );
    if (hit && !Object.values(out).includes(hit.raw)) {
      out[field.key] = hit.raw;
    }
  }
  return out;
}

// ─── Değer normalizasyonu ───

/** TR biçimli sayı: "1.250.000,50" → 1250000.5 ; "120" → 120. */
export function parseTrNumber(v: string): number | null {
  const s = v.trim().replace(/[^\d.,-]/g, "");
  if (!s) return null;
  let cleaned: string;
  if (s.includes(",")) {
    // virgül ondalık ayracı; noktalar binlik
    cleaned = s.replace(/\./g, "").replace(",", ".");
  } else {
    const dots = (s.match(/\./g) ?? []).length;
    // birden çok nokta → binlik ayraç ("1.250.000"); tek nokta ve 3 haneli
    // son grup da binlik kabul edilir ("1.250" → 1250).
    if (dots > 1 || /\.\d{3}$/.test(s)) {
      cleaned = s.replace(/\./g, "");
    } else {
      cleaned = s;
    }
  }
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function parseBool(v: string): boolean | null {
  const n = norm(v);
  if (!n) return null;
  if (["evet", "var", "true", "1", "yes", "x"].includes(n)) return true;
  if (["hayir", "yok", "false", "0", "no"].includes(n)) return false;
  return null;
}

export function parseListingType(v: string): "satilik" | "kiralik" | null {
  const n = norm(v);
  if (!n) return null;
  if (n.includes("satilik") || n.includes("satis") || n === "sale" || n === "forsale")
    return "satilik";
  if (n.includes("kiralik") || n.includes("kira") || n === "rent" || n === "forrent")
    return "kiralik";
  return null;
}

export function parseCurrency(v: string): "TRY" | "USD" | "EUR" | null {
  const n = norm(v);
  if (!n) return null;
  if (["try", "tl", "₺", "turklirasi"].includes(n) || n.includes("lira")) return "TRY";
  if (["usd", "dolar", "$", "usdollar"].includes(n) || n.includes("dolar")) return "USD";
  if (["eur", "euro", "avro", "€"].includes(n)) return "EUR";
  return null;
}

export function parseStatus(v: string): "draft" | "published" | null {
  const n = norm(v);
  if (!n) return null;
  if (["yayin", "yayinda", "published", "aktif", "active", "evet", "1", "true"].includes(n))
    return "published";
  if (["taslak", "draft", "pasif", "passive", "hayir", "0", "false"].includes(n))
    return "draft";
  return null;
}

/** Mülk tipini bilinen kategorilere normalize eder; eşleşmezse ham değer korunur. */
export function parsePropertyType(v: string): string | null {
  const n = norm(v);
  if (!n) return null;
  if (n.includes("daire") || n.includes("apartman") || n === "flat" || n === "apartment")
    return "daire";
  if (n.includes("villa")) return "villa";
  if (n.includes("mustakil") || n.includes("detached")) return "mustakil";
  if (n.includes("ofis") || n.includes("office") || n.includes("plaza")) return "ofis";
  if (n.includes("dukkan") || n.includes("magaza") || n.includes("shop")) return "dukkan";
  if (n.includes("arsa") || n.includes("arazi") || n.includes("land")) return "arsa";
  if (n.includes("isyeri") || n.includes("ticari") || n.includes("commercial"))
    return "isyeri";
  return v.trim();
}

// ─── Satır doğrulama ───

/** Toplu insert/update payload'u — listings kolon adlarıyla. */
export interface ImportRowPayload {
  external_ref: string | null;
  listing_no: string | null;
  status: "draft" | "published";
  listing_type: "satilik" | "kiralik";
  property_type: string | null;
  title: string;
  description: string | null;
  price: number;
  currency: "TRY" | "USD" | "EUR";
  city: string;
  district: string | null;
  neighborhood: string | null;
  address: string | null;
  rooms: string | null;
  gross_area: number | null;
  net_area: number | null;
  building_age: number | null;
  floor: string | null;
  total_floors: number | null;
  heating: string | null;
  furnished: boolean | null;
  balcony: boolean | null;
  parking: boolean | null;
  featured: boolean;
  image_urls: string[];
}

export interface RowIssue {
  /** 1-tabanlı veri satırı numarası (başlık hariç). */
  row: number;
  message: string;
}

export interface ValidationResult {
  valid: ImportRowPayload[];
  skipped: RowIssue[];
}

const MAX_TEXT = 2000;

function cell(
  row: Record<string, unknown>,
  mapping: Partial<Record<ImportFieldKey, string>>,
  key: ImportFieldKey,
): string {
  const col = mapping[key];
  if (!col) return "";
  const v = row[col];
  if (v == null) return "";
  return String(v).trim();
}

/**
 * Eşlenmiş ham satırları doğrular. Zorunlu alanı eksik/geçersiz satır
 * ATLANIR ve nedeniyle raporlanır; kalanlar payload'a çevrilir.
 */
export function validateRows(
  rows: readonly Record<string, unknown>[],
  mapping: Partial<Record<ImportFieldKey, string>>,
): ValidationResult {
  const valid: ImportRowPayload[] = [];
  const skipped: RowIssue[] = [];
  const seenRefs = new Set<string>();

  rows.forEach((row, i) => {
    const rowNo = i + 1;

    const title = cell(row, mapping, "title").slice(0, 300);
    if (!title) {
      skipped.push({ row: rowNo, message: "Başlık boş — satır atlandı." });
      return;
    }

    const typeRaw = cell(row, mapping, "listing_type");
    const listing_type = parseListingType(typeRaw);
    if (!listing_type) {
      skipped.push({
        row: rowNo,
        message: `İşlem tipi tanınamadı ("${typeRaw || "boş"}") — satılık/kiralık bekleniyor.`,
      });
      return;
    }

    const priceRaw = cell(row, mapping, "price");
    const price = parseTrNumber(priceRaw);
    if (price == null || price < 0) {
      skipped.push({
        row: rowNo,
        message: `Fiyat okunamadı ("${priceRaw || "boş"}").`,
      });
      return;
    }

    const external_ref = cell(row, mapping, "external_ref").slice(0, 120) || null;
    if (external_ref) {
      if (seenRefs.has(external_ref)) {
        skipped.push({
          row: rowNo,
          message: `Harici ilan no "${external_ref}" dosyada birden fazla — ilk satır alındı.`,
        });
        return;
      }
      seenRefs.add(external_ref);
    }

    const imageRaw = cell(row, mapping, "image_urls");
    const image_urls = imageRaw
      ? imageRaw
          .split(/[;,|\n]/)
          .map((u) => u.trim())
          .filter((u) => /^https?:\/\//i.test(u))
          .slice(0, 30)
      : [];

    const grossArea = parseTrNumber(cell(row, mapping, "gross_area"));
    const netArea = parseTrNumber(cell(row, mapping, "net_area"));
    const buildingAge = parseTrNumber(cell(row, mapping, "building_age"));
    const totalFloors = parseTrNumber(cell(row, mapping, "total_floors"));

    valid.push({
      external_ref,
      listing_no: cell(row, mapping, "listing_no").slice(0, 120) || null,
      status: parseStatus(cell(row, mapping, "status")) ?? "draft",
      listing_type,
      property_type: parsePropertyType(cell(row, mapping, "property_type")),
      title,
      description: cell(row, mapping, "description").slice(0, MAX_TEXT * 4) || null,
      price,
      currency: parseCurrency(cell(row, mapping, "currency")) ?? "TRY",
      city: cell(row, mapping, "city").slice(0, 120) || "Ankara",
      district: cell(row, mapping, "district").slice(0, 200) || null,
      neighborhood: cell(row, mapping, "neighborhood").slice(0, 200) || null,
      address: cell(row, mapping, "address").slice(0, 500) || null,
      rooms: cell(row, mapping, "rooms").slice(0, 30) || null,
      gross_area: grossArea != null && grossArea > 0 ? grossArea : null,
      net_area: netArea != null && netArea > 0 ? netArea : null,
      building_age:
        buildingAge != null && buildingAge >= 0 ? Math.round(buildingAge) : null,
      floor: cell(row, mapping, "floor").slice(0, 60) || null,
      total_floors:
        totalFloors != null && totalFloors > 0 ? Math.round(totalFloors) : null,
      heating: cell(row, mapping, "heating").slice(0, 120) || null,
      furnished: parseBool(cell(row, mapping, "furnished")),
      balcony: parseBool(cell(row, mapping, "balcony")),
      parking: parseBool(cell(row, mapping, "parking")),
      featured: parseBool(cell(row, mapping, "featured")) ?? false,
      image_urls,
    });
  });

  return { valid, skipped };
}

/** İçe aktarma sınırları (client + server aynı sabitleri kullanır). */
export const IMPORT_LIMITS = {
  maxFileBytes: 5 * 1024 * 1024, // 5 MB
  maxRows: 1000,
} as const;
