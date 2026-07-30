import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllArticles } from "@/lib/content";
import { localeAlternates, ogLocale, SITE_NAME } from "@/lib/metadata";
import { routing, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("articlesTitle");
  const description = t("articlesDescription");
  const alternates = localeAlternates("/articles", locale as Locale);
  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: ogLocale(locale as Locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("ArticlesPage");
  const articles = getAllArticles(locale as Locale);

  return (
    <div className="wrap">
      <Link className="back-link" href="/#about">
        {t("backHome")}
      </Link>
      <p className="eyebrow">Articles</p>
      <h1 className="name" style={{ fontSize: "clamp(2.4rem,6.5vw,3.6rem)" }}>
        {t("title")}
      </h1>
      <div style={{ marginTop: 56 }}>
        {articles.map((article) => (
          <div className="work" key={article.slug}>
            <div className="title">{article.title}</div>
            <div className="stack mono">{article.categories.join(" · ")}</div>
            <p>{article.summary}</p>
            <Link className="back-link" style={{ margin: "14px 0 0" }} href={`/articles/${article.slug}`}>
              {t("read")} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
