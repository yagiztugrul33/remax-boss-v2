"use client";

import { useId, useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2, Mail, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dict } from "@/lib/i18n/dictionaries";

type Status = "idle" | "sending" | "success" | "error" | "already";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Yeni ilan bildirim toplama formu — /api/subscribe → subscribers
 * tablosuna anon INSERT (RLS). Server-side rate-limit + honeypot.
 *
 * Variant:
 *  - "full" (default): tüm alanlar görünür (e-posta + tercihler + KVKK)
 *  - "compact": e-posta + KVKK (anasayfa/footer için yer-tasarrufu)
 *
 * 🔴 Bildirim gönderimi YAPILMAZ (sadece toplama). Gönderim katmanı
 * (SMTP/Resend) ileride eklenecek. UI bunu vaat etmez.
 */
export default function SubscribeForm({
  dict,
  variant = "full",
}: {
  dict: Dict["pages"]["subscribe"];
  variant?: "full" | "compact";
}) {
  const ids = {
    email: useId(),
    bolge: useId(),
    tip: useId(),
    islem: useId(),
    butce: useId(),
    kvkk: useId(),
    err: useId(),
  };
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showCriteria, setShowCriteria] = useState(variant === "full");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "").trim() !== "") return; // honeypot

    const email = String(data.get("email") ?? "").trim();
    const ilgi_bolgeler = String(data.get("ilgi_bolgeler") ?? "").trim();
    const ilgi_tip = String(data.get("ilgi_tip") ?? "").trim();
    const ilgi_islem = String(data.get("ilgi_islem") ?? "").trim();
    const max_butce = String(data.get("max_butce") ?? "")
      .replace(/[^\d]/g, "")
      .slice(0, 16);
    const kvkk = data.get("kvkk") === "on";

    setError(null);

    if (!email || !EMAIL_RE.test(email)) {
      setError(dict.errorGeneric);
      return;
    }
    if (!kvkk) {
      setError(dict.errorGeneric);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          ilgi_bolgeler,
          ilgi_tip,
          ilgi_islem,
          max_butce,
          kvkk,
          company: "",
        }),
      });
      const result = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        alreadySubscribed?: boolean;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(result.error || dict.errorGeneric);
      }
      form.reset();
      setStatus(result.alreadySubscribed ? "already" : "success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : dict.errorGeneric);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors";
  const errId = error ? ids.err : undefined;

  if (status === "success" || status === "already") {
    const t = status === "success" ? dict.successTitle : dict.alreadyTitle;
    const b = status === "success" ? dict.successBody : dict.alreadyBody;
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:p-6 flex items-start gap-3"
      >
        <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="font-display font-bold text-navy">{t}</p>
          <p className="mt-1 text-sm text-navy/70 leading-relaxed">{b}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-line bg-white p-5 md:p-6 space-y-3",
        variant === "compact" ? "" : "shadow-card",
      )}
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

      {variant === "compact" && (
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
            <Mail className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="font-display font-bold text-navy">
              {dict.compactTitle}
            </p>
            <p className="mt-0.5 text-sm text-navy/65 leading-relaxed">
              {dict.compactBody}
            </p>
          </div>
        </div>
      )}

      <div>
        <label
          htmlFor={ids.email}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          {dict.emailLabel}
        </label>
        <input
          id={ids.email}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={dict.emailPlaceholder}
          maxLength={200}
          aria-describedby={errId}
          className={inputClass}
        />
      </div>

      {variant === "full" || showCriteria ? (
        <div className="space-y-3 rounded-xl bg-mist/40 p-3 border border-line/60">
          <div>
            <label
              htmlFor={ids.bolge}
              className="block text-xs font-semibold text-navy/70 mb-1"
            >
              {dict.regionLabel}
            </label>
            <input
              id={ids.bolge}
              name="ilgi_bolgeler"
              type="text"
              placeholder={dict.regionPlaceholder}
              maxLength={300}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor={ids.tip}
                className="block text-xs font-semibold text-navy/70 mb-1"
              >
                {dict.typeLabel}
              </label>
              <select
                id={ids.tip}
                name="ilgi_tip"
                defaultValue="hepsi"
                className={inputClass}
              >
                <option value="hepsi">{dict.typeOptionAll}</option>
                <option value="daire">Daire</option>
                <option value="mustakil">Müstakil</option>
                <option value="villa">Villa</option>
                <option value="isyeri">İş Yeri</option>
                <option value="arsa">Arsa</option>
              </select>
            </div>
            <div>
              <label
                htmlFor={ids.islem}
                className="block text-xs font-semibold text-navy/70 mb-1"
              >
                {dict.islemLabel}
              </label>
              <select
                id={ids.islem}
                name="ilgi_islem"
                defaultValue="hepsi"
                className={inputClass}
              >
                <option value="hepsi">{dict.islemOptionAll}</option>
                <option value="satilik">Satılık</option>
                <option value="kiralik">Kiralık</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor={ids.butce}
              className="block text-xs font-semibold text-navy/70 mb-1"
            >
              {dict.butceLabel}
            </label>
            <input
              id={ids.butce}
              name="max_butce"
              type="text"
              inputMode="numeric"
              placeholder={dict.butcePlaceholder}
              maxLength={22}
              className={inputClass}
              dir="ltr"
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowCriteria(true)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-remax-red hover:text-remax-red-hover transition-colors"
        >
          <ChevronDown className="h-3.5 w-3.5" aria-hidden />
          {dict.criteriaToggle}
        </button>
      )}

      <label
        htmlFor={ids.kvkk}
        className="flex items-start gap-3 rounded-xl bg-mist/60 p-3 text-xs text-navy/70 cursor-pointer"
      >
        <input
          id={ids.kvkk}
          name="kvkk"
          type="checkbox"
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-remax-red"
          aria-describedby={errId}
        />
        <span>
          {dict.kvkkBefore}
          <span className="font-semibold text-navy">{dict.kvkkBrand}</span>
          {dict.kvkkAfter}{" "}
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
        <p id={ids.err} role="alert" className="text-sm font-medium text-remax-red">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          buttonVariants({ size: "lg" }),
          "w-full bg-remax-red hover:bg-remax-red-hover text-white h-11 px-5 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)] disabled:opacity-70 disabled:cursor-not-allowed",
        )}
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 me-2 animate-spin" aria-hidden />
            {dict.sendingBtn}
          </>
        ) : (
          <>
            <Send className="h-4 w-4 me-2" aria-hidden />
            {dict.submitBtn}
          </>
        )}
      </button>
    </form>
  );
}
