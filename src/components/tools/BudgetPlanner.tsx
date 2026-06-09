"use client";

import { useMemo, useState } from "react";
import { budgetPlan, formatTL, formatPct } from "@/lib/calc";
import {
  NumberField,
  ResultRow,
  Disclaimer,
  ToolCTA,
  ToolShell,
  type CommonToolsDict,
} from "@/components/tools/parts";

export interface BudgetDict {
  title: string;
  desc: string;
  targetLabel: string;
  savingsLabel: string;
  monthlyLabel: string;
  hint: string;
  downPctLabel: string;
  remainingLabel: string;
  timeLabel: string;
  goalMet: string;
  timeTemplate: string;
  disclaimerExtra: string;
}

export default function BudgetPlanner({
  dict,
  common,
}: {
  dict: BudgetDict;
  common: CommonToolsDict;
}) {
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
      ? dict.goalMet
      : dict.timeTemplate
          .replace("{months}", String(Math.ceil(months)))
          .replace(
            "{years}",
            (months / 12).toLocaleString("en-US", { maximumFractionDigits: 1 }),
          )
    : "—";

  return (
    <ToolShell
      id="butce"
      title={dict.title}
      desc={dict.desc}
      inputs={
        <>
          <NumberField label={dict.targetLabel} value={target} onChange={setTarget} suffix={common.suffixTL} step={50000} />
          <NumberField label={dict.savingsLabel} value={savings} onChange={setSavings} suffix={common.suffixTL} step={10000} />
          <NumberField label={dict.monthlyLabel} value={monthly} onChange={setMonthly} suffix={common.suffixPerMonth} step={1000} />
          <p className="text-xs text-navy/45">{dict.hint}</p>
        </>
      }
      result={
        <>
          <ResultRow label={dict.downPctLabel} value={formatPct(res.downPct)} strong />
          <div className="mt-1 mb-2 h-2.5 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full bg-emerald-500" style={{ width: `${res.downPct}%` }} />
          </div>
          <ResultRow label={dict.remainingLabel} value={formatTL(res.remaining)} />
          <ResultRow label={dict.timeLabel} value={saveTime} />
          <Disclaimer baseText={common.disclaimerBase}>{dict.disclaimerExtra}</Disclaimer>
          <ToolCTA label={common.ctaContact} />
        </>
      }
    />
  );
}
