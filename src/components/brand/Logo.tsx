import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark" | "balloon";
type Size = "sm" | "md" | "lg";

interface LogoProps {
  /** null → link wrap yapma (hero amblem rozeti gibi yerlerde). */
  href?: string | null;
  /**
   * Hangi zemine konuluyor (LOGO RENGİ değil):
   *   "light"   = açık/beyaz zemin → RENKLİ logo (kırmızı RE/MAX + mavi BOSS)
   *   "dark"    = koyu/navy zemin  → BEYAZ logo
   *   "balloon" = balonlu amblem (hero, dekoratif)
   */
  variant?: Variant;
  size?: Size;
  className?: string;
}

const dims: Record<Variant, { w: number; h: number }> = {
  light: { w: 800, h: 800 },
  dark: { w: 800, h: 800 },
  balloon: { w: 1024, h: 1024 },
};

const sizeClass: Record<Variant, Record<Size, string>> = {
  light: {
    sm: "h-9 w-auto",
    md: "h-12 w-auto md:h-14",
    lg: "h-20 w-auto md:h-24",
  },
  dark: {
    sm: "h-9 w-auto",
    md: "h-12 w-auto md:h-14",
    lg: "h-20 w-auto md:h-24",
  },
  balloon: {
    sm: "h-12 w-auto",
    md: "h-16 w-auto md:h-20",
    lg: "h-28 w-auto md:h-32",
  },
};

const src: Record<Variant, string> = {
  light: "/brand/remax-boss-color.png",
  dark: "/brand/remax-boss-white.png",
  balloon: "/brand/remax-boss-balloon.png",
};

/**
 * Resmi RE/MAX BOSS marka işareti — next/image ile.
 * Kullanım:
 *   <Logo />                                   light zemin (default) → renkli
 *   <Logo variant="dark" />                    koyu zemin → beyaz
 *   <Logo variant="balloon" size="lg" />       hero amblem
 */
export default function Logo({
  href = "/",
  variant = "light",
  size = "md",
  className,
}: LogoProps) {
  const { w, h } = dims[variant];
  const cls = sizeClass[variant][size];

  const content = (
    <Image
      src={src[variant]}
      alt="RE/MAX BOSS"
      width={w}
      height={h}
      priority
      className={cn("object-contain", cls, className)}
    />
  );

  if (!href) return content;
  return (
    <Link href={href} className="inline-flex items-center" aria-label="RE/MAX BOSS">
      {content}
    </Link>
  );
}
