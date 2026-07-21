/**
 * Sitemap bütünlüğü — tüm public route'lar listede, her path için
 * TR (kök) + EN (/en) çifti ve hreflang alternates haritası var;
 * admin/login/api asla sitemap'e girmez.
 */

import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import { SITE_URL } from "@/lib/site-url";
import { REGIONS } from "@/lib/regions";
import { GUIDES } from "@/lib/guides";
import { posts } from "@/lib/blog";
import { services } from "@/lib/services";

const entries = sitemap();
const urls = new Set(entries.map((e) => e.url));

const PUBLIC_PATHS = [
  "/",
  "/ilanlar",
  "/hizmetler",
  "/bolgeler",
  "/blog",
  "/rehberler",
  "/araclar",
  "/hakkimizda",
  "/ekibimiz",
  "/danisman-ol",
  "/kampanya",
  "/iletisim",
  "/sss",
  "/degerleme",
  "/alici-kayit",
  "/kvkk-aydinlatma",
  "/gizlilik-politikasi",
  "/cerez-politikasi",
  "/kullanim-sartlari",
];

function trUrl(path: string) {
  return `${SITE_URL}${path}`;
}
function enUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "/en" : `/en${path}`}`;
}

describe("sitemap", () => {
  it("tüm public statik route'lar TR + EN çifti olarak listede", () => {
    for (const p of PUBLIC_PATHS) {
      expect(urls.has(trUrl(p)), `TR eksik: ${p}`).toBe(true);
      expect(urls.has(enUrl(p)), `EN eksik: ${p}`).toBe(true);
    }
  });

  it("dinamik detaylar (bölge/rehber/hizmet/blog) iki dilde listede", () => {
    for (const r of REGIONS) {
      expect(urls.has(trUrl(`/bolgeler/${r.slug}`))).toBe(true);
      expect(urls.has(enUrl(`/bolgeler/${r.slug}`))).toBe(true);
    }
    for (const g of GUIDES) {
      expect(urls.has(trUrl(`/rehberler/${g.slug}`))).toBe(true);
      expect(urls.has(enUrl(`/rehberler/${g.slug}`))).toBe(true);
    }
    for (const s of services) {
      expect(urls.has(trUrl(`/hizmetler/${s.slug}`))).toBe(true);
    }
    for (const p of posts) {
      expect(urls.has(trUrl(`/blog/${p.slug}`))).toBe(true);
    }
  });

  it("her girdide hreflang alternates (tr/en/x-default) var", () => {
    for (const e of entries) {
      const langs = e.alternates?.languages as
        | Record<string, string>
        | undefined;
      expect(langs, `alternates eksik: ${e.url}`).toBeDefined();
      expect(langs!.tr, e.url).toBeDefined();
      expect(langs!.en, e.url).toBeDefined();
      expect(langs!["x-default"], e.url).toBeDefined();
      // x-default her zaman TR (kök) URL'si.
      expect(langs!["x-default"]).toBe(langs!.tr);
    }
  });

  it("admin / login / api sitemap'te YOK", () => {
    for (const u of urls) {
      expect(u).not.toMatch(/\/(admin|login|api)(\/|$)/);
    }
  });

  it("URL'ler tekil", () => {
    expect(urls.size).toBe(entries.length);
  });
});
