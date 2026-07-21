import { localeAlternates } from "@/lib/i18n/server-meta";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "@/components/ui/locale-link";
import { Clock, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import Section from "@/components/ui/section";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Eyebrow from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";
import {
  posts,
  getPostBySlug,
  getRelatedPostsLocalized,
  localizePost,
  formatBlogDate,
} from "@/lib/blog";
import { SITE_URL as SITE } from "@/lib/site-url";
import { getLocale, getDictionary } from "@/lib/i18n/server";
import { regionsForPost } from "@/lib/cross-links";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const locale = await getLocale();
  const d = (await getDictionary()).pages.blog;
  if (!post) return { title: d.notFoundTitle };
  const ls = localizePost(post, locale);
  return {
    title: ls.title,
    description: ls.excerpt,
    alternates: await localeAlternates(`/blog/${ls.slug}`),
    openGraph: {
      title: `${ls.title} | RE/MAX BOSS`,
      description: ls.excerpt,
      type: "article",
      publishedTime: ls.date,
      url: `${SITE}/blog/${ls.slug}`,
      images: [{ url: ls.cover.src, alt: ls.cover.alt }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = getPostBySlug(slug);
  if (!raw) notFound();
  const locale = await getLocale();
  const dict = await getDictionary();
  const d = dict.pages.blog;
  const post = localizePost(raw, locale);
  const related = getRelatedPostsLocalized(slug, locale);
  // Başlıkta adı geçen bölgeler → bölge sayfası chip'leri (mekanik eşleşme).
  const mentionedRegions = regionsForPost(slug);

  const categoryLabel = {
    "bolge-rehberi": d.categories.bolge,
    "alici-rehberi": d.categories.alici,
    "satici-rehberi": d.categories.satici,
    yatirim: d.categories.yatirim,
  }[post.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE}${post.cover.src}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "RE/MAX BOSS" },
    publisher: { "@type": "Organization", name: "RE/MAX BOSS" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${post.slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        locale={locale}
        homeLabel={dict.nav.home}
        items={[
          { href: "/blog", label: dict.nav.blog },
          { label: post.title },
        ]}
      />

      {/* HERO */}
      <section className="relative isolate bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/75 via-navy-900/85 to-navy-900"
        />
        <div className="container-page py-16 md:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {d.backLink}
          </Link>
          <div className="max-w-3xl">
            <Eyebrow tone="white" className="text-white/80">
              {categoryLabel}
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-lg text-balance">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
              <time dateTime={post.date}>
                {formatBlogDate(post.date, locale)}
              </time>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                {d.readingTemplate.replace("{n}", String(post.readingMinutes))}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* İÇERİK */}
      <Section tone="light" density="normal">
        <article className="mx-auto max-w-2xl">
          <p className="text-xl text-navy/80 leading-relaxed font-medium">
            {post.intro}
          </p>

          {post.sections.map((s) => (
            <div key={s.heading ?? s.paragraphs[0].slice(0, 20)} className="mt-10">
              {s.heading && (
                <h2 className="font-display font-extrabold text-2xl text-navy text-balance">
                  {s.heading}
                </h2>
              )}
              {s.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mt-4 text-base md:text-lg text-navy/75 leading-[1.8]"
                >
                  {p}
                </p>
              ))}
              {/* Çapraz linkler — bölge/rehber/hizmet sayfalarına iç link (SEO) */}
              {s.links && s.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-mist/50 px-3.5 py-2 text-sm font-semibold text-navy/75 hover:text-remax-red hover:border-remax-red/40 transition-colors"
                    >
                      {l.label}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Bölge sayfası chip'leri — başlıkta adı geçen bölgeler */}
          {mentionedRegions.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {mentionedRegions.map((r) => (
                <Link
                  key={r.slug}
                  href={`/bolgeler/${r.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-remax-red-soft px-3.5 py-2 text-sm font-semibold text-remax-red hover:bg-remax-red hover:text-white transition-colors"
                >
                  {r.hero.eyebrow[locale]}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-10 rounded-2xl border border-line bg-mist/50 p-5 text-sm text-navy/60 leading-relaxed">
            {d.disclaimer}
          </div>

          {/* CTA */}
          <div className="mt-8 rounded-3xl bg-navy-900 text-white p-7 md:p-9 text-center">
            <h2 className="font-display font-bold text-xl">{d.ctaTitle}</h2>
            <p className="mt-2 text-white/70 text-sm max-w-md mx-auto">
              {d.ctaDesc}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/iletisim"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-7 text-sm font-semibold tracking-wide btn-glow btn-shine",
                )}
              >
                {d.ctaContact}
                <ArrowRight className="h-4 w-4 ms-2" />
              </Link>
              <a
                href={`tel:${office.phone}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span dir="ltr">{office.phone}</span>
              </a>
            </div>
          </div>
        </article>
      </Section>

      {/* İLGİLİ YAZILAR */}
      {related.length > 0 && (
        <Section tone="mist" density="normal">
          <h2 className="font-display font-extrabold text-2xl text-navy mb-6">
            {d.relatedHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => {
              const rLabel = {
                "bolge-rehberi": d.categories.bolge,
                "alici-rehberi": d.categories.alici,
                "satici-rehberi": d.categories.satici,
                yatirim: d.categories.yatirim,
              }[r.category];
              return (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="card-depth group flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                    <Image
                      src={r.cover.src}
                      alt={r.cover.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-eyebrow font-display text-remax-red">
                      {rLabel}
                    </span>
                    <h3 className="mt-2 font-display font-bold text-navy leading-snug line-clamp-2">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>
      )}
    </>
  );
}
