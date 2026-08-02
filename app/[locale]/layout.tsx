import type { Metadata } from "next"
import Script from "next/script"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import "../globals.css"
import GlobalNav from "@/components/GlobalNav"
import { geistSans, geistMono } from "@/lib/fonts"
import { NO_FLASH_THEME_SCRIPT } from "@/lib/theme-script"
import { getAllWorks } from "@/lib/content"
import { localeAlternates, ogLocale, SITE_NAME, SITE_URL } from "@/lib/metadata"
import { routing, type Locale } from "@/i18n/routing"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale: Locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const title = t("siteTitle")
  const description = t("siteDescription")
  const alternates = localeAlternates("/", locale)
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: ogLocale(locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  // Intentionally not calling notFound() here for an invalid locale: throwing from the root
  // layout leaves Next with no valid shell to reuse, forcing a bare unstyled fallback (see
  // app/not-found.tsx). Instead we always render a full, valid shell here (falling back to the
  // default locale's messages/nav for unrecognized values) and let each leaf page validate the
  // locale itself, so an invalid-locale 404 still nests inside this styled layout.
  const activeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
  setRequestLocale(activeLocale)

  const messages = await getMessages()
  const works = getAllWorks(activeLocale).map((work) => ({
    label: work.title,
    hint: "Work",
    href: `/works/${work.slug}`,
  }))

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    alternateName: ["大庭羽流", "Oba Haru", "obaharu", "haruoba"],
    url: SITE_URL,
    sameAs: [
      "https://github.com/o1m0",
      "https://x.com/0ba_dev",
      "https://zenn.dev/0ba_dev",
      "https://www.instagram.com/0ba.dev/",
    ],
  }

  return (
    <html lang={activeLocale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Script id="no-flash-theme" strategy="beforeInteractive">
          {NO_FLASH_THEME_SCRIPT}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <div className="grain" aria-hidden="true" />
          <GlobalNav works={works} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
