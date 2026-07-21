"use client";

import { useState } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import Lightbox from "@/components/ui/lightbox";

interface ListingGalleryProps {
  title: string;
  imageUrls: readonly string[];
}

/**
 * İlan görsel galerisi — hero + küçükler grid (mevcut düzen korunur),
 * tıklayınca ortak Lightbox (klavye: Esc/←/→) açılır.
 * Görsel yoksa marka gradient fallback.
 */
export default function ListingGallery({
  title,
  imageUrls,
}: ListingGalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const imgs = imageUrls;

  if (imgs.length === 0) {
    return (
      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-navy-700 via-remax-blue to-remax-red">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-x-5 bottom-5">
          <div className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-eyebrow font-display text-navy">
            Görsel yakında eklenecek
          </div>
        </div>
      </div>
    );
  }

  const lightboxImages = imgs.map((src, i) => ({
    src,
    alt: `${title} — ${i + 1}`,
  }));

  const open = (i: number) => setLightboxIdx(i);

  const heroButton = (
    <button
      type="button"
      onClick={() => open(0)}
      className="group relative w-full h-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-remax-red"
      aria-label={`${title} — görseli büyüt (1 / ${imgs.length})`}
    >
      <Image
        src={imgs[0]}
        alt={`${title} — 1`}
        fill
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        priority
      />
      {imgs.length > 1 && (
        <span className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 rounded-full bg-navy-900/80 px-3 py-1.5 text-xs font-semibold text-white">
          <Images className="h-3.5 w-3.5" aria-hidden />
          {imgs.length}
        </span>
      )}
    </button>
  );

  return (
    <>
      {imgs.length === 1 ? (
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-mist">
          {heroButton}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
          <div className="relative aspect-[16/10] lg:aspect-auto rounded-3xl overflow-hidden bg-mist">
            {heroButton}
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {imgs.slice(1, 5).map((src, i) => {
              const isLastVisible = i === 3 && imgs.length > 5;
              return (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => open(i + 1)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-mist cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-remax-red"
                  aria-label={`${title} — görseli büyüt (${i + 2} / ${imgs.length})`}
                >
                  <Image
                    src={src}
                    alt={`${title} — ${i + 2}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {isLastVisible && (
                    <span className="absolute inset-0 flex items-center justify-center bg-navy-900/60 text-white font-display font-bold text-lg">
                      +{imgs.length - 5}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {lightboxIdx !== null && (
        <Lightbox
          images={lightboxImages}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}
