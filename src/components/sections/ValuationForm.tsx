"use client";

import { useId, useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fireNotify } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";

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

/** Form metinleri — TR + EN (host sayfa bilingual; form da uyumlu olmalı). */
const COPY = {
  tr: {
    optional: "(opsiyonel)",
    nameLabel: "Ad Soyad",
    namePlaceholder: "Adınız Soyadınız",
    phoneLabel: "Telefon",
    emailLabel: "E-posta",
    emailPlaceholder: "ornek@eposta.com",
    mulkTipiLabel: "Mülk Tipi",
    selectPlaceholder: "Seçiniz…",
    mulkOptions: {
      daire: "Daire",
      mustakil: "Müstakil",
      villa: "Villa",
      isyeri: "İş Yeri",
      arsa: "Arsa",
      diger: "Diğer",
    },
    amacLabel: "Amacınız",
    amacOptions: {
      sadece_ogrenmek: "Sadece değer öğrenmek",
      satis: "Satış düşünüyorum",
      kiralama: "Kiraya verme düşünüyorum",
    },
    ilceLabel: "İlçe",
    ilcePlaceholder: "örn. Çankaya",
    mahalleLabel: "Mahalle",
    mahallePlaceholder: "örn. Beştepe",
    odaLabel: "Oda",
    brutLabel: "Brüt m²",
    netLabel: "Net m²",
    yasLabel: "Bina Yaşı",
    katLabel: "Kat / Konum",
    katPlaceholder: "örn. 3. kat / zemin / bahçe katı",
    notLabel: "Not / Eklemek istedikleriniz",
    notPlaceholder: "Mülkünüz hakkında eklemek istediğiniz detaylar…",
    kvkkBefore: "Kişisel verilerimin değerleme talebimin değerlendirilmesi amacıyla ",
    kvkkBrand: "RE/MAX BOSS",
    kvkkAfter: " tarafından KVKK kapsamında işlenmesini kabul ediyorum. ",
    kvkkLink: "(KVKK Aydınlatma Metni)",
    footnote:
      "* zorunlu. Değerleme yalnız bilgi amaçlıdır; kesin değer ekspertiz raporuyla belirlenir.",
    submitBtn: "Talebi Gönder",
    sendingBtn: "Gönderiliyor…",
    successTitle: "Talebiniz alındı",
    successBody:
      "Ekibimiz değerleme talebinizi inceleyip 1 iş günü içinde sizinle iletişime geçecek. İlginiz için teşekkürler.",
    errors: {
      name: "Lütfen ad soyad girin.",
      phone: "Lütfen geçerli bir telefon numarası girin.",
      email: "Girdiğiniz e-posta adresi geçersiz görünüyor.",
      mulkTipi: "Lütfen mülk tipini seçin.",
      ilce: "Lütfen ilçeyi yazın.",
      amac: "Lütfen amacı seçin.",
      kvkk: "Lütfen KVKK aydınlatma onayını işaretleyin.",
      sendFailed:
        "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
    },
  },
  en: {
    optional: "(optional)",
    nameLabel: "Full Name",
    namePlaceholder: "Your full name",
    phoneLabel: "Phone",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    mulkTipiLabel: "Property Type",
    selectPlaceholder: "Select…",
    mulkOptions: {
      daire: "Apartment",
      mustakil: "Detached House",
      villa: "Villa",
      isyeri: "Commercial",
      arsa: "Land",
      diger: "Other",
    },
    amacLabel: "Your Goal",
    amacOptions: {
      sadece_ogrenmek: "Just curious about the value",
      satis: "Considering selling",
      kiralama: "Considering renting out",
    },
    ilceLabel: "District",
    ilcePlaceholder: "e.g. Çankaya",
    mahalleLabel: "Neighbourhood",
    mahallePlaceholder: "e.g. Beştepe",
    odaLabel: "Rooms",
    brutLabel: "Gross m²",
    netLabel: "Net m²",
    yasLabel: "Building Age",
    katLabel: "Floor / Position",
    katPlaceholder: "e.g. 3rd floor / ground / garden level",
    notLabel: "Notes / anything to add",
    notPlaceholder: "Any details you'd like to share about your property…",
    kvkkBefore: "I agree that my personal data will be processed by ",
    kvkkBrand: "RE/MAX BOSS",
    kvkkAfter: " under KVKK for the purpose of evaluating my valuation request. ",
    kvkkLink: "(KVKK Notice)",
    footnote:
      "* required. The valuation is for information only; the definitive value is determined by an official appraisal report.",
    submitBtn: "Send Request",
    sendingBtn: "Sending…",
    successTitle: "Request received",
    successBody:
      "Our team will review your valuation request and contact you within 1 business day. Thank you for your interest.",
    errors: {
      name: "Please enter your full name.",
      phone: "Please enter a valid phone number.",
      email: "The email address you entered looks invalid.",
      mulkTipi: "Please select a property type.",
      ilce: "Please enter the district.",
      amac: "Please select your goal.",
      kvkk: "Please tick the KVKK consent to continue.",
      sendFailed:
        "Your request could not be sent. Please try again or call us.",
    },
  },
} as const;

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
export default function ValuationForm({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const c = COPY[locale];
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

    if (!payload.ad_soyad) return reportError("ad", c.errors.name);
    if (!payload.telefon || !PHONE_RE.test(payload.telefon))
      return reportError("tel", c.errors.phone);
    if (payload.email && !EMAIL_RE.test(payload.email))
      return reportError("email", c.errors.email);
    if (!payload.mulk_tipi)
      return reportError("mulk_tipi", c.errors.mulkTipi);
    if (!payload.ilce) return reportError("ilce", c.errors.ilce);
    if (!payload.amac) return reportError("amac", c.errors.amac);
    if (!payload.kvkk)
      return reportError("kvkk", c.errors.kvkk);

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
        throw new Error(result.error || c.errors.sendFailed);
      }
      // Otomatik teşekkür e-postası — best-effort, RESEND yoksa no-op.
      if (payload.email) {
        fireNotify({
          kind: "valuation",
          email: payload.email,
          name: payload.ad_soyad,
        });
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : c.errors.sendFailed);
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
          {c.successTitle}
        </h3>
        <p className="mt-2 text-sm text-navy/65 leading-relaxed max-w-sm mx-auto">
          {c.successBody}
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
            {c.nameLabel} <span className="text-remax-red">*</span>
          </label>
          <input
            id={ids.ad}
            name="ad_soyad"
            required
            type="text"
            autoComplete="name"
            placeholder={c.namePlaceholder}
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
            {c.phoneLabel} <span className="text-remax-red">*</span>
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
          {c.emailLabel}{" "}
          <span className="text-navy/40 font-normal">{c.optional}</span>
        </label>
        <input
          id={ids.email}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={c.emailPlaceholder}
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
            {c.mulkTipiLabel} <span className="text-remax-red">*</span>
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
              {c.selectPlaceholder}
            </option>
            <option value="daire">{c.mulkOptions.daire}</option>
            <option value="mustakil">{c.mulkOptions.mustakil}</option>
            <option value="villa">{c.mulkOptions.villa}</option>
            <option value="isyeri">{c.mulkOptions.isyeri}</option>
            <option value="arsa">{c.mulkOptions.arsa}</option>
            <option value="diger">{c.mulkOptions.diger}</option>
          </select>
        </div>
        <div>
          <label
            htmlFor={ids.amac}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {c.amacLabel} <span className="text-remax-red">*</span>
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
            <option value="sadece_ogrenmek">
              {c.amacOptions.sadece_ogrenmek}
            </option>
            <option value="satis">{c.amacOptions.satis}</option>
            <option value="kiralama">{c.amacOptions.kiralama}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={ids.ilce}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {c.ilceLabel} <span className="text-remax-red">*</span>
          </label>
          <input
            id={ids.ilce}
            name="ilce"
            required
            type="text"
            placeholder={c.ilcePlaceholder}
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
            {c.mahalleLabel}{" "}
            <span className="text-navy/40 font-normal">{c.optional}</span>
          </label>
          <input
            id={ids.mahalle}
            name="mahalle"
            type="text"
            placeholder={c.mahallePlaceholder}
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
            {c.odaLabel}
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
            {c.brutLabel}
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
            {c.netLabel}
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
            {c.yasLabel}
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
          {c.katLabel}{" "}
          <span className="text-navy/40 font-normal">{c.optional}</span>
        </label>
        <input
          id={ids.kat}
          name="kat"
          type="text"
          placeholder={c.katPlaceholder}
          maxLength={50}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={ids.not}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          {c.notLabel}{" "}
          <span className="text-navy/40 font-normal">{c.optional}</span>
        </label>
        <textarea
          id={ids.not}
          name="not_text"
          rows={3}
          placeholder={c.notPlaceholder}
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
          {c.kvkkBefore}
          <span className="font-semibold text-navy">{c.kvkkBrand}</span>
          {c.kvkkAfter}
          <a
            href="/kvkk-aydinlatma"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-remax-red hover:text-remax-red-hover"
          >
            {c.kvkkLink}
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
        <p className="text-xs text-navy/55">{c.footnote}</p>
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
              {c.sendingBtn}
            </>
          ) : (
            <>
              <Send className="h-4 w-4 me-2" aria-hidden /> {c.submitBtn}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
