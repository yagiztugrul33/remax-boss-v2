@AGENTS.md

# RE/MAX BOSS v2 — Proje Bağlamı

> Yeni oturumda devralan ajan: önce bu dosyayı oku, src/ ağacını gez,
> sonra göreve başla.

## Repo & Stack

- **Repo:** https://github.com/yagiztugrul33/remax-boss-v2 (private, gh auth)
- **Lokal:** `C:\Users\yagiz\Documents\GitHub\remax-boss-v2`
- **Stack:** Next.js 16 (Turbopack, App Router) · React 19 · TypeScript strict
  · Tailwind v4 (`@theme inline`, **`tailwind.config.ts` YOK**) · shadcn
  neutral preset (`@base-ui` tabanlı, **`asChild` API YOK**)
- **Dil/RTL:** TR içerik, RTL hazır (logical CSS utilities)

## Faz Durumu (master @ 2ccf604)

| Faz | İş | Durum |
|---|---|---|
| 0 | scaffold + base layout + brand (Balloon + Wordmark + Logo) | ✅ |
| 1 | anasayfa gövdesi (6 section) | ✅ |
| 2 | /hakkimizda /iletisim /ilanlar + navbar bağlama + Balloon polish | ✅ |
| 3 | Görsel elden geçirme (Yön B "Modern & Cesur") — **SADECE anasayfa** | ✅ |
| 4 | İç sayfaların yeni tasarıma alınması | 🔜 (onaya bağlı) |

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
│   ├── layout.tsx           Root: Sora + Inter + Navbar + Footer
│   ├── page.tsx             Anasayfa (6 section kompozisyonu)
│   ├── globals.css          Tailwind v4 @theme inline tokenları
│   ├── hakkimizda/page.tsx  İç sayfa — Faz 2
│   ├── ilanlar/page.tsx     İç sayfa — Faz 2 (empty state)
│   └── iletisim/page.tsx    İç sayfa — Faz 2 (mailto form + map)
├── components/
│   ├── brand/               Balloon (3-bantlı SVG), Wordmark, Logo, SocialIcons
│   ├── layout/              Navbar (usePathname aktif), Footer
│   ├── sections/            Hero, Services, OfficeIntro, FeaturedListings,
│   │                        ContactStrip, ClosingCta, ContactForm, MapEmbed
│   └── ui/                  shadcn (button/card/dialog/...) + section/eyebrow/surface
└── lib/
    ├── office.ts            office bilgisi + navItems + aboutContent + imageSlots
    ├── listings.ts          Listing tipleri + boş array (`getFeaturedListings`)
    └── utils.ts             cn() helper (clsx + tailwind-merge)
```

## Devir Teslim Notu

Tüm imza fontları, type-scale modifier syntax, primitive'ler ve anasayfa
section'ları Faz 3'te kuruldu. İç sayfalar (`/hakkimizda`, `/iletisim`,
`/ilanlar`) hâlâ Faz 2 tasarımındadır — Faz 4'te yeni sisteme alınacak,
**ama bu kullanıcı onayına bağlıdır**.

Yeni bir görev başlatmadan önce: `git log --oneline -5` + bu CLAUDE.md +
ilgili dosyaları (örn. `src/lib/office.ts` veya değişecek section) oku.
