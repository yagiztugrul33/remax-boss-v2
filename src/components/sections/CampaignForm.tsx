"use client";

import { useId, useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";
type FieldName = "ad" | "tel" | "email" | "konum" | "yetki" | "kvkk" | "mesaj";

const PHONE_RE = /^[+()\d\s-]{7,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 200;
const MAX_PHONE = 40;
const MAX_EMAIL = 200;
const MAX_LOCATION = 300;
const MAX_MESSAGE = 2000;
const MAX_VALUE_DIGITS = 16;

/**
 * Kampanya başvuru formu — /api/campaign-apply üzerinden
 * campaign_applications tablosuna anon INSERT (RLS). Server endpoint'inde
 * rate-limit (3/dakika/IP), validasyon, 2000 chr mesaj slice.
 * Ödül VAATETMEZ: başvuru değerlendirme talebidir, hak doğurmaz.
 *
 * A11y: hatalı alana aria-invalid + aria-describedby.
 */
export default function CampaignForm() {
  const ids = {
    ad: useId(),
    tel: useId(),
    email: useId(),
    konum: useId(),
    deger: useId(),
    mesaj: useId(),
    yetki: useId(),
    kvkk: useId(),
    errorMsg: useId(),
  };
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<FieldName | null>(null);

  function reportError(field: FieldName, msg: string) {
    setError(msg);
    setErrorField(field);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "").trim() !== "") return; // honeypot

    const ad_soyad = String(data.get("ad_soyad") ?? "").trim();
    const telefon = String(data.get("telefon") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const mulk_konumu = String(data.get("mulk_konumu") ?? "").trim();
    const degerRaw = String(data.get("tahmini_deger") ?? "")
      .replace(/[^\d]/g, "")
      .slice(0, MAX_VALUE_DIGITS);
    const mesajRaw = String(data.get("mesaj") ?? "").trim();
    const mesaj = mesajRaw.slice(0, MAX_MESSAGE); // defansif client slice
    const yetki = data.get("yetki") === "on";
    const kvkk = data.get("kvkk") === "on";

    setError(null);
    setErrorField(null);

    if (!ad_soyad) return reportError("ad", "Lütfen ad soyad girin.");
    if (!telefon || !PHONE_RE.test(telefon))
      return reportError("tel", "Lütfen geçerli bir telefon numarası girin.");
    if (email && !EMAIL_RE.test(email))
      return reportError("email", "Girdiğiniz e-posta adresi geçersiz görünüyor.");
    if (!mulk_konumu)
      return reportError("konum", "Lütfen mülkün konumunu yazın.");
    if (!yetki)
      return reportError(
        "yetki",
        "Devam etmek için münhasır yetki şartını kabul edin.",
      );
    if (!kvkk)
      return reportError(
        "kvkk",
        "Lütfen KVKK aydınlatma onayını işaretleyin.",
      );

    setStatus("sending");
    try {
      const res = await fetch("/api/campaign-apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ad_soyad,
          telefon,
          email,
          mulk_konumu,
          tahmini_deger: degerRaw,
          mesaj,
          yetki,
          kvkk,
          company: "",
        }),
      });
      const result = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(
          result.error ||
            "Başvuru gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
        );
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Başvuru gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
      );
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition-colors";
  const errId = error ? ids.errorMsg : undefined;

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 md:p-10 text-center shadow-card"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 font-display font-bold text-xl text-navy">
          Başvurunuz alındı
        </h3>
        <p className="mt-2 text-sm text-navy/65 leading-relaxed max-w-sm mx-auto">
          Ekibimiz başvurunuzu ve mülk değerlemesini inceleyip en kısa sürede
          sizinle iletişime geçecek. İlginiz için teşekkürler.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-white p-6 md:p-8 space-y-4 shadow-card"
      noValidate
    >
      <div
        aria-hidden
        className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label>
          Şirket (boş bırakın)
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={ids.ad} className="block text-sm font-semibold text-navy mb-1.5">
            Ad Soyad <span className="text-remax-red">*</span>
          </label>
          <input
            id={ids.ad}
            name="ad_soyad"
            required
            type="text"
            autoComplete="name"
            placeholder="Adınız Soyadınız"
            maxLength={MAX_NAME}
            aria-invalid={errorField === "ad" || undefined}
            aria-describedby={errorField === "ad" ? errId : undefined}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={ids.tel} className="block text-sm font-semibold text-navy mb-1.5">
            Telefon <span className="text-remax-red">*</span>
          </label>
          <input
            id={ids.tel}
            name="telefon"
            required
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+90 5XX XXX XX XX"
            maxLength={MAX_PHONE}
            aria-invalid={errorField === "tel" || undefined}
            aria-describedby={errorField === "tel" ? errId : undefined}
            className={inputClass}
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label htmlFor={ids.email} className="block text-sm font-semibold text-navy mb-1.5">
          E-posta <span className="text-navy/40 font-normal">(opsiyonel)</span>
        </label>
        <input
          id={ids.email}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ornek@eposta.com"
          maxLength={MAX_EMAIL}
          aria-invalid={errorField === "email" || undefined}
          aria-describedby={errorField === "email" ? errId : undefined}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={ids.konum} className="block text-sm font-semibold text-navy mb-1.5">
            Mülkün Konumu <span className="text-remax-red">*</span>
          </label>
          <input
            id={ids.konum}
            name="mulk_konumu"
            required
            type="text"
            placeholder="İlçe / Mahalle (örn. Çankaya)"
            maxLength={MAX_LOCATION}
            aria-invalid={errorField === "konum" || undefined}
            aria-describedby={errorField === "konum" ? errId : undefined}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={ids.deger} className="block text-sm font-semibold text-navy mb-1.5">
            Tahmini Değer (TL) <span className="text-navy/40 font-normal">(opsiyonel)</span>
          </label>
          <input
            id={ids.deger}
            name="tahmini_deger"
            type="text"
            inputMode="numeric"
            placeholder="örn. 12.000.000"
            maxLength={MAX_VALUE_DIGITS + 6}
            className={inputClass}
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label htmlFor={ids.mesaj} className="block text-sm font-semibold text-navy mb-1.5">
          Mesajınız <span className="text-navy/40 font-normal">(opsiyonel)</span>
        </label>
        <textarea
          id={ids.mesaj}
          name="mesaj"
          rows={3}
          placeholder="Mülkünüz hakkında kısa not…"
          maxLength={MAX_MESSAGE}
          aria-invalid={errorField === "mesaj" || undefined}
          aria-describedby={errorField === "mesaj" ? errId : undefined}
          className={`${inputClass} resize-y`}
        />
      </div>

      <label
        htmlFor={ids.yetki}
        className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 p-3.5 text-xs text-navy/75 cursor-pointer"
      >
        <input
          id={ids.yetki}
          name="yetki"
          type="checkbox"
          aria-invalid={errorField === "yetki" || undefined}
          aria-describedby={errorField === "yetki" ? errId : undefined}
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-amber-500"
        />
        <span>
          Mülküm için en az <span className="font-semibold text-navy">3 ay münhasır (tek yetkili) satış yetkisi</span> verme şartını okudum ve kabul ediyorum.
        </span>
      </label>

      <label
        htmlFor={ids.kvkk}
        className="flex items-start gap-3 rounded-xl bg-mist/60 p-3.5 text-xs text-navy/70 cursor-pointer"
      >
        <input
          id={ids.kvkk}
          name="kvkk"
          type="checkbox"
          aria-invalid={errorField === "kvkk" || undefined}
          aria-describedby={errorField === "kvkk" ? errId : undefined}
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-remax-red"
        />
        <span>
          Kişisel verilerimin başvurumun değerlendirilmesi amacıyla{" "}
          <span className="font-semibold text-navy">RE/MAX BOSS</span> tarafından KVKK kapsamında işlenmesini kabul ediyorum.
        </span>
      </label>

      {error && (
        <p
          id={ids.errorMsg}
          role="alert"
          className="text-sm font-medium text-remax-red"
        >
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className="text-xs text-navy/55">
          <span className="text-remax-red">*</span> zorunlu. Başvuru ödül hakkı doğurmaz; uygunluk kararı ofise aittir.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-navy hover:bg-navy-700 text-white h-12 px-6 text-sm font-semibold tracking-wide disabled:opacity-70 disabled:cursor-not-allowed",
          )}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 me-2 animate-spin" aria-hidden /> Gönderiliyor…
            </>
          ) : (
            <>
              <Send className="h-4 w-4 me-2" aria-hidden /> Başvuruyu Gönder
            </>
          )}
        </button>
      </div>
    </form>
  );
}
