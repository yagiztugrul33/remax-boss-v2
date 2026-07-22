"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/lightbox";

export interface GalleryItem {
  src: string;
  alt: string;
}

/**
 * Ofis galerisi grid'i + lightbox. `items` prop'u locale'lenmiş olarak
 * parent'tan gelir (OfficeGallerySection + /hakkimizda async server'da
 * getLocale() çağırıp office.ts'teki bilingual veriyi map'ler).
 */
export default function OfficeGallery({ items }: { items: readonly GalleryItem[] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightboxIdx(i)}
            aria-label={`Büyüt: ${img.alt}`}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-mist border border-line group focus-visible:outline-2 focus-visible:outline-remax-red focus-visible:outline-offset-2"
          >
            {/* priority KALDIRILDI: galeri fold altında; 4 thumb preload'u
                LCP hero görseliyle bant yarışıyordu (LH ölçümü). */}
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={[...items]}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}
