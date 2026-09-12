import { office } from "@/lib/office";
import { services } from "@/lib/services";
import { REGIONS } from "@/lib/regions";
import { SITE_URL } from "@/lib/site-url";

/**
 * llms.txt — AI arama/asistan motorları (AEO) için sitenin özet haritası.
 * llmstxt.org formatı: Markdown, tek kaynak listesi, UYDURMA YOK ilkesiyle
 * yalnız gerçek/statik veriden (office.ts, services.ts, regions.ts) üretilir.
 */
export const dynamic = "force-static";

export async function GET() {
  const serviceLines = services
    .map((s) => `- [${s.title.tr}](${SITE_URL}/hizmetler/${s.slug}): ${s.summary.tr}`)
    .join("\n");

  const regionLines = REGIONS.map(
    (r) => `- [${r.name}](${SITE_URL}/bolgeler/${r.slug})`,
  ).join("\n");

  const body = `# RE/MAX BOSS

> ${office.shortDescription}

RE/MAX BOSS, ${office.city} ${office.district} merkezli, RE/MAX Türkiye ağına bağlı bağımsız sahipli ve işletmeli bir gayrimenkul ofisidir.

## Hizmetler
${serviceLines}

## Hizmet Bölgeleri (${office.city})
${regionLines}

## Diğer Sayfalar
- [İlanlar](${SITE_URL}/ilanlar): Satılık ve kiralık güncel gayrimenkul portföyü.
- [Ekibimiz](${SITE_URL}/ekibimiz): Gayrimenkul danışmanları ve brokerlar.
- [Hakkımızda](${SITE_URL}/hakkimizda): Ofis ve RE/MAX ağı hakkında.
- [Blog](${SITE_URL}/blog): Bölge rehberleri ve gayrimenkul içerikleri.
- [SSS](${SITE_URL}/sss): Sıkça sorulan sorular.
- [İletişim](${SITE_URL}/iletisim): Telefon, adres ve iletişim formu.

## İletişim
- Adres: ${office.addressFull}
- Telefon: ${office.phone}
- E-posta: ${office.email}
`;

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
