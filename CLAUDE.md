@AGENTS.md

# RE/MAX BOSS v2 — Proje Bağlamı

> Yeni oturumda devralan ajan: önce bu dosyayı oku, src/ ağacını gez,
> sonra göreve başla.

## Repo & Stack

- **Repo:** https://github.com/yagiztugrul33/remax-boss-v2 (public)
- **GitHub Pages:** https://yagiztugrul33.github.io/remax-boss-v2/ (static export preview)
- **Lokal:** `C:\Users\yagiz\Documents\GitHub\remax-boss-v2`
- **Stack:** Next.js 16 (Turbopack, App Router) · React 19 · TypeScript strict
  · Tailwind v4 (`@theme inline`, **`tailwind.config.ts` YOK**) · shadcn
  neutral preset (`@base-ui` tabanlı, **`asChild` API YOK**)
- **Dil/RTL:** TR içerik, RTL hazır (logical CSS utilities)

## Faz Durumu (master @ 12f7dd60)

| Faz | İş | Durum |
|---|---|---|
| 0 | scaffold + base layout + brand (Balloon + Wordmark + Logo) | ✅ |
| 1 | anasayfa gövdesi (6 section) | ✅ |
| 2 | /hakkimizda /iletisim /ilanlar + navbar bağlama + Balloon polish | ✅ |
| 3 | Görsel elden geçirme (Yön B "Modern & Cesur") — **SADECE anasayfa** | ✅ |
| 4 | İç sayfaların yeni tasarıma alınması | 🔜 (onaya bağlı) |
| 5 | Supabase — listings tablosu + RLS + anon okuma + public queries | ✅ |
| 5b | Auth — admin login + requireAdmin guard + ADMIN_EMAILS allowlist | ✅ |
| 5c | Admin panel — ilan CRUD (ListingForm, server actions, /admin/*) | ✅ |
| 6 | Ofisimiz + animasyon — Hero full-bleed, OfficeShowcase, tilt cards | ✅ |
| 7 | Güvenlik denetimi — security headers, gitignore, git geçmiş taraması | ✅ |

## AI Sohbet Asistanı (feature flag — default KAPALI)

Kod tamamen hazır ama varsayılan **KAPALI**. Sitede HİÇBİR şey görünmez,
`/api/chat` 503 döner. Tasarım: Anthropic Claude (Haiku) server-proxy,
anahtar **sadece server'da**, system prompt sunucuda (sıkı uydurma önleme).

**Aktive etmek için (Vercel):**
1. Project Settings → Environment Variables:
   - `ANTHROPIC_API_KEY` (Sensitive olarak işaretle) — Anthropic console'dan
   - `NEXT_PUBLIC_AI_ASSISTANT_ENABLED=true`
   - (opsiyonel) `ANTHROPIC_MODEL=claude-haiku-4-5` (varsayılan zaten bu)
2. Deployments → ↻ Redeploy.

**Dosyalar:**
- `src/lib/ai-assistant.ts` — system prompt + sabitler (MAX_HISTORY=12,
  MAX_MESSAGE_LEN=2000, MAX_OUTPUT_TOKENS=600, DEFAULT_MODEL="claude-haiku-4-5")
- `src/app/api/chat/route.ts` — POST endpoint, Node.js runtime, flag+key+body
  kontrolleri, Anthropic proxy
- `src/components/ui/ai-chat.tsx` — sol-alt yüzen buton + köşe/tam-alt pencere,
  flag false → `null` döner
- Layout'ta `<AiChat />` render ediliyor (FloatingActions'tan sonra)

**Sıkı UYDURMA önleme (system prompt):** belirli ilan/fiyat/m²/randevu/
danışman ismi/istatistik UYDURMA YASAK. Kampanya iki aşamalı ödülü doğru
anlatır; "kazandınız/garanti" demez. Bilmediğini söyler + ofise yönlendirir.

**Maliyet koruması:** max_tokens 600, geçmiş son 12 mesaj, mesaj 2000 chr,
body 8KB, client rate-limit 2s. Anthropic API key ASLA client/response/log'a
sızmaz.

## Veri Modeli — KESİN KARAR (YOL A, 2026-06-07)

> **Veri modeli = MEVCUT CANLI ŞEMA.** Yeni özellikler bunun ÜZERİNE,
> `is_admin()`'i **BOZMADAN** eklenir. Aşağıdaki yapı tek doğruluk kaynağıdır.

- **Tablolar (canlı):** `admins`, `listings`, `contact_messages`,
  `campaign_settings`, `campaign_applications`
- **Yetki:** `public.is_admin()` (0002) → **`admins` tablosuna** dayalı
  (`exists(select 1 from public.admins where id = auth.uid())`) + app-level
  `ADMIN_EMAILS` (UI guard, savunma derinliği). **Bu fonksiyon DEĞİŞTİRİLMEZ.**
- **Migration sırası:** `0001_listings` → `0002_listings_write` (admins + is_admin
  + storage) → `0003_contact_messages` → `0004_campaign`. Yeni tablo = `0005_*`,
  AYNI güvenli deseni izler (anon insert / admin select via `is_admin()`).
- **TERK EDİLDİ:** `profiles`/`agents`/role-enum tabanlı "v2-platform" 18-tablolu
  şema **KULLANILMIYOR** (silindi). `profiles` tabanlı `is_admin()` yeniden
  tanımı YASAK — canlı `admins` mantığını bozar.

## Değişmez Kurallar (her fazda geçerli — ASLA bozma)

1. **TEK ADIM:** Tek görev, tek PR, tek push. Kapsam genişletme yasak.
2. **UYDURMA YOK:** sahte ilan / fiyat / yorum / istatistik / ekip / hikaye /
   "gönderildi" akışı YASAK. Veri yoksa → dürüst empty state.
3. Tüm veri/metin `src/lib/` altında (`office.ts`, `listings.ts`), **type-safe**.
4. **RTL-ready logical CSS:** `ms-/me-/ps-/pe-/text-start`. Sabit `left/right` YOK.
5. **`buttonVariants(...)` deseni** — `asChild` yok (yeni shadcn'de mevcut değil).
   `<Link className={cn(buttonVariants(...), "...")}>` deseni kullan.
6. Brand ikonları `src/components/brand/SocialIcons.tsx` inline SVG —
   **dokunma** (lucide-react@1.x sosyalleri silmiş).
7. `globals.css @theme inline`: marka HUE'leri sabit
   (`remax-red` / `navy` / `remax-blue`). Ton ekleyebilirsin, **hue değiştiremezsin**.
8. ESLint `react/no-unescaped-entities` **kapalı** (Türkçe apostrof:
   `Ankara'nın`, `RE/MAX'in`). HTML entity ile yazma.
9. **DoD her faz:**
   - `npx tsc --noEmit` → 0
   - `npm run lint` → 0
   - `npm run build` → ✓
   - master'a push

## Tasarım Sistemi (Faz 3'te kuruldu, korunur)

### Tipografi
- **Display:** Sora (`--font-sora`, 400-800), `next/font/google`, `latin + latin-ext`
- **Body:** Inter (`--font-inter`), TR glyph (ş ğ ı İ ç ö ü)
- **Type scale (Tailwind v4 modifier syntax):**
  - `text-display-xl` — `clamp(3rem, 8vw, 5.25rem)` / lh `0.98` / ls `-0.04em` / w `800`
  - `text-display-lg` — `clamp(2.5rem, 6vw, 4rem)` / w `800`
  - `text-display` — `clamp(1.75rem, 4vw, 2.5rem)` / w `700`
  - `text-eyebrow` — `0.75rem` / ls `0.18em` / w `700`

### Renk Tokenları
| Token | Hex / değer | Kullanım |
|---|---|---|
| `--color-remax-red` | `#dc1c2e` | birincil aksan, CTA |
| `--color-remax-red-hover` | `#f02038` | hover ton |
| `--color-remax-red-soft` | `rgba(220,28,46,0.08)` | yumuşak vurgu bg |
| `--color-remax-red-glow` | `rgba(220,28,46,0.35)` | shadow-glow için |
| `--color-remax-blue` | `#003da5` | mavi marka |
| `--color-navy` / `-800` | `#0a1a36` | varsayılan navy |
| `--color-navy-900` | `#050d1d` | en koyu yüzey (Hero/ContactStrip bg) |
| `--color-navy-700` | `#13294f` | dark elevation kartlar |
| `--color-navy-600` | `#1d3b6c` | dark hover üst kat |
| `--color-mist` | `#f4f6fa` | açık yüzey |
| `--color-line` | `#e5e9f0` | açık divider |
| `--shadow-elevated` / `-card` / `-glow-red` | — | tutarlı elevation |

### Utility'ler
- `.accent-mark` — kelimede kırmızı renk + arka %18 opak kırmızı highlight
  (`position:relative` + `::after`)
- `.border-glow` — dark surface üzerinde `rgba(255,255,255,0.08)` border
- `.container-page` — `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- `.text-balance` — `text-wrap: balance`
- Global `@media (prefers-reduced-motion: reduce)` override

### Primitive'ler (`src/components/ui/`)
- `<Section tone="light|mist|dark" density="tight|normal|loose" full?>` —
  tutarlı dikey ritim + container
- `<Eyebrow tone="red|blue|navy|white">` — bold uppercase tracked kicker, dotlu
- `<Surface tone="card|mist|dark|red|blue" hoverable>` — koyu/açık tutarlı kart
- `<Button>` + `buttonVariants` — shadcn base, `asChild` yok

## Klasör Yapısı (üst seviye)

```
src/
├── app/
│   ├── layout.tsx              Root: Sora + Inter + Navbar + Footer
│   ├── page.tsx                Anasayfa (8 section kompozisyonu)
│   ├── globals.css             Tailwind v4 @theme inline tokenları + animasyonlar
│   ├── hakkimizda/page.tsx     İç sayfa — Faz 2
│   ├── ilanlar/page.tsx        İlan listesi — DB'den, empty state dürüst
│   ├── ilanlar/[id]/page.tsx   İlan detay — gallery, facts, CTA
│   ├── iletisim/page.tsx       İç sayfa — Faz 2
│   ├── login/page.tsx          Admin girişi (signInWithPassword)
│   └── admin/                  Admin panel (force-dynamic, requireAdmin guard)
│       ├── page.tsx            Tüm ilanlar + CRUD bağlantıları
│       ├── ilan/yeni/page.tsx  Yeni ilan formu
│       └── ilan/[id]/duzenle/  İlan düzenleme
├── components/
│   ├── brand/                  Balloon (SVG), Wordmark, Logo, SocialIcons
│   ├── layout/                 Navbar (scroll-shrink, Ofisimiz hover), Footer
│   ├── sections/               Hero (full-bleed), Services (tilt), OfficeIntro,
│   │                           OfficeShowcase (alternating foto+text), OfficeGallerySection,
│   │                           FeaturedListings, ContactStrip, ClosingCta, MapEmbed
│   ├── admin/                  ListingForm (kapsamlı ilan formu)
│   └── ui/                     shadcn + section/eyebrow/surface/reveal/tilt-card
└── lib/
    ├── office.ts               office bilgisi + navItems + aboutContent + officeGallery + team
    ├── listings.ts             Listing tipi + formatLocation/formatPrice
    ├── queries.ts              anon Supabase okuma (safeRun wrapper)
    ├── auth.ts                 isAdminEmail() — ADMIN_EMAILS CSV parser
    ├── utils.ts                cn() helper
    ├── supabase/
    │   ├── server.ts           createClient() — anon + cookies (server)
    │   └── client.ts           createBrowserClient() — anon (browser)
    └── admin/
        ├── guard.ts            requireAdmin() — 2 katmanlı auth
        ├── queries.ts          getAllListingsAdmin, getListingByIdAdmin
        └── actions.ts          createListing, updateListing, deleteListing server actions
supabase/
└── migrations/
    ├── 0001_listings.sql       listings tablosu + RLS anon okuma
    └── 0002_listings_write.sql admin yazma politikaları
public/
└── office/                     14 ofis fotoğrafı (3.9 MB, optimize edilmiş)
.claude/
├── settings.json               Proje allowedTools (lint/build/git-read)
└── commands/
    └── push.md                 PAT push + gh-pages güncelleme prosedürü
```

## Deploy & Push Prosedürü

```bash
# 1. Commit imzasını düzelt (eğer stop-hook şikayet ediyorsa)
git config user.email noreply@anthropic.com && git config user.name Claude
git rebase --exec "git commit --amend --no-edit --reset-author" origin/master

# 2. PAT ile push (sonra hemen temizle)
git remote set-url origin https://PAT@github.com/yagiztugrul33/remax-boss-v2.git
git push -u origin master
git remote set-url origin https://github.com/yagiztugrul33/remax-boss-v2.git
```

> gh-pages güncelleme için: `.claude/commands/push.md` dosyasına bak.

## Güvenlik Notları (Faz 7 — 2026-06-07)

- `.env.local` hiçbir commit'te YOK — git geçmişi temiz ✅
- `service_role` key sadece `scripts/create-admin.mjs` (gitignore'da) — kaynak kodda YOK ✅
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` gh-pages JS bundle'ında var — bu beklenen (public key) ✅
- `next.config.ts`: X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy eklendi ✅
- `.gitignore`: `.env*` + `!.env.example` açık istisnası ✅

## Devir Teslim Notu

Tüm imza fontları, type-scale modifier syntax, primitive'ler ve anasayfa
section'ları Faz 3'te kuruldu. Faz 5-7 sistemi (Supabase/auth/admin/animasyon/
güvenlik) tamamlandı. İç sayfalar (`/hakkimizda`, `/iletisim`) hâlâ Faz 2
tasarımındadır — Faz 4'te yeni sisteme alınacak, **ama bu kullanıcı onayına bağlıdır**.

Yeni bir görev başlatmadan önce: `git log --oneline -5` + bu CLAUDE.md +
ilgili dosyaları (örn. `src/lib/office.ts` veya değişecek section) oku.
