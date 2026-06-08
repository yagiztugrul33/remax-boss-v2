"use client";

import { useId, useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Dict } from "@/lib/i18n/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{7,}$/;

/**
 * Gerçek lead formu — Supabase contact_messages tablosuna INSERT eder
 * (anon client, RLS yalnız insert'e izin verir). Mesaj kaybolmaz; admin
 * /admin/mesajlar'da görür. KVKK açık rıza zorunlu (Türkiye yasal).
 *
 * Etiket/placeholder/error/success metinleri sözlükten (TR/EN); mantık aynı.
 */
export default function ContactForm({
  dict,
}: {
  dict: Dict["forms"]["contact"];
}) {
  const ids = {
    name: useId(),
    email: useId(),
    phone: useId(),
    subject: useId(),
    message: useId(),
    kvkk: useId(),
  };
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "").trim() !== "") return; // honeypot

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const kvkk = data.get("kvkk") === "on";

    if (!name) return setError(dict.errors.nameRequired);
    if (!phone || !PHONE_RE.test(phone))
      return setError(dict.errors.phoneRequired);
    if (email && !EMAIL_RE.test(email))
      return setError(dict.errors.emailInvalid);
    if (!message) return setError(dict.errors.messageRequired);
    if (!kvkk) return setError(dict.errors.kvkkRequired);

    setError(null);
    setStatus("sending");

    try {
      const supabase = createClient();
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert({
          name,
          email: email || null,
          phone,
          message: subject ? `[${subject}]\n\n${message}` : message,
          source: "iletisim",
          kvkk_consent: kvkk,
        });
      if (dbError) throw dbError;
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError(dict.errors.sendFailed);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors";

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
          {dict.successTitle}
        </h3>
        <p className="mt-2 text-sm text-navy/65 leading-relaxed max-w-sm mx-auto">
          {dict.successDesc}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-6 h-11 px-5 text-sm font-semibold",
          )}
        >
          {dict.newMessageBtn}
        </button>
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
          {dict.companyHoneypotLabel}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={ids.name}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {dict.nameLabel} <span className="text-remax-red">*</span>
          </label>
          <input
            id={ids.name}
            name="name"
            required
            type="text"
            autoComplete="name"
            placeholder={dict.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={ids.phone}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {dict.phoneLabel} <span className="text-remax-red">*</span>
          </label>
          <input
            id={ids.phone}
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={dict.phonePlaceholder}
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
          {dict.emailLabel}{" "}
          <span className="text-navy/40 font-normal">{dict.emailOptional}</span>
        </label>
        <input
          id={ids.email}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={dict.emailPlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={ids.subject}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          {dict.subjectLabel}
        </label>
        <select
          id={ids.subject}
          name="subject"
          className={inputClass}
          defaultValue={dict.subjectOptions[0]}
        >
          {dict.subjectOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor={ids.message}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          {dict.messageLabel} <span className="text-remax-red">*</span>
        </label>
        <textarea
          id={ids.message}
          name="message"
          required
          rows={5}
          placeholder={dict.messagePlaceholder}
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
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-remax-red"
        />
        <span>
          {dict.kvkkConsentBefore}
          <span className="font-semibold text-navy">
            {dict.kvkkBrandEmphasis}
          </span>
          {dict.kvkkConsentAfter}
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm font-medium text-remax-red">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className="text-xs text-navy/55">
          <span className="text-remax-red">*</span> {dict.requiredHint}
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
      </div>
    </form>
  );
}
