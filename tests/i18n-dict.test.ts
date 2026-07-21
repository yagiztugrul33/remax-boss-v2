/**
 * i18n sözlük bütünlüğü — TR ve EN ağaçları birebir aynı anahtar
 * yapısına sahip olmalı. Eksik/fazla çeviri anahtarı = kırmızı.
 */

import { describe, it, expect } from "vitest";
import { dictionaries } from "@/lib/i18n/dictionaries";

/** Nesne ağacındaki tüm yaprak yollarını (a.b.c) listeler. */
function leafPaths(obj: unknown, prefix = ""): string[] {
  if (obj === null || typeof obj !== "object") return [prefix];
  if (Array.isArray(obj)) {
    // Dizi: uzunluk yapının parçası (ör. servicesList 4 eleman).
    return [`${prefix}[len=${obj.length}]`];
  }
  const out: string[] = [];
  for (const key of Object.keys(obj as Record<string, unknown>)) {
    const next = prefix ? `${prefix}.${key}` : key;
    out.push(...leafPaths((obj as Record<string, unknown>)[key], next));
  }
  return out.sort();
}

/** Boş string bırakılmış çeviri var mı? */
function emptyLeaves(obj: unknown, prefix = ""): string[] {
  if (typeof obj === "string") {
    return obj.trim() === "" ? [prefix] : [];
  }
  if (obj === null || typeof obj !== "object") return [];
  const out: string[] = [];
  const entries = Array.isArray(obj)
    ? obj.map((v, i) => [String(i), v] as const)
    : Object.entries(obj as Record<string, unknown>);
  for (const [key, val] of entries) {
    out.push(...emptyLeaves(val, prefix ? `${prefix}.${key}` : key));
  }
  return out;
}

describe("i18n dictionaries", () => {
  it("TR ve EN anahtar ağaçları birebir aynı", () => {
    const tr = leafPaths(dictionaries.tr);
    const en = leafPaths(dictionaries.en);
    // Fark listesi okunur hata mesajı üretir.
    const onlyTr = tr.filter((p) => !en.includes(p));
    const onlyEn = en.filter((p) => !tr.includes(p));
    expect({ onlyTr, onlyEn }).toEqual({ onlyTr: [], onlyEn: [] });
  });

  it("boş string çeviri yok", () => {
    expect(emptyLeaves(dictionaries.tr)).toEqual([]);
    expect(emptyLeaves(dictionaries.en)).toEqual([]);
  });
});
