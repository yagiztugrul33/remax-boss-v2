import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "card" | "mist" | "dark" | "red" | "blue";

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  hoverable?: boolean;
}

/**
 * Yüzey kartı — koyu/açık bağlamda tutarlı elevation + hover.
 * Hem light hem dark section içinde kullanılır.
 */
export default function Surface({
  tone = "card",
  hoverable = false,
  className,
  children,
  ...rest
}: SurfaceProps) {
  const tones: Record<Tone, string> = {
    card: "bg-white text-navy border border-line shadow-card",
    mist: "bg-mist text-navy border border-line",
    dark: "bg-navy-700 text-white border-glow",
    red: "bg-remax-red text-white",
    blue: "bg-remax-blue text-white",
  };

  const hover = hoverable
    ? "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated"
    : "";

  return (
    <div
      {...rest}
      className={cn("rounded-2xl", tones[tone], hover, className)}
    >
      {children}
    </div>
  );
}
