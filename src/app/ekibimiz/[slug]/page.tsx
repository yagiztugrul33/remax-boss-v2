import { localeAlternates } from "@/lib/i18n/server-meta";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/locale-link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Phone,
  Mail,
  Languages,
  Award,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import {
  LinkedinIcon,
  InstagramIcon,
} from "@/components/brand/SocialIcons";
import Section from "@/components/ui/section";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Eyebrow from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office } from "@/lib/office";
import { services } from "@/lib/services";
import {
  getAgentBySlug,
  getAllAgentSlugs,
} from "@/lib/team-detail";
import { getDictionary, getLocale } from "@/lib/i18n/server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Statik path üretimi — bilinen tüm danışman slug'ları build-time'da
 * hazırlanır; bilinmeyen slug → notFound().
 */
export function generateStaticParams() {
  return getAllAgentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const found = getAgentBySlug(slug);
  if (!found) {
    const d = (await getDictionary()).pages.agentDetail;
    return { title: d.notFoundTitle, description: d.notFoundDesc };
  }
  const { agent } = found;
  return {
    title: agent.name,
    description: `${agent.name} — ${agent.title} · RE/MAX BOSS`,
    alternates: await localeAlternates(`/ekibimiz/${slug}`),
  };
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    // TR locale şart: "i"→"İ" (yalın toUpperCase "i"→"I" üretir, isim bozulur)
    .toLocaleUpperCase("tr-TR");
}

export default async function AgentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const found = getAgentBySlug(slug);
  if (!found) notFound();
  const { agent, detail } = found;
  const dict = await getDictionary();
  const d = dict.pages.agentDetail;
  const locale = await getLocale();

  const phone = detail.directPhone || office.phone;
  const email = detail.directEmail || office.email;
  // WhatsApp: danışmana özel numara girilmemişse GERÇEK ofis hattı kullanılır
  // (uydurma kişisel numara YOK — fallback ofisin doğrulanmış WhatsApp'ı).
  const waHref =
    detail.whatsapp ||
    `https://wa.me/${office.whatsapp.replace(/\D/g, "")}`;
  const hasBio = Boolean(detail.bio && detail.bio.trim().length > 0);
  const hasLanguages = (detail.languages?.length ?? 0) > 0;
  const hasSpecialties = (detail.specialties?.length ?? 0) > 0;
  const hasCertifications = (detail.certifications?.length ?? 0) > 0;
  const hasYears = typeof detail.yearsExperience === "number";

  return (
    <>
      <Breadcrumbs
        locale={locale}
        homeLabel={dict.nav.home}
        items={[
          { href: "/ekibimiz", label: dict.nav.team },
          { label: agent.name },
        ]}
      />

      {/* ── HERO — split: portre + isim/unvan ── */}
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
          className="absolute -top-32 -end-20 w-[26rem] h-[26rem] rounded-full bg-remax-red/15 blur-3xl -z-10"
        />
        <div className="container-page py-16 md:py-20">
          <Link
            href="/ekibimiz"
            className="inline-block text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            {d.backLabel}
          </Link>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-10 items-start">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 max-w-[280px] mx-auto md:mx-0 w-full bg-navy-700">
              {agent.photo ? (
                <Image
                  src={agent.photo}
                  alt={`${agent.name} — ${agent.title}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 280px"
                  className="object-cover object-top"
                  priority
                />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-5xl tracking-tight bg-gradient-to-br from-navy-700 to-navy-900 text-white/90"
                >
                  {initialsOf(agent.name)}
                </div>
              )}
            </div>

            <div>
              <Eyebrow tone="white" className="text-white/70">
                {agent.title}
              </Eyebrow>
              <h1 className="mt-5 font-display text-display-lg text-balance">
                {agent.name}
              </h1>

              <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
                {hasBio ? detail.bio : d.bioPlaceholder}
              </p>

              {hasYears && (
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80">
                  <Briefcase className="h-3.5 w-3.5" aria-hidden />
                  {d.yearsLabel.replace(
                    "{n}",
                    String(detail.yearsExperience),
                  )}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${phone}`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)]",
                  )}
                  dir="ltr"
                >
                  <Phone className="h-4 w-4 me-2" aria-hidden />
                  {phone}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 text-emerald-300 hover:text-emerald-200 h-12 px-5 text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {d.whatsappLabel}
                </a>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white transition-colors"
                >
                  {d.contactCta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAY BÖLÜMLERİ ── */}
      <Section tone="light" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">
          <div className="space-y-8">
            {hasLanguages && (
              <div>
                <h2 className="flex items-center gap-2 font-display font-extrabold text-navy text-lg mb-3">
                  <Languages
                    className="h-4 w-4 text-remax-red"
                    aria-hidden
                  />
                  {d.languagesLabel}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {detail.languages?.map((l) => (
                    <span
                      key={l}
                      className="rounded-full border border-line bg-mist/40 px-3 py-1.5 text-xs font-semibold text-navy"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hasSpecialties && (
              <div>
                <h2 className="flex items-center gap-2 font-display font-extrabold text-navy text-lg mb-3">
                  <Briefcase
                    className="h-4 w-4 text-remax-red"
                    aria-hidden
                  />
                  {d.specialtiesLabel}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {detail.specialties?.map((s) => (
                    <li
                      key={s}
                      className="rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasCertifications && (
              <div>
                <h2 className="flex items-center gap-2 font-display font-extrabold text-navy text-lg mb-3">
                  <Award className="h-4 w-4 text-remax-red" aria-hidden />
                  {d.certificationsLabel}
                </h2>
                <ul className="space-y-2">
                  {detail.certifications?.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-3.5 text-sm text-navy/80"
                    >
                      <Award
                        className="h-4 w-4 mt-0.5 flex-shrink-0 text-remax-red"
                        aria-hidden
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bilgi henüz girilmemişse yukarıdaki başlıklar çıkmaz; aşağıdaki
                GERÇEK hizmet bloğu sayfayı "eksik" değil "sade" gösterir. */}
            <div>
              <h2 className="font-display font-extrabold text-navy text-lg mb-1.5">
                {d.servicesHeading}
              </h2>
              <p className="text-sm text-navy/60 leading-relaxed mb-4">
                {d.servicesSubtitle}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/hizmetler/${s.slug}`}
                    className="card-depth group rounded-2xl border border-line bg-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-remax-red"
                  >
                    <h3 className="font-display font-bold text-sm text-navy group-hover:text-remax-red transition-colors">
                      {locale === "en" ? s.title.en : s.title.tr}
                    </h3>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-remax-red">
                      {d.contactCta}
                      <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Yan iletişim kartı */}
          <aside className="rounded-3xl border border-line bg-white p-6 shadow-card lg:sticky lg:top-24 lg:self-start">
            <Eyebrow tone="red">{d.directContactLabel}</Eyebrow>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone
                  className="h-4 w-4 mt-1 flex-shrink-0 text-remax-red"
                  aria-hidden
                />
                <a
                  href={`tel:${phone}`}
                  className="text-navy hover:text-remax-red transition-colors"
                  dir="ltr"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="h-4 w-4 mt-1 flex-shrink-0 text-remax-red"
                  aria-hidden
                />
                <a
                  href={`mailto:${email}`}
                  className="text-navy hover:text-remax-red transition-colors break-all"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle
                  className="h-4 w-4 mt-1 flex-shrink-0 text-remax-red"
                  aria-hidden
                />
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy hover:text-remax-red transition-colors"
                >
                  {d.whatsappLabel}
                </a>
              </li>
              {detail.linkedin && (
                <li className="flex items-start gap-3">
                  <LinkedinIcon
                    className="h-4 w-4 mt-1 flex-shrink-0 text-remax-red"
                  />
                  <a
                    href={detail.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy hover:text-remax-red transition-colors"
                  >
                    {d.linkedinLabel}
                  </a>
                </li>
              )}
              {detail.instagram && (
                <li className="flex items-start gap-3">
                  <InstagramIcon
                    className="h-4 w-4 mt-1 flex-shrink-0 text-remax-red"
                  />
                  <a
                    href={detail.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy hover:text-remax-red transition-colors"
                  >
                    {d.instagramLabel}
                  </a>
                </li>
              )}
            </ul>

            <Link
              href="/iletisim"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-5 w-full h-11 text-sm font-semibold",
              )}
            >
              {d.contactCta}
            </Link>
          </aside>
        </div>
      </Section>
    </>
  );
}
