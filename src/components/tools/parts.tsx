"use client";

import { useId } from "react";
import Link from "next/link";
import { Info, ArrowRight, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";

export function NumberField({
  label,
  value,
  onChange,
  suffix,
  min = 0,
  step = 1,
  placeholder,
}: {
  label: string;
  value: number | "";
  onChange: (v: number | "") => void;
  suffix?: string;
  min?: number;
  step?: number;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-navy mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === "" ? "" : Math.max(min, Number(v)));
          }}
          className="w-full rounded-xl border border-line bg-white ps-3.5 pe-12 py-3 text-base font-semibold text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors"
          dir="ltr"
        />
        {suffix && (
          <span className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-navy/40">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function ResultRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 py-2.5 border-b border-line last:border-0",
        strong && "border-b-0",
      )}
    >
      <span className="text-sm text-navy/60">{label}</span>
      <span
        className={cn(
          "font-display tabular-nums",
          strong
            ? "text-2xl font-extrabold text-remax-red"
            : "text-base font-bold text-navy",
        )}
        dir="ltr"
      >
        {value}
      </span>
    </div>
  );
}

export function Disclaimer({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-amber-50 border border-amber-100 p-3 text-xs text-navy/65 leading-relaxed">
      <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-500" aria-hidden />
      <span>
        {children}{" "}
        Bu hesaplama tahmini ve bilgilendirme amaçlıdır; bağlayıcı değildir.
        Kesin bilgi için RE/MAX BOSS ile görüşün veya ilgili kuruma danışın.
      </span>
    </div>
  );
}

export function ToolCTA() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <Link
        href="/iletisim"
        className={cn(
          buttonVariants({ size: "lg" }),
          "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-5 text-sm font-semibold tracking-wide",
        )}
      >
        RE/MAX BOSS ile görüşün
        <ArrowRight className="h-4 w-4 ms-2" />
      </Link>
      <a
        href={`tel:${office.phone}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-navy/70 hover:text-remax-red transition-colors"
      >
        <Phone className="h-4 w-4" aria-hidden />
        <span dir="ltr">{office.phone}</span>
      </a>
    </div>
  );
}

/** Araç kabuğu: başlık + açıklama + 2 sütun (girdi | sonuç). */
export function ToolShell({
  id,
  title,
  desc,
  inputs,
  result,
}: {
  id: string;
  title: string;
  desc: string;
  inputs: React.ReactNode;
  result: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="scroll-mt-24 rounded-3xl border border-line bg-white p-6 md:p-8 shadow-card"
    >
      <h2 className="font-display font-extrabold text-2xl text-navy">{title}</h2>
      <p className="mt-2 text-sm text-navy/60 leading-relaxed max-w-2xl">
        {desc}
      </p>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-4">{inputs}</div>
        <div className="rounded-2xl bg-mist/50 border border-line p-5">
          {result}
        </div>
      </div>
    </div>
  );
}
