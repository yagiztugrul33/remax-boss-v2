import type { Metadata } from "next";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import BlogList from "@/components/sections/BlogList";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Rehber & Blog",
  description:
    "Beştepe ve Yenimahalle bölge rehberleri, ev alma ve satma süreçleri, gayrimenkul yatırımı — RE/MAX BOSS uzman ekibinden faydalı içerikler.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Rehber & Blog | RE/MAX BOSS",
    description:
      "Bölge rehberleri, alıcı ve satıcı rehberleri, gayrimenkul yatırımı içerikleri.",
    type: "website",
    images: [{ url: "/office/resepsiyon.jpg" }],
  },
};

export default function BlogIndexPage() {
  const allPosts = getAllPosts();

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
        <div className="container-page py-20 md:py-28">
          <div className="max-w-2xl">
            <Eyebrow tone="white" className="text-white/80">
              Rehber & Blog
            </Eyebrow>
            <h1 className="mt-5 font-display text-display-xl text-balance">
              Gayrimenkulde <span className="accent-mark">doğru kararın</span>{" "}
              rehberi.
            </h1>
            <p className="mt-7 text-lg text-white/70 max-w-xl leading-relaxed">
              Bölge rehberlerinden alım-satım süreçlerine, yatırımdan değerlemeye
              — gayrimenkul yolculuğunuzda işinize yarayacak, sade ve dürüst
              içerikler.
            </p>
          </div>
        </div>
      </section>

      {/* LİSTE */}
      <Section tone="light" density="normal">
        <BlogList posts={allPosts} />
      </Section>
    </>
  );
}
