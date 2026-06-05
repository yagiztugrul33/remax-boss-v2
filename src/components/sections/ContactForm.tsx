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
 * Backend yok — Faz 2 disiplini.
 * Submit, kullanıcının kendi e-posta istemcisinde önceden doldurulmuş
 * bir mailto:info@... taslağı açar. Sahte "gönderildi" akışı YOK.
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
    window.location.href = buildMailto(data);
    setOpened(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white p-6 md:p-7 space-y-4"
      noValidate
    >
      <div className="flex items-start gap-2 rounded-lg bg-remax-blue-soft p-3 text-xs text-navy/75">
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-remax-blue" aria-hidden />
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
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15"
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
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15"
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
          className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15"
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
          className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15"
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
          className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 resize-y"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <p className="text-xs text-navy/55">
          KVKK kapsamında bilgilerinizi paylaşıyor sayılırsınız.
        </p>
        <button
          type="submit"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-remax-red hover:bg-remax-red-dark text-white h-11 px-5",
          )}
        >
          <Send className="h-4 w-4 me-2" />
          E-posta Taslağı Hazırla
        </button>
      </div>

      {opened && (
        <div
          role="status"
          className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800"
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
