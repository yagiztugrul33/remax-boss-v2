"use client";
import { useRef, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({ children, className, intensity = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * intensity;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * intensity;
    el.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(6px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.45s ease";
    el.style.transform = "";
    setTimeout(() => { if (el) el.style.transition = ""; }, 450);
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
