"use client";

import { useMemo, useState } from "react";
import { budgetPlan, formatTL, formatPct } from "@/lib/calc";
import {
  NumberField,
  ResultRow,
  Disclaimer,
  ToolCTA,
  ToolShell,
} from "@/components/tools/parts";

export default function BudgetPlanner() {
  const [target, setTarget] = useState<number | "">(3_000_000);
  const [savings, setSavings] = useState<number | "">(600_000);
  const [monthly, setMonthly] = useState<number | "">(25_000);

  const res = useMemo(
    () =>
      budgetPlan(Number(target) || 0, Number(savings) || 0, Number(monthly) || 0),
    [target, savings, monthly],
  );

  const months = res.monthsToSave;
  const saveTime = Number.isFinite(months)
    ? months <= 0
      ? "Hedefe ulaştınız 🎉"
      : `${Math.ceil(months)} ay (≈ ${(months / 12).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yıl)`
    : "—";

  return (
    <ToolShell
      id="butce"
      title="Peşinat / Bütçe Planlayıcı"
      desc="Hedef konut bedeline göre mevcut peşinat oranınızı, kalan tutarı ve yalnızca biriktirerek ne kadar sürede ulaşabileceğinizi gösterir."
      inputs={
        <>
          <NumberField label="Hedef konut bedeli" value={target} onChange={setTarget} suffix="₺" step={50000} />
          <NumberField label="Mevcut birikim" value={savings} onChange={setSavings} suffix="₺" step={10000} />
          <NumberField label="Aylık ayırabileceğin" value={monthly} onChange={setMonthly} suffix="₺/ay" step={1000} />
          <p className="text-xs text-navy/45">
            Kalan tutar için kredi de kullanılabilir — Kredi aracıyla taksiti
            hesaplayabilirsiniz.
          </p>
        </>
      }
      result={
        <>
          <ResultRow label="Peşinat oranın" value={formatPct(res.downPct)} strong />
          <div className="mt-1 mb-2 h-2.5 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full bg-emerald-500" style={{ width: `${res.downPct}%` }} />
          </div>
          <ResultRow label="Kalan tutar" value={formatTL(res.remaining)} />
          <ResultRow label="Yalnızca biriktirerek süre" value={saveTime} />
          <Disclaimer>
            Faiz/enflasyon ve fiyat değişimi hariç, basit bir plandır.
          </Disclaimer>
          <ToolCTA />
        </>
      }
    />
  );
}
