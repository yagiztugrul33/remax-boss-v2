import { type ReactNode } from "react";

/**
 * Dictionary metinlerinde `<accent>kelime</accent>` markup'ını
 * `<span class="accent-mark">kelime</span>` olarak render eder.
 * Çeviri sözlüğünde vurgulu kelimeleri belirtmek için kullanılır.
 *
 * Örnek: withAccent("Profesyonellik ve <accent>güvenilirlik</accent>.")
 *   → "Profesyonellik ve " + <span class="accent-mark">güvenilirlik</span> + "."
 */
export function withAccent(text: string): ReactNode {
  const parts = text.split(/<accent>(.+?)<\/accent>/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <span key={i} className="accent-mark">
        {p}
      </span>
    ) : (
      p
    ),
  );
}
