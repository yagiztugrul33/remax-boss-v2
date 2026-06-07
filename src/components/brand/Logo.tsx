import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "light" | "light-hd" | "dark" | "balloon";
type Size = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  /** null → link wrap yapma (overlay rozet için). */
  href?: string | null;
  /**
   *   light    = açık zemin, kompakt renkli wordmark
   *   light-hd = açık zemin, HD renkli wordmark (büyük gösterim için)
   *   dark     = koyu zemin, beyaz wordmark
   *   balloon  = sıcak hava balonu + wordmark amblem (kompakt marka işareti)
   */
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Above-the-fold logolar için true (varsayılan). Footer gibi
   *  fold-altı kullanımda false → tembel yüklenir. */
  priority?: boolean;
}

/**
 * Logo görselleri kare PNG (içerik orantılı). Yükseklikle boyutlandırılır,
 * object-contain ile aspect korunur — yatay/dikey içerik fark etmez ezilmez.
 *
 * Şu boyutlar Navbar/Footer/Hero için DENGELI okunabilirlik:
 *   sm  → küçük rozet / mobil çok kompakt
 *   md  → Navbar (mobil) / liste içi
 *   lg  → Navbar (desktop) / Footer / hero rozet
 *   xl  → /hakkimizda hero üstü / büyük amblem gösterim
 */
const sizeClass: Record<Variant, Record<Size, string>> = {
  light: {
    sm: "h-9 w-auto",
    md: "h-12 w-auto",
    lg: "h-20 w-auto md:h-24",
    xl: "h-24 w-auto md:h-28",
  },
  "light-hd": {
    sm: "h-12 w-auto",
    md: "h-16 w-auto md:h-20",
    lg: "h-24 w-auto md:h-32",
    xl: "h-32 w-auto md:h-40 lg:h-48",
  },
  dark: {
    sm: "h-9 w-auto",
    md: "h-12 w-auto",
    lg: "h-20 w-auto md:h-28",
    xl: "h-24 w-auto md:h-32",
  },
  balloon: {
    sm: "h-14 w-auto",
    md: "h-20 w-auto md:h-24",
    lg: "h-20 w-auto md:h-28",
    xl: "h-24 w-auto md:h-32",
  },
};

const src: Record<Variant, string> = {
  light: "/brand/remax-boss-color.png",
  "light-hd": "/brand/remax-boss-color-light.png",
  dark: "/brand/remax-boss-white.png",
  balloon: "/brand/remax-boss-balloon.png",
};

// Görseller kare PNG; ezilme olmasın diye yine de gerçek pikseller belirtildi.
const dims: Record<Variant, { w: number; h: number }> = {
  light: { w: 800, h: 800 },
  "light-hd": { w: 1024, h: 1024 },
  dark: { w: 800, h: 800 },
  balloon: { w: 1024, h: 1024 },
};

export default function Logo({
  href = "/",
  variant = "light",
  size = "md",
  className,
  priority = true,
}: LogoProps) {
  const { w, h } = dims[variant];
  const cls = sizeClass[variant][size];

  const content = (
    <Image
      src={src[variant]}
      alt="RE/MAX BOSS"
      width={w}
      height={h}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn("object-contain", cls, className)}
    />
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
