/**
 * Bölge ↔ blog çapraz link eşleştirmesi — MEKANİK kural, uydurma yok:
 * bir blog yazısı, başlığında (TR) bölge adı geçiyorsa o bölgeyle ilişkilidir.
 * Eşleşme yoksa ilgili bölüm hiç render edilmez (boş kutu yok).
 */

import { REGIONS, type Region } from "./regions";
import { posts, type BlogPostBilingual } from "./blog";

/** Türkçe-güvenli normalize (karşılaştırma için). */
function norm(s: string): string {
  return s.toLocaleLowerCase("tr-TR");
}

/** Bölge adının aranabilir hâli — "Gaziosmanpaşa (GOP)" → "gaziosmanpaşa". */
function regionSearchName(r: Region): string {
  return norm(r.name.replace(/\s*\(.*\)\s*$/, "").trim());
}

/** Bu bölgeyle ilişkili blog yazıları (başlıkta bölge adı geçenler). */
export function postsForRegion(regionSlug: string): BlogPostBilingual[] {
  const region = REGIONS.find((r) => r.slug === regionSlug);
  if (!region) return [];
  const name = regionSearchName(region);
  return posts.filter((p) => norm(p.title.tr).includes(name));
}

/** Bu yazının başlığında adı geçen bölgeler (blog → bölge chip'leri). */
export function regionsForPost(postSlug: string): Region[] {
  const post = posts.find((p) => p.slug === postSlug);
  if (!post) return [];
  const title = norm(post.title.tr);
  return REGIONS.filter((r) => title.includes(regionSearchName(r)));
}
