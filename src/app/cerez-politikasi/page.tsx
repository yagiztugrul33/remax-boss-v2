import { localeAlternates } from "@/lib/i18n/server-meta";
import type { Metadata } from "next";
import LegalPageTemplate from "@/components/sections/LegalPageTemplate";
import { getLegalPage } from "@/lib/legal";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const page = getLegalPage("cerez-politikasi", locale);
  if (!page) return {};
  return {
    title: page.title,
    description: page.intro,
    alternates: await localeAlternates("/cerez-politikasi"),
  };
}

export default function CerezPolitikasiPage() {
  return <LegalPageTemplate slug="cerez-politikasi" />;
}
