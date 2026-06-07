"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  startIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(startIndex);

  const prev = useCallback(() => setIdx((i) => (i === 0 ? images.length - 1 : i - 1)), [images.length]);
  const next = useCallback(() => setIdx((i) => (i === images.length - 1 ? 0 : i + 1)), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  const img = images[idx];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fotoğraf görüntüleyici"
      className="fixed inset-0 z-[300] flex items-center justify-center bg-navy-900/96 backdrop-blur-md"
      onClick={onClose}
    >
      {/* close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Kapat"
        className="absolute top-4 end-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      {/* prev */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Önceki"
        className="absolute start-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* image */}
      <div
        className="relative w-full max-w-5xl max-h-[90vh] aspect-[16/10] mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </div>

      {/* next */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Sonraki"
        className="absolute end-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* counter */}
      <div className="absolute bottom-4 start-0 end-0 text-center text-sm text-white/60">
        {idx + 1} / {images.length}
      </div>
    </div>
  );
}
