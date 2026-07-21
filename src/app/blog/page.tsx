import { localeAlternates } from "@/lib/i18n/server-meta";
import type { Metadata } from "next";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import BlogList from "@/components/sections/BlogList";
import { getAllPostsLocalized, formatBlogDate } from "@/lib/blog";
import { getLocale, getDictionary } from "@/lib/i18n/server";
import { withAccent } from "@/lib/i18n/render";

export async function generateMetadata(): Promise<Metadata> {
  const d = (await getDictionary()).pages.blog;
  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: await localeAlternates("/blog"),
    openGraph: {
      title: d.og.title,
      description: d.og.desc,
      type: "website",
      images: [{ url: "/office/resepsiyon.jpg" }],
    },
  };
}

export default async function BlogIndexPage() {
  const locale = await getLocale();
  const d = (await getDictionary()).pages.blog;
  const posts = getAllPostsLocalized(locale).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    cover: p.cover,
    dateFormatted: formatBlogDate(p.date, locale),
    readingMinutes: p.readingMinutes,
  }));

  const categoryLabels = {
    all: d.categories.all,
    "bolge-rehberi": d.categories.bolge,
    "alici-rehberi": d.categories.alici,
    "satici-rehberi": d.categories.satici,
    yatirim: d.categories.yatirim,
  } as const;

  return (
    <>
      {/* HERO */}
      <section className="relative isolate bg-navy-900 text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          aria-hidden
          className="hero-bg-layer addon-float absolute -top-32 -end-20 w-[26rem] h-[26rem] rounded-full bg-remax-red/20 blur-3xl -z-10"
        />
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl">
            <Eyebrow tone="white" className="text-white/80">
              {d.heroEyebrow}
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              {withAccent(d.heroTitle)}
            </h1>
            <p className="mt-7 text-lg text-white/70 max-w-xl leading-relaxed">
              {d.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* LİSTE */}
      <Section tone="light" density="normal">
        <BlogList
          posts={posts}
          categoryLabels={categoryLabels}
          readingTemplate={d.readingTemplate}
          readMore={d.readMore}
        />
      </Section>
    </>
  );
}
