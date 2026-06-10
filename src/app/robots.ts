import type { MetadataRoute } from "next";
import { SITE_URL as siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Yönetim, giriş, API endpoint'leri ve KVKK silme talep akışı
        // indexlenmez. /admin* tüm alt rotaları kapsar.
        disallow: [
          "/admin",
          "/admin/",
          "/login",
          "/api",
          "/api/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
