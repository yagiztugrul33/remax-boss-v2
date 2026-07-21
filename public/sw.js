/* eslint-disable */
/**
 * RE/MAX BOSS — Service Worker (manuel, Workbox'sız)
 *
 * 🔴 DİNAMİK / HASSAS VERİ AGRESİF CACHE EDİLMEZ (TR kök + /en prefix):
 *  - /api/*        → NetworkOnly (form gönderimleri, chat, abone vs.)
 *  - /admin*       → NetworkOnly (oturum gerekli)
 *  - /login        → NetworkOnly
 *  - /ilanlar*     → NetworkOnly (fiyat/portföy dinamik)
 *  - /degerleme    → NetworkOnly (lead formu)
 *  - /alici-kayit  → NetworkOnly (lead formu)
 *  - /kampanya     → NetworkOnly (kontenjan dinamik + başvuru formu)
 *  - /iletisim     → NetworkOnly (iletişim formu)
 *  - /danisman-ol  → NetworkOnly (başvuru formu)
 *
 * i18n route prefix (/en/*) sonrası tüm desenler opsiyonel (en\/)? önekiyle
 * eşleşir — /en/degerleme de /degerleme gibi NetworkOnly'dir.
 *
 * Diğer sayfalar (statik kalan içerik):
 *  - HTML        → NetworkFirst (güncel kalsın, offline'da cache fallback)
 *  - Statik JS/CSS (/_next/static/*) → CacheFirst (immutable hash)
 *  - Görseller (/office/*, /team/*, /logo*) → CacheFirst (uzun TTL)
 *  - Diğer (font/asset) → StaleWhileRevalidate
 */

// v4: /en prefix desteği — eski (prefix'siz desenli) cache'ler activate'te silinir.
const VERSION = "v4";
const RUNTIME_CACHE = `runtime-${VERSION}`;
const STATIC_CACHE = `static-${VERSION}`;
const HTML_CACHE = `html-${VERSION}`;

// Hiç offline cache'lenmesin — kullanıcı her zaman güncel veriyle çalışsın.
// (en\/)? → hem TR kök hem /en prefix'li URL eşleşir.
const NETWORK_ONLY_PATTERNS = [
  /^\/(en\/)?api\//,
  /^\/(en\/)?admin(\/|$)/,
  /^\/(en\/)?login(\/|$)/,
  /^\/(en\/)?ilanlar(\/|$)/,
  /^\/(en\/)?degerleme(\/|$)/,
  /^\/(en\/)?alici-kayit(\/|$)/,
  /^\/(en\/)?kampanya(\/|$)/,
  /^\/(en\/)?iletisim(\/|$)/,
  /^\/(en\/)?danisman-ol(\/|$)/,
];

// Statik immutable asset'ler (Next.js hash'li dosyalar)
const STATIC_PATTERNS = [/^\/_next\/static\//];

// Uzun TTL CacheFirst görseller
const IMAGE_PATTERNS = [
  /^\/office\//,
  /^\/team\//,
  /^\/icon\.png$/,
  /\.(?:jpg|jpeg|png|webp|avif|svg|gif)$/i,
];

self.addEventListener("install", (event) => {
  // Yeni sürüm hemen aktif olsun.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(
            (k) => ![RUNTIME_CACHE, STATIC_CACHE, HTML_CACHE].includes(k),
          )
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

function isMatchAny(url, patterns) {
  return patterns.some((p) => p.test(url.pathname));
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Sadece http(s) — chrome-extension vs. atla.
  const url = new URL(req.url);
  if (!/^https?:/.test(url.protocol)) return;
  // Cross-origin → varsayılan davranış (cache'leme)
  if (url.origin !== self.location.origin) return;

  // 1) NETWORK-ONLY (hassas / dinamik)
  if (isMatchAny(url, NETWORK_ONLY_PATTERNS)) {
    event.respondWith(fetch(req));
    return;
  }

  // 2) Next.js statik asset → CacheFirst
  if (isMatchAny(url, STATIC_PATTERNS)) {
    event.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }

  // 3) Görseller → CacheFirst
  if (isMatchAny(url, IMAGE_PATTERNS)) {
    event.respondWith(cacheFirst(req, RUNTIME_CACHE));
    return;
  }

  // 4) HTML navigation → NetworkFirst (offline fallback için cache fallback)
  const accept = req.headers.get("accept") || "";
  if (req.mode === "navigate" || accept.includes("text/html")) {
    event.respondWith(networkFirst(req, HTML_CACHE));
    return;
  }

  // 5) Diğer her şey → StaleWhileRevalidate
  event.respondWith(staleWhileRevalidate(req, RUNTIME_CACHE));
});

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    return cached || Response.error();
  }
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    // Sadece 200'leri cache'le, redirect/no-content'i atla.
    if (res && res.ok && res.status === 200) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    // Offline fallback HTML olmadığında 503 net dön.
    return new Response("Çevrimdışı.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req)
    .then((res) => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => cached);
  return cached || fetchPromise;
}
