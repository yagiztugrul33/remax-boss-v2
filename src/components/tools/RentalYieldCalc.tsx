"use client";

import { useMemo, useState } from "react";
import { rentalYield, formatTL, formatPct } from "@/lib/calc";
import {
  NumberField,
  ResultRow,
  Disclaimer,
  ToolCTA,
  ToolShell,
  type CommonToolsDict,
} from "@/components/tools/parts";

export interface RentalYieldDict {
  title: string;
  desc: string;
  valueLabel: string;
  rentLabel: string;
  hint: string;
  yieldLabel: string;
  annualLabel: string;
  paybackLabel: string;
  paybackUnit: string;
  disclaimerExtra: string;
}

export default function RentalYieldCalc({
  dict,
  common,
}: {
  dict: RentalYieldDict;
  common: CommonToolsDict;
}) {
  const [value, setValue] = useState<number | "">(3_000_000);
  const [rent, setRent] = useState<number | "">(15_000);

  const res = useMemo(
    () => rentalYield(Number(value) || 0, Number(rent) || 0),
    [value, rent],
  );

  const payback =
    res.paybackYears > 0 && Number.isFinite(res.paybackYears)
      ? `${res.paybackYears.toLocaleString("en-US", { maximumFractionDigits: 1 })} ${dict.paybackUnit}`
      : "—";

  return (
    <ToolShell
      id="kira"
      title={dict.title}
      desc={dict.desc}
      inputs={
        <>
          <NumberField label={dict.valueLabel} value={value} onChange={setValue} suffix={common.suffixTL} step={50000} />
          <NumberField label={dict.rentLabel} value={rent} onChange={setRent} suffix={common.suffixTL} step={500} />
          <p className="text-xs text-navy/45">{dict.hint}</p>
        </>
      }
      result={
        <>
          <ResultRow label={dict.yieldLabel} value={formatPct(res.grossYieldPct)} strong />
          <ResultRow label={dict.annualLabel} value={formatTL((Number(rent) || 0) * 12)} />
          <ResultRow label={dict.paybackLabel} value={payback} />
          <Disclaimer baseText={common.disclaimerBase}>{dict.disclaimerExtra}</Disclaimer>
          <ToolCTA label={common.ctaContact} />
        </>
      }
    />
  );
}
