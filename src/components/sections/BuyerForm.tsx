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
  | "islem_tipi"
  | "mulk_tipi"
  | "ilce"
  | "zaman"
  | "kvkk";

const PHONE_RE = /^[+()\d\s-]{7,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 200;
const MAX_PHONE = 40;
const MAX_EMAIL = 200;
const MAX_TEXT = 300;
const MAX_LIST_TEXT = 600;
const MAX_NOT = 2000;
const MAX_BUTCE_DIGITS = 16;

/** Form metinleri — TR + EN (host sayfa bilingual; form da uyumlu olmalı). */
const COPY = {
  tr: {
    optional: "(opsiyonel)",
    commaHint: "(virgülle)",
    nameLabel: "Ad Soyad",
    namePlaceholder: "Adınız Soyadınız",
    phoneLabel: "Telefon",
    emailLabel: "E-posta",
    emailPlaceholder: "ornek@eposta.com",
    islemLabel: "İşlem Tipi",
    islemOptions: { satilik: "Satılık", kiralik: "Kiralık" },
    mulkLabel: "Mülk Tipi",
    selectPlaceholder: "Seçiniz…",
    mulkOptions: {
      daire: "Daire",
      mustakil: "Müstakil",
      villa: "Villa",
      isyeri: "İş Yeri",
      arsa: "Arsa",
      diger: "Diğer",
    },
    ilceLabel: "İlçe",
    ilcePlaceholder: "örn. Çankaya",
    mahallelerLabel: "Mahalleler",
    mahallelerPlaceholder: "Beştepe, Bahçelievler, Emek",
    odaLabel: "Oda",
    odaPlaceholder: "2+1 / 3+1",
    minM2Label: "Min m²",
    maxM2Label: "Max m²",
    minButceLabel: "Min Bütçe (TL)",
    maxButceLabel: "Max Bütçe (TL)",
    minButcePlaceholder: "örn. 5.000.000",
    maxButcePlaceholder: "örn. 12.000.000",
    ihtiyacLabel: "İhtiyaç ve Tercihler",
    ihtiyacPlaceholder: "örn. asansör + 2 otopark + bahçe + güvenlik",
    zamanLabel: "Zaman Planlaması",
    zamanOptions: {
      hemen: "Hemen alacağım",
      "1_3_ay": "1-3 ay içinde",
      "3_6_ay": "3-6 ay içinde",
      esnek: "Esnek / uygun fırsatla",
    },
    notLabel: "Not / Eklemek istedikleriniz",
    notPlaceholder: "Aradığınız mülk hakkında detaylar…",
    kvkkBefore: "Kişisel verilerimin alıcı kaydımın yönetilmesi amacıyla ",
    kvkkBrand: "RE/MAX BOSS",
    kvkkAfter: " tarafından KVKK kapsamında işlenmesini kabul ediyorum. ",
    kvkkLink: "(KVKK Aydınlatma Metni)",
    footnote:
      "* zorunlu. Kayıt eşleme niyet kaydıdır; uygunluk kararı ofise aittir.",
    submitBtn: "Talebi Gönder",
    sendingBtn: "Gönderiliyor…",
    successTitle: "Talebiniz alındı",
    successBody:
      "Kriterlerinize uygun mülk geldiğinde size haber vereceğiz. İlginiz için teşekkürler.",
    errors: {
      name: "Lütfen ad soyad girin.",
      phone: "Lütfen geçerli bir telefon numarası girin.",
      email: "Girdiğiniz e-posta adresi geçersiz görünüyor.",
      islem: "Lütfen satılık mı kiralık mı seçin.",
      mulk: "Lütfen mülk tipini seçin.",
      ilce: "Lütfen aradığınız ilçeyi yazın.",
      zaman: "Lütfen zaman planlamasını seçin.",
      kvkk: "Lütfen KVKK aydınlatma onayını işaretleyin.",
      sendFailed:
        "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
    },
  },
  en: {
    optional: "(optional)",
    commaHint: "(comma separated)",
    nameLabel: "Full Name",
    namePlaceholder: "Your full name",
    phoneLabel: "Phone",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    islemLabel: "Transaction Type",
    islemOptions: { satilik: "For Sale", kiralik: "For Rent" },
    mulkLabel: "Property Type",
    selectPlaceholder: "Select…",
    mulkOptions: {
      daire: "Apartment",
      mustakil: "Detached House",
      villa: "Villa",
      isyeri: "Commercial",
      arsa: "Land",
      diger: "Other",
    },
    ilceLabel: "District",
    ilcePlaceholder: "e.g. Çankaya",
    mahallelerLabel: "Neighbourhoods",
    mahallelerPlaceholder: "Beştepe, Bahçelievler, Emek",
    odaLabel: "Rooms",
    odaPlaceholder: "2+1 / 3+1",
    minM2Label: "Min m²",
    maxM2Label: "Max m²",
    minButceLabel: "Min Budget (TL)",
    maxButceLabel: "Max Budget (TL)",
    minButcePlaceholder: "e.g. 5,000,000",
    maxButcePlaceholder: "e.g. 12,000,000",
    ihtiyacLabel: "Needs & Preferences",
    ihtiyacPlaceholder: "e.g. elevator + 2 parking + garden + security",
    zamanLabel: "Timeline",
    zamanOptions: {
      hemen: "Buying immediately",
      "1_3_ay": "Within 1-3 months",
      "3_6_ay": "Within 3-6 months",
      esnek: "Flexible / with the right opportunity",
    },
    notLabel: "Notes / anything to add",
    notPlaceholder: "Details about the property you're looking for…",
    kvkkBefore: "I agree that my personal data will be processed by ",
    kvkkBrand: "RE/MAX BOSS",
    kvkkAfter: " under KVKK for the purpose of managing my buyer registration. ",
    kvkkLink: "(KVKK Notice)",
    footnote:
      "* required. Registration is a statement of intent for matching; suitability is at the office's discretion.",
    submitBtn: "Send Request",
    sendingBtn: "Sending…",
    successTitle: "Request received",
    successBody:
      "We'll let you know when a property matching your criteria becomes available. Thank you for your interest.",
    errors: {
      name: "Please enter your full name.",
      phone: "Please enter a valid phone number.",
      email: "The email address you entered looks invalid.",
      islem: "Please choose for sale or for rent.",
      mulk: "Please select a property type.",
      ilce: "Please enter the district you're looking in.",
      zaman: "Please select a timeline.",
      kvkk: "Please tick the KVKK consent to continue.",
      sendFailed:
        "Your request could not be sent. Please try again or call us.",
    },
  },
} as const;

/**
 * Alıcı talep formu — /api/buyer-request üzerinden buyer_requests
 * tablosuna anon INSERT (RLS). Server endpoint'inde rate-limit
 * (3/dakika/IP), validasyon, slice.
 *
 * UYDURMA YOK: "size mutlaka mülk bulacağız" gibi garanti vaadi YASAK.
 * Talep eşleme niyet kaydıdır; uygunluk ofise aittir.
 *
 * A11y: hatalı alana aria-invalid + aria-describedby.
 */
export default function BuyerForm({ locale = "tr" }: { locale?: Locale }) {
  const c = COPY[locale];
  const ids = {
    ad: useId(),
    tel: useId(),
    email: useId(),
    islem: useId(),
    mulk: useId(),
    ilce: useId(),
    mahalleler: useId(),
    oda: useId(),
    minm2: useId(),
    maxm2: useId(),
    minbutce: useId(),
    maxbutce: useId(),
    ihtiyac: useId(),
    zaman: useId(),
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
      islem_tipi: String(data.get("islem_tipi") ?? "").trim(),
      mulk_tipi: String(data.get("mulk_tipi") ?? "").trim(),
      ilce: String(data.get("ilce") ?? "").trim(),
      mahalleler: String(data.get("mahalleler") ?? "").trim(),
      oda_sayisi: String(data.get("oda_sayisi") ?? "").trim(),
      min_m2: String(data.get("min_m2") ?? "").replace(/[^\d]/g, ""),
      max_m2: String(data.get("max_m2") ?? "").replace(/[^\d]/g, ""),
      min_butce: String(data.get("min_butce") ?? "")
        .replace(/[^\d]/g, "")
        .slice(0, MAX_BUTCE_DIGITS),
      max_butce: String(data.get("max_butce") ?? "")
        .replace(/[^\d]/g, "")
        .slice(0, MAX_BUTCE_DIGITS),
      ihtiyaclar: String(data.get("ihtiyaclar") ?? "").trim(),
      zaman_planlama: String(data.get("zaman_planlama") ?? "").trim(),
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
    if (!payload.islem_tipi)
      return reportError("islem_tipi", c.errors.islem);
    if (!payload.mulk_tipi)
      return reportError("mulk_tipi", c.errors.mulk);
    if (!payload.ilce) return reportError("ilce", c.errors.ilce);
    if (!payload.zaman_planlama)
      return reportError("zaman", c.errors.zaman);
    if (!payload.kvkk)
      return reportError("kvkk", c.errors.kvkk);

    setStatus("sending");
    try {
      const res = await fetch("/api/buyer-request", {
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
          kind: "buyer",
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
            htmlFor={ids.islem}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {c.islemLabel} <span className="text-remax-red">*</span>
          </label>
          <select
            id={ids.islem}
            name="islem_tipi"
            required
            defaultValue="satilik"
            aria-invalid={errorField === "islem_tipi" || undefined}
            aria-describedby={errorField === "islem_tipi" ? errId : undefined}
            className={inputClass}
          >
            <option value="satilik">{c.islemOptions.satilik}</option>
            <option value="kiralik">{c.islemOptions.kiralik}</option>
          </select>
        </div>
        <div>
          <label
            htmlFor={ids.mulk}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {c.mulkLabel} <span className="text-remax-red">*</span>
          </label>
          <select
            id={ids.mulk}
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
            htmlFor={ids.mahalleler}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {c.mahallelerLabel}{" "}
            <span className="text-navy/40 font-normal">{c.commaHint}</span>
          </label>
          <input
            id={ids.mahalleler}
            name="mahalleler"
            type="text"
            placeholder={c.mahallelerPlaceholder}
            maxLength={MAX_LIST_TEXT}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            placeholder={c.odaPlaceholder}
            maxLength={30}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={ids.minm2}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {c.minM2Label}
          </label>
          <input
            id={ids.minm2}
            name="min_m2"
            type="text"
            inputMode="numeric"
            placeholder="90"
            maxLength={6}
            className={inputClass}
            dir="ltr"
          />
        </div>
        <div>
          <label
            htmlFor={ids.maxm2}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {c.maxM2Label}
          </label>
          <input
            id={ids.maxm2}
            name="max_m2"
            type="text"
            inputMode="numeric"
            placeholder="160"
            maxLength={6}
            className={inputClass}
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={ids.minbutce}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {c.minButceLabel}{" "}
            <span className="text-navy/40 font-normal">{c.optional}</span>
          </label>
          <input
            id={ids.minbutce}
            name="min_butce"
            type="text"
            inputMode="numeric"
            placeholder={c.minButcePlaceholder}
            maxLength={MAX_BUTCE_DIGITS + 6}
            className={inputClass}
            dir="ltr"
          />
        </div>
        <div>
          <label
            htmlFor={ids.maxbutce}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {c.maxButceLabel}{" "}
            <span className="text-navy/40 font-normal">{c.optional}</span>
          </label>
          <input
            id={ids.maxbutce}
            name="max_butce"
            type="text"
            inputMode="numeric"
            placeholder={c.maxButcePlaceholder}
            maxLength={MAX_BUTCE_DIGITS + 6}
            className={inputClass}
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={ids.ihtiyac}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          {c.ihtiyacLabel}{" "}
          <span className="text-navy/40 font-normal">{c.optional}</span>
        </label>
        <input
          id={ids.ihtiyac}
          name="ihtiyaclar"
          type="text"
          placeholder={c.ihtiyacPlaceholder}
          maxLength={MAX_LIST_TEXT}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={ids.zaman}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          {c.zamanLabel} <span className="text-remax-red">*</span>
        </label>
        <select
          id={ids.zaman}
          name="zaman_planlama"
          required
          defaultValue="esnek"
          aria-invalid={errorField === "zaman" || undefined}
          aria-describedby={errorField === "zaman" ? errId : undefined}
          className={inputClass}
        >
          <option value="hemen">{c.zamanOptions.hemen}</option>
          <option value="1_3_ay">{c.zamanOptions["1_3_ay"]}</option>
          <option value="3_6_ay">{c.zamanOptions["3_6_ay"]}</option>
          <option value="esnek">{c.zamanOptions.esnek}</option>
        </select>
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
