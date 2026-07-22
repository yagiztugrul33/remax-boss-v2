/**
 * PDF şablon bileşenleri — @react-pdf/renderer.
 * Node runtime'da /api/rehber/[slug]/pdf tarafından render edilir.
 *
 * Türkçe karakter desteği için Roboto (latin-ext) fontu jsdelivr üzerinden
 * kaydedilir. İlk cold start'ta fontlar indirilir, sonrasında cache'ten
 * servis edilir. Vercel serverless egress bu URL'lere ulaşabilir.
 */

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { ReactElement } from "react";
import type { Locale } from "./i18n/config";
import { office } from "./office";
import { localizeGuide, type Guide } from "./guides";

// Türkçe glyph desteği (ğ, ş, ı, İ, ç, ö, ü) için TTF. Google Roboto — Apache-2.0.
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: "medium",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

const REMAX_RED = "#dc1c2e";
const REMAX_BLUE = "#003da5";
const NAVY = "#0a1a36";
const NAVY_70 = "#4a5468";
const LINE = "#e5e9f0";
const MIST = "#f4f6fa";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 10.5,
    color: NAVY,
    paddingTop: 56,
    paddingBottom: 64,
    paddingHorizontal: 48,
    lineHeight: 1.55,
  },

  headerBand: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: REMAX_RED,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  brandBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandBadge: {
    backgroundColor: REMAX_BLUE,
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 2,
    letterSpacing: 1,
  },
  brandName: {
    marginLeft: 6,
    fontSize: 11,
    fontWeight: "bold",
    color: NAVY,
    letterSpacing: 0.5,
  },
  categoryChip: {
    fontSize: 8.5,
    color: REMAX_RED,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },

  coverKicker: {
    fontSize: 9,
    color: REMAX_RED,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: NAVY,
    lineHeight: 1.15,
    marginBottom: 12,
  },
  coverSubtitle: {
    fontSize: 13,
    color: NAVY_70,
    lineHeight: 1.45,
    marginBottom: 22,
  },
  coverIntro: {
    fontSize: 11,
    color: NAVY_70,
    lineHeight: 1.65,
  },
  coverDivider: {
    marginTop: 28,
    marginBottom: 18,
    height: 2,
    width: 48,
    backgroundColor: REMAX_RED,
  },
  coverMeta: {
    fontSize: 9.5,
    color: NAVY_70,
    lineHeight: 1.55,
  },

  stepBlock: {
    marginBottom: 14,
  },
  stepHead: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  stepNumber: {
    width: 22,
    height: 22,
    backgroundColor: REMAX_RED,
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 3,
    borderRadius: 3,
    marginRight: 8,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: NAVY,
    flex: 1,
  },
  stepBody: {
    fontSize: 10.5,
    color: NAVY_70,
    marginLeft: 30,
  },
  stepWarning: {
    marginTop: 6,
    marginLeft: 30,
    padding: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#c98000",
    backgroundColor: "#fff8e6",
    fontSize: 9.5,
    color: "#7a5200",
    lineHeight: 1.5,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: NAVY,
    marginTop: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    paddingBottom: 4,
  },
  checklistItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  checkMark: {
    width: 12,
    fontSize: 10.5,
    color: "#159049",
    fontWeight: "bold",
  },
  checkText: {
    flex: 1,
    fontSize: 10.5,
    color: NAVY_70,
  },

  ctaBox: {
    marginTop: 20,
    padding: 12,
    borderRadius: 4,
    backgroundColor: MIST,
    borderLeftWidth: 3,
    borderLeftColor: REMAX_RED,
  },
  ctaTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: NAVY,
    marginBottom: 4,
  },
  ctaBody: {
    fontSize: 10.5,
    color: NAVY_70,
    lineHeight: 1.55,
  },

  disclaimer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 4,
    backgroundColor: MIST,
    fontSize: 9,
    color: NAVY_70,
    lineHeight: 1.55,
  },

  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: LINE,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8.5,
    color: NAVY_70,
  },
});

interface GuideDocumentProps {
  guide: Guide;
  locale: Locale;
}

const LABELS = {
  guide: { tr: "REHBER", en: "GUIDE" },
  stepsHeading: { tr: "Adımlar", en: "Steps" },
  checklistHeading: { tr: "Hızlı Kontrol Listesi", en: "Quick Checklist" },
  warning: { tr: "Dikkat", en: "Warning" },
  producedBy: {
    tr: "RE/MAX BOSS tarafından hazırlanmıştır",
    en: "Prepared by RE/MAX BOSS",
  },
  pageWord: { tr: "Sayfa", en: "Page" },
  disclaimer: {
    tr: "Bu rehber genel bilgilendirme amaçlıdır. Sayısal vaadi (spesifik faiz, ortalama gün, garanti) içermez. Süreç oran, gider ve süreleri banka, kurum ve dönem bazında değişir; kesin bilgi için ilgili kurumla görüşünüz.",
    en: "This guide is for general information only. It contains no numerical promise (specific rates, average days, guarantee). Rates, costs and durations vary by bank, institution and period; for accurate details, please contact the relevant institution.",
  },
};

function pick(t: { tr: string; en: string }, locale: Locale) {
  return t[locale];
}

export function GuideDocument({
  guide,
  locale,
}: GuideDocumentProps): ReactElement {
  const g = localizeGuide(guide, locale);

  return (
    <Document
      title={g.title}
      author="RE/MAX BOSS"
      subject={g.excerpt}
      creator="RE/MAX BOSS"
      producer="RE/MAX BOSS"
    >
      {/* Cover page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand} fixed />
        <View style={styles.headerRow}>
          <View style={styles.brandBox}>
            <Text style={styles.brandBadge}>RE/MAX</Text>
            <Text style={styles.brandName}>BOSS</Text>
          </View>
          <Text style={styles.categoryChip}>
            {pick(LABELS.guide, locale)}
          </Text>
        </View>

        <View style={{ marginTop: 80 }}>
          <Text style={styles.coverKicker}>{pick(LABELS.guide, locale)}</Text>
          <Text style={styles.coverTitle}>{g.title}</Text>
          <Text style={styles.coverSubtitle}>{g.excerpt}</Text>
          <View style={styles.coverDivider} />
          <Text style={styles.coverIntro}>{g.intro}</Text>
        </View>

        <View style={{ position: "absolute", bottom: 96, left: 48, right: 48 }}>
          <Text style={styles.coverMeta}>{office.name}</Text>
          <Text style={styles.coverMeta}>{office.addressFull}</Text>
          <Text style={styles.coverMeta}>{office.phone}</Text>
          <Text style={styles.coverMeta}>{office.email}</Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>{pick(LABELS.producedBy, locale)}</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pick(LABELS.pageWord, locale)} ${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>

      {/* Content page(s) */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand} fixed />
        <View style={styles.headerRow} fixed>
          <View style={styles.brandBox}>
            <Text style={styles.brandBadge}>RE/MAX</Text>
            <Text style={styles.brandName}>BOSS</Text>
          </View>
          <Text style={styles.categoryChip}>
            {g.title.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR")}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          {pick(LABELS.stepsHeading, locale)}
        </Text>

        {g.steps.map((s, i) => (
          <View key={i} style={styles.stepBlock} wrap={false}>
            <View style={styles.stepHead}>
              <Text style={styles.stepNumber}>{s.number}</Text>
              <Text style={styles.stepTitle}>{s.title}</Text>
            </View>
            <Text style={styles.stepBody}>{s.body}</Text>
            {s.warning && (
              <View style={styles.stepWarning}>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {pick(LABELS.warning, locale)}:{" "}
                  </Text>
                  {s.warning}
                </Text>
              </View>
            )}
          </View>
        ))}

        {g.checklist && g.checklist.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              {pick(LABELS.checklistHeading, locale)}
            </Text>
            <View>
              {g.checklist.map((item, i) => (
                <View key={i} style={styles.checklistItem}>
                  <Text style={styles.checkMark}>✓</Text>
                  <Text style={styles.checkText}>{item}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        <View style={styles.ctaBox} wrap={false}>
          <Text style={styles.ctaTitle}>{g.ctaTitle}</Text>
          <Text style={styles.ctaBody}>{g.ctaBody}</Text>
        </View>

        <Text style={styles.disclaimer}>{pick(LABELS.disclaimer, locale)}</Text>

        <View style={styles.footer} fixed>
          <Text>{pick(LABELS.producedBy, locale)}</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pick(LABELS.pageWord, locale)} ${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
