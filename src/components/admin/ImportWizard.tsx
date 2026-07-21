"use client";

/**
 * CSV/XLSX ilan içe aktarma sihirbazı — 3 adım:
 *   1) Dosya seç (client'ta SheetJS ile parse — lazy import)
 *   2) Sütun eşleştirme (autoMap önerisi + elle düzeltme)
 *   3) Önizleme (ilk 10 geçerli satır + atlanan satır raporu) → onay → server action
 *
 * Doğrulama kuralı: zorunlu alanı eksik satır ATLANIR ve raporlanır; tüm
 * içe aktarma iptal edilmez.
 */

import { useMemo, useState } from "react";
import {
  Upload,
  FileSpreadsheet,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IMPORT_FIELDS,
  IMPORT_LIMITS,
  autoMap,
  validateRows,
  type ImportFieldKey,
} from "@/lib/admin/import-helpers";
import {
  importListings,
  type ImportResult,
} from "@/lib/admin/import-actions";

type Step = "file" | "map" | "preview" | "done";

interface ParsedFile {
  name: string;
  headers: string[];
  rows: Record<string, unknown>[];
}

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors";

export default function ImportWizard() {
  const [step, setStep] = useState<Step>("file");
  const [parsed, setParsed] = useState<ParsedFile | null>(null);
  const [mapping, setMapping] = useState<
    Partial<Record<ImportFieldKey, string>>
  >({});
  const [fileError, setFileError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  // ─── Adım 1: dosya parse ───
  async function handleFile(file: File | undefined) {
    setFileError(null);
    if (!file) return;
    if (file.size > IMPORT_LIMITS.maxFileBytes) {
      setFileError(
        `Dosya çok büyük (${(file.size / 1024 / 1024).toFixed(1)} MB). Sınır: ${IMPORT_LIMITS.maxFileBytes / 1024 / 1024} MB.`,
      );
      return;
    }
    const okExt = /\.(csv|xlsx)$/i.test(file.name);
    if (!okExt) {
      setFileError("Yalnızca .csv veya .xlsx dosyaları destekleniyor.");
      return;
    }

    setBusy(true);
    try {
      // SheetJS lazy import — yalnız bu sayfada yüklenir.
      const XLSX = await import("xlsx");
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array", raw: false });
      const sheetName = wb.SheetNames[0];
      if (!sheetName) throw new Error("Dosyada sayfa bulunamadı.");
      const sheet = wb.Sheets[sheetName];
      const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
        header: 1,
        raw: false,
        defval: "",
      });
      if (matrix.length < 2) {
        throw new Error("Dosyada başlık satırı + en az 1 veri satırı olmalı.");
      }

      // Başlıklar — boş/tekrarlıları benzersizleştir.
      const rawHeaders = (matrix[0] as unknown[]).map((h, i) => {
        const s = String(h ?? "").trim();
        return s || `Sütun ${i + 1}`;
      });
      const seen = new Map<string, number>();
      const headers = rawHeaders.map((h) => {
        const count = seen.get(h) ?? 0;
        seen.set(h, count + 1);
        return count === 0 ? h : `${h} (${count + 1})`;
      });

      const dataRows = matrix
        .slice(1)
        .filter((r) => (r as unknown[]).some((c) => String(c ?? "").trim()))
        .slice(0, IMPORT_LIMITS.maxRows)
        .map((r) => {
          const obj: Record<string, unknown> = {};
          headers.forEach((h, i) => {
            obj[h] = (r as unknown[])[i] ?? "";
          });
          return obj;
        });

      if (dataRows.length === 0) {
        throw new Error("Dosyada dolu veri satırı bulunamadı.");
      }

      const p: ParsedFile = { name: file.name, headers, rows: dataRows };
      setParsed(p);
      setMapping(autoMap(headers));
      setStep("map");
    } catch (err) {
      setFileError(
        err instanceof Error ? err.message : "Dosya okunamadı — biçimini kontrol edin.",
      );
    } finally {
      setBusy(false);
    }
  }

  // ─── Adım 3 verisi ───
  const validation = useMemo(() => {
    if (!parsed) return null;
    return validateRows(parsed.rows, mapping);
  }, [parsed, mapping]);

  const requiredMissing = IMPORT_FIELDS.filter(
    (f) => f.required && !mapping[f.key],
  );

  async function handleImport() {
    if (!parsed || busy) return;
    setBusy(true);
    try {
      const res = await importListings(parsed.rows, mapping);
      setResult(res);
      setStep("done");
    } catch (err) {
      setResult({
        ok: false,
        inserted: 0,
        updated: 0,
        skipped: [],
        error:
          err instanceof Error ? err.message : "İçe aktarma başarısız oldu.",
      });
      setStep("done");
    } finally {
      setBusy(false);
    }
  }

  // ─── Render ───

  if (step === "done" && result) {
    return (
      <div
        role="status"
        className={cn(
          "rounded-3xl border p-8 text-center shadow-card",
          result.ok
            ? "border-emerald-200 bg-emerald-50"
            : "border-amber-200 bg-amber-50",
        )}
      >
        <span
          className={cn(
            "inline-flex h-14 w-14 items-center justify-center rounded-2xl",
            result.ok
              ? "bg-emerald-100 text-emerald-600"
              : "bg-amber-100 text-amber-700",
          )}
        >
          {result.ok ? (
            <CheckCircle2 className="h-7 w-7" aria-hidden />
          ) : (
            <AlertTriangle className="h-7 w-7" aria-hidden />
          )}
        </span>
        <h2 className="mt-5 font-display font-bold text-xl text-navy">
          {result.ok ? "İçe aktarma tamamlandı" : "İçe aktarma kısmen tamamlandı"}
        </h2>
        <p className="mt-2 text-sm text-navy/70">
          {result.inserted} yeni ilan eklendi · {result.updated} ilan güncellendi
          {result.skipped.length > 0 &&
            ` · ${result.skipped.length} satır atlandı`}
        </p>
        {result.error && (
          <p className="mt-2 text-sm font-medium text-amber-800">{result.error}</p>
        )}
        {result.skipped.length > 0 && (
          <div className="mt-4 mx-auto max-w-lg rounded-2xl border border-line bg-white p-4 text-start text-xs text-navy/70 max-h-56 overflow-y-auto">
            <p className="font-semibold text-navy mb-2">Atlanan satırlar:</p>
            <ul className="space-y-1">
              {result.skipped.map((s, i) => (
                <li key={i}>
                  {s.row > 0 ? `Satır ${s.row}: ` : ""}
                  {s.message}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="/admin"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-navy hover:bg-navy-700 text-white h-11 px-5 text-sm font-semibold",
            )}
          >
            Panele dön
          </a>
          <button
            type="button"
            onClick={() => {
              setParsed(null);
              setMapping({});
              setResult(null);
              setStep("file");
            }}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 px-5 text-sm font-semibold",
            )}
          >
            Yeni dosya yükle
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Adım göstergesi */}
      <ol className="flex items-center gap-2 text-xs font-semibold">
        {(
          [
            ["file", "1. Dosya"],
            ["map", "2. Eşleştirme"],
            ["preview", "3. Önizleme & Onay"],
          ] as const
        ).map(([key, label]) => (
          <li
            key={key}
            className={cn(
              "rounded-full px-3.5 py-1.5 border",
              step === key
                ? "bg-remax-red text-white border-remax-red"
                : "bg-white text-navy/60 border-line",
            )}
          >
            {label}
          </li>
        ))}
      </ol>

      {/* ── ADIM 1: Dosya ── */}
      {step === "file" && (
        <div className="rounded-3xl border border-line bg-white p-6 md:p-8 shadow-card">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-remax-red-soft text-remax-red">
              <FileSpreadsheet className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-display font-bold text-lg text-navy">
                CSV veya XLSX dosyası seçin
              </h2>
              <p className="mt-1 text-sm text-navy/65 leading-relaxed">
                İlk satır sütun başlıkları olmalı. Sınır:{" "}
                {IMPORT_LIMITS.maxFileBytes / 1024 / 1024} MB /{" "}
                {IMPORT_LIMITS.maxRows} satır. Sütun adları serbest — bir sonraki
                adımda alanlarla elle eşleştireceksiniz.
              </p>
            </div>
          </div>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line bg-mist/40 p-10 text-center hover:border-remax-red/40 transition-colors">
            <Upload className="h-8 w-8 text-navy/40" aria-hidden />
            <span className="text-sm font-semibold text-navy">
              {busy ? "Dosya okunuyor…" : "Dosya seçmek için tıklayın"}
            </span>
            <span className="text-xs text-navy/50">.csv veya .xlsx</span>
            <input
              type="file"
              accept=".csv,.xlsx"
              className="sr-only"
              disabled={busy}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>

          {fileError && (
            <p role="alert" className="mt-4 text-sm font-medium text-remax-red">
              {fileError}
            </p>
          )}
        </div>
      )}

      {/* ── ADIM 2: Eşleştirme ── */}
      {step === "map" && parsed && (
        <div className="rounded-3xl border border-line bg-white p-6 md:p-8 shadow-card">
          <h2 className="font-display font-bold text-lg text-navy">
            Sütun eşleştirme
          </h2>
          <p className="mt-1 text-sm text-navy/65">
            <span className="font-semibold">{parsed.name}</span> —{" "}
            {parsed.rows.length} veri satırı. Dosyanızdaki sütunları ilan
            alanlarıyla eşleştirin; otomatik öneriler dolduruldu.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {IMPORT_FIELDS.map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-semibold text-navy mb-1">
                  {f.label}{" "}
                  {f.required && <span className="text-remax-red">*</span>}
                </label>
                <select
                  value={mapping[f.key] ?? ""}
                  onChange={(e) =>
                    setMapping((m) => ({
                      ...m,
                      [f.key]: e.target.value || undefined,
                    }))
                  }
                  className={inputClass}
                >
                  <option value="">— Eşleştirme yok —</option>
                  {parsed.headers.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                {f.hint && (
                  <p className="mt-1 text-xs text-navy/50">{f.hint}</p>
                )}
              </div>
            ))}
          </div>

          {requiredMissing.length > 0 && (
            <p role="alert" className="mt-5 text-sm font-medium text-amber-700">
              Zorunlu alanlar eşleşmedi:{" "}
              {requiredMissing.map((f) => f.label).join(", ")}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setStep("file")}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-5 text-sm font-semibold",
              )}
            >
              <ArrowLeft className="h-4 w-4 me-2" aria-hidden />
              Geri
            </button>
            <button
              type="button"
              disabled={requiredMissing.length > 0}
              onClick={() => setStep("preview")}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-6 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed",
              )}
            >
              Önizlemeye geç
              <ArrowRight className="h-4 w-4 ms-2" aria-hidden />
            </button>
          </div>
        </div>
      )}

      {/* ── ADIM 3: Önizleme & Onay ── */}
      {step === "preview" && parsed && validation && (
        <div className="rounded-3xl border border-line bg-white p-6 md:p-8 shadow-card">
          <h2 className="font-display font-bold text-lg text-navy">
            Önizleme
          </h2>
          <p className="mt-1 text-sm text-navy/65">
            {validation.valid.length} geçerli satır içe aktarılacak
            {validation.skipped.length > 0 &&
              `, ${validation.skipped.length} satır atlanacak`}
            . Harici ilan no eşleşenler <strong>güncellenir</strong>, kalanlar
            yeni ilan olarak <strong>taslak/belirtilen durumda</strong> eklenir.
          </p>

          {/* İlk 10 geçerli satır */}
          <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-xs">
              <thead className="bg-mist/60 text-navy/70">
                <tr>
                  <th className="px-3 py-2 text-start font-semibold">Ref</th>
                  <th className="px-3 py-2 text-start font-semibold">Başlık</th>
                  <th className="px-3 py-2 text-start font-semibold">İşlem</th>
                  <th className="px-3 py-2 text-start font-semibold">Fiyat</th>
                  <th className="px-3 py-2 text-start font-semibold">Konum</th>
                  <th className="px-3 py-2 text-start font-semibold">Durum</th>
                  <th className="px-3 py-2 text-start font-semibold">Görsel</th>
                </tr>
              </thead>
              <tbody>
                {validation.valid.slice(0, 10).map((r, i) => (
                  <tr key={i} className="border-t border-line text-navy/80">
                    <td className="px-3 py-2">{r.external_ref ?? "—"}</td>
                    <td className="px-3 py-2 max-w-[220px] truncate">
                      {r.title}
                    </td>
                    <td className="px-3 py-2">{r.listing_type}</td>
                    <td className="px-3 py-2" dir="ltr">
                      {r.price.toLocaleString("tr-TR")} {r.currency}
                    </td>
                    <td className="px-3 py-2">
                      {[r.district, r.neighborhood].filter(Boolean).join(" / ") ||
                        r.city}
                    </td>
                    <td className="px-3 py-2">{r.status}</td>
                    <td className="px-3 py-2">{r.image_urls.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {validation.valid.length > 10 && (
            <p className="mt-2 text-xs text-navy/50">
              + {validation.valid.length - 10} satır daha…
            </p>
          )}

          {/* Hata raporu */}
          {validation.skipped.length > 0 && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 max-h-48 overflow-y-auto">
              <p className="font-semibold mb-2 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
                Atlanacak satırlar ({validation.skipped.length}):
              </p>
              <ul className="space-y-1">
                {validation.skipped.map((s, i) => (
                  <li key={i}>
                    Satır {s.row}: {s.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setStep("map")}
              disabled={busy}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-5 text-sm font-semibold",
              )}
            >
              <ArrowLeft className="h-4 w-4 me-2" aria-hidden />
              Eşleştirmeye dön
            </button>
            <button
              type="button"
              disabled={busy || validation.valid.length === 0}
              onClick={handleImport}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-6 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed",
              )}
            >
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 me-2 animate-spin" aria-hidden />
                  İçe aktarılıyor…
                </>
              ) : (
                <>
                  {validation.valid.length} satırı içe aktar
                  <ArrowRight className="h-4 w-4 ms-2" aria-hidden />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
