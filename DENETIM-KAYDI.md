# DENETİM KAYDI — Sessiz Sağlık Taraması (Ö3)

**Tarih:** 2026-08-05 · **Dal:** `staging` · **Kapsam:** kırık bağlantı · SEO metadata · console/hydration
**Kural:** tasarıma dokunulmadı (renk/spacing/component görünümü SIFIR değişiklik)
**Uzak durum:** `origin/staging` **2026-08-05'te açıldı** — bkz. §9 (bu kayıttan önceki
sürümde "uzak push YOK" yazıyordu; push ayrı bir onaylı adımda yapıldı).

---

## 1. Tarama kapsamı (neyin denetlendiğinin kanıtı)

| Ne | Adet | Yöntem |
|---|---|---|
| Taranan HTTP rotası | **130** | `curl` ile tek tek gezildi (sitemap 124 + sitemap dışı 6) |
| Sitemap URL'i | **124** | `/sitemap.xml` `<loc>` ayrıştırması (62 TR + 62 EN) |
| İncelenen HTML sayfası | **127** | `<html>` içeren yanıtlar |
| Sayfa kaynağından toplanan farklı `href` | **302** | tüm gövdelerde `href="…"` taraması |
| Doğrulanan iç rota bağlantısı | 302'nin iç olanları | her hedef gerçek rotaya karşı eşlendi |
| Doğrulanan sayfa-içi çapa (`#fragment`) | **18** | hedef `id="…"` sayfa kaynağında arandı |
| Tarayıcıda gezilen sayfa (console) | **8** | gerçek Chrome, `read_console_messages` |
| Vitest | **40/40** | her düzeltme grubundan sonra |

Sayfa başına toplanan meta alanları: `title`, `description`, `canonical`,
`og:title/description/image/url/type/site_name/locale`, `twitter:card`,
`hreflang tr/en/x-default`, `<html lang>`, `meta robots`, `<h1>` sayısı, JSON-LD sayısı.

---

## 2. Kırık bağlantı tablosu (ÖNCE → SONRA)

### 2.1 İç rota bağlantıları

| Bulgu | Önce | Sonra |
|---|---|---|
| Sitemap'teki 124 rotanın HTTP durumu | 124/124 = 200 | 124/124 = 200 |
| Sayfa kaynağındaki iç link hedefi olmayan rotaya işaret ediyor | **0** | **0** |
| Kırık sayfa-içi çapa (`#fragment` hedefi yok) | **0** | **0** |
| Yanlış `href` / olmayan hedef | **0** | **0** |

**Sonuç: kırık iç bağlantı BULUNAMADI.** Düzeltilecek yanlış `href` çıkmadı.

Kontrol edilen 18 çapanın tamamı hedefini buldu — aralarında non-ASCII
`#degerleme-aracı` da var (`/araclar`); `id="degerleme-aracı"` ile birebir
eşleştiği için çalışıyor, **değiştirilmedi**.

### 2.2 Bağlantı biçimi kusuru (bulundu ve düzeltildi)

| Bağlantı | Önce | Sonra |
|---|---|---|
| `tel:` URI (RFC 3966) | `tel:+90 312 598 00 00` — **boşluklu, geçersiz** · **386 örnek** | `tel:+903125980000` · **0 boşluklu** |
| Görünen telefon metni | `+90 312 598 00 00` | `+90 312 598 00 00` — **127 sayfada korundu** |

`tel:` değeri RFC 3966 gereği boşluk içeremez; bazı çevirici uygulamaları
numarayı ilk boşlukta keser. Yalnız bağlantı hedefi normalize edildi,
görünen metne dokunulmadı.

### 2.3 Dokunulmayan dış bağlantılar (yalnız rapor)

| URL | Örnek |
|---|---|
| `https://wa.me/905513502677` | 204 |
| `https://www.instagram.com/remaxbossofficial` | 126 |
| `https://www.remax.com.tr/ofis/detay/boss?tab=portfoy` | 18 |
| `https://www.google.com/maps/search/?api=1&query=…` | 2 |
| `mailto:info@remaxboss.com.tr` | 162 |

Biçimsel olarak hepsi geçerli; erişilebilirlikleri **ağ üzerinden test EDİLMEDİ**
(dış bağımlılık — talimat gereği yalnız raporlanır).

---

## 3. SEO: eksik → tamam

### 3.1 Kök neden

Next.js metadata birleştirmesinde `openGraph` alanı **segment bazında tamamen
değiştirilir (deep merge YOK)**. Kendi `openGraph`ını tanımlayan her sayfa,
root layout'taki `og:type` / `og:site_name` / `og:locale` / `og:url` alanlarını
**sessizce kaybediyordu**. 15 sayfa bu durumdaydı.

### 3.2 Ölçüm (127 HTML sayfa üzerinde)

| Alan | Önce eksik | Sonra eksik |
|---|---|---|
| `og:site_name` | **78** | **0** |
| `og:locale` | **52** | **0** |
| `og:type` | **42** | **0** |
| `og:url` | **18** | **0** |
| `og:image` | 0 | 0 |
| `title` | 0 | 0 |
| `description` | 0 | 0 |
| `canonical` | 0 | 0 |
| `twitter:card` | 0 | 0 |
| `hreflang tr/en/x-default` | 0 | 0 |

(`/feed.xml`, `/robots.txt`, `/sitemap.xml` HTML değildir; meta beklenmez ve sayıma girmez.)

**Çözüm:** `src/lib/i18n/server-meta.ts` içine `localeOpenGraph(path, overrides)`
helper'ı eklendi; site geneli alanları her sayfaya yeniden taşır, sayfa isterse
ezer (blog yazısı `type: "article"` korunur). `openGraph` ezen 15 sayfa bu
helper'a geçirildi. `og:url` artık canonical ile **aynı dile** işaret ediyor.

### 3.3 Dil ayrımı (önceki oturumun yarım kalan işi tamamlandı)

`/`, `/ilanlar`, `/ekibimiz` sayfaları dile bakılmaksızın Türkçe `title` ve
`description` üretiyordu; `/en` URL'leri İngilizce içerikle Türkçe meta
taşıyordu. `META_COPY` sözlükleriyle locale'e bağlandı.

### 3.4 Sitemap ↔ robots tutarlılığı

| Kontrol | Sonuç |
|---|---|
| Sitemap'te `robots.txt` disallow'lu URL | **YOK** |
| Sitemap'te `noindex` meta taşıyan URL | **YOK** (124/124 temiz) |
| `/admin` | robots.txt disallow **+** `meta robots: noindex` |
| `/login` | robots.txt disallow **+** `meta robots: noindex, nofollow` |
| `Host` + `Sitemap` bildirimi | mevcut, kanonik host |
| 404 sayfası | `meta robots: noindex` — doğru |

**Tutarsızlık bulunamadı.**

### 3.5 İncelenip KUSUR SAYILMAYAN bulgular

| Gözlem | Değerlendirme |
|---|---|
| `/` ve `/en` aynı `title`: "RE/MAX BOSS — Ankara Beştepe" | Marka adı + yer adı; iki dilde de aynı. Kusur değil, **dokunulmadı**. |
| 404 sayfası anasayfa ile aynı `title`/`canonical` | `noindex` olduğu için indeks kirliliği yok. **Dokunulmadı**. |
| `/admin` → HTTP 500 | `.env` yokken Supabase istemcisi bilinçli olarak patlıyor (**fail-closed**). Güvenlik davranışı; **değiştirilmedi**. |

### 3.6 KUYRUĞA YAZILAN (bu turda düzeltilmedi — uydurma yapılmadı)

`/en/ekibimiz/<slug>` sayfaları Türkçe `description` taşıyor
(ör. "Ercan Karakuş — Gayrimenkul Danışmanı · RE/MAX BOSS"). 14 danışman × 1 alan.
Rol adları arasında **"MAXX Sistem" / "RAPP Sistem"** gibi RE/MAX'e özgü program
adları var; bunların İngilizce karşılığı doğrulanmadan çevrilirse **uydurma**
olur. Kurumsal karşılıklar teyit edilmeden **elle yazılmadı**.

---

## 4. Console / hydration

| Kaynak | Bulgu |
|---|---|
| Prod sunucu logu (130 rota gezildi) | **1 hata:** `/admin` → Supabase env yok (beklenen fail-closed). Başka uyarı/hata **YOK**. |
| Gerçek tarayıcı console (8 sayfa) | **0 mesaj** — log, warn, error hiçbiri yok |

Tarayıcıda gezilen sayfalar: `/`, `/ilanlar`, `/araclar` (hesaplayıcılar),
`/degerleme` (form), `/sss` (akordiyon), `/iletisim` (form + harita),
`/alici-kayit` (form), `/bolgeler/bestepe`.

**Hydration/prop hatası bulunamadı → bu başlıkta düzeltme yapılmadı.**

---

## 5. Commit listesi

Düzeltme grupları (her biri ayrı commit):

| # | SHA | Başlık |
|---|---|---|
| 1 | `6243230c11822f0f5ea318d7f19f7348a88d1e91` | feat(seo): anasayfa, ilanlar ve ekibimiz meta metinleri EN diline ayrildi |
| 2 | `f16d7a3b2943f3c4b11390e093a6b28a4a0740f4` | fix(seo): sayfa openGraph override'lari site geneli alanlari dusuruyordu |
| 3 | `ec86f740e723b3b5d08cea4f44cc441ca5d4c42d` | fix(a11y): tel: baglantilarindaki bosluklar kaldirildi (RFC 3966) |

Kayıt + temizlik:

| # | SHA | Başlık |
|---|---|---|
| 4 | `08815b4fabcb2bd63a0e29b06bd5f56eb7b107a7` | docs(denetim): sessiz saglik taramasi kaydi — DENETIM-KAYDI.md |
| 5 | `827ac96a76a3deaf671f34563ea5f48ae293d7a8` | chore: lokal yedekler klasoru gitignore'a eklendi |

> Bu tablo commit 4 yazıldıktan sonra güncellendiği için 4 ve 5 numaralı
> SHA'lar sonradan eklenmiştir; nihai dal ucu için `git log` esastır.

> `6243230` bu tarama başladığında çalışma ağacında **commit'lenmemiş olarak
> duruyordu** (önceki oturumun yarım işi). Kendi değişikliklerimden ayrı
> tutulması için önce ve tek başına commit'lendi.

---

## 6. KAPI 1 — SOĞUK KLON (`C:\Users\yagiz\Projeler\_dogrulama\remaxboss`)

Temiz klon → `staging` · `.env` YOK (`.env.example` hariç) · çalışma ağacı temiz.

| Adım | Süre | Son çıktı |
|---|---|---|
| `git clone --branch staging` | **0.6 sn** | `HEAD: ec86f74` · `BRANCH: staging` · working tree temiz |
| `npm ci` | **44.7 sn** | `npm warn allow-scripts sharp@0.34.5 …` (script onayı bekliyor — build'i etkilemedi) |
| `npm run build` | **27.6 sn** | `✓ Compiled successfully` · `ƒ Proxy (Middleware)` · rota tablosu basıldı |
| `npm test` | **3.8 sn** | `Test Files 7 passed (7)` · **`Tests 40 passed (40)`** |
| `npm run lint` | **18.4 sn** | `> eslint` — **çıktı yok, 0 bulgu** |

---

## 7. KAPI 2 — SOĞUK KLONDA CANLI KANIT (`npm start`, port 3200)

### (a) Önceden bozuk olan bağlantı artık geçerli

```
/iletisim sayfasindaki tel: href sayisi : 3
ORNEK (simdi)                           : tel:+903125980000
ONCE (bu tarama basinda)                : tel:+90 312 598 00 00   <- gecersiz, bosluklu
Bosluk iceren tel: href                 : 0
Gorunur telefon metni                   : KORUNDU (gorunur metin degismedi)
SITE GENELI bosluklu tel: href          : 0   (tarama basinda: 386)
SITE GENELI gecerli  tel: href          : 386
Gorunur telefon metnini tasiyan sayfa   : 127
```

> Not: talimattaki "önceden 404 veren iç link" senaryosu **oluşmadı** — tarama
> hiç kırık iç rota bulmadı (bkz. §2.1). Bu nedenle kanıt, gerçekten bulunan
> bozuk bağlantı kusuru (`tel:` URI) üzerinden verildi.

### (a2) İç link hedefleri

```
Anasayfadaki farkli ic link : 32
200 DONMEYEN                : YOK
```

### (b) Eklenen metadata sayfa kaynağında görünüyor

```
--- /araclar ---
    og:url         = https://remaxboss.com.tr/araclar
    og:site_name   = RE/MAX BOSS
    og:type        = website
    og:locale      = tr_TR
    canonical      = https://remaxboss.com.tr/araclar
--- /en/araclar ---
    og:url         = https://remaxboss.com.tr/en/araclar
    og:site_name   = RE/MAX BOSS
    og:type        = website
    og:locale      = en_US
    canonical      = https://remaxboss.com.tr/en/araclar
--- /en/iletisim ---
    og:url         = https://remaxboss.com.tr/en/iletisim
    og:site_name   = RE/MAX BOSS
    og:type        = website
    og:locale      = en_US
    canonical      = https://remaxboss.com.tr/en/iletisim
```

`og:url` her örnekte `canonical` ile birebir aynı ve **doğru dile** işaret ediyor.

Site geneli kapsam:

```
Incelenen HTML sayfa : 127
og:url       eksik   : 0       (tarama basinda 18)
og:site_name eksik   : 0       (tarama basinda 78)
og:type      eksik   : 0       (tarama basinda 42)
og:locale    eksik   : 0       (tarama basinda 52)
```

### (c) Tüm rota listesi 200 özeti

```
Toplam istek           : 130
HTTP 200               : 128
HTTP 404               : 1
HTTP 500               : 1
Sitemap URL sayisi     : 124  (hepsi 200 bekleniyor)
SITEMAP'TE 200 OLMAYAN : YOK -> 124/124 rota 200
200 disi (sitemap disi): /admin=500, /bu-sayfa-yok-404-testi=404
```

- `/bu-sayfa-yok-404-testi` = **kasıtlı** 404 sondası (var olmayan yol) → 404 doğru davranış.
- `/admin` = 500, `.env` yokken **fail-closed**; robots.txt disallow + `noindex`.

Soğuk klon sunucu hata logu — tüm tarama boyunca **tek kayıt**:

```
⨯ Error: [supabase] NEXT_PUBLIC_SUPABASE_URL veya NEXT_PUBLIC_SUPABASE_ANON_KEY tanımlı değil
    at async K (…/src_app_admin_page_tsx_…js)
```

---

## 8. Tasarım dokunulmazlığı

Değişen dosyalarda **hiçbir** `className`, renk tokenı, spacing, component
yapısı veya görünen metin değişmedi. Değişiklikler yalnız:

- `generateMetadata()` dönüş değerleri (sayfa kaynağındaki `<meta>` etiketleri),
- `href` **hedefleri** (`tel:` normalizasyonu — görünen metin aynı),
- `import` satırları,
- `src/lib/i18n/server-meta.ts` ve `src/lib/office.ts` içine eklenen iki helper.

Kanıt: görünen telefon metni `+90 312 598 00 00` düzeltmeden sonra da
**127 sayfanın hepsinde** mevcut (§7a).

---

## 9. Push doğrulaması (2026-08-05)

### 9.1 Dal açma

`git fetch origin` öncesi uzakta yalnız `origin/master`, `origin/gh-pages`,
`origin/HEAD` vardı — **`origin/staging` YOKTU**. Açıldı:

```
git push -u origin staging
 * [new branch]      staging -> staging
branch 'staging' set up to track 'origin/staging'.
```

### 9.2 SHA eşitliği (uzağa gerçekten ne gitti)

```
LOKAL  staging        : 58fba03f8e6a951327a3a0e23a8d0d044f254e4b
UZAK   origin/staging : 58fba03f8e6a951327a3a0e23a8d0d044f254e4b
```

Birebir aynı. Uzak dalda taşınan 6 commit:

| # | SHA | Konu |
|---|---|---|
| 1 | `de58c05` | docs: eksik secret envanteri — `MISSING_SECRETS.md` şablonu |
| 2 | `6243230` | feat(seo): anasayfa/ilanlar/ekibimiz meta metinleri EN diline ayrıldı |
| 3 | `f16d7a3` | fix(seo): sayfa `openGraph` override'ları site geneli alanları düşürüyordu |
| 4 | `ec86f74` | fix(a11y): `tel:` bağlantılarındaki boşluklar kaldırıldı (RFC 3966) |
| 5 | `08815b4` | docs(denetim): sessiz sağlık taraması kaydı |
| 6 | `827ac96` | chore: lokal yedekler klasörü `.gitignore`'a eklendi |
| 7 | `58fba03` | docs(denetim): commit listesi tamamlandı |

### 9.3 KAPI 3 — SOĞUK KLON, **UZAKTAN** (`_dogrulama\remaxboss-push`)

§6'daki soğuk klon lokal daldan alınmıştı. Bu sefer klon **doğrudan GitHub'dan**
çekildi — yani sınanan şey, uzağa fiilen yazılmış olan ağaç.

```
git clone https://github.com/yagiztugrul33/remax-boss-v2.git ... -b staging
klon HEAD : 58fba03f8e6a951327a3a0e23a8d0d044f254e4b   (= origin/staging)
```

| Adım | Süre | Sonuç |
|---|---|---|
| `git clone -b staging` (ağdan) | **28.1 sn** | `HEAD = 58fba03…` — uzak SHA ile birebir |
| `npm ci` | **114.1 sn** | tamamlandı |
| `npm run build` | **74.8 sn** | `✓ Compiled successfully` · rota tablosu · **exit code 0** |
| `npm test` (`vitest run`) | **12.3 sn** | `Test Files 7 passed (7)` · **`Tests 40 passed (40)`** · **exit code 0** |

> Süreler `Measure-Command` / `Stopwatch` ile ölçüldü. §6'ya göre `npm ci` ve
> `build` daha uzun sürdü çünkü bu klon ağdan indirildi ve npm cache'i soğuktu;
> **sonuçlar (build ✓, 40/40 test) değişmedi**.

### 9.4 Vercel preview

Repo Vercel'e **bağlı**. Push, staging SHA'sı için Preview deployment tetikledi:

```
deployment id : 5762298632
environment   : Preview
sha           : 58fba03f8e6a951327a3a0e23a8d0d044f254e4b
state         : success
url           : https://remax-boss-v2-d7jbezzni-yagizo.vercel.app
```

Vercel tarafında build **başarılı**. Ancak sayfa içeriği doğrulanamadı —
deployment **koruma altında** (Vercel Deployment Protection / SSO):

```
GET https://remax-boss-v2-d7jbezzni-yagizo.vercel.app
HTTP/1.1 302 Found
Location: https://vercel.com/sso-api?url=…&nonce=…
X-Robots-Tag: noindex
→ (takip) 307 → /login?next=…
```

Yani `200` gelen sayfa **uygulamanın değil, Vercel'in giriş ekranının**.
Preview içeriğinin (sayfa başlığı vb.) doğrulanması giriş gerektirdiğinden
**yapılmadı** ve kuyruğa yazıldı (`SABAH_ONAY_KUYRUGU.md`).

### 9.5 Bu adımda tasarıma dokunulmadı

Push adımında **hiçbir** kaynak dosya değişmedi; yalnız bu denetim kaydı ve
onay kuyruğu dosyası yazıldı. `git diff --stat` kapsamı yalnızca `.md`.
