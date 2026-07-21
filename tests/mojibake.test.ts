/**
 * 🔴 MOJIBAKE REGRESYON TESTİ
 *
 * BOM'suz UTF-8 dosyaların ANSI (Windows-1254) sanılıp yeniden kodlanması,
 * Türkçe karakterleri iki-karakterlik bozuk dizilere çevirir ("ü" → "Ã¼").
 * Bu hata bir kez canlıya çıktı (guides.ts, f83c796). Bu test, kaynak
 * ağacında böyle bir çift-kodlama dizisi görülürse KIRILIR.
 *
 * Desenler test dosyasının kendisini yakalamasın diye \uXXXX kaçışlarıyla
 * üretilir ve tests/ klasörü taranmaz.
 */

import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

// Çift kodlanmış Türkçe harfler + tipografik karakter aileleri.
const MOJIBAKE_SEQUENCES: readonly string[] = [
  "Ã¼", // ü → Ã¼
  "Ã§", // ç → Ã§
  "Ã¶", // ö → Ã¶
  "Ã", // Ü
  "Ã", // Ç
  "Ã", // Ö
  "Ä±", // ı → Ä±
  "Ä°", // İ → Ä°
  "ÅŸ", // ş → ÅŸ
  "Å", // Ş → ÅŸ (büyük)
  "Ä", // ğ → ÄŸ
  "Ä", // Ğ
  "â€", // — " " … ailesi → â€
];

function collectFiles(dir: string, exts: readonly string[], out: string[]) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === ".git") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) collectFiles(p, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
}

function scan(files: readonly string[]): string[] {
  const hits: string[] = [];
  for (const f of files) {
    const content = readFileSync(f, "utf8");
    for (const seq of MOJIBAKE_SEQUENCES) {
      const idx = content.indexOf(seq);
      if (idx !== -1) {
        const line = content.slice(0, idx).split("\n").length;
        hits.push(`${relative(ROOT, f)}:${line} → "${seq}"`);
        break; // dosya başına ilk bulgu yeter
      }
    }
  }
  return hits;
}

describe("mojibake (çift kodlama) taraması", () => {
  it("src/ altındaki TS/TSX dosyaları temiz", () => {
    const files: string[] = [];
    collectFiles(join(ROOT, "src"), [".ts", ".tsx"], files);
    expect(files.length).toBeGreaterThan(50); // tarama gerçekten çalışıyor
    expect(scan(files)).toEqual([]);
  });

  it("public/ (sw.js + manifest.json) temiz", () => {
    const files = [
      join(ROOT, "public", "sw.js"),
      join(ROOT, "public", "manifest.json"),
    ];
    expect(scan(files)).toEqual([]);
  });

  it("supabase/migrations SQL dosyaları temiz", () => {
    const files: string[] = [];
    collectFiles(join(ROOT, "supabase"), [".sql"], files);
    expect(files.length).toBeGreaterThan(3);
    expect(scan(files)).toEqual([]);
  });
});
