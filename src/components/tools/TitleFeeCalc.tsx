"use client";

import { useMemo, useState } from "react";
import { titleFee, formatTL } from "@/lib/calc";
import {
  NumberField,
  ResultRow,
  Disclaimer,
  ToolCTA,
  ToolShell,
  type CommonToolsDict,
} from "@/components/tools/parts";

export interface TitleFeeDict {
  title: string;
  desc: string;
  priceLabel: string;
  rateLabel: string;
  importantNote: string;
  totalLabel: string;
  buyerLabel: string;
  sellerLabel: string;
  disclaimerExtra: string;
}

export default function TitleFeeCalc({
  dict,
  common,
}: {
  dict: TitleFeeDict;
  common: CommonToolsDict;
}) {
  const [price, setPrice] = useState<number | "">(3_000_000);
  const [rate, setRate] = useState<number | "">(4);

  const res = useMemo(
    () => titleFee(Number(price) || 0, Number(rate) || 0),
    [price, rate],
  );

  return (
    <ToolShell
      id="tapu"
      title={dict.title}
      desc={dict.desc}
      inputs={
        <>
          <NumberField label={dict.priceLabel} value={price} onChange={setPrice} suffix={common.suffixTL} step={50000} />
          <NumberField label={dict.rateLabel} value={rate} onChange={setRate} suffix={common.suffixPct} step={0.5} />
          <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 text-xs text-navy/65 leading-relaxed">
            {dict.importantNote}
          </div>
        </>
      }
      result={
        <>
          <ResultRow label={dict.totalLabel} value={formatTL(res.total)} strong />
          <ResultRow label={dict.buyerLabel} value={formatTL(res.buyer)} />
          <ResultRow label={dict.sellerLabel} value={formatTL(res.seller)} />
          <Disclaimer baseText={common.disclaimerBase}>{dict.disclaimerExtra}</Disclaimer>
          <ToolCTA label={common.ctaContact} />
        </>
      }
    />
  );
}
