"use client";

import { useState } from "react";
import { Share2, LinkIcon, Printer, Check } from "lucide-react";

interface ListingShareProps {
  title: string;
}

/**
 * İlan paylaşım araçları — WhatsApp'ta paylaş, linki kopyala, yazdır.
 * URL client'ta window.location'dan alınır (paylaşılabilir filtre/utm korunur).
 */
export default function ListingShare({ title }: ListingShareProps) {
  const [copied, setCopied] = useState(false);

  function currentUrl(): string {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }

  function shareWhatsApp() {
    const url = currentUrl();
    const text = `${title} — ${url}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard izni yoksa sessiz geç — kullanıcı adres çubuğundan kopyalayabilir.
    }
  }

  const btnClass =
    "inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-navy/70 hover:text-remax-red hover:border-remax-red/40 transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={shareWhatsApp} className={btnClass}>
        <Share2 className="h-3.5 w-3.5" aria-hidden />
        WhatsApp&apos;ta paylaş
      </button>
      <button type="button" onClick={copyLink} className={btnClass}>
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
            Kopyalandı
          </>
        ) : (
          <>
            <LinkIcon className="h-3.5 w-3.5" aria-hidden />
            Linki kopyala
          </>
        )}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className={btnClass}
      >
        <Printer className="h-3.5 w-3.5" aria-hidden />
        Yazdır
      </button>
    </div>
  );
}
