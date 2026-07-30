import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllArticles, getArticle } from "@/lib/content";
import { localeAlternates, ogLocale, SITE_NAME } from "@/lib/metadata";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  const slugs = getAllArticles().map((article) => article.slug);
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug, locale as Locale);
  if (!article) return {};
  const title = `${article.title} — Haru Oba`;
  const alternates = localeAlternates(`/articles/${slug}`, locale as Locale);
  return {
    title,
    description: article.summary,
    alternates,
    openGraph: {
      title,
      description: article.summary,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: ogLocale(locale as Locale),
      type: "article",
      publishedTime: article.date,
      tags: article.categories,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.summary,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("ArticleDetailPage");
  const article = getArticle(slug, locale as Locale);
  if (!article) notFound();

  return (
    <div className="wrap">
      <Link className="back-link" href="/articles">
        {t("backList")}
      </Link>
      <p className="eyebrow">{article.categories.join(" · ") || t("fallbackCategory")}</p>
      <h1 className="name" style={{ fontSize: "clamp(2.2rem,6vw,3.2rem)" }}>
        {article.title}
      </h1>
      <p className="role mono">{article.date}</p>

      <div className="prose" style={{ marginTop: 48, maxWidth: "60ch" }}>
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
}
