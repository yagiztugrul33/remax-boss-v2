import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/guard";

/**
 * GET /admin/export?table=subscribers → CSV download.
 *
 * 🔒 requireAdmin() → admin oturumu + email allowlist + DB RLS.
 *
 * Desteklenen tablolar: contact_messages, campaign_applications,
 * valuation_requests, buyer_requests, subscribers.
 *
 * KVKK: Bu endpoint kullanıcı verisini admin tarafına çıkarır; loglarda
 * kayıt tutmaz, sadece authenticated admin'e cevap verir.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = [
  "contact_messages",
  "campaign_applications",
  "valuation_requests",
  "buyer_requests",
  "subscribers",
] as const;
type AllowedTable = (typeof ALLOWED)[number];

function escapeCsv(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export async function GET(req: NextRequest) {
  const { supabase } = await requireAdmin();
  const tableParam = req.nextUrl.searchParams.get("table") ?? "";
  if (!ALLOWED.includes(tableParam as AllowedTable)) {
    return NextResponse.json({ error: "Geçersiz tablo." }, { status: 400 });
  }
  const table = tableParam as AllowedTable;

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10_000); // güvenlik üst sınırı

  if (error) {
    return NextResponse.json(
      { error: "DB hatası: " + (error.code ?? "") },
      { status: 500 },
    );
  }

  const rows = (data ?? []) as Record<string, unknown>[];
  if (rows.length === 0) {
    return new NextResponse("(empty)", {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="${table}-empty.csv"`,
      },
    });
  }

  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      headers.map((h) => escapeCsv(r[h])).join(","),
    ),
  ].join("\n");

  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${table}-${date}.csv"`,
      // KVKK: tarayıcıda da cache'lenmesin
      "cache-control": "no-store, max-age=0",
    },
  });
}
