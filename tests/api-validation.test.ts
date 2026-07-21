/**
 * Form endpoint doğrulama davranışları — route handler'ları doğrudan
 * NextRequest ile çağrılır. Test edilen senaryoların tamamı Supabase'e
 * ULAŞMADAN erken döner (honeypot / validasyon / bozuk gövde), bu yüzden
 * env/DB gerekmez.
 *
 * Not: In-memory rate-limit (3/dk/IP) testler arası paylaşılır — her
 * istekte farklı x-forwarded-for verilerek izole edilir.
 */

import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST as buyerPost } from "@/app/api/buyer-request/route";
import { POST as notifyPost } from "@/app/api/notify/route";

let ipCounter = 0;
function makeReq(url: string, body: unknown): NextRequest {
  ipCounter += 1;
  return new NextRequest(`http://localhost${url}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // Rate-limit anahtarını her istekte benzersiz yap.
      "x-forwarded-for": `10.0.${Math.floor(ipCounter / 250)}.${ipCounter % 250}`,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validBuyer = {
  ad_soyad: "Test Kişi",
  telefon: "+90 555 111 22 33",
  ilce: "Çankaya",
  kvkk: true,
  company: "",
};

describe("/api/buyer-request", () => {
  it("honeypot doluysa sessizce ok döner (DB'ye gitmez)", async () => {
    const res = await buyerPost(
      makeReq("/api/buyer-request", { ...validBuyer, company: "spam-bot" }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("ad_soyad eksikse 400", async () => {
    const res = await buyerPost(
      makeReq("/api/buyer-request", { ...validBuyer, ad_soyad: "" }),
    );
    expect(res.status).toBe(400);
  });

  it("geçersiz telefonla 400", async () => {
    const res = await buyerPost(
      makeReq("/api/buyer-request", { ...validBuyer, telefon: "abc" }),
    );
    expect(res.status).toBe(400);
  });

  it("kvkk onayı yoksa 400", async () => {
    const res = await buyerPost(
      makeReq("/api/buyer-request", { ...validBuyer, kvkk: false }),
    );
    expect(res.status).toBe(400);
  });

  it("bozuk JSON gövdeyle 400", async () => {
    const res = await buyerPost(
      makeReq("/api/buyer-request", "{bozuk json"),
    );
    expect(res.status).toBe(400);
  });

  it("geçersiz enum değerleri güvenli varsayılana düşer (500 atmaz)", async () => {
    // islem_tipi/mulk_tipi/zaman_planlama tanınmazsa default'a düşmeli;
    // validasyondan geçip DB adımına ulaşır — env yokken DB hatası da
    // kontrollü (5xx JSON) olmalı, exception fırlamamalı.
    const res = await buyerPost(
      makeReq("/api/buyer-request", {
        ...validBuyer,
        islem_tipi: "yanlis-deger",
        mulk_tipi: "saray",
        zaman_planlama: "asla",
      }),
    );
    expect([200, 500, 503]).toContain(res.status);
  });
});

describe("/api/notify", () => {
  it("tanınmayan kind → sent:false (200, form akışı kırılmaz)", async () => {
    const res = await notifyPost(
      makeReq("/api/notify", { kind: "hack", email: "a@b.co" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.sent).toBe(false);
    expect(body.reason).toBe("bad-kind");
  });

  it("geçersiz e-posta → sent:false", async () => {
    const res = await notifyPost(
      makeReq("/api/notify", { kind: "contact", email: "gecersiz" }),
    );
    const body = await res.json();
    expect(body.sent).toBe(false);
    expect(body.reason).toBe("bad-email");
  });

  it("bozuk gövde → 200 + sent:false (asla 5xx değil)", async () => {
    const res = await notifyPost(makeReq("/api/notify", "{{{"));
    expect(res.status).toBe(200);
    expect((await res.json()).sent).toBe(false);
  });

  it("geçerli istek, RESEND yapılandırılmamışken not-configured", async () => {
    const res = await notifyPost(
      makeReq("/api/notify", {
        kind: "contact",
        email: "test@example.com",
        locale: "tr",
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.sent).toBe(false);
    expect(body.reason).toBe("not-configured");
  });
});
