import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "mist" | "dark";
type Density = "tight" | "normal" | "loose";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: Tone;
  density?: Density;
  full?: boolean; // true → container wrapper YOK (kenardan kenara içerik)
  innerClassName?: string;
}

/**
 * Anasayfa section sarmalayıcısı.
 * Tutarlı dikey ritim + opsiyonel yüzey rengi + container.
 *
 *   <Section tone="dark" density="loose" id="iletisim">...
 */
export default function Section({
  tone = "light",
  density = "normal",
  full = false,
  className,
  innerClassName,
  children,
  ...rest
}: SectionProps) {
  const tones: Record<Tone, string> = {
    light: "bg-white text-navy",
    mist: "bg-mist text-navy",
    dark: "bg-navy-900 text-white",
  };

  // 2026-06-10 — Sıkılaştırma: tüm site "havada" hissinden kurtulsun.
  // Önceki: tight py-12 md:py-16 · normal py-16 md:py-24 · loose py-20 md:py-32
  // Yeni:   tight py-10 md:py-14 · normal py-12 md:py-20 · loose py-16 md:py-24
  // Mobilde daha sıkı; masaüstünde ferah ama dolu.
  const densities: Record<Density, string> = {
    tight: "py-10 md:py-14",
    normal: "py-12 md:py-20",
    loose: "py-16 md:py-24",
  };

  return (
    <section
      {...rest}
      className={cn(tones[tone], densities[density], className)}
    >
      {full ? (
        children
      ) : (
        <div className={cn("container-page", innerClassName)}>{children}</div>
      )}
    </section>
  );
}
