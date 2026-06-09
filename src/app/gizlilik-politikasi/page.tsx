import type { Metadata } from "next";
import LegalPageTemplate from "@/components/sections/LegalPageTemplate";
import { getLegalPage } from "@/lib/legal";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const page = getLegalPage("gizlilik-politikasi", locale);
  if (!page) return {};
  return {
    title: page.title,
    description: page.intro,
    alternates: { canonical: "/gizlilik-politikasi" },
  };
}

export default function GizlilikPolitikasiPage() {
  return <LegalPageTemplate slug="gizlilik-politikasi" />;
}
