"use client";

import { useId, useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";
type FieldName =
  | "ad"
  | "tel"
  | "email"
  | "mulk_tipi"
  | "ilce"
  | "amac"
  | "kvkk";

const PHONE_RE = /^[+()\d\s-]{7,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 200;
const MAX_PHONE = 40;
const MAX_EMAIL = 200;
const MAX_TEXT = 300;
const MAX_NOT = 2000;

/**
 * Ücretsiz değerleme talep formu — /api/valuation-request üzerinden
 * valuation_requests tablosuna anon INSERT (RLS). Server endpoint'inde
 * rate-limit (3/dakika/IP), validasyon, slice.
 *
 * UYDURMA YOK: "kesin değer 12.5M TL" gibi tahmin vaadi YASAK.
 * Değerleme talep onayıdır; uzman 1 iş günü içinde döner.
 *
 * A11y: hatalı alana aria-invalid + aria-describedby.
 */
export default function ValuationForm() {
  const ids = {
    ad: useId(),
    tel: useId(),
    email: useId(),
    mulk_tipi: useId(),
    ilce: useId(),
    mahalle: useId(),
    oda: useId(),
    brut: useId(),
    net: useId(),
    yas: useId(),
    kat: useId(),
    amac: useId(),
    not: useId(),
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

    const payload = {
      ad_soyad: String(data.get("ad_soyad") ?? "").trim(),
      telefon: String(data.get("telefon") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      mulk_tipi: String(data.get("mulk_tipi") ?? "").trim(),
      ilce: String(data.get("ilce") ?? "").trim(),
      mahalle: String(data.get("mahalle") ?? "").trim(),
      oda_sayisi: String(data.get("oda_sayisi") ?? "").trim(),
      brut_m2: String(data.get("brut_m2") ?? "").replace(/[^\d]/g, ""),
      net_m2: String(data.get("net_m2") ?? "").replace(/[^\d]/g, ""),
      bina_yasi: String(data.get("bina_yasi") ?? "").replace(/[^\d]/g, ""),
      kat: String(data.get("kat") ?? "").trim(),
      amac: String(data.get("amac") ?? "").trim(),
      not_text: String(data.get("not_text") ?? "")
        .trim()
        .slice(0, MAX_NOT),
      kvkk: data.get("kvkk") === "on",
      company: "",
    };

    setError(null);
    setErrorField(null);

    if (!payload.ad_soyad) return reportError("ad", "Lütfen ad soyad girin.");
    if (!payload.telefon || !PHONE_RE.test(payload.telefon))
      return reportError("tel", "Lütfen geçerli bir telefon numarası girin.");
    if (payload.email && !EMAIL_RE.test(payload.email))
      return reportError("email", "Girdiğiniz e-posta adresi geçersiz görünüyor.");
    if (!payload.mulk_tipi)
      return reportError("mulk_tipi", "Lütfen mülk tipini seçin.");
    if (!payload.ilce) return reportError("ilce", "Lütfen ilçeyi yazın.");
    if (!payload.amac) return reportError("amac", "Lütfen amacı seçin.");
    if (!payload.kvkk)
      return reportError("kvkk", "Lütfen KVKK aydınlatma onayını işaretleyin.");

    setStatus("sending");
    try {
      const res = await fetch("/api/valuation-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(
          result.error ||
            "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
        );
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
      );
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors";
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
          Talebiniz alındı
        </h3>
        <p className="mt-2 text-sm text-navy/65 leading-relaxed max-w-sm mx-auto">
          Ekibimiz değerleme talebinizi inceleyip 1 iş günü içinde sizinle iletişime geçecek. İlginiz için teşekkürler.
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
          <label
            htmlFor={ids.ad}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
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
          <label
            htmlFor={ids.tel}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
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
        <label
          htmlFor={ids.email}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
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
          <label
            htmlFor={ids.mulk_tipi}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Mülk Tipi <span className="text-remax-red">*</span>
          </label>
          <select
            id={ids.mulk_tipi}
            name="mulk_tipi"
            required
            defaultValue=""
            aria-invalid={errorField === "mulk_tipi" || undefined}
            aria-describedby={errorField === "mulk_tipi" ? errId : undefined}
            className={inputClass}
          >
            <option value="" disabled>
              Seçiniz…
            </option>
            <option value="daire">Daire</option>
            <option value="mustakil">Müstakil</option>
            <option value="villa">Villa</option>
            <option value="isyeri">İş Yeri</option>
            <option value="arsa">Arsa</option>
            <option value="diger">Diğer</option>
          </select>
        </div>
        <div>
          <label
            htmlFor={ids.amac}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Amacınız <span className="text-remax-red">*</span>
          </label>
          <select
            id={ids.amac}
            name="amac"
            required
            defaultValue="sadece_ogrenmek"
            aria-invalid={errorField === "amac" || undefined}
            aria-describedby={errorField === "amac" ? errId : undefined}
            className={inputClass}
          >
            <option value="sadece_ogrenmek">Sadece değer öğrenmek</option>
            <option value="satis">Satış düşünüyorum</option>
            <option value="kiralama">Kiraya verme düşünüyorum</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={ids.ilce}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            İlçe <span className="text-remax-red">*</span>
          </label>
          <input
            id={ids.ilce}
            name="ilce"
            required
            type="text"
            placeholder="örn. Çankaya"
            maxLength={MAX_TEXT}
            aria-invalid={errorField === "ilce" || undefined}
            aria-describedby={errorField === "ilce" ? errId : undefined}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={ids.mahalle}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Mahalle{" "}
            <span className="text-navy/40 font-normal">(opsiyonel)</span>
          </label>
          <input
            id={ids.mahalle}
            name="mahalle"
            type="text"
            placeholder="örn. Beştepe"
            maxLength={MAX_TEXT}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label
            htmlFor={ids.oda}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Oda
          </label>
          <input
            id={ids.oda}
            name="oda_sayisi"
            type="text"
            placeholder="2+1"
            maxLength={30}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={ids.brut}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Brüt m²
          </label>
          <input
            id={ids.brut}
            name="brut_m2"
            type="text"
            inputMode="numeric"
            placeholder="120"
            maxLength={6}
            className={inputClass}
            dir="ltr"
          />
        </div>
        <div>
          <label
            htmlFor={ids.net}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Net m²
          </label>
          <input
            id={ids.net}
            name="net_m2"
            type="text"
            inputMode="numeric"
            placeholder="100"
            maxLength={6}
            className={inputClass}
            dir="ltr"
          />
        </div>
        <div>
          <label
            htmlFor={ids.yas}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Bina Yaşı
          </label>
          <input
            id={ids.yas}
            name="bina_yasi"
            type="text"
            inputMode="numeric"
            placeholder="5"
            maxLength={3}
            className={inputClass}
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={ids.kat}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          Kat / Konum{" "}
          <span className="text-navy/40 font-normal">(opsiyonel)</span>
        </label>
        <input
          id={ids.kat}
          name="kat"
          type="text"
          placeholder="örn. 3. kat / zemin / bahçe katı"
          maxLength={50}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={ids.not}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          Not / Eklemek istedikleriniz{" "}
          <span className="text-navy/40 font-normal">(opsiyonel)</span>
        </label>
        <textarea
          id={ids.not}
          name="not_text"
          rows={3}
          placeholder="Mülkünüz hakkında eklemek istediğiniz detaylar…"
          maxLength={MAX_NOT}
          className={`${inputClass} resize-y`}
        />
      </div>

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
          Kişisel verilerimin değerleme talebimin değerlendirilmesi amacıyla{" "}
          <span className="font-semibold text-navy">RE/MAX BOSS</span>{" "}
          tarafından KVKK kapsamında işlenmesini kabul ediyorum.{" "}
          <a
            href="/kvkk-aydinlatma"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-remax-red hover:text-remax-red-hover"
          >
            (KVKK Aydınlatma Metni)
          </a>
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
          <span className="text-remax-red">*</span> zorunlu. Değerleme yalnız
          bilgi amaçlıdır; kesin değer ekspertiz raporuyla belirlenir.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)] disabled:opacity-70 disabled:cursor-not-allowed",
          )}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 me-2 animate-spin" aria-hidden />{" "}
              Gönderiliyor…
            </>
          ) : (
            <>
              <Send className="h-4 w-4 me-2" aria-hidden /> Talebi Gönder
            </>
          )}
        </button>
      </div>
    </form>
  );
}
