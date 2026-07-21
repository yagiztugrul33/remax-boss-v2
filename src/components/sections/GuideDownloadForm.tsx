"use client";

import { useState, useId, type FormEvent } from "react";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { fireNotify } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";

type Status = "idle" | "sending" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Copy {
  lead: string;
  emailLabel: string;
  emailPlaceholder: string;
  kvkkText: string;
  submitButton: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  downloadNow: string;
  noEmailOption: string;
  errorEmail: string;
  errorKvkk: string;
}

const COPY: Record<Locale, Copy> = {
  tr: {
    lead: "Ücretsiz PDF rehberi indirmek için e-postanızı bırakın. E-posta bırakmak zorunlu değildir — istemezseniz aşağıdan doğrudan indirebilirsiniz.",
    emailLabel: "E-posta",
    emailPlaceholder: "ornek@eposta.com",
    kvkkText:
      "E-posta bırakırken, kişisel verilerimin RE/MAX BOSS tarafından KVKK kapsamında iletişim amacıyla işlenmesini kabul ediyorum.",
    submitButton: "PDF'i indir",
    submitting: "Hazırlanıyor…",
    successTitle: "Teşekkürler!",
    successBody:
      "Rehber indirmeye hazır. İndirme başlamadıysa aşağıdaki bağlantıya tıklayın.",
    downloadNow: "Rehberi indir",
    noEmailOption: "E-postasız indir",
    errorEmail: "Girdiğiniz e-posta adresi geçersiz görünüyor.",
    errorKvkk: "Devam etmek için KVKK onayını işaretleyin.",
  },
  en: {
    lead: "Leave your email to download the free PDF guide. Sharing your email is not mandatory — you can also download directly without providing it.",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    kvkkText:
      "By leaving my email, I agree to RE/MAX BOSS processing my personal data for communication purposes under KVKK.",
    submitButton: "Download PDF",
    submitting: "Preparing…",
    successTitle: "Thank you!",
    successBody:
      "Your guide is ready. If the download did not start, use the link below.",
    downloadNow: "Download the guide",
    noEmailOption: "Download without email",
    errorEmail: "The email address you entered looks invalid.",
    errorKvkk: "Please tick the KVKK consent to continue.",
  },
};

interface GuideDownloadFormProps {
  slug: string;
  locale: Locale;
}

/**
 * Rehber indirme formu — KVKK dostu, e-posta OPSİYONEL.
 *   - E-posta + KVKK → subscribers'a INSERT (best-effort; unique conflict → sessiz soft-fail).
 *   - "E-postasız indir" → doğrudan PDF endpoint'ine gider.
 * PDF endpoint: /api/rehber/{slug}/pdf?lang={locale}
 */
export default function GuideDownloadForm({
  slug,
  locale,
}: GuideDownloadFormProps) {
  const c = COPY[locale];
  const emailId = useId();
  const kvkkId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const pdfUrl = `/api/rehber/${encodeURIComponent(slug)}/pdf?lang=${locale}`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (String(data.get("company") ?? "").trim() !== "") return;

    const email = String(data.get("email") ?? "").trim();
    const kvkk = data.get("kvkk") === "on";

    if (!email || !EMAIL_RE.test(email)) return setError(c.errorEmail);
    if (!kvkk) return setError(c.errorKvkk);

    setError(null);
    setStatus("sending");

    // Best-effort: subscribers'a INSERT. Unique conflict veya diğer hatalar sessiz yutulur.
    try {
      const supabase = createClient();
      await supabase.from("subscribers").insert({
        email,
        kvkk_onay: kvkk,
      });
    } catch (err) {
      // DB fail olsa bile kullanıcıya rehberi ver.
      console.warn("[guide-form] subscriber insert failed:", err);
    }

    // Otomatik teşekkür e-postası — best-effort, RESEND yoksa no-op.
    fireNotify({ kind: "subscribe", email, locale });

    setStatus("success");
    if (typeof window !== "undefined") {
      window.location.href = pdfUrl;
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors";

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 text-center"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="mt-4 font-display font-bold text-lg text-navy">
          {c.successTitle}
        </h3>
        <p className="mt-2 text-sm text-navy/65 leading-relaxed">
          {c.successBody}
        </p>
        <a
          href={pdfUrl}
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-5 bg-remax-red hover:bg-remax-red-hover text-white h-11 px-5 text-sm font-semibold",
          )}
        >
          <Download className="h-4 w-4 me-2" aria-hidden />
          {c.downloadNow}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-white p-6 space-y-4 shadow-card relative"
      noValidate
    >
      <p className="text-sm text-navy/70 leading-relaxed">{c.lead}</p>

      {/* Honeypot */}
      <div
        aria-hidden
        className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label>
          Company (leave blank)
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label
          htmlFor={emailId}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          {c.emailLabel}
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={c.emailPlaceholder}
          className={inputClass}
        />
      </div>

      <label
        htmlFor={kvkkId}
        className="flex items-start gap-3 rounded-xl bg-mist/60 p-3.5 text-xs text-navy/70 cursor-pointer"
      >
        <input
          id={kvkkId}
          name="kvkk"
          type="checkbox"
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-remax-red"
        />
        <span>{c.kvkkText}</span>
      </label>

      {error && (
        <p role="alert" className="text-sm font-medium text-remax-red">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-5 text-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex-1 sm:flex-initial",
          )}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 me-2 animate-spin" aria-hidden />
              {c.submitting}
            </>
          ) : (
            <>
              <Download className="h-4 w-4 me-2" aria-hidden />
              {c.submitButton}
            </>
          )}
        </button>

        <a
          href={pdfUrl}
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy/70 hover:text-remax-red transition-colors py-2.5"
        >
          {c.noEmailOption} →
        </a>
      </div>
    </form>
  );
}
