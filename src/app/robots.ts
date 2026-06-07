import type { MetadataRoute } from "next";

const siteUrl = "https://remax-boss-v2.vercel.app";

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
