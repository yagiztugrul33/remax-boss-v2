"use client";

import { useId, useState, type FormEvent } from "react";
import { Send, Info } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";

const subjects = [
  "Satılık mülk hakkında",
  "Kiralık mülk hakkında",
  "Mülkümün değerini öğrenmek istiyorum",
  "Yatırım danışmanlığı",
  "Diğer",
] as const;

/**
 * Backend yok — disiplin.
 * Submit, kullanıcının e-posta istemcisinde önceden doldurulmuş bir
 * mailto:info@... taslağı açar. Sahte "gönderildi" akışı YOK.
 */
export default function ContactForm() {
  const ids = {
    name: useId(),
    email: useId(),
    phone: useId(),
    subject: useId(),
    message: useId(),
  };
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[+()\d\s-]{7,}$/;

  function buildMailto(data: FormData) {
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "Genel İletişim").trim();
    const message = String(data.get("message") ?? "").trim();

    const bodyLines = [
      `Ad Soyad: ${name}`,
      `E-posta: ${email}`,
      `Telefon: ${phone}`,
      "",
      "Mesaj:",
      message,
    ];

    const params = new URLSearchParams({
      subject: `[Web] ${subject}`,
      body: bodyLines.join("\n"),
    });
    return `mailto:${office.email}?${params.toString()}`;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // Honeypot — bot bu gizli alanı doldurursa sessizce iptal (anti-spam).
    if (String(data.get("company") ?? "").trim() !== "") return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Lütfen ad, e-posta ve mesaj alanlarını doldurun.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }
    if (phone && !PHONE_RE.test(phone)) {
      setError("Telefon numarası geçersiz görünüyor.");
      return;
    }

    setError(null);
    window.location.href = buildMailto(data);
    setOpened(true);
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-white p-6 md:p-8 space-y-4 shadow-card"
      noValidate
    >
      {/* Honeypot — ekran dışı; insanlar görmez, botlar doldurur → spam filtresi. */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Şirket (boş bırakın)
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl bg-remax-blue-soft p-3.5 text-xs text-navy/75">
        <Info
          className="h-4 w-4 mt-0.5 flex-shrink-0 text-remax-blue"
          aria-hidden
        />
        <span>
          Form bir taslak hazırlar ve kendi e-posta uygulamanızda açar; mesajı
          siz gönderirsiniz. Hızlı erişim için doğrudan{" "}
          <a
            href={`tel:${office.phone}`}
            className="font-semibold text-remax-blue hover:underline"
            dir="ltr"
          >
            {office.phone}
          </a>{" "}
          numarasını da arayabilirsiniz.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={ids.name}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Ad Soyad
          </label>
          <input
            id={ids.name}
            name="name"
            required
            type="text"
            placeholder="Adınız Soyadınız"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={ids.phone}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            Telefon
          </label>
          <input
            id={ids.phone}
            name="phone"
            type="tel"
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
          E-posta
        </label>
        <input
          id={ids.email}
          name="email"
          required
          type="email"
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
          Mesajınız
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

      {error && (
        <p role="alert" className="text-sm font-medium text-remax-red">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className="text-xs text-navy/55">
          KVKK kapsamında bilgilerinizi paylaşıyor sayılırsınız.
        </p>
        <button
          type="submit"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)]",
          )}
        >
          <Send className="h-4 w-4 me-2" />
          E-posta Taslağı Hazırla
        </button>
      </div>

      {opened && (
        <div
          role="status"
          className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-sm text-emerald-800"
        >
          E-posta uygulamanız açıldıysa mesajı oradan gönderebilirsiniz.
          Açılmadıysa lütfen{" "}
          <a
            href={`mailto:${office.email}`}
            className="font-semibold underline"
          >
            {office.email}
          </a>{" "}
          adresine doğrudan yazın.
        </div>
      )}
    </form>
  );
}
