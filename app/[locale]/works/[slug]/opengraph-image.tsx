import { ImageResponse } from "next/og"
import { getTranslations } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing, type Locale } from "@/i18n/routing"
import { getWork } from "@/lib/content"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale: Locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const workT = await getTranslations({ locale, namespace: "WorkDetailPage" })
  const work = getWork(slug, locale)
  const eyebrow = work?.stack.join(" · ") || workT("eyebrow")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f5f5f3",
          color: "#121212",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#ea580c", textTransform: "uppercase" }}>
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {work?.title ?? t("siteTitle")}
        </div>
        {work?.summary && (
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#4c4c4a", maxWidth: 900 }}>
            {work.summary}
          </div>
        )}
        <div style={{ display: "flex", position: "absolute", bottom: 80, left: 80, fontSize: 26, color: "#807f7b" }}>
          {t("siteTitle")}
        </div>
      </div>
    ),
    { ...size }
  )
}
