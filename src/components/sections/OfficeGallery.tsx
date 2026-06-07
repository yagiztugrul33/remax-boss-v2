"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/lightbox";
import { officeGallery } from "@/lib/office";

export default function OfficeGallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (officeGallery.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {officeGallery.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightboxIdx(i)}
            aria-label={`Büyüt: ${img.alt}`}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-mist border border-line group focus-visible:outline-2 focus-visible:outline-remax-red focus-visible:outline-offset-2"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              priority={i < 4}
            />
            <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={[...officeGallery]}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}
