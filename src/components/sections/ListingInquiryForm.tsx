"use client";

import { useId, useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fireNotify } from "@/lib/i18n/client";

type Status = "idle" | "sending" | "success" | "error";

const PHONE_RE = /^[+()\d\s-]{7,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ListingInquiryFormProps {
  /** İlan referansı — not_text'e gömülür (admin panelinde görünür). */
  listingRef: string;
  listingTitle: string;
  listingType: "satilik" | "kiralik";
  /** buyer_requests.mulk_tipi enum'una normalize edilmiş değer. */
  mulkTipi: string;
  /** buyer_requests.ilce zorunlu — listing.district ?? city. */
  ilce: string;
}

/**
 * İlan detay talep formu — kısa varyant. Mevcut /api/buyer-request
 * endpoint'ine (rate-limit + honeypot + KVKK zorunlu) ilan referansıyla
 * kayıt atar; ilan bilgileri not_text'in başına eklenir. Yeni tablo YOK.
 */
export default function ListingInquiryForm({
  listingRef,
  listingTitle,
  listingType,
  mulkTipi,
  ilce,
}: ListingInquiryFormProps) {
  const ids = {
    ad: useId(),
    tel: useId(),
    email: useId(),
    mesaj: useId(),
    kvkk: useId(),
    err: useId(),
  };
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "").trim() !== "") return; // honeypot

    const ad_soyad = String(data.get("ad_soyad") ?? "").trim();
    const telefon = String(data.get("telefon") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const mesaj = String(data.get("mesaj") ?? "")
      .trim()
      .slice(0, 1500);
    const kvkk = data.get("kvkk") === "on";

    setError(null);
    if (!ad_soyad) return setError("Lütfen ad soyad girin.");
    if (!telefon || !PHONE_RE.test(telefon))
      return setError("Lütfen geçerli bir telefon numarası girin.");
    if (email && !EMAIL_RE.test(email))
      return setError("Girdiğiniz e-posta adresi geçersiz görünüyor.");
    if (!kvkk)
      return setError("Devam etmek için KVKK aydınlatma onayını işaretleyin.");

    setStatus("sending");
    try {
      const res = await fetch("/api/buyer-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ad_soyad,
          telefon,
          email,
          islem_tipi: listingType,
          mulk_tipi: mulkTipi,
          ilce,
          zaman_planlama: "esnek",
          // İlan referansı — admin panelinde talebin hangi ilana ait olduğu görünür.
          not_text: `[İlan talebi: ${listingRef} — ${listingTitle}]${
            mesaj ? `\n\n${mesaj}` : ""
          }`,
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
            "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
        );
      }
      // Otomatik teşekkür e-postası — best-effort, RESEND yoksa no-op.
      if (email) {
        fireNotify({ kind: "buyer", email, name: ad_soyad });
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
    "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors";

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="mt-4 font-display font-bold text-lg text-navy">
          Talebiniz alındı
        </h3>
        <p className="mt-2 text-sm text-navy/65 leading-relaxed">
          Bu ilanla ilgili en kısa sürede sizinle iletişime geçeceğiz. İlginiz
          için teşekkürler.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white p-5 space-y-3 relative"
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

      <div>
        <label
          htmlFor={ids.ad}
          className="block text-sm font-semibold text-navy mb-1"
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
          maxLength={200}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={ids.tel}
          className="block text-sm font-semibold text-navy mb-1"
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
          maxLength={40}
          className={inputClass}
          dir="ltr"
        />
      </div>

      <div>
        <label
          htmlFor={ids.email}
          className="block text-sm font-semibold text-navy mb-1"
        >
          E-posta <span className="text-navy/40 font-normal">(opsiyonel)</span>
        </label>
        <input
          id={ids.email}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ornek@eposta.com"
          maxLength={200}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={ids.mesaj}
          className="block text-sm font-semibold text-navy mb-1"
        >
          Mesajınız <span className="text-navy/40 font-normal">(opsiyonel)</span>
        </label>
        <textarea
          id={ids.mesaj}
          name="mesaj"
          rows={3}
          placeholder="Görmek istediğiniz gün/saat, sorularınız…"
          maxLength={1500}
          className={`${inputClass} resize-y`}
        />
      </div>

      <label
        htmlFor={ids.kvkk}
        className="flex items-start gap-2.5 rounded-xl bg-mist/60 p-3 text-xs text-navy/70 cursor-pointer"
      >
        <input
          id={ids.kvkk}
          name="kvkk"
          type="checkbox"
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-remax-red"
        />
        <span>
          Kişisel verilerimin bu ilanla ilgili talebimin yönetilmesi amacıyla{" "}
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
            Gönderiliyor…
          </>
        ) : (
          <>
            <Send className="h-4 w-4 me-2" aria-hidden />
            Bilgi almak istiyorum
          </>
        )}
      </button>
    </form>
  );
}
