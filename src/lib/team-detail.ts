import { team, type Agent } from "./office";

/**
 * Ekip detay sayfası için iskelet — `/ekibimiz/[slug]` route'u burası üzerinden çalışır.
 *
 * Mevcut Agent (office.ts) DOKUNULMADI. Bu modül, her ekip üyesi için
 * GENİŞLETİLMİŞ alanları (bio, dil, uzmanlık, sosyal medya) yöneten BOŞ
 * iskelet sağlar — kullanıcı/danışman gerçek bilgileri verince burası dolar.
 *
 * 🔴 UYDURMA YOK: hiçbir biyografi/uzmanlık/sertifika yazılmadı. Eklenmeyen
 * alanlar gizlenir, sayfa "Bu danışman için detaylı profil hazırlanıyor"
 * mesajıyla iletişim CTA'sına yönlendirir.
 */

export interface AgentDetail {
  /** office.ts'deki Agent.name ile birebir aynı (eşleme anahtarı). */
  name: string;
  /** URL-safe slug (Türkçe karakter normalize). */
  slug: string;
  /** Kısa biyografi (boşsa "hazırlanıyor" durumu). */
  bio?: string;
  /** Konuştuğu diller (örn. ["Türkçe", "İngilizce"]). */
  languages?: readonly string[];
  /** Uzmanlık alanları (örn. ["Lüks konut", "Yatırım analizi"]). */
  specialties?: readonly string[];
  /** Sertifika/lisanslar (örn. ["RE/MAX MAXX", "Lisanslı Emlak Danışmanı"]). */
  certifications?: readonly string[];
  /** Yıllar — meslek deneyim yılı (sayı). */
  yearsExperience?: number;
  /** Doğrudan iletişim — boşsa office.phone gösterilir. */
  directPhone?: string;
  /** Doğrudan e-posta — boşsa office.email gösterilir. */
  directEmail?: string;
  /** WhatsApp linki (tam URL veya wa.me/...). */
  whatsapp?: string;
  /** LinkedIn profili (tam URL). */
  linkedin?: string;
  /** Instagram profili (tam URL). */
  instagram?: string;
}

/**
 * Türkçe karakter-safe slug üretici.
 * "Yusufbatuhan Kalkan" → "yusufbatuhan-kalkan"
 * "Ömer Sırrı Cankıymaz" → "omer-sirri-cankiymaz"
 */
export function slugifyName(name: string): string {
  return name
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // aksanları kaldır
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * BOŞ iskelet: her üye için yalnız (name, slug) — diğer alanlar undefined.
 * Gerçek bilgi geldiğinde aşağıya manuel eklenir (uydurma yok kuralı).
 *
 * Sayfa, undefined alanlar için fallback'lere düşer:
 *   - bio yoksa → "Bu danışman için detaylı profil hazırlanıyor."
 *   - directPhone/Email yoksa → office.phone / office.email
 *   - sosyal medya yoksa → o satır gizlenir.
 */
export const teamDetails: readonly AgentDetail[] = team.map(
  (m): AgentDetail => ({
    name: m.name,
    slug: slugifyName(m.name),
  }),
);

/** Slug → Agent + AgentDetail birleştirir. */
export function getAgentBySlug(
  slug: string,
): { agent: Agent; detail: AgentDetail } | null {
  const detail = teamDetails.find((d) => d.slug === slug);
  if (!detail) return null;
  const agent = team.find((m) => m.name === detail.name);
  if (!agent) return null;
  return { agent, detail };
}

/** Tüm geçerli slug'lar — generateStaticParams için. */
export function getAllAgentSlugs(): string[] {
  return teamDetails.map((d) => d.slug);
}
