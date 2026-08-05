# MISSING_SECRETS — remax-boss-v2

> Tarih: 2026-08-05 · Tarama: `src/**`, `next.config.ts`, `.env.example`
> Lokalde `.env.local` YOK — asagidaki tum degerler bu makinede eksik.
> Hicbir deger uydurulmamistir; gercek degerleri sahibi doldurmalidir.

## Sablon (.env.local olarak doldurun)

```env
# --- Site URL ---
# Canli domain. Bos birakilirsa kod vercel.app fallback kullanir.
NEXT_PUBLIC_SITE_URL=            # ONERILEN: https://remaxboss.com.tr

# --- Supabase (ZORUNLU — ilanlar/admin/formlar icin) ---
# Kaynak: Supabase Dashboard -> Project Settings -> API
NEXT_PUBLIC_SUPABASE_URL=        # EKSIK
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # EKSIK
SUPABASE_SERVICE_ROLE_KEY=       # EKSIK (sadece scripts/create-admin.mjs icin, server-only)

# --- Anthropic (OPSIYONEL — AI sohbet; bossa /api/chat 503, site calisir) ---
ANTHROPIC_API_KEY=               # EKSIK
ANTHROPIC_MODEL=                 # opsiyonel, default: claude-haiku-4-5
NEXT_PUBLIC_AI_ASSISTANT_ENABLED=  # "true" degilse asistan tamamen kapali (default)

# --- Mapbox (OPSIYONEL) ---
NEXT_PUBLIC_MAPBOX_TOKEN=        # EKSIK

# --- Admin allowlist (ZORUNLU — admin paneli icin) ---
ADMIN_EMAILS=                    # EKSIK (virgulle ayrilmis e-postalar)

# --- Resend (OPSIYONEL — otomatik e-posta; ikisi de yoksa no-op) ---
RESEND_API_KEY=                  # EKSIK
RESEND_FROM=                     # EKSIK (remaxboss.com.tr Resend panelinde dogrulanmali)

# --- Google (OPSIYONEL) ---
NEXT_PUBLIC_GSC_VERIFICATION=    # EKSIK (bossa meta tag basilmaz)
NEXT_PUBLIC_GA_ID=               # EKSIK (bossa GA hic yuklenmez, fail-closed)
```

## Etki Ozeti

| Degisken | Zorunluluk | Eksikse davranis |
|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL / ANON_KEY | Zorunlu (canli icin) | Sorgular safeRun ile bos doner; ilan/form/admin calismaz |
| SUPABASE_SERVICE_ROLE_KEY | Script-only | Sadece admin olusturma scripti etkilenir |
| ADMIN_EMAILS | Zorunlu (admin icin) | Hicbir hesap admin sayilmaz |
| ANTHROPIC_API_KEY + AI flag | Opsiyonel | /api/chat 503, UI render edilmez |
| RESEND_API_KEY + RESEND_FROM | Opsiyonel | /api/notify no-op, form akisi bozulmaz |
| NEXT_PUBLIC_MAPBOX_TOKEN | Opsiyonel | Harita bileseni etkilenir |
| NEXT_PUBLIC_GSC_VERIFICATION / GA_ID | Opsiyonel | SEO dogrulama tag'i / GA yuklenmez |
| NEXT_PUBLIC_SITE_URL | Onerilen | vercel.app fallback URL kullanilir |

## Notlar

- Kod fail-closed tasarlanmis: eksik opsiyonel secret'lar build'i KIRMAZ.
- `src/lib/indexnow.ts` icindeki IndexNow key koda gomulu (public by-design), secret degildir.
- Build eksik env ile calisir; canli islevsellik icin Supabase + ADMIN_EMAILS sarttir.
