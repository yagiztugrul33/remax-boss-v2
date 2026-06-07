"use client";

import { useId, useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "success" | "error";

const PHONE_RE = /^[+()\d\s-]{7,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Kampanya başvuru formu — campaign_applications tablosuna anon INSERT.
 * Ödül VAATETMEZ: başvuru değerlendirme talebidir, hak doğurmaz.
 */
export default function CampaignForm() {
  const ids = {
    ad: useId(),
    tel: useId(),
    email: useId(),
    konum: useId(),
    deger: useId(),
    mesaj: useId(),
    yetki: useId(),
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

    const ad_soyad = String(data.get("ad_soyad") ?? "").trim();
    const telefon = String(data.get("telefon") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const mulk_konumu = String(data.get("mulk_konumu") ?? "").trim();
    const degerRaw = String(data.get("tahmini_deger") ?? "").replace(/[^\d]/g, "");
    const mesaj = String(data.get("mesaj") ?? "").trim();
    const yetki = data.get("yetki") === "on";
    const kvkk = data.get("kvkk") === "on";

    if (!ad_soyad) return setError("Lütfen ad soyad girin.");
    if (!telefon || !PHONE_RE.test(telefon))
      return setError("Lütfen geçerli bir telefon numarası girin.");
    if (email && !EMAIL_RE.test(email))
      return setError("Girdiğiniz e-posta adresi geçersiz görünüyor.");
    if (!mulk_konumu) return setError("Lütfen mülkün konumunu yazın.");
    if (!yetki)
      return setError("Devam etmek için münhasır yetki şartını kabul edin.");
    if (!kvkk) return setError("Lütfen KVKK aydınlatma onayını işaretleyin.");

    setError(null);
    setStatus("sending");
    try {
      const supabase = createClient();
      const { error: dbError } = await supabase
        .from("campaign_applications")
        .insert({
          ad_soyad,
          telefon,
          email: email || null,
          mulk_konumu,
          tahmini_deger: degerRaw ? Number(degerRaw) : null,
          yetki_kabul: yetki,
          mesaj: mesaj || null,
          kvkk_onay: kvkk,
        });
      if (dbError) throw dbError;
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        "Başvuru gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.",
      );
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition-colors";

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
          Başvurunuz alındı
        </h3>
        <p className="mt-2 text-sm text-navy/65 leading-relaxed max-w-sm mx-auto">
          Ekibimiz başvurunuzu ve mülk değerlemesini inceleyip en kısa sürede
          sizinle iletişime geçecek. İlginiz için teşekkürler.
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
          <label htmlFor={ids.ad} className="block text-sm font-semibold text-navy mb-1.5">
            Ad Soyad <span className="text-remax-red">*</span>
          </label>
          <input id={ids.ad} name="ad_soyad" required type="text" autoComplete="name" placeholder="Adınız Soyadınız" className={inputClass} />
        </div>
        <div>
          <label htmlFor={ids.tel} className="block text-sm font-semibold text-navy mb-1.5">
            Telefon <span className="text-remax-red">*</span>
          </label>
          <input id={ids.tel} name="telefon" required type="tel" autoComplete="tel" inputMode="tel" placeholder="+90 5XX XXX XX XX" className={inputClass} dir="ltr" />
        </div>
      </div>

      <div>
        <label htmlFor={ids.email} className="block text-sm font-semibold text-navy mb-1.5">
          E-posta <span className="text-navy/40 font-normal">(opsiyonel)</span>
        </label>
        <input id={ids.email} name="email" type="email" autoComplete="email" placeholder="ornek@eposta.com" className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={ids.konum} className="block text-sm font-semibold text-navy mb-1.5">
            Mülkün Konumu <span className="text-remax-red">*</span>
          </label>
          <input id={ids.konum} name="mulk_konumu" required type="text" placeholder="İlçe / Mahalle (örn. Çankaya)" className={inputClass} />
        </div>
        <div>
          <label htmlFor={ids.deger} className="block text-sm font-semibold text-navy mb-1.5">
            Tahmini Değer (TL) <span className="text-navy/40 font-normal">(opsiyonel)</span>
          </label>
          <input id={ids.deger} name="tahmini_deger" type="text" inputMode="numeric" placeholder="örn. 12.000.000" className={inputClass} dir="ltr" />
        </div>
      </div>

      <div>
        <label htmlFor={ids.mesaj} className="block text-sm font-semibold text-navy mb-1.5">
          Mesajınız <span className="text-navy/40 font-normal">(opsiyonel)</span>
        </label>
        <textarea id={ids.mesaj} name="mesaj" rows={3} placeholder="Mülkünüz hakkında kısa not…" className={`${inputClass} resize-y`} />
      </div>

      {/* Münhasır yetki onayı — zorunlu */}
      <label htmlFor={ids.yetki} className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 p-3.5 text-xs text-navy/75 cursor-pointer">
        <input id={ids.yetki} name="yetki" type="checkbox" className="mt-0.5 h-4 w-4 flex-shrink-0 accent-amber-500" />
        <span>
          Mülküm için en az <span className="font-semibold text-navy">3 ay münhasır (tek yetkili) satış yetkisi</span> verme şartını okudum ve kabul ediyorum.
        </span>
      </label>

      {/* KVKK — zorunlu */}
      <label htmlFor={ids.kvkk} className="flex items-start gap-3 rounded-xl bg-mist/60 p-3.5 text-xs text-navy/70 cursor-pointer">
        <input id={ids.kvkk} name="kvkk" type="checkbox" className="mt-0.5 h-4 w-4 flex-shrink-0 accent-remax-red" />
        <span>
          Kişisel verilerimin başvurumun değerlendirilmesi amacıyla{" "}
          <span className="font-semibold text-navy">RE/MAX BOSS</span> tarafından KVKK kapsamında işlenmesini kabul ediyorum.
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm font-medium text-remax-red">{error}</p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className="text-xs text-navy/55">
          <span className="text-remax-red">*</span> zorunlu. Başvuru ödül hakkı doğurmaz; uygunluk kararı ofise aittir.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-navy hover:bg-navy-700 text-white h-12 px-6 text-sm font-semibold tracking-wide disabled:opacity-70 disabled:cursor-not-allowed",
          )}
        >
          {status === "sending" ? (
            <><Loader2 className="h-4 w-4 me-2 animate-spin" aria-hidden /> Gönderiliyor…</>
          ) : (
            <><Send className="h-4 w-4 me-2" aria-hidden /> Başvuruyu Gönder</>
          )}
        </button>
      </div>
    </form>
  );
}
