# CANLI'YA GEÇİŞ — PRODUCTION KONTROL LİSTESİ

> RE/MAX BOSS v2 — Üretim ortamına geçiş öncesi kullanıcının kendi
> hesaplarında / Vercel'de / DNS sağlayıcıda yapması gereken adımlar.
>
> **Kod tarafı tamamdır** — bu dosya yalnız hesap/altyapı ayarlarını listeler.

---

## 1. Vercel — Production Environment Variables

Vercel projesinin **Settings → Environment Variables** ekranından ekle. Hepsini **Production + Preview** olarak işaretle (admin scope hariç).

### 🔴 Zorunlu (site çalışması için)
| Anahtar | Açıklama | Nereden |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<project-ref>.supabase.co` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon public key | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL'i (örn. `https://remaxboss.com.tr`) | Domain bağlandıktan sonra |
| `ADMIN_EMAILS` | Virgüllü admin email allowlist (örn. `info@remaxboss.com.tr,broker@remaxboss.com.tr`) | RE/MAX BOSS |

### 🟡 Opsiyonel — Özellik açma
| Anahtar | Açıklama |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID (örn. `G-XXXXXXXXXX`). YOKSA GA yüklenmez. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Search Console doğrulama meta etiketi içeriği (`<meta name="google-site-verification" content="…">` içindeki content). YOKSA eklenmez. |
| `NEXT_PUBLIC_AI_ASSISTANT_ENABLED` | `"true"` → sağ-alt AI sohbet aktive. Default OFF. |
| `ANTHROPIC_API_KEY` | AI chat'i aktive ettiysen — **Sensitive** olarak işaretle. |
| `ANTHROPIC_MODEL` | Opsiyonel model override (`claude-haiku-4-5`). |

### 🔒 ASLA tarayıcıya gitmemeli
- Supabase **`service_role`** key: hiçbir yerde commit etme; sadece `scripts/` (gitignore'lu) içinde local kullanım için.

> **⚠ NEXT_PUBLIC_ ön ekli her şey JavaScript bundle'a gömülür** — sadece anon key + GA ID + site URL gibi public bilgi ekle.

---

## 2. Google Search Console

1. https://search.google.com/search-console adresine git.
2. Property ekle → **URL prefix** → `https://remaxboss.com.tr` (veya geçici Vercel URL).
3. Doğrulama yöntemi: **HTML tag**.
4. Verilen meta tag'in `content="…"` kısmını **kopyala**.
5. Vercel → Env Variables → `NEXT_PUBLIC_GSC_VERIFICATION` olarak yapıştır.
6. Vercel'de Redeploy → Search Console'da "Verify" tuşuna bas.
7. Sitemap'i ekle: **Sitemaps → /sitemap.xml**.

---

## 3. Google Analytics 4

1. https://analytics.google.com → Admin → **Create Property**.
2. Property name: `RE/MAX BOSS`, time zone: `(GMT+03:00) Istanbul`, currency: `TRY`.
3. Data stream → Web → URL: production URL.
4. **Measurement ID** kopyala (`G-XXXXXXXXXX`).
5. Vercel → Env Variables → `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`.
6. Redeploy.

### 🔒 KVKK uyumluluğu (zaten kod tarafında çözüldü)
- GA, kullanıcı çerez banner'da **"Kabul Et"** demedikçe **YÜKLENMEZ**.
- Reddedilirse veya karar verilmediyse hiçbir GA script çalışmaz.
- IP anonim, reklam çerezi denied, SameSite=Strict.

---

## 4. Google Business Profile (Yerel SEO)

1. https://business.google.com → işletme ekle.
2. İşletme adı: `RE/MAX BOSS`.
3. Kategori: `Gayrimenkul Acentesi / Real Estate Agency`.
4. Adres: `Beştepe Mah. Alparslan Türkeş Cad. No: 61, Yenimahalle / Ankara`.
5. Telefon: `+90 312 598 00 00`, WhatsApp: `+90 551 350 26 77`.
6. Web sitesi: production domain.
7. Çalışma saatleri: hafta içi 09:00–19:00, Cmt 10:00–17:00, Pazar kapalı.
8. Hizmet bölgeleri: Beştepe, Yenimahalle, Çukurambar, GOP, Oran (regions.ts ile uyumlu).
9. Doğrulama: posta kartı veya telefon (Google'ın önerdiği yönteme göre).
10. **Profesyonel fotoğraf ekle** (zaten /public/office'ta var — manuel yükle).

---

## 5. Domain (DNS) — Vercel'e bağlama

### Custom domain (örn. `remaxboss.com.tr`)
1. Domain sağlayıcıda (GoDaddy / Natro / vb.) DNS ayarlarına git.
2. Vercel → Project Settings → Domains → `remaxboss.com.tr` ekle.
3. Vercel'in verdiği A/CNAME kayıtlarını DNS'e yansıt:
   - **A record** `@` → `76.76.21.21` (Vercel root)
   - **CNAME** `www` → `cname.vercel-dns.com`
4. SSL otomatik olarak Vercel tarafından kurulur (Let's Encrypt).
5. Domain bağlandıktan sonra:
   - `NEXT_PUBLIC_SITE_URL` env'i `https://remaxboss.com.tr` olarak güncelle.
   - GSC + GA stream URL'lerini güncelle.

---

## 6. 🔴 GÜVENLİK RESET (canlıya geçiş öncesi)

### Service Role Key rotasyonu
Supabase Dashboard → Settings → API → **Service Role Key** yanındaki "Reset" butonu.
- Yeni key'i **sadece** Supabase Dashboard'da bırak.
- Eski key'in herhangi bir yere (Vercel env hariç — orada zaten yok, scripts/ local kullanım) eklenmiş olduğundan şüpheliyseniz **mutlaka rotasyon**.

### Admin şifre değişimi
Mevcut admin email'lerin Supabase Auth şifresini değiştir (Authentication → Users).
- Geliştirme sırasında kullanılan basit şifreler varsa.
- 2FA aktive et (Supabase Auth → Authentication → Multi-Factor).

### Anon key sızıntı durumu (kontrol)
GitHub repo public ise — anon key zaten public (`NEXT_PUBLIC_` prefix'i), bu beklenen. RLS koruması olduğu sürece bu sızıntı değil; **service_role** key'in ASLA commit edilmediğinden emin ol:
```bash
git log -p | grep -i "service_role"   # → boş olmalı
```

---

## 7. Supabase — Production ayarları

### Migrationlar (Dashboard → SQL Editor → Run)
Çalıştırılması gereken migration sırası (zaten varsa idempotent — tekrar çalıştırmak veri silmez):

1. `supabase/migrations/0001_listings.sql`
2. `supabase/migrations/0002_listings_write.sql` (admins + is_admin)
3. `supabase/migrations/0003_contact_messages.sql`
4. `supabase/migrations/0004_campaign.sql`
5. `supabase/migrations/0005_lead_forms.sql` ← Yeni (valuation + buyer)
6. `supabase/migrations/0006_subscribers.sql` ← Yeni (newsletter)

### RLS Teyit
Dashboard → Table Editor → Her tablo'da kilit ikonu ✅ olmalı:
- `admins`, `listings`, `contact_messages`, `campaign_settings`, `campaign_applications`
- `valuation_requests`, `buyer_requests`, `subscribers`

### Admins tablo
Dashboard → Authentication → Users → admin hesabı oluştur, sonra:
```sql
insert into public.admins (id) select id from auth.users where email = 'info@remaxboss.com.tr';
```

### Storage (ilan görselleri)
- `listings-images` bucket (varsa) public read açık olmalı.
- `next.config.ts` remotePatterns Supabase host'unu otomatik tanır.

### Backup
- Dashboard → Database → Backups → günlük backup aktif (Pro plan).
- Free plan'de en az haftalık manuel SQL export yap.

---

## 8. Yasal — KVKK / Gizlilik metinleri (avukat onaylı)

> **🔴 Şu an placeholder durumda** — canlıya GEÇMEDEN AVUKAT METİNLERİ KONMALI.
> Site form veri topluyor: contact, valuation, buyer, campaign, subscribe.

Doldurulması gereken sayfalar (`src/lib/legal.ts` içindeki `sections[].body`):
- `/kvkk-aydinlatma`
- `/gizlilik-politikasi`
- `/cerez-politikasi`
- `/kullanim-sartlari`

Avukatınız metinleri verince:
1. `src/lib/legal.ts` aç.
2. İlgili `body: { tr, en }` alanlarındaki PLACEHOLDER metnini değiştir.
3. `lastUpdated` dict alanındaki "hazırlanıyor" notunu kaldır.
4. Üst amber bant (`placeholderNoticeTitle/Body`) artık gerekmez — `dict.pages.legal.placeholderNoticeTitle/Body` boşalt veya component'te koşullu render et.
5. Build + push.

---

## 9. Canlı Test (domain bağlandıktan sonra)

### Manuel test checklist
- [ ] Anasayfa açılıyor, Hero görseli yükleniyor.
- [ ] Mobile (Chrome iOS / Android) → ekran tam, dokunma çalışır.
- [ ] Footer linkleri çalışır (yasal/iletişim/bölgeler).
- [ ] Form testleri (her formdan bir TEST gönderimi):
  - [ ] /iletisim → ContactForm (gerçek ad/tel + KVKK)
  - [ ] /degerleme → ValuationForm
  - [ ] /alici-kayit → BuyerForm
  - [ ] /kampanya → CampaignForm (eğer aktifse — default PASİF)
  - [ ] Subscribe (anasayfa altında)
  - [ ] Her formdan sonra `/admin/<gelen-kutusu>` 'da kayıt görünür mü
- [ ] Form rate-limit (5+ kez hızlı gönder → 429 mesajı doğru)
- [ ] PWA: tarayıcı menüsü → "Ana ekrana ekle" çalışır.
- [ ] Çerez banner görünüyor; "Kabul Et" → GA scripts yükleniyor (Network panelinde).
- [ ] Reject → GA yüklenmiyor (KVKK fail-closed).
- [ ] /admin → login required; doğru email ile giriş başarılı.
- [ ] Çıkış-niyeti modal: 12sn bekle + mouse üst kenara → görünüyor.
- [ ] 404 sayfası: `/abc-yok` → 404 + yönlendirme butonları.

### Otomatik kontrol
- [ ] Lighthouse (Chrome DevTools) → Performance 80+, Accessibility 95+, Best Practices 100, SEO 100.
- [ ] WebPageTest (3G mobile) → LCP < 2.5s.
- [ ] Security Headers tarama: https://securityheaders.com → A+ hedefi.
- [ ] SSL test: https://www.ssllabs.com/ssltest/ → A+ hedefi.
- [ ] Google Rich Results test:
  - https://search.google.com/test/rich-results → / (RealEstateAgent)
  - /sss → FAQPage
  - /bolgeler/bestepe → Place
  - /rehberler/ilk-kez-ev-alma → Article

---

## 10. Yayın sonrası — İlk hafta

- [ ] Google Search Console → indexed sayfa sayısı (51 hedef).
- [ ] GA → kullanıcı sayısı + bounce rate (KVKK aware veri).
- [ ] Supabase Dashboard → form gönderim sayıları + status dağılımı.
- [ ] Vercel Analytics (eğer aktive ettiysen) → Core Web Vitals.
- [ ] Hata logları (Vercel → Functions → Logs) → 5xx hata var mı.

---

## 🎯 Geçiş Sırası (önerilen)

1. Migrationları çalıştır (Supabase).
2. Admin hesabını oluştur ve `admins` tablosuna ekle.
3. Vercel env'leri yapılandır (zorunlu olanlar).
4. GA + GSC env'lerini ekle (isteğe bağlı).
5. Domain DNS'i bağla, SSL bekle.
6. Avukat yasal metinlerini güncelle.
7. Vercel'de Redeploy.
8. Yukarıdaki **9. Canlı Test** checklist'i çalıştır.
9. Hatalar varsa düzelt; ardından Google Search Console'a sitemap submit.
10. GBP (Google Business Profile) doğrulamasını tamamla.

---

**Hazır olduğunda:** RE/MAX BOSS canlıda — Beştepe'den Ankara'ya, dijital + saha + güven aksıyla.
