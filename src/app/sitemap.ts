import type { MetadataRoute } from "next";

const siteUrl = "https://remax-boss-v2.vercel.app";

// Yayında olan statik rotalar. İlan detay sayfaları veri-bağımlı olduğundan
// /ilanlar listeleme sayfası üzerinden taranır.
const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/ilanlar", priority: 0.9, changeFrequency: "weekly" },
  { path: "/hakkimizda", priority: 0.7, changeFrequency: "monthly" },
  { path: "/danisman-ol", priority: 0.7, changeFrequency: "monthly" },
  { path: "/iletisim", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
