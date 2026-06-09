"use client";

import { useMemo, useState } from "react";
import { mortgage, formatTL } from "@/lib/calc";
import {
  NumberField,
  ResultRow,
  Disclaimer,
  ToolCTA,
  ToolShell,
  type CommonToolsDict,
} from "@/components/tools/parts";

export interface MortgageDict {
  title: string;
  desc: string;
  priceLabel: string;
  downLabel: string;
  yearsLabel: string;
  rateLabel: string;
  rateHint: string;
  loanHeading: string;
  loanLabel: string;
  paymentLabel: string;
  totalLabel: string;
  interestLabel: string;
  principalLabel: string;
  interestLegend: string;
  disclaimerExtra: string;
}

export default function MortgageCalc({
  dict,
  common,
}: {
  dict: MortgageDict;
  common: CommonToolsDict;
}) {
  const [price, setPrice] = useState<number | "">(3_000_000);
  const [down, setDown] = useState<number | "">(900_000);
  const [years, setYears] = useState<number | "">(10);
  const [rate, setRate] = useState<number | "">(3.0);

  const loan = Math.max(0, (Number(price) || 0) - (Number(down) || 0));
  const months = (Number(years) || 0) * 12;

  const res = useMemo(
    () => mortgage(loan, Number(rate) || 0, months),
    [loan, rate, months],
  );

  const principalPct = res.total > 0 ? (loan / res.total) * 100 : 0;

  return (
    <ToolShell
      id="kredi"
      title={dict.title}
      desc={dict.desc}
      inputs={
        <>
          <NumberField label={dict.priceLabel} value={price} onChange={setPrice} suffix={common.suffixTL} step={50000} />
          <NumberField label={dict.downLabel} value={down} onChange={setDown} suffix={common.suffixTL} step={50000} />
          <div className="grid grid-cols-2 gap-4">
            <NumberField label={dict.yearsLabel} value={years} onChange={setYears} suffix={common.suffixYear} step={1} />
            <NumberField label={dict.rateLabel} value={rate} onChange={setRate} suffix={common.suffixPct} step={0.1} />
          </div>
          <p className="text-xs text-navy/45">{dict.rateHint}</p>
        </>
      }
      result={
        <>
          <div className="text-xs text-navy/50 mb-1">{dict.loanHeading}</div>
          <ResultRow label={dict.loanLabel} value={formatTL(loan)} />
          <ResultRow label={dict.paymentLabel} value={formatTL(res.payment)} strong />
          <ResultRow label={dict.totalLabel} value={formatTL(res.total)} />
          <ResultRow label={dict.interestLabel} value={formatTL(res.interest)} />

          {res.total > 0 && (
            <div className="mt-4">
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-line">
                <div className="bg-remax-blue" style={{ width: `${principalPct}%` }} />
                <div className="bg-remax-red" style={{ width: `${100 - principalPct}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-navy/55">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-remax-blue" /> {dict.principalLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-remax-red" /> {dict.interestLegend}
                </span>
              </div>
            </div>
          )}

          <Disclaimer baseText={common.disclaimerBase}>{dict.disclaimerExtra}</Disclaimer>
          <ToolCTA label={common.ctaContact} />
        </>
      }
    />
  );
}
