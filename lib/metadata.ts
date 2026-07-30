import { getPathname } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"

export const SITE_URL = "https://0ba.dev"
export const SITE_NAME = "Haru Oba"

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString()
}

export function ogLocale(locale: Locale): string {
  return locale === "ja" ? "ja_JP" : "en_US"
}

export function localeAlternates(pathname: string, locale: Locale) {
  return {
    canonical: getPathname({ locale, href: pathname }),
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, getPathname({ locale: l, href: pathname })])
    ),
  }
}
