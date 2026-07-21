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
  changeFrequency: "weekly" | "monthly";
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Blog yazıları (statik içerik) — her yazı kendi yayın tarihiyle.
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  // Hizmet detay sayfaları.
  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/hizmetler/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Bölge detay sayfaları (yerel SEO landing).
  const regionEntries: MetadataRoute.Sitemap = REGIONS.map((r) => ({
    url: `${siteUrl}/bolgeler/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Rehber detayları
  const guideEntries: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${siteUrl}/rehberler/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Danışman detay sayfaları.
  const teamEntries: MetadataRoute.Sitemap = teamDetails.map((t) => ({
    url: `${siteUrl}/ekibimiz/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...regionEntries,
    ...guideEntries,
    ...teamEntries,
    ...blogEntries,
  ];
}
