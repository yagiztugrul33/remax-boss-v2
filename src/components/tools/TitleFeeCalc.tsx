"use client";

import { useMemo, useState } from "react";
import { titleFee, formatTL } from "@/lib/calc";
import {
  NumberField,
  ResultRow,
  Disclaimer,
  ToolCTA,
  ToolShell,
} from "@/components/tools/parts";

export default function TitleFeeCalc() {
  const [price, setPrice] = useState<number | "">(3_000_000);
  const [rate, setRate] = useState<number | "">(4); // örnek toplam oran

  const res = useMemo(
    () => titleFee(Number(price) || 0, Number(rate) || 0),
    [price, rate],
  );

  return (
    <ToolShell
      id="tapu"
      title="Tapu Harcı / Masraf Hesaplama"
      desc="Satış bedeli üzerinden yaklaşık tapu harcını hesaplar. Harç genelde alıcı ve satıcı arasında paylaşılır."
      inputs={
        <>
          <NumberField label="Satış bedeli" value={price} onChange={setPrice} suffix="₺" step={50000} />
          <NumberField label="Toplam harç oranı (örnek)" value={rate} onChange={setRate} suffix="%" step={0.5} />
          <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 text-xs text-navy/65 leading-relaxed">
            <strong className="text-navy">Önemli:</strong> Tapu harcı oranı yasal
            düzenlemeyle <strong>değişebilir</strong> (yaygın uygulama toplam
            %4 — alıcı %2 + satıcı %2). Güncel oranı tapu müdürlüğü / resmi
            kaynaktan teyit edin. Ayrıca döner sermaye, noter ve ekspertiz gibi
            ek sabit kalemler oluşabilir.
          </div>
        </>
      }
      result={
        <>
          <ResultRow label="Toplam tapu harcı" value={formatTL(res.total)} strong />
          <ResultRow label="Alıcı payı (≈ yarısı)" value={formatTL(res.buyer)} />
          <ResultRow label="Satıcı payı (≈ yarısı)" value={formatTL(res.seller)} />
          <Disclaimer>
            Oranlar değişebilir; ek masraf kalemleri bu hesaba dahil değildir.
          </Disclaimer>
          <ToolCTA />
        </>
      }
    />
  );
}
