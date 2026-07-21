import { getAllPostsLocalized } from "@/lib/blog";
import { getLocale } from "@/lib/i18n/server";
import { SITE_URL } from "@/lib/site-url";

/**
 * Blog RSS 2.0 feed'i — indekslemeyi hızlandırır.
 *   /feed.xml     → TR
 *   /en/feed.xml  → EN (proxy x-locale header'ıyla rewrite eder; getLocale
 *                   dili oradan okur, linkler /en prefix'iyle üretilir)
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const locale = await getLocale();
  const posts = getAllPostsLocalized(locale);
  const prefix = locale === "en" ? "/en" : "";

  const channelTitle =
    locale === "en"
      ? "RE/MAX BOSS — Blog & Guides"
      : "RE/MAX BOSS — Blog & Rehber";
  const channelDesc =
    locale === "en"
      ? "Area guides, buyer/seller advice and real-estate insights from RE/MAX BOSS, Ankara Beştepe."
      : "RE/MAX BOSS Ankara Beştepe'den bölge rehberleri, alıcı/satıcı tavsiyeleri ve gayrimenkul içerikleri.";
  const selfUrl = `${SITE_URL}${prefix}/feed.xml`;

  const items = posts
    .map((p) => {
      const link = `${SITE_URL}${prefix}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(channelTitle)}</title>
    <link>${SITE_URL}${prefix || "/"}</link>
    <description>${esc(channelDesc)}</description>
    <language>${locale === "en" ? "en" : "tr"}</language>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
