"use client";

import { useMemo, useState } from "react";
import { rentalYield, formatTL, formatPct } from "@/lib/calc";
import {
  NumberField,
  ResultRow,
  Disclaimer,
  ToolCTA,
  ToolShell,
} from "@/components/tools/parts";

export default function RentalYieldCalc() {
  const [value, setValue] = useState<number | "">(3_000_000);
  const [rent, setRent] = useState<number | "">(15_000);

  const res = useMemo(
    () => rentalYield(Number(value) || 0, Number(rent) || 0),
    [value, rent],
  );

  const payback =
    res.paybackYears > 0 && Number.isFinite(res.paybackYears)
      ? `${res.paybackYears.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yıl`
      : "—";

  return (
    <ToolShell
      id="kira"
      title="Kira Getirisi / Amortisman"
      desc="Mülk değeri ve aylık kira ile brüt yıllık getiriyi ve mülkün kaç yılda kendini amorti ettiğini hesaplar."
      inputs={
        <>
          <NumberField label="Mülk değeri" value={value} onChange={setValue} suffix="₺" step={50000} />
          <NumberField label="Aylık kira" value={rent} onChange={setRent} suffix="₺" step={500} />
          <p className="text-xs text-navy/45">
            Brüt hesap — vergi, aidat, bakım ve boşluk dönemleri hariçtir.
          </p>
        </>
      }
      result={
        <>
          <ResultRow label="Brüt yıllık getiri" value={formatPct(res.grossYieldPct)} strong />
          <ResultRow label="Yıllık kira geliri" value={formatTL((Number(rent) || 0) * 12)} />
          <ResultRow label="Amortisman süresi" value={payback} />
          <Disclaimer>
            Brüt getiri; gerçek net getiri vergi ve giderlerle düşer.
          </Disclaimer>
          <ToolCTA />
        </>
      }
    />
  );
}
