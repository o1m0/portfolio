import type { MetadataRoute } from "next"
import { getPathname } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"
import { getAllArticles, getAllWorks } from "@/lib/content"
import { absoluteUrl } from "@/lib/metadata"

function entry(
  pathname: string,
  options: { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(getPathname({ locale: routing.defaultLocale, href: pathname })),
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, absoluteUrl(getPathname({ locale, href: pathname }))])
      ),
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = new Set<string>()
  routing.locales.forEach((locale) => {
    getAllArticles(locale as Locale).forEach((article) => slugs.add(`article:${article.slug}`))
    getAllWorks(locale as Locale).forEach((work) => slugs.add(`work:${work.slug}`))
  })

  const articleSlugs = [...slugs].filter((s) => s.startsWith("article:")).map((s) => s.slice(8))
  const workSlugs = [...slugs].filter((s) => s.startsWith("work:")).map((s) => s.slice(5))

  return [
    entry("/", { changeFrequency: "monthly", priority: 1 }),
    entry("/articles", { changeFrequency: "weekly", priority: 0.8 }),
    ...articleSlugs.map((slug) => entry(`/articles/${slug}`, { changeFrequency: "monthly", priority: 0.6 })),
    ...workSlugs.map((slug) => entry(`/works/${slug}`, { changeFrequency: "monthly", priority: 0.6 })),
  ]
}
