import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white";
}

const sizeMap = {
  sm: {
    remax: "text-lg",
    boss: "text-[0.6rem] tracking-[0.28em]",
    reg: "text-[7px]",
  },
  md: {
    remax: "text-2xl md:text-[1.75rem]",
    boss: "text-xs md:text-sm tracking-[0.28em]",
    reg: "text-[9px]",
  },
  lg: {
    remax: "text-4xl md:text-5xl",
    boss: "text-base md:text-lg tracking-[0.32em]",
    reg: "text-xs",
  },
};

export default function RemaxBossWordmark({
  className,
  size = "md",
  variant = "default",
}: WordmarkProps) {
  const s = sizeMap[size];
  const isWhite = variant === "white";
  const red = isWhite ? "text-white" : "text-remax-red";
  const blue = isWhite ? "text-white/80" : "text-remax-blue";
  const boss = isWhite ? "text-white" : "text-remax-blue";

  return (
    <span
      className={cn("inline-flex flex-col leading-none", className)}
      aria-label="RE/MAX BOSS"
    >
      <span className="flex items-baseline">
        <span
          className={cn(
            "font-heading font-extrabold italic tracking-tight",
            s.remax,
            red,
          )}
        >
          RE
        </span>
        <span
          className={cn(
            "font-heading font-extrabold italic",
            s.remax,
            blue,
          )}
        >
          /
        </span>
        <span
          className={cn(
            "font-heading font-extrabold italic tracking-tight",
            s.remax,
            red,
          )}
        >
          MAX
        </span>
        <sup className={cn("font-bold ms-0.5", s.reg, red)}>®</sup>
      </span>
      <span
        className={cn(
          "font-heading font-extrabold mt-1",
          s.boss,
          boss,
        )}
      >
        BOSS
      </span>
    </span>
  );
}
