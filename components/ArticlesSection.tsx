import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import { getAllArticles } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

const PREVIEW_COUNT = 3;

export default async function ArticlesSection() {
  const t = await getTranslations("ArticlesSection");
  const locale = (await getLocale()) as Locale;
  const articles = getAllArticles(locale).slice(0, PREVIEW_COUNT);

  if (articles.length === 0) return null;

  return (
    <Reveal id="articles">
      <div className="sec-head-row">
        <h2>{t("heading")}</h2>
        <Link className="view-toggle" href="/articles">
          {t("viewAll")}
        </Link>
      </div>

      {articles.map((article) => (
        <div className="work" key={article.slug}>
          <div className="title">{article.title}</div>
          <div className="stack mono">{article.categories.join(" · ")}</div>
          <p>{article.summary}</p>
          <Link
            className="back-link"
            style={{ margin: "14px 0 0" }}
            href={`/articles/${article.slug}`}
          >
            {t("read")} →
          </Link>
        </div>
      ))}
    </Reveal>
  );
}
