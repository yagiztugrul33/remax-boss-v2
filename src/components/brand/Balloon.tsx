import { cn } from "@/lib/utils";

interface BalloonProps {
  className?: string;
  withBasket?: boolean;
  ariaLabel?: string;
}

export default function Balloon({
  className,
  withBasket = true,
  ariaLabel = "RE/MAX balonu",
}: BalloonProps) {
  return (
    <svg
      viewBox="0 0 80 110"
      className={cn("inline-block", className)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <clipPath id="remax-balloon-clip">
          <path d="M40 4 C61 4 76 21 76 42 C76 56 70 67 60 76 L20 76 C10 67 4 56 4 42 C4 21 19 4 40 4 Z" />
        </clipPath>
        <linearGradient id="remax-balloon-shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g clipPath="url(#remax-balloon-clip)">
        <rect x="0" y="0" width="80" height="30" fill="#dc1c2e" />
        <rect x="0" y="30" width="80" height="14" fill="#ffffff" />
        <rect x="0" y="44" width="80" height="40" fill="#003da5" />
      </g>

      <g clipPath="url(#remax-balloon-clip)" opacity="0.7">
        <path
          d="M40 4 C40 4 28 18 28 42 C28 60 36 72 40 76"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M40 4 C40 4 52 18 52 42 C52 60 44 72 40 76"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.6"
          fill="none"
        />
        <line
          x1="4"
          y1="42"
          x2="76"
          y2="42"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.4"
        />
      </g>

      <path
        d="M40 4 C61 4 76 21 76 42 C76 56 70 67 60 76 L20 76 C10 67 4 56 4 42 C4 21 19 4 40 4 Z"
        fill="url(#remax-balloon-shine)"
      />
      <path
        d="M40 4 C61 4 76 21 76 42 C76 56 70 67 60 76 L20 76 C10 67 4 56 4 42 C4 21 19 4 40 4 Z"
        fill="none"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="0.7"
      />

      {withBasket && (
        <>
          <path
            d="M20 76 L28 92"
            stroke="#0a1a36"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M60 76 L52 92"
            stroke="#0a1a36"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M32 76 L34 92"
            stroke="#0a1a36"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M48 76 L46 92"
            stroke="#0a1a36"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <rect
            x="26"
            y="92"
            width="28"
            height="12"
            rx="1.5"
            fill="#6b4423"
            stroke="#3a2613"
            strokeWidth="0.4"
          />
          <rect x="26" y="92" width="28" height="3.5" fill="#8b5a2b" />
          <line
            x1="32"
            y1="92"
            x2="32"
            y2="104"
            stroke="#3a2613"
            strokeWidth="0.4"
          />
          <line
            x1="40"
            y1="92"
            x2="40"
            y2="104"
            stroke="#3a2613"
            strokeWidth="0.4"
          />
          <line
            x1="48"
            y1="92"
            x2="48"
            y2="104"
            stroke="#3a2613"
            strokeWidth="0.4"
          />
        </>
      )}
    </svg>
  );
}
