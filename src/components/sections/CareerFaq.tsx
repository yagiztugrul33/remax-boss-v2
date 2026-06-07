"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/career";

/** Erişilebilir SSS akordeonu (aria-expanded + klavye ile çalışır). */
export default function CareerFaq({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="rounded-2xl border border-line bg-white overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 p-5 text-start"
            >
              <span className="font-display font-bold text-navy">{item.q}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-remax-red transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-navy/70 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
