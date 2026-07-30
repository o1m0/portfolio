import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import CompositionChart, { TONE_VARS } from "./CompositionChart";
import { getAllWorks } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

function computeComposition(categories: string[][]) {
  const counts = new Map<string, number>();
  categories.flat().forEach((c) => {
    counts.set(c, (counts.get(c) ?? 0) + 1);
  });
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      pct: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.pct - a.pct);
}

export default async function WorksSection() {
  const t = await getTranslations("WorksSection");
  const locale = (await getLocale()) as Locale;
  const works = getAllWorks(locale);
  const composition = computeComposition(works.map((w) => w.categories));
  const compositionLabel = composition
    .map((c) => `${c.name} ${c.pct}%`)
    .join(", ");

  return (
    <Reveal id="works">
      <h2>{t("heading")}</h2>

      {composition.length > 0 && (
        <div className="comp">
          <p className="comp-caption">
            {t("compositionCaption", { count: works.length })}
          </p>
          <CompositionChart
            composition={composition}
            ariaLabel={t("compositionAriaLabel", { label: compositionLabel })}
          />
          <ul className="comp-legend">
            {composition.map((c, i) => (
              <li key={c.name}>
                <span
                  className="swatch"
                  style={{ background: TONE_VARS[i % TONE_VARS.length] }}
                />
                {c.name}
                <span className="pct mono">{c.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {works.map((work) => (
        <div className="work" key={work.slug}>
          <div className="title">{work.title}</div>
          <div className="stack mono">{work.stack.join(" · ")}</div>
          <p>{work.summary}</p>
          <Link
            className="back-link"
            style={{ margin: "14px 0 0" }}
            href={`/works/${work.slug}`}
          >
            {t("readMore")} →
          </Link>
        </div>
      ))}
    </Reveal>
  );
}
