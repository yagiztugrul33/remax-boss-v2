import Link from "next/link";
import RemaxBossWordmark from "./RemaxBossWordmark";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Resmi RE/MAX BOSS marka işareti — wordmark-only.
 * Önceki el-çizimi Balloon SVG kaldırıldı; kimlik tipografi üzerinden kurulu:
 *   RE (kırmızı italic) / (mavi separator) MAX (kırmızı italic) ® + BOSS (mavi)
 */
export default function Logo({
  href = "/",
  variant = "default",
  size = "md",
  className,
}: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center", className)}>
      <RemaxBossWordmark size={size} variant={variant} />
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex items-center"
      aria-label="RE/MAX BOSS"
    >
      {content}
    </Link>
  );
}
