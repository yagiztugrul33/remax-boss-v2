/**
 * Admin koruması regresyonu — kaynak-kod düzeyinde guard doğrulaması:
 * her /admin sayfası ve her admin server-action/route dosyası
 * requireAdmin() çağırmak ZORUNDA. Yeni bir admin yüzeyi eklenip guard
 * unutulursa bu test kırılır.
 *
 * (requireAdmin'in kendisi Supabase auth + admins tablosu RLS'ine dayanır;
 * davranışsal testi canlı oturum gerektirdiğinden statik sözleşme test edilir.)
 */

import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

function collect(dir: string, match: (p: string) => boolean, out: string[]) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) collect(p, match, out);
    else if (match(p)) out.push(p);
  }
}

describe("admin guard sözleşmesi", () => {
  it("her /admin sayfası requireAdmin() çağırır", () => {
    const pages: string[] = [];
    collect(
      join(ROOT, "src", "app", "admin"),
      (p) => p.endsWith("page.tsx"),
      pages,
    );
    expect(pages.length).toBeGreaterThanOrEqual(8);
    const missing = pages.filter(
      (p) => !readFileSync(p, "utf8").includes("requireAdmin("),
    );
    expect(missing.map((p) => relative(ROOT, p))).toEqual([]);
  });

  it("admin route handler'ları (export) requireAdmin() çağırır", () => {
    const routes: string[] = [];
    collect(
      join(ROOT, "src", "app", "admin"),
      (p) => /route\.tsx?$/.test(p),
      routes,
    );
    const missing = routes.filter(
      (p) => !readFileSync(p, "utf8").includes("requireAdmin("),
    );
    expect(missing.map((p) => relative(ROOT, p))).toEqual([]);
  });

  it("admin server-action dosyaları requireAdmin() çağırır", () => {
    const actions: string[] = [];
    collect(
      join(ROOT, "src", "lib", "admin"),
      (p) => /(actions?|import-actions)\.ts$/.test(p),
      actions,
    );
    expect(actions.length).toBeGreaterThanOrEqual(3);
    const missing = actions.filter((p) => {
      const c = readFileSync(p, "utf8");
      // "use server" içeren mutasyon dosyaları guard içermeli.
      if (!c.includes('"use server"')) return false;
      return !c.includes("requireAdmin(");
    });
    expect(missing.map((p) => relative(ROOT, p))).toEqual([]);
  });

  it("admin sayfaları arama motorlarına kapalı (robots noindex)", () => {
    const pages: string[] = [];
    collect(
      join(ROOT, "src", "app", "admin"),
      (p) => p.endsWith("page.tsx"),
      pages,
    );
    const missing = pages.filter(
      (p) => !readFileSync(p, "utf8").includes("index: false"),
    );
    expect(missing.map((p) => relative(ROOT, p))).toEqual([]);
  });
});
