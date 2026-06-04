import Link from "next/link";
import Balloon from "./Balloon";
import RemaxBossWordmark from "./RemaxBossWordmark";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const balloonSize = {
  sm: "h-9 w-7",
  md: "h-12 w-9 md:h-14 md:w-10",
  lg: "h-20 w-16",
};

export default function Logo({
  href = "/",
  variant = "default",
  size = "md",
  className,
}: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Balloon className={balloonSize[size]} />
      <RemaxBossWordmark size={size} variant={variant} />
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex items-center" aria-label="RE/MAX BOSS">
      {content}
    </Link>
  );
}
