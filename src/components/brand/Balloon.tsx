import { cn } from "@/lib/utils";

interface BalloonProps {
  className?: string;
  withBasket?: boolean;
  ariaLabel?: string;
}

/**
 * RE/MAX sıcak hava balonu — official brand renkleriyle inşa edilmiş SVG.
 *
 * Geometri:
 *  - Balon: yumurta-oval (üst hafif sivri, alt geniş yarımküre)
 *  - Bant oranı: kırmızı %45 / beyaz %8 / mavi %47 (gerçek RE/MAX dağılımı)
 *  - 6 dikey dilim dikiş çizgisi (3D balon hissi)
 *  - Üst sol yumuşak parlaklık (gradient)
 *  - Sepet: ahşap dokulu, 4 halat ile balon kenarına bağlı
 */
export default function Balloon({
  className,
  withBasket = true,
  ariaLabel = "RE/MAX balonu",
}: BalloonProps) {
  return (
    <svg
      viewBox="0 0 100 130"
      className={cn("inline-block", className)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <clipPath id="balloon-shape">
          <path d="M50 4 C76 4 92 24 92 50 C92 68 86 82 76 92 L24 92 C14 82 8 68 8 50 C8 24 24 4 50 4 Z" />
        </clipPath>
        <radialGradient
          id="balloon-highlight"
          cx="30%"
          cy="22%"
          r="55%"
          fx="28%"
          fy="20%"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="balloon-shadow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="78%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
        </linearGradient>
        <linearGradient id="basket-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5a2b" />
          <stop offset="100%" stopColor="#5b3818" />
        </linearGradient>
      </defs>

      {/* Renk bantları */}
      <g clipPath="url(#balloon-shape)">
        <rect x="0" y="0" width="100" height="42" fill="#dc1c2e" />
        <rect x="0" y="42" width="100" height="8" fill="#ffffff" />
        <rect x="0" y="50" width="100" height="50" fill="#003da5" />
      </g>

      {/* Dikey dilim dikişleri (3D efekti) */}
      <g clipPath="url(#balloon-shape)" opacity="0.55">
        <path
          d="M50 4 C50 4 38 18 38 50 C38 74 44 88 50 92"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M50 4 C50 4 62 18 62 50 C62 74 56 88 50 92"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M50 4 C50 4 26 20 26 50 C26 72 36 86 42 92"
          stroke="rgba(0,0,0,0.14)"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M50 4 C50 4 74 20 74 50 C74 72 64 86 58 92"
          stroke="rgba(0,0,0,0.14)"
          strokeWidth="0.5"
          fill="none"
        />
      </g>

      {/* Sağ kenardan yumuşak gölge — hacim */}
      <path
        d="M50 4 C76 4 92 24 92 50 C92 68 86 82 76 92 L24 92 C14 82 8 68 8 50 C8 24 24 4 50 4 Z"
        fill="url(#balloon-shadow)"
      />

      {/* Üst sol parlaklık */}
      <path
        d="M50 4 C76 4 92 24 92 50 C92 68 86 82 76 92 L24 92 C14 82 8 68 8 50 C8 24 24 4 50 4 Z"
        fill="url(#balloon-highlight)"
      />

      {/* Dış kontur */}
      <path
        d="M50 4 C76 4 92 24 92 50 C92 68 86 82 76 92 L24 92 C14 82 8 68 8 50 C8 24 24 4 50 4 Z"
        fill="none"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth="0.8"
      />

      {withBasket && (
        <>
          {/* Halatlar — balonun alt kenarından sepete */}
          <path
            d="M24 92 Q26 100 33 110"
            stroke="#0a1a36"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M76 92 Q74 100 67 110"
            stroke="#0a1a36"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M38 92 L41 110"
            stroke="#0a1a36"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M62 92 L59 110"
            stroke="#0a1a36"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
          />

          {/* Sepet gövdesi */}
          <rect
            x="31"
            y="110"
            width="38"
            height="14"
            rx="1.8"
            fill="url(#basket-wood)"
            stroke="#3a2613"
            strokeWidth="0.6"
          />
          {/* Üst kayış (kenarlı) */}
          <rect x="31" y="110" width="38" height="3.5" fill="#a06a36" />
          {/* Sepet örgü çizgileri */}
          <g stroke="#3a2613" strokeWidth="0.4">
            <line x1="37" y1="113.5" x2="37" y2="124" />
            <line x1="43" y1="113.5" x2="43" y2="124" />
            <line x1="50" y1="113.5" x2="50" y2="124" />
            <line x1="57" y1="113.5" x2="57" y2="124" />
            <line x1="63" y1="113.5" x2="63" y2="124" />
          </g>
          <g stroke="#3a2613" strokeWidth="0.3" opacity="0.6">
            <line x1="31" y1="117" x2="69" y2="117" />
            <line x1="31" y1="120.5" x2="69" y2="120.5" />
          </g>
        </>
      )}
    </svg>
  );
}
