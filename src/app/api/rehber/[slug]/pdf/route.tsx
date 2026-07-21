import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getGuideBySlug } from "@/lib/guides";
import { GuideDocument } from "@/lib/guide-pdf";
import { isLocale } from "@/lib/i18n/config";

/**
 * PDF Route Handler.
 *   GET /api/rehber/[slug]/pdf?lang=tr|en
 * @react-pdf/renderer Node runtime gerektirir (Font.register + Buffer üretimi).
 * Edge çalışmaz.
 */
export const runtime = "nodejs";
// PDF dinamik üretilir; ISR/cache yok. Cold start'ta font indirilir.
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return NextResponse.json({ error: "Rehber bulunamadı" }, { status: 404 });
  }

  const url = new URL(request.url);
  const langParam = url.searchParams.get("lang");
  const locale = isLocale(langParam) ? langParam : "tr";

  try {
    const buffer = await renderToBuffer(
      <GuideDocument guide={guide} locale={locale} />,
    );
    const body = new Uint8Array(buffer);

    const filename = `${guide.slug}-${locale}.pdf`;
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(body.byteLength),
        "Cache-Control": "private, max-age=0, no-store",
      },
    });
  } catch (err) {
    console.error("[pdf-route] render error:", err);
    return NextResponse.json(
      { error: "PDF üretimi başarısız." },
      { status: 500 },
    );
  }
}
