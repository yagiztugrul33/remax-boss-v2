import { Bell } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import SubscribeForm from "@/components/sections/SubscribeForm";
import { getDictionary } from "@/lib/i18n/server";

/**
 * Yeni ilan bildirim toplama bölümü — site geneline yerleştirilen
 * wrapper. Görsel kararlılık: statik (hareket yok). Bilingual via dict.
 */
export default async function SubscribeSection({
  tone = "light",
}: {
  tone?: "light" | "mist" | "dark";
}) {
  const d = (await getDictionary()).pages.subscribe;

  return (
    <Section tone={tone} density="normal">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start">
        <div>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red">
            <Bell className="h-5 w-5" aria-hidden />
          </div>
          <Eyebrow tone="red" className="mt-4">
            {d.eyebrow}
          </Eyebrow>
          <h2 className="mt-5 font-display text-display-lg text-navy text-balance">
            {d.title}
          </h2>
          <p className="mt-4 text-navy/65 leading-relaxed max-w-md">
            {d.subtitle}
          </p>
        </div>

        <div>
          <SubscribeForm dict={d} variant="full" />
        </div>
      </div>
    </Section>
  );
}
