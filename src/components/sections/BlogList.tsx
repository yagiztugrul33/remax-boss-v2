"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogCategory } from "@/lib/blog";

export interface BlogListItem {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  cover: { src: string; alt: string };
  dateFormatted: string;
  readingMinutes: number;
}

export interface BlogCategoryLabels {
  all: string;
  "bolge-rehberi": string;
  "alici-rehberi": string;
  "satici-rehberi": string;
  yatirim: string;
}

export default function BlogList({
  posts,
  categoryLabels,
  readingTemplate,
  readMore,
}: {
  posts: readonly BlogListItem[];
  categoryLabels: BlogCategoryLabels;
  readingTemplate: string;
  readMore: string;
}) {
  const [active, setActive] = useState<BlogCategory | "all">("all");
  const shown =
    active === "all" ? posts : posts.filter((p) => p.category === active);

  const filters: { key: BlogCategory | "all"; label: string }[] = [
    { key: "all", label: categoryLabels.all },
    { key: "bolge-rehberi", label: categoryLabels["bolge-rehberi"] },
    { key: "alici-rehberi", label: categoryLabels["alici-rehberi"] },
    { key: "satici-rehberi", label: categoryLabels["satici-rehberi"] },
    { key: "yatirim", label: categoryLabels["yatirim"] },
  ];

  return (
    <div>
      {/* Kategori filtresi */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f.key)}
            aria-pressed={active === f.key}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              active === f.key
                ? "bg-remax-red text-white"
                : "bg-mist text-navy/70 border border-line hover:border-remax-red/30",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Izgara */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((p, i) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="card-depth group flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-mist">
              <Image
                src={p.cover.src}
                alt={p.cover.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                priority={i < 3}
              />
              <span className="absolute top-3 start-3 inline-flex items-center rounded-full bg-white/95 text-navy text-eyebrow font-display px-2.5 py-1">
                {categoryLabels[p.category]}
              </span>
            </div>
            <div className="flex flex-col gap-2 p-5">
              <h2 className="font-display font-bold text-lg text-navy leading-snug line-clamp-2">
                {p.title}
              </h2>
              <p className="text-sm text-navy/60 leading-relaxed line-clamp-3">
                {p.excerpt}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-navy/45 pt-2 border-t border-line">
                <span>{p.dateFormatted}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {readingTemplate.replace("{n}", String(p.readingMinutes))}
                </span>
              </div>
              <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-remax-red">
                {readMore}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
