import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "red" | "blue" | "navy" | "white";

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

/**
 * Modern bold "kicker" etiketi.
 * Section başlıklarının üstünde küçük, uppercase, tracked, ikon bandı ile.
 *
 *   <Eyebrow tone="red">İlanlar</Eyebrow>
 */
export default function Eyebrow({
  tone = "red",
  className,
  children,
  ...rest
}: EyebrowProps) {
  const tones: Record<Tone, string> = {
    red: "text-remax-red",
    blue: "text-remax-blue",
    navy: "text-navy",
    white: "text-white",
  };

  const dotBg: Record<Tone, string> = {
    red: "bg-remax-red",
    blue: "bg-remax-blue",
    navy: "bg-navy",
    white: "bg-white",
  };

  return (
    <span
      {...rest}
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-eyebrow uppercase",
        tones[tone],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-1.5 w-1.5 rounded-full", dotBg[tone])}
      />
      {children}
    </span>
  );
}
