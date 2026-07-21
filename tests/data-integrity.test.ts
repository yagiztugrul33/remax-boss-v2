/**
 * Statik içerik veri bütünlüğü — slug tekilliği, zorunlu alanlar,
 * çapraz referanslar (neighbors, blog iç linkleri) ve nav route geçerliliği.
 */

import { describe, it, expect } from "vitest";
import { REGIONS, getRegionBySlug } from "@/lib/regions";
import { posts } from "@/lib/blog";
import { GUIDES } from "@/lib/guides";
import { services } from "@/lib/services";
import { navItems } from "@/lib/office";
import { teamDetails } from "@/lib/team-detail";

const SLUG_RE = /^[a-z0-9-]+$/;

function uniq(list: readonly string[]): boolean {
  return new Set(list).size === list.length;
}

/** Sitedeki geçerli statik path'ler (iç link doğrulaması için). */
const STATIC_ROUTES = new Set([
  "/",
  "/ilanlar",
  "/hizmetler",
  "/bolgeler",
  "/rehberler",
  "/blog",
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
  "/login",
]);

function isValidInternalHref(href: string): boolean {
  const [path] = href.split(/[?#]/);
  if (STATIC_ROUTES.has(path)) return true;
  const dyn = path.match(/^\/(bolgeler|rehberler|hizmetler|blog|ekibimiz)\/([a-z0-9-]+)$/);
  if (!dyn) return false;
  const [, base, slug] = dyn;
  switch (base) {
    case "bolgeler":
      return REGIONS.some((r) => r.slug === slug);
    case "rehberler":
      return GUIDES.some((g) => g.slug === slug);
    case "hizmetler":
      return services.some((s) => s.slug === slug);
    case "blog":
      return posts.some((p) => p.slug === slug);
    case "ekibimiz":
      return teamDetails.some((t) => t.slug === slug);
    default:
      return false;
  }
}

describe("regions.ts", () => {
  it("slug'lar tekil ve url-safe", () => {
    const slugs = REGIONS.map((r) => r.slug);
    expect(uniq(slugs)).toBe(true);
    for (const s of slugs) expect(s).toMatch(SLUG_RE);
  });

  it("zorunlu alanlar dolu (bilingual)", () => {
    for (const r of REGIONS) {
      expect(r.name.trim()).not.toBe("");
      expect(r.hero.intro.tr.trim()).not.toBe("");
      expect(r.hero.intro.en.trim()).not.toBe("");
      expect(r.meta.title.tr.trim()).not.toBe("");
      expect(r.meta.title.en.trim()).not.toBe("");
      expect(r.facts.length).toBeGreaterThanOrEqual(4);
      expect(r.about.length).toBeGreaterThanOrEqual(1);
      expect(r.serviceHighlights.length).toBeGreaterThanOrEqual(1);
      expect(r.serviceBlurb.tr.trim()).not.toBe("");
      expect(r.serviceBlurb.en.trim()).not.toBe("");
    }
  });

  it("neighbors yalnız var olan slug'lara işaret eder", () => {
    for (const r of REGIONS) {
      for (const n of r.neighbors) {
        expect(
          getRegionBySlug(n),
          `${r.slug} → komşu "${n}" bulunamadı`,
        ).not.toBeNull();
        expect(n).not.toBe(r.slug); // kendine komşu olamaz
      }
    }
  });
});

describe("blog.ts", () => {
  it("slug'lar tekil ve url-safe", () => {
    const slugs = posts.map((p) => p.slug);
    expect(uniq(slugs)).toBe(true);
    for (const s of slugs) expect(s).toMatch(SLUG_RE);
  });

  it("bilingual alanlar dolu, paragraf sayıları TR/EN eşit", () => {
    for (const p of posts) {
      expect(p.title.tr.trim()).not.toBe("");
      expect(p.title.en.trim()).not.toBe("");
      expect(p.intro.tr.trim()).not.toBe("");
      expect(p.intro.en.trim()).not.toBe("");
      expect(p.sections.length).toBeGreaterThan(0);
      for (const s of p.sections) {
        expect(
          s.paragraphs.tr.length,
          `${p.slug} bölümünde TR/EN paragraf sayısı farklı`,
        ).toBe(s.paragraphs.en.length);
      }
    }
  });

  it("bölüm içi çapraz linkler geçerli route'lara gider", () => {
    for (const p of posts) {
      for (const s of p.sections) {
        for (const l of s.links ?? []) {
          expect(
            isValidInternalHref(l.href),
            `${p.slug} → geçersiz link "${l.href}"`,
          ).toBe(true);
        }
      }
    }
  });
});

describe("guides.ts", () => {
  it("slug'lar tekil, adımlar ve CTA hedefi geçerli", () => {
    const slugs = GUIDES.map((g) => g.slug);
    expect(uniq(slugs)).toBe(true);
    for (const g of GUIDES) {
      expect(g.slug).toMatch(SLUG_RE);
      expect(g.title.tr.trim()).not.toBe("");
      expect(g.title.en.trim()).not.toBe("");
      expect(g.steps.length).toBeGreaterThanOrEqual(3);
      expect(["/degerleme", "/alici-kayit", "/iletisim"]).toContain(g.ctaHref);
    }
  });
});

describe("services.ts", () => {
  it("slug'lar tekil", () => {
    expect(uniq(services.map((s) => s.slug))).toBe(true);
  });
});

describe("navigasyon", () => {
  it("navItems href'leri geçerli route'lar", () => {
    for (const item of navItems) {
      const path = item.href.split("#")[0] || "/";
      expect(
        isValidInternalHref(path),
        `navItems → geçersiz href "${item.href}"`,
      ).toBe(true);
    }
  });

  it("teamDetails slug'ları tekil", () => {
    expect(uniq(teamDetails.map((t) => t.slug))).toBe(true);
  });
});
