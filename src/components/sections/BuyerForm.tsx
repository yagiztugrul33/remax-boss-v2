"use client";

import { useId, useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fireNotify } from "@/lib/i18n/client";

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
export default function BuyerForm() {
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

    if (!payload.ad_soyad) return reportError("ad", "Lütfen ad soyad girin.");
    if (!payload.telefon || !PHONE_RE.test(payload.telefon))
      return reportError("tel", "Lütfen geçerli bir telefon numarası girin.");
    if (payload.email && !EMAIL_RE.test(payload.email))
      return reportError("email", "Girdiğiniz e-posta adresi geçersiz görünüyor.");
    if (!payload.islem_tipi)
      return reportError("islem_tipi", "Lütfen satılık mı kiralık mı seçin.");
    if (!payload.mulk_tipi)
      return reportError("mulk_tipi", "Lütfen mülk tipini seçin.");
    if (!payload.ilce) return reportError("ilce", "Lütfen aradığınız ilçeyi yazın.");
    if (!payload.zaman_planlama)
      return reportError("zaman", "Lütfen zaman planlamasını seçin.");
    if (!payload.kvkk)
      return reportError("kvkk", "Lütfen KVKK aydınlatma onayını işaretleyin.");

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
        throw new Error(
          result.error ||
            "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
        );
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
          Kriterlerinize uygun mülk geldiğinde size haber vereceğiz. İlginiz için teşekkürler.
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
            htmlFor={ids.islem}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            İşlem Tipi <span className="text-remax-red">*</span>
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
            <option value="satilik">Satılık</option>
            <option value="kiralik">Kiralık</option>
          </select>
        </div>
        <div>
          <label
            htmlFor={ids.mulk}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Mülk Tipi <span className="text-remax-red">*</span>
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
            htmlFor={ids.mahalleler}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Mahalleler{" "}
            <span className="text-navy/40 font-normal">(virgülle)</span>
          </label>
          <input
            id={ids.mahalleler}
            name="mahalleler"
            type="text"
            placeholder="Beştepe, Bahçelievler, Emek"
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
            Oda
          </label>
          <input
            id={ids.oda}
            name="oda_sayisi"
            type="text"
            placeholder="2+1 / 3+1"
            maxLength={30}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={ids.minm2}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Min m²
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
            Max m²
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
            Min Bütçe (TL){" "}
            <span className="text-navy/40 font-normal">(opsiyonel)</span>
          </label>
          <input
            id={ids.minbutce}
            name="min_butce"
            type="text"
            inputMode="numeric"
            placeholder="örn. 5.000.000"
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
            Max Bütçe (TL){" "}
            <span className="text-navy/40 font-normal">(opsiyonel)</span>
          </label>
          <input
            id={ids.maxbutce}
            name="max_butce"
            type="text"
            inputMode="numeric"
            placeholder="örn. 12.000.000"
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
          İhtiyaç ve Tercihler{" "}
          <span className="text-navy/40 font-normal">(opsiyonel)</span>
        </label>
        <input
          id={ids.ihtiyac}
          name="ihtiyaclar"
          type="text"
          placeholder="örn. asansör + 2 otopark + bahçe + güvenlik"
          maxLength={MAX_LIST_TEXT}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={ids.zaman}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          Zaman Planlaması <span className="text-remax-red">*</span>
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
          <option value="hemen">Hemen alacağım</option>
          <option value="1_3_ay">1-3 ay içinde</option>
          <option value="3_6_ay">3-6 ay içinde</option>
          <option value="esnek">Esnek / uygun fırsatla</option>
        </select>
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
          placeholder="Aradığınız mülk hakkında detaylar…"
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
          Kişisel verilerimin alıcı kaydımın yönetilmesi amacıyla{" "}
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
          <span className="text-remax-red">*</span> zorunlu. Kayıt eşleme niyet
          kaydıdır; uygunluk kararı ofise aittir.
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
