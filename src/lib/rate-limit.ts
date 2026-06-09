/**
 * Basit in-memory rate-limiter (server-only, bağımlılıksız).
 *
 * Çalışma şekli: sabit pencere (fixed window) sayacı, in-process Map.
 * Anahtar başına {count, reset} tutulur; pencere dolunca sıfırlanır.
 *
 * ⚠ SINIRLAR:
 * - Vercel/serverless: her function instance'ı kendi Map'ine sahiptir.
 *   Aynı IP farklı instance'a giderse sayaç paylaşılmaz → koruma sınırlı.
 *   (Bir saldırgan paralel istek atarsa belirgin oranda kaçar.)
 * - Cold-start sonrası Map boş başlar.
 * - Process'ler arası senkronizasyon YOK.
 *
 * Üretim için tam koruma: Upstash Redis / Vercel KV ile distributed
 * rate-limit (ileride eklenebilir). Bu modül "hiç yoktan iyi" katmanı.
 *
 * Bu sınırlamayı endpoint yorumlarında ve commit mesajında belirtiyoruz.
 */

interface Entry {
  count: number;
  reset: number; // ms epoch (timestamp)
}

const buckets = new Map<string, Entry>();

// Bellek büyümesini engellemek için periyodik temizleme (opsiyonel,
// next-tick'ta lazy çalışır). Ölçek küçük → 1000 anahtarla cap'le.
const MAX_BUCKETS = 1000;

function pruneIfNeeded(now: number) {
  if (buckets.size <= MAX_BUCKETS) return;
  for (const [k, v] of buckets) {
    if (now > v.reset) buckets.delete(k);
    if (buckets.size <= MAX_BUCKETS) break;
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
  resetEpochSec: number;
}

/**
 * `key` için son `windowMs` içinde en fazla `limit` istek izin verilir.
 * Aşılırsa `allowed=false` döner; `retryAfterSec` cevapta header olarak
 * geri verilebilir.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  pruneIfNeeded(now);

  const entry = buckets.get(key);
  if (!entry || now > entry.reset) {
    const fresh: Entry = { count: 1, reset: now + windowMs };
    buckets.set(key, fresh);
    return {
      allowed: true,
      remaining: limit - 1,
      retryAfterSec: 0,
      resetEpochSec: Math.ceil(fresh.reset / 1000),
    };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((entry.reset - now) / 1000)),
      resetEpochSec: Math.ceil(entry.reset / 1000),
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: limit - entry.count,
    retryAfterSec: 0,
    resetEpochSec: Math.ceil(entry.reset / 1000),
  };
}

/**
 * Request'ten istemci IP'sini çıkar (Vercel/Next 16: x-forwarded-for).
 * Fallback: "anon". Kötü IP üretmek için header spoof edilebilir, ama
 * Vercel edge bunu kendi tarafında ilk hop'a göre normalleştirir.
 */
export function clientKeyFromRequest(req: Request, scope: string): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0]?.trim() || "anon";
  return `${scope}:${ip}`;
}
