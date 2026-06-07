import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLockupProps {
  /** nav = yatay (balon + renkli wordmark); footer = dikey (balon üstte + beyaz wordmark). */
  variant?: "nav" | "footer";
  /** Scroll-shrink (yalnızca nav): scroll'da logo orantılı küçülür. */
  scrolled?: boolean;
  /** null → link wrap yapma. */
  href?: string | null;
  className?: string;
}

// Resmi asset'ler — balon amblemi balloon.png'den kırpıldı, wordmark'lar
// color.png / white.png'den trim edildi. Yeniden çizim / renk değişimi YOK.
const EMBLEM = { src: "/brand/remax-balloon-emblem.png", w: 266, h: 337 };
const WORD_COLOR = { src: "/brand/remax-wordmark-color.png", w: 386, h: 138 };
const WORD_WHITE = { src: "/brand/remax-wordmark-white.png", w: 494, h: 54 };

/**
 * RE/MAX balon amblemi + "RE/MAX BOSS" wordmark marka kilidi.
 * - nav:    yatay, renkli wordmark (beyaz navbar zemini), scroll-shrink.
 * - footer: dikey (balon üstte), beyaz wordmark (koyu navy zemin), sabit boyut.
 */
export default function BrandLockup({
  variant = "nav",
  scrolled = false,
  href = "/",
  className,
}: BrandLockupProps) {
  let inner: React.ReactNode;

  if (variant === "footer") {
    // Dikey: balon üstte + beyaz wordmark altta — koyu zeminde okunur, kutusuz.
    inner = (
      <span className={cn("inline-flex flex-col items-start gap-2.5", className)}>
        <Image
          src={EMBLEM.src}
          alt=""
          aria-hidden
          width={EMBLEM.w}
          height={EMBLEM.h}
          className="h-14 w-auto object-contain md:h-16"
        />
        <Image
          src={WORD_WHITE.src}
          alt="RE/MAX BOSS"
          width={WORD_WHITE.w}
          height={WORD_WHITE.h}
          className="h-5 w-auto object-contain md:h-6"
        />
      </span>
    );
  } else {
    // Yatay: balon solda + renkli 2 satır wordmark sağda. 3 kademe daha büyük.
    const emblemH = scrolled ? "h-14 md:h-20" : "h-20 md:h-28";
    const wordH = scrolled ? "h-9 md:h-12" : "h-12 md:h-16";
    inner = (
      <span
        className={cn(
          "inline-flex items-center gap-2.5 transition-all duration-300",
          className,
        )}
      >
        <Image
          src={EMBLEM.src}
          alt=""
          aria-hidden
          width={EMBLEM.w}
          height={EMBLEM.h}
          priority
          className={cn(
            "w-auto object-contain transition-[height] duration-300",
            emblemH,
          )}
        />
        <Image
          src={WORD_COLOR.src}
          alt="RE/MAX BOSS"
          width={WORD_COLOR.w}
          height={WORD_COLOR.h}
          priority
          className={cn(
            "w-auto object-contain transition-[height] duration-300",
            wordH,
          )}
        />
      </span>
    );
  }

  if (!href) return inner;
  return (
    <Link href={href} className="inline-flex" aria-label="RE/MAX BOSS">
      {inner}
    </Link>
  );
}
