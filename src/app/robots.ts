import type { MetadataRoute } from "next";
import { SITE_URL as siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Yönetim ve giriş sayfaları indexlenmez.
        disallow: ["/admin", "/admin/", "/login"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
