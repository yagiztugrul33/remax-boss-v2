"use client";

import { useId, useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const subjects = [
  "Satılık mülk hakkında",
  "Kiralık mülk hakkında",
  "Mülkümün değerini öğrenmek istiyorum",
  "Yatırım danışmanlığı",
  "Diğer",
] as const;

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{7,}$/;

/**
 * Gerçek lead formu — Supabase contact_messages tablosuna INSERT eder
 * (anon client, RLS yalnız insert'e izin verir). Mesaj kaybolmaz; admin
 * /admin/mesajlar'da görür. KVKK açık rıza zorunlu (Türkiye yasal).
 */
export default function ContactForm() {
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

    // Honeypot — bot bu gizli alanı doldurursa sessizce iptal (anti-spam).
    if (String(data.get("company") ?? "").trim() !== "") return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const kvkk = data.get("kvkk") === "on";

    // ── Validasyon (client) ──
    if (!name) return setError("Lütfen ad soyad girin.");
    if (!phone || !PHONE_RE.test(phone))
      return setError("Lütfen geçerli bir telefon numarası girin.");
    if (email && !EMAIL_RE.test(email))
      return setError("Girdiğiniz e-posta adresi geçersiz görünüyor.");
    if (!message) return setError("Lütfen mesajınızı yazın.");
    if (!kvkk)
      return setError("Devam etmek için KVKK aydınlatma onayını işaretleyin.");

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
          // Konu, mesaja eklenir (kaybolmasın); source = form tipi.
          message: subject ? `[${subject}]\n\n${message}` : message,
          source: "iletisim",
          kvkk_consent: kvkk,
        });
      if (dbError) throw dbError;
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        "Mesaj gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
      );
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors";

  // ── Başarı ekranı ──
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
          Mesajınız alındı
        </h3>
        <p className="mt-2 text-sm text-navy/65 leading-relaxed max-w-sm mx-auto">
          En kısa sürede size geri döneceğiz. İlginiz için teşekkür ederiz.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-6 h-11 px-5 text-sm font-semibold",
          )}
        >
          Yeni mesaj gönder
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
      {/* Honeypot — ekran dışı; insanlar görmez, botlar doldurur → spam filtresi. */}
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
            htmlFor={ids.name}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Ad Soyad <span className="text-remax-red">*</span>
          </label>
          <input
            id={ids.name}
            name="name"
            required
            type="text"
            autoComplete="name"
            placeholder="Adınız Soyadınız"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={ids.phone}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Telefon <span className="text-remax-red">*</span>
          </label>
          <input
            id={ids.phone}
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+90 5XX XXX XX XX"
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
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={ids.subject}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          Konu
        </label>
        <select
          id={ids.subject}
          name="subject"
          className={inputClass}
          defaultValue={subjects[0]}
        >
          {subjects.map((s) => (
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
          Mesajınız <span className="text-remax-red">*</span>
        </label>
        <textarea
          id={ids.message}
          name="message"
          required
          rows={5}
          placeholder="Bize iletmek istediğiniz detayları yazın…"
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* KVKK açık rıza — zorunlu */}
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
          Kişisel verilerimin, talebimin değerlendirilmesi amacıyla{" "}
          <span className="font-semibold text-navy">RE/MAX BOSS</span>{" "}
          tarafından KVKK kapsamında işlenmesini kabul ediyorum.
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm font-medium text-remax-red">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className="text-xs text-navy/55">
          <span className="text-remax-red">*</span> işaretli alanlar zorunludur.
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
              Gönderiliyor…
            </>
          ) : (
            <>
              <Send className="h-4 w-4 me-2" aria-hidden />
              Mesaj Gönder
            </>
          )}
        </button>
      </div>
    </form>
  );
}
