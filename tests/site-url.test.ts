/**
 * SITE_URL sanitize regresyonu — bozuk NEXT_PUBLIC_SITE_URL değeri
 * (BOM'lu, tırnaklı, satırsonlu, tamamen geçersiz) build'i KIRMAMALI:
 * ya temizlenmiş değer ya güvenli fallback dönmeli. (Bu hata canlıda
 * tüm production build'lerini kilitledi — metadataBase ERR_INVALID_URL.)
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

const FALLBACK = "https://remaxboss.com.tr";
const BOM = String.fromCharCode(0xfeff);

async function siteUrlWith(envValue: string | undefined): Promise<string> {
  vi.resetModules();
  if (envValue === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = envValue;
  const mod = await import("@/lib/site-url");
  return mod.SITE_URL;
}

describe("SITE_URL sanitize", () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  it("env yokken fallback", async () => {
    expect(await siteUrlWith(undefined)).toBe(FALLBACK);
  });

  it("temiz değer aynen kullanılır", async () => {
    expect(await siteUrlWith("https://ornek.com.tr")).toBe(
      "https://ornek.com.tr",
    );
  });

  it("BOM'lu değer temizlenir (canlıdaki kaza senaryosu)", async () => {
    const out = await siteUrlWith(`${BOM}https://ornek.com.tr`);
    expect(out).toBe("https://ornek.com.tr");
    expect(() => new URL(out)).not.toThrow();
  });

  it("tırnaklı + satırsonlu değer temizlenir", async () => {
    expect(await siteUrlWith('"https://ornek.com.tr"\r\n')).toBe(
      "https://ornek.com.tr",
    );
  });

  it("sondaki eğik çizgi kırpılır", async () => {
    expect(await siteUrlWith("https://ornek.com.tr/")).toBe(
      "https://ornek.com.tr",
    );
  });

  it("tamamen geçersiz değerde fallback'e düşer, fırlatmaz", async () => {
    expect(await siteUrlWith("bozuk deger !!")).toBe(FALLBACK);
    expect(await siteUrlWith("javascript:alert(1)")).toBe(FALLBACK);
  });
});
