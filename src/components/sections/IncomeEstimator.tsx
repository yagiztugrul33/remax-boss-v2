"use client";

import { useMemo, useState } from "react";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { NumberField, type CommonToolsDict } from "@/components/tools/parts";
import { formatTL } from "@/lib/calc";

export interface IncomeEstimatorDict {
  title: string;
  subtitle: string;
  txLabel: string;
  valLabel: string;
  commLabel: string;
  shareLabel: string;
  hint: string;
  grossLabel: string;
  monthlyLabel: string;
  yearlyLabel: string;
  warningPrefix: string;
  warningBody: string;
  warningTail: string;
}

/**
 * Gelir potansiyeli göstergesi — TAHMİN. Komisyon oranı ve danışman payı
 * kullanıcı tarafından girilir. Sonuç yalnızca kullanıcının girdisinden
 * hesaplanır; gelir GARANTİSİ DEĞİLDİR (warning satırı her dilde net).
 */
export default function IncomeEstimator({
  dict,
  common,
}: {
  dict: IncomeEstimatorDict;
  common: CommonToolsDict;
}) {
  const [tx, setTx] = useState<number | "">(2);
  const [val, setVal] = useState<number | "">(4_000_000);
  const [comm, setComm] = useState<number | "">(4);
  const [share, setShare] = useState<number | "">(50);

  const monthly = useMemo(() => {
    const t = Number(tx) || 0;
    const v = Number(val) || 0;
    const c = (Number(comm) || 0) / 100;
    const s = (Number(share) || 0) / 100;
    return Math.max(0, t * v * c * s);
  }, [tx, val, comm, share]);

  return (
    <div className="rounded-3xl border border-line bg-white p-6 md:p-8 shadow-card">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
          <TrendingUp className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h2 className="font-display font-extrabold text-2xl text-navy">
            {dict.title}
          </h2>
          <p className="text-sm text-navy/55">{dict.subtitle}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <NumberField label={dict.txLabel} value={tx} onChange={setTx} suffix={common.suffixCount} step={1} />
            <NumberField label={dict.valLabel} value={val} onChange={setVal} suffix={common.suffixTL} step={250000} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label={dict.commLabel} value={comm} onChange={setComm} suffix={common.suffixPct} step={0.5} />
            <NumberField label={dict.shareLabel} value={share} onChange={setShare} suffix={common.suffixPct} step={5} />
          </div>
          <p className="text-xs text-navy/45">{dict.hint}</p>
        </div>

        <div className="rounded-2xl bg-navy-900 text-white p-5 flex flex-col justify-center">
          <div className="text-xs text-white/55 mb-2">{dict.grossLabel}</div>
          <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-3">
            <span className="text-sm text-white/60">{dict.monthlyLabel}</span>
            <span className="font-display text-2xl font-extrabold text-amber-300 tabular-nums" dir="ltr">
              {formatTL(monthly)}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-3 pt-3">
            <span className="text-sm text-white/60">{dict.yearlyLabel}</span>
            <span className="font-display text-xl font-bold text-white tabular-nums" dir="ltr">
              {formatTL(monthly * 12)}
            </span>
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 p-3 text-xs text-amber-100 leading-relaxed">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-300" aria-hidden />
            <span>
              <strong>{dict.warningPrefix}</strong>
              {dict.warningBody}
              <strong>{dict.warningTail}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
