# RE/MAX BOSS — Ankara Beştepe (v2)

Modern, faz-tabanlı yeniden inşa. Next.js 16 + React 19 + Tailwind v4 + shadcn/ui.

## Stack

| Katman | Seçim |
|---|---|
| Framework | Next.js 16 (App Router, RSC) |
| Dil | TypeScript (strict) |
| Stil | Tailwind v4 (CSS-only config) + shadcn/ui (neutral preset, RTL) |
| Animasyon | Framer Motion |
| i18n | next-intl (FAZ 3'te aktive olacak) |
| Backend | Supabase (PostgreSQL + Auth + Storage) — FAZ 2 |
| AI | Anthropic Claude API — FAZ 4 |
| Harita | Mapbox — FAZ 2 |
| Font | Fraunces (display) + Hanken Grotesk (body), `next/font/google` |

## Marka Renkleri

| Token | Hex |
|---|---|
| `--color-remax-red` | `#DC1C2E` |
| `--color-remax-blue` | `#003DA5` |
| `--color-navy` | `#0A1A36` |
| `--color-mist` | `#F4F6FA` |
| `--color-line` | `#E5E9F0` |

Tailwind utilities: `bg-remax-red`, `text-navy`, `border-line` vb.

## Klasör Yapısı (üst 2 seviye)

```
remax-boss-v2/
├── public/                       statik dosyalar
├── src/
│   ├── app/                      app router pages
│   │   ├── globals.css           Tailwind v4 tokens + marka renkleri
│   │   ├── layout.tsx            Root layout: fontlar + Navbar + Footer
│   │   └── page.tsx              Anasayfa (placeholder)
│   ├── components/
│   │   ├── brand/                Balloon, RemaxBossWordmark, Logo
│   │   ├── layout/               Navbar, Footer
│   │   └── ui/                   shadcn/ui (button, input, card, vb.)
│   └── lib/
│       ├── office.ts             Ofis bilgileri + nav items
│       └── utils.ts              cn() helper
├── .env.example                  Supabase, Anthropic, Mapbox key'leri
├── components.json               shadcn config
├── next.config.ts
├── package.json
└── tsconfig.json                 strict TypeScript
```

## Faz Planı

| Faz | Kapsam | Durum |
|---|---|---|
| **0** | İskelet + tema + base layout + balon logo | ✅ Tamam |
| **1** | Anasayfa (hero, stats, öne çıkan ilanlar) + statik içerik | 🔜 |
| **2** | Supabase şeması + ilan/proje/ekip CRUD + harita | 🔜 |
| **3** | Admin panel + içerik yönetimi + i18n (TR/EN/RU/AR) | 🔜 |
| **4** | AI ile ilan metin üretimi + arama optimizasyonu | 🔜 |
| **5** | SEO, performans, analytics, vercel deploy | 🔜 |

## Geliştirme

```bash
npm install         # bağımlılıklar
npm run dev         # localhost:3000
npm run build       # production build
npm run lint        # ESLint
npx tsc --noEmit    # type check
```

## Kurallar (proje boyunca)

- **TypeScript strict** — `any` yasak, tüm prop'lar tipli
- **Logical CSS** — `ms-/me-/ps-/pe-/text-start` (RTL hazır)
- **Dürüstlük** — sahte isim/foto/veri yok; boş durumlar "yakında" gösterilir
- **Bağımsız ofis** — Footer'da "Her RE/MAX® ofisi bağımsız sahipli ve işletmelidir" ibaresi sabittir

## Lisans

© RE/MAX BOSS. RE/MAX® tescilli markadır.
