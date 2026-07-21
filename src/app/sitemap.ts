import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { services } from "@/lib/services";
import { REGIONS } from "@/lib/regions";
import { GUIDES } from "@/lib/guides";
import { teamDetails } from "@/lib/team-detail";
import { SITE_URL as siteUrl } from "@/lib/site-url";

// Yayında olan statik rotalar. İlan detay sayfaları veri-bağımlı olduğundan
// /ilanlar listeleme sayfası üzerinden taranır.
const routes: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/ilanlar", priority: 0.9, changeFrequency: "weekly" },
  { path: "/hizmetler", priority: 0.8, changeFrequency: "monthly" },
  { path: "/bolgeler", priority: 0.85, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/rehberler", priority: 0.8, changeFrequency: "monthly" },
  { path: "/araclar", priority: 0.7, changeFrequency: "monthly" },
  { path: "/hakkimizda", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ekibimiz", priority: 0.6, changeFrequency: "monthly" },
  { path: "/danisman-ol", priority: 0.7, changeFrequency: "monthly" },
  { path: "/kampanya", priority: 0.6, changeFrequency: "monthly" },
  { path: "/iletisim", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sss", priority: 0.7, changeFrequency: "monthly" },
  { path: "/degerleme", priority: 0.85, changeFrequency: "monthly" },
  { path: "/alici-kayit", priority: 0.85, changeFrequency: "monthly" },
  // Yasal sayfalar — düşük öncelik ama indekslenebilir.
  { path: "/kvkk-aydinlatma", priority: 0.3, changeFrequency: "monthly" },
  { path: "/gizlilik-politikasi", priority: 0.3, changeFrequency: "monthly" },
  { path: "/cerez-politikasi", priority: 0.3, changeFrequency: "monthly" },
  { path: "/kullanim-sartlari", priority: 0.3, changeFrequency: "monthly" },
];

type Entry = MetadataRoute.Sitemap[number];

/**
 * Bir path için TR (kök) + EN (/en prefix) olmak üzere İKİ sitemap girdisi
 * üretir; her ikisinde hreflang alternates haritası bulunur. Google iki dili
 * ayrı URL'lerde ayrı ayrı indeksler.
 */
function bilingualEntries(
  path: string,
  opts: Pick<Entry, "lastModified" | "changeFrequency" | "priority">,
): Entry[] {
  const trUrl = `${siteUrl}${path}`;
  const enUrl = `${siteUrl}${path === "/" ? "/en" : `/en${path}`}`;
  const languages = { tr: trUrl, en: enUrl, "x-default": trUrl };
  return [
    { url: trUrl, ...opts, alternates: { languages } },
    { url: enUrl, ...opts, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = routes.flatMap((r) =>
    bilingualEntries(r.path, {
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    }),
  );

  // Blog yazıları (statik içerik) — her yazı kendi yayın tarihiyle.
  const blogEntries = posts.flatMap((p) =>
    bilingualEntries(`/blog/${p.slug}`, {
      lastModified: new Date(p.date),
      changeFrequency: "yearly",
      priority: 0.7,
    }),
  );

  // Hizmet detay sayfaları.
  const serviceEntries = services.flatMap((s) =>
    bilingualEntries(`/hizmetler/${s.slug}`, {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  // Bölge detay sayfaları (yerel SEO landing).
  const regionEntries = REGIONS.flatMap((r) =>
    bilingualEntries(`/bolgeler/${r.slug}`, {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  // Rehber detayları
  const guideEntries = GUIDES.flatMap((g) =>
    bilingualEntries(`/rehberler/${g.slug}`, {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  // Danışman detay sayfaları.
  const teamEntries = teamDetails.flatMap((t) =>
    bilingualEntries(`/ekibimiz/${t.slug}`, {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    }),
  );

  return [
    ...staticEntries,
    ...serviceEntries,
    ...regionEntries,
    ...guideEntries,
    ...teamEntries,
    ...blogEntries,
  ];
}
