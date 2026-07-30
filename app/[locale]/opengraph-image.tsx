import { ImageResponse } from "next/og"
import { getTranslations } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing } from "@/i18n/routing"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const home = await getTranslations({ locale, namespace: "Home" })

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
          {home("eyebrow")}
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
          {t("siteTitle")}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "#4c4c4a", maxWidth: 900 }}>
          {t("siteDescription")}
        </div>
      </div>
    ),
    { ...size }
  )
}
