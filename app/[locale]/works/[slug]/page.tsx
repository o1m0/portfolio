import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllWorks, getWork } from "@/lib/content";
import { localeAlternates, ogLocale, SITE_NAME } from "@/lib/metadata";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  const slugs = getAllWorks().map((work) => work.slug);
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const work = getWork(slug, locale as Locale);
  if (!work) return {};
  const title = `${work.title} — Haru Oba`;
  const alternates = localeAlternates(`/works/${slug}`, locale as Locale);
  return {
    title,
    description: work.summary,
    alternates,
    openGraph: {
      title,
      description: work.summary,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: ogLocale(locale as Locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: work.summary,
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("WorkDetailPage");
  const work = getWork(slug, locale as Locale);
  if (!work) notFound();

  return (
    <div className="wrap">
      <Link className="back-link" href="/#works">
        {t("backHome")}
      </Link>
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="name" style={{ fontSize: "clamp(2.2rem,6vw,3.2rem)" }}>
        {work.title}
      </h1>
      <p className="stack mono" style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 8px" }}>
        {work.stack.join(" · ")}
      </p>

      <section className="sec" style={{ marginTop: 56 }}>
        <h2>{t("problemHeading")}</h2>
        <p className="bio" style={{ maxWidth: "56ch" }}>
          {work.problem}
        </p>
      </section>

      {work.actions.length > 0 && (
        <section className="sec">
          <h2>{t("actionsHeading")}</h2>
          <ul className="wd-actions">
            {work.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="sec">
        <h2>{t("learningHeading")}</h2>
        <p className="bio" style={{ maxWidth: "56ch" }}>
          {work.learning}
        </p>
      </section>

      {(work.githubUrl || work.demoUrl) && (
        <section className="sec">
          <h2>{t("linksHeading")}</h2>
          <div className="contact">
            {work.githubUrl && (
              <a href={work.githubUrl} target="_blank" rel="noreferrer">
                GitHub<span className="go">→</span>
              </a>
            )}
            {work.demoUrl && (
              <a href={work.demoUrl} target="_blank" rel="noreferrer">
                Demo<span className="go">→</span>
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
