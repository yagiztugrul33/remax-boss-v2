"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import {
  Calculator,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dict } from "@/lib/i18n/dictionaries";

/**
 * 🔴 KESİN FİYAT VAADİ YOK / UYDURMA YOK
 *
 * Bu hesaplama tamamen ŞEFFAF, ÖRNEK katsayılara dayanır:
 *   örnek_alt_m2_katsayisi × yas_düzeltmesi  →  alt sınır
 *   örnek_üst_m2_katsayisi × yas_düzeltmesi  →  üst sınır
 *
 * Katsayılar GENEL ve geniş aralıklarda tutulmuştur; gerçek piyasa
 * verisi DEĞİLDİR — sadece kullanıcıya "kategorize aralık fikri"
 * vermek için bilgilendirme amaçlı. UI'da "ÖRNEK katsayı" notu
 * görünür ve sonuç bölümünde büyük disclaimer yer alır.
 *
 * Sonuç MUTLAKA /degerleme'ye yönlendirir — gerçek değerleme talep
 * formuna (lead). Bu araç bir LEAD MAKİNESİ + bilgilendirme aracıdır.
 */

type PropertyType = "daire" | "mustakil" | "villa" | "isyeri" | "arsa";
type AgeBucket = "yeni" | "kucukYas" | "ortaYas" | "eskiYas" | "cokEski";

interface RegionMeta {
  slug: string;
  name: string;
}

/**
 * ÖRNEK katsayı aralıkları — bölge × tip için TL/m² alt-üst.
 * NOT: Bu değerler gerçek piyasa verisi DEĞİLDİR; sadece UI'da
 * "geniş, makul aralık" üretmek için kullanılan örnek değerlerdir.
 * Her katsayı 'örnek/değişken' olarak UI'da görünür.
 */
const REGION_TIER: Record<string, "premium" | "high" | "mid"> = {
  oran: "premium",
  gaziosmanpasa: "premium",
  cukurambar: "high",
  bestepe: "high",
  yenimahalle: "mid",
};

// TL/m² alt-üst — ÖRNEK katsayı. Geniş, kesin değil.
const SAMPLE_RATES: Record<
  "premium" | "high" | "mid",
  Record<PropertyType, [number, number]>
> = {
  premium: {
    daire: [55_000, 130_000],
    mustakil: [45_000, 110_000],
    villa: [80_000, 200_000],
    isyeri: [60_000, 140_000],
    arsa: [15_000, 60_000],
  },
  high: {
    daire: [40_000, 95_000],
    mustakil: [35_000, 80_000],
    villa: [60_000, 140_000],
    isyeri: [45_000, 100_000],
    arsa: [10_000, 40_000],
  },
  mid: {
    daire: [25_000, 65_000],
    mustakil: [22_000, 55_000],
    villa: [40_000, 100_000],
    isyeri: [30_000, 75_000],
    arsa: [5_000, 25_000],
  },
};

// Bina yaşı çarpanı — ÖRNEK.
const AGE_MULTIPLIER: Record<AgeBucket, [number, number]> = {
  yeni: [1.05, 1.2],
  kucukYas: [1.0, 1.1],
  ortaYas: [0.9, 1.02],
  eskiYas: [0.8, 0.95],
  cokEski: [0.7, 0.9],
};

function formatTL(v: number): string {
  if (!Number.isFinite(v) || v <= 0) return "—";
  return new Intl.NumberFormat("tr-TR").format(Math.round(v)) + " TL";
}

export default function ValuationCalculator({
  dict,
  regions,
}: {
  dict: Dict["pages"]["valuationTool"];
  regions: readonly RegionMeta[];
}) {
  const ids = {
    region: useId(),
    type: useId(),
    area: useId(),
    room: useId(),
    age: useId(),
    err: useId(),
  };

  const [region, setRegion] = useState<string>("");
  const [type, setType] = useState<PropertyType>("daire");
  const [area, setArea] = useState<string>("");
  const [room, setRoom] = useState<string>("3+1");
  const [age, setAge] = useState<AgeBucket>("kucukYas");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    min: number;
    max: number;
    coefMin: number;
    coefMax: number;
    ageFactorMin: number;
    ageFactorMax: number;
  } | null>(null);

  function handleCalculate() {
    setError(null);
    const m2 = Number(area.replace(/[^\d]/g, ""));
    if (!Number.isFinite(m2) || m2 <= 0 || m2 > 9999) {
      setError(dict.errorAreaRequired);
      setResult(null);
      return;
    }
    const tier =
      (region && REGION_TIER[region]) || REGION_TIER["yenimahalle"];
    const [coefMin, coefMax] = SAMPLE_RATES[tier][type];
    const [ageMin, ageMax] = AGE_MULTIPLIER[age];
    const min = m2 * coefMin * ageMin;
    const max = m2 * coefMax * ageMax;
    setResult({
      min,
      max,
      coefMin,
      coefMax,
      ageFactorMin: ageMin,
      ageFactorMax: ageMax,
    });
  }

  function handleReset() {
    setRegion("");
    setType("daire");
    setArea("");
    setRoom("3+1");
    setAge("kucukYas");
    setError(null);
    setResult(null);
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors";

  const profileLabel = useMemo(() => {
    const reg = regions.find((r) => r.slug === region);
    return [
      reg?.name,
      dict.typeOptions[type],
      area ? `${area} m²` : null,
      room && room !== dict.roomOptions[5] ? room : null,
      dict.ageOptions[age],
    ]
      .filter(Boolean)
      .join(" · ");
  }, [region, type, area, room, age, regions, dict]);

  return (
    <div className="rounded-3xl border border-line bg-white p-6 md:p-8 shadow-card">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
          <Calculator className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-eyebrow font-display text-remax-red">
            {dict.eyebrow}
          </p>
          <h2 className="mt-1 font-display font-extrabold text-navy text-xl md:text-2xl text-balance">
            {dict.title}
          </h2>
          <p className="mt-2 text-sm text-navy/60 leading-relaxed">
            {dict.subtitle}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={ids.region}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {dict.regionLabel}
          </label>
          <select
            id={ids.region}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={inputClass}
          >
            <option value="">{dict.regionPlaceholder}</option>
            {regions.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor={ids.type}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {dict.typeLabel}
          </label>
          <select
            id={ids.type}
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType)}
            className={inputClass}
          >
            <option value="daire">{dict.typeOptions.daire}</option>
            <option value="mustakil">{dict.typeOptions.mustakil}</option>
            <option value="villa">{dict.typeOptions.villa}</option>
            <option value="isyeri">{dict.typeOptions.isyeri}</option>
            <option value="arsa">{dict.typeOptions.arsa}</option>
          </select>
        </div>
        <div>
          <label
            htmlFor={ids.area}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {dict.areaLabel}
          </label>
          <input
            id={ids.area}
            value={area}
            onChange={(e) => setArea(e.target.value)}
            type="text"
            inputMode="numeric"
            placeholder={dict.areaPlaceholder}
            maxLength={6}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? ids.err : undefined}
            className={inputClass}
            dir="ltr"
          />
        </div>
        <div>
          <label
            htmlFor={ids.room}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {dict.roomLabel}
          </label>
          <select
            id={ids.room}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className={inputClass}
          >
            {dict.roomOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor={ids.age}
            className="block text-sm font-semibold text-navy mb-1.5"
          >
            {dict.ageLabel}
          </label>
          <select
            id={ids.age}
            value={age}
            onChange={(e) => setAge(e.target.value as AgeBucket)}
            className={inputClass}
          >
            <option value="yeni">{dict.ageOptions.yeni}</option>
            <option value="kucukYas">{dict.ageOptions.kucukYas}</option>
            <option value="ortaYas">{dict.ageOptions.ortaYas}</option>
            <option value="eskiYas">{dict.ageOptions.eskiYas}</option>
            <option value="cokEski">{dict.ageOptions.cokEski}</option>
          </select>
        </div>
      </div>

      {error && (
        <p
          id={ids.err}
          role="alert"
          className="mt-3 text-sm font-medium text-remax-red"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCalculate}
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-navy hover:bg-navy-700 text-white h-11 px-5 text-sm font-semibold",
          )}
        >
          {dict.calculateBtn}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-11 px-5 text-sm font-semibold",
          )}
        >
          <RefreshCw className="h-4 w-4 me-2" aria-hidden />
          {dict.resetBtn}
        </button>
      </div>

      {result && (
        <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 overflow-hidden">
          {/* MEGA DISCLAIMER */}
          <div className="bg-amber-100 px-5 py-3 border-b border-amber-200 flex items-start gap-2.5">
            <AlertTriangle
              className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-700"
              aria-hidden
            />
            <p className="text-xs font-bold text-amber-900 leading-relaxed">
              {dict.resultDisclaimerTitle}
            </p>
          </div>

          <div className="p-5 md:p-6">
            <p className="text-eyebrow font-display text-amber-700">
              {dict.resultEyebrow}
            </p>
            <p className="mt-1.5 text-xs text-navy/55">{profileLabel}</p>
            <p
              className="mt-3 font-display font-extrabold text-navy text-2xl md:text-3xl"
              dir="ltr"
            >
              {formatTL(result.min)}{" "}
              <span className="text-navy/40">–</span>{" "}
              {formatTL(result.max)}
            </p>
            <p className="mt-3 text-xs text-navy/65 leading-relaxed">
              {dict.resultDisclaimerBody}
            </p>

            {/* Şeffaf katsayı kutusu */}
            <details className="mt-4 rounded-lg border border-amber-200 bg-white">
              <summary className="cursor-pointer list-none px-3 py-2 text-xs font-semibold text-navy hover:bg-amber-50/40 transition-colors">
                ⓘ {dict.coefficientNote}
              </summary>
              <div className="px-3 pb-3 text-xs text-navy/65 space-y-1" dir="ltr">
                <p>
                  m² coef (sample): {formatTL(result.coefMin).replace(" TL", "")} – {formatTL(result.coefMax).replace(" TL", "")} TL/m²
                </p>
                <p>
                  Age factor: × {result.ageFactorMin.toFixed(2)} … {result.ageFactorMax.toFixed(2)}
                </p>
              </div>
            </details>

            {/* LEAD CTA */}
            <div className="mt-6 rounded-xl border border-line bg-white p-4">
              <p className="font-display font-bold text-navy">
                {dict.ctaTitle}
              </p>
              <p className="mt-1 text-sm text-navy/65 leading-relaxed">
                {dict.ctaBody}
              </p>
              <Link
                href="/degerleme"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-4 bg-remax-red hover:bg-remax-red-hover text-white h-11 px-5 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)]",
                )}
              >
                {dict.ctaButton}
                <ArrowRight className="h-4 w-4 ms-2" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
