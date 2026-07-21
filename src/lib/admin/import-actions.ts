"use server";

/**
 * CSV/XLSX ilan içe aktarma — server action.
 *
 * Client (ImportWizard) dosyayı parse edip eşlenmiş/valide satırları buraya
 * gönderir; burada TEKRAR doğrulanır (client'a güvenilmez), external_ref
 * üzerinden iki aşamalı upsert yapılır:
 *   1) mevcut external_ref'ler çekilir → UPDATE / INSERT ayrımı
 *   2) yeni satırlar toplu INSERT, mevcatlar tek tek UPDATE
 *
 * requireAdmin + RLS (admin_insert/admin_update) çift katman koruma.
 */

import { requireAdmin } from "./guard";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { pingIndexNow } from "@/lib/indexnow";
import {
  validateRows,
  IMPORT_LIMITS,
  type ImportFieldKey,
  type ImportRowPayload,
  type RowIssue,
} from "./import-helpers";

export interface ImportResult {
  ok: boolean;
  inserted: number;
  updated: number;
  skipped: RowIssue[];
  error?: string;
}

export async function importListings(
  rawRows: Record<string, unknown>[],
  mapping: Partial<Record<ImportFieldKey, string>>,
): Promise<ImportResult> {
  await requireAdmin();

  if (!Array.isArray(rawRows) || rawRows.length === 0) {
    return { ok: false, inserted: 0, updated: 0, skipped: [], error: "Satır yok." };
  }
  if (rawRows.length > IMPORT_LIMITS.maxRows) {
    return {
      ok: false,
      inserted: 0,
      updated: 0,
      skipped: [],
      error: `En fazla ${IMPORT_LIMITS.maxRows} satır içe aktarılabilir (dosyada ${rawRows.length}).`,
    };
  }

  // Server-side yeniden doğrulama — client önizlemesiyle aynı kurallar.
  const { valid, skipped } = validateRows(rawRows, mapping);
  if (valid.length === 0) {
    return {
      ok: false,
      inserted: 0,
      updated: 0,
      skipped,
      error: "Geçerli satır kalmadı — zorunlu alan eşleştirmelerini kontrol edin.",
    };
  }

  const supabase = await createClient();

  // ─── Upsert ayrımı: hangi external_ref'ler zaten var? ───
  const refs = valid
    .map((r) => r.external_ref)
    .filter((r): r is string => Boolean(r));

  const existingRefs = new Set<string>();
  if (refs.length > 0) {
    const { data, error } = await supabase
      .from("listings")
      .select("external_ref")
      .in("external_ref", refs);
    if (error) {
      // 42703: kolon yok → migration 0007 çalıştırılmamış.
      if (error.code === "42703") {
        return {
          ok: false,
          inserted: 0,
          updated: 0,
          skipped,
          error:
            "Veritabanında external_ref kolonu yok — önce 0007_listings_import.sql migration'ını çalıştırın.",
        };
      }
      console.error("[import] ref check failed:", error);
      return {
        ok: false,
        inserted: 0,
        updated: 0,
        skipped,
        error: "Mevcut kayıt kontrolü başarısız oldu. Lütfen tekrar deneyin.",
      };
    }
    for (const row of data ?? []) {
      if (row.external_ref) existingRefs.add(row.external_ref);
    }
  }

  const toUpdate: ImportRowPayload[] = [];
  const toInsert: ImportRowPayload[] = [];
  for (const row of valid) {
    if (row.external_ref && existingRefs.has(row.external_ref)) toUpdate.push(row);
    else toInsert.push(row);
  }

  let inserted = 0;
  let updated = 0;
  const failures: RowIssue[] = [];

  // ─── Toplu INSERT (100'lük parçalar) ───
  for (let i = 0; i < toInsert.length; i += 100) {
    const chunk = toInsert.slice(i, i + 100);
    const { error } = await supabase.from("listings").insert(chunk);
    if (error) {
      console.error("[import] insert chunk failed:", error);
      failures.push({
        row: 0,
        message: `${chunk.length} satırlık ekleme bloğu başarısız: ${error.message}`,
      });
    } else {
      inserted += chunk.length;
    }
  }

  // ─── Mevcutları UPDATE (external_ref anahtarıyla, tek tek) ───
  for (const row of toUpdate) {
    const { external_ref, ...fields } = row;
    const { error } = await supabase
      .from("listings")
      .update(fields)
      .eq("external_ref", external_ref!);
    if (error) {
      console.error("[import] update failed:", external_ref, error);
      failures.push({
        row: 0,
        message: `"${external_ref}" güncellenemedi: ${error.message}`,
      });
    } else {
      updated += 1;
    }
  }

  revalidatePath("/admin");
  revalidatePath("/ilanlar");
  revalidatePath("/");
  // IndexNow — toplu iceri aktarma sonrasi liste bildirimi (best-effort).
  await pingIndexNow(["/ilanlar"]);

  return {
    ok: failures.length === 0,
    inserted,
    updated,
    skipped: [...skipped, ...failures],
    error:
      failures.length > 0
        ? "Bazı satırlar veritabanına yazılamadı — ayrıntılar raporda."
        : undefined,
  };
}
