"use client";

import { useMemo, useState } from "react";
import { mortgage, formatTL } from "@/lib/calc";
import {
  NumberField,
  ResultRow,
  Disclaimer,
  ToolCTA,
  ToolShell,
} from "@/components/tools/parts";

export default function MortgageCalc() {
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

  // Anapara / faiz dağılım oranı (basit bar — grafik kütüphanesi yok)
  const principalPct = res.total > 0 ? (loan / res.total) * 100 : 0;

  return (
    <ToolShell
      id="kredi"
      title="Konut Kredisi Hesaplama"
      desc="Eşit taksitli (anüite) kredi için aylık taksiti, toplam geri ödemeyi ve toplam faizi hesaplar. Faiz oranını siz girersiniz."
      inputs={
        <>
          <NumberField label="Konut bedeli" value={price} onChange={setPrice} suffix="₺" step={50000} />
          <NumberField label="Peşinat" value={down} onChange={setDown} suffix="₺" step={50000} />
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Vade" value={years} onChange={setYears} suffix="yıl" step={1} />
            <NumberField label="Aylık faiz (örnek)" value={rate} onChange={setRate} suffix="%" step={0.1} />
          </div>
          <p className="text-xs text-navy/45">
            Faiz oranı örnektir — güncel oran için bankanızla görüşün.
          </p>
        </>
      }
      result={
        <>
          <div className="text-xs text-navy/50 mb-1">Kredi tutarı</div>
          <ResultRow label="Çekilecek kredi" value={formatTL(loan)} />
          <ResultRow label="Aylık taksit" value={formatTL(res.payment)} strong />
          <ResultRow label="Toplam geri ödeme" value={formatTL(res.total)} />
          <ResultRow label="Toplam faiz" value={formatTL(res.interest)} />

          {/* Anapara / faiz dağılımı */}
          {res.total > 0 && (
            <div className="mt-4">
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-line">
                <div className="bg-remax-blue" style={{ width: `${principalPct}%` }} />
                <div className="bg-remax-red" style={{ width: `${100 - principalPct}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-navy/55">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-remax-blue" /> Anapara
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-remax-red" /> Faiz
                </span>
              </div>
            </div>
          )}

          <Disclaimer>Faiz oranı ve koşullar bankaya göre değişir.</Disclaimer>
          <ToolCTA />
        </>
      }
    />
  );
}
