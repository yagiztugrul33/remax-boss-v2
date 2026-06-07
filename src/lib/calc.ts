/**
 * Hesaplama araçları — saf, doğru finansal formüller (client-side, backend yok).
 * UYDURMA sabit oran YOK: faiz/harç oranları kullanıcı girer; sonuçlar tahminidir.
 */

export function formatTL(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  return (
    new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(
      Math.round(n),
    ) + " ₺"
  );
}

export function formatPct(n: number, digits = 1): string {
  if (!Number.isFinite(n)) return "—";
  return `%${n.toLocaleString("tr-TR", { maximumFractionDigits: digits })}`;
}

/**
 * Anüite (eşit taksitli) kredi:
 *   taksit = P·r / (1 − (1+r)^−n),  r = aylık faiz, n = vade (ay)
 *   r = 0 ise taksit = P / n
 */
export function mortgage(
  loan: number,
  annualRatePct: number,
  months: number,
): { payment: number; total: number; interest: number } {
  if (loan <= 0 || months <= 0) return { payment: 0, total: 0, interest: 0 };
  const r = annualRatePct / 100 / 12;
  const payment =
    r === 0 ? loan / months : (loan * r) / (1 - Math.pow(1 + r, -months));
  const total = payment * months;
  return { payment, total, interest: Math.max(0, total - loan) };
}

/**
 * Tapu harcı / masraf — oran kullanıcı tarafından girilir (varsayılan örnek %4,
 * genelde alıcı %2 + satıcı %2). Oran yasayla değişebilir → UI uyarısı zorunlu.
 */
export function titleFee(
  salePrice: number,
  totalRatePct: number,
): { total: number; buyer: number; seller: number } {
  if (salePrice <= 0 || totalRatePct < 0)
    return { total: 0, buyer: 0, seller: 0 };
  const total = (salePrice * totalRatePct) / 100;
  return { total, buyer: total / 2, seller: total / 2 };
}

/**
 * Kira getirisi (brüt) ve amortisman süresi:
 *   brüt yıllık getiri % = (aylık kira·12) / mülk değeri · 100
 *   amortisman (yıl)     = mülk değeri / (aylık kira·12)
 * Vergi/gider/boşluk HARİÇ — brüt, bilgilendirme amaçlı.
 */
export function rentalYield(
  propertyValue: number,
  monthlyRent: number,
): { grossYieldPct: number; paybackYears: number } {
  if (propertyValue <= 0 || monthlyRent <= 0)
    return { grossYieldPct: 0, paybackYears: 0 };
  const annual = monthlyRent * 12;
  return {
    grossYieldPct: (annual / propertyValue) * 100,
    paybackYears: propertyValue / annual,
  };
}

/**
 * Peşinat / bütçe planlayıcı:
 *   peşinat oranı % = birikim / hedef · 100
 *   kalan tutar     = hedef − birikim
 *   biriktirme ayı  = kalan / aylık ayrılabilir
 */
export function budgetPlan(
  target: number,
  savings: number,
  monthlySaving: number,
): { downPct: number; remaining: number; monthsToSave: number } {
  if (target <= 0) return { downPct: 0, remaining: 0, monthsToSave: 0 };
  const remaining = Math.max(0, target - savings);
  return {
    downPct: Math.min(100, (savings / target) * 100),
    remaining,
    monthsToSave: monthlySaving > 0 ? remaining / monthlySaving : Infinity,
  };
}
