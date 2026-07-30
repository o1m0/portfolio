"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Skill = { name: string; category: string; level: number };

const SKILLS: Skill[] = [
  { name: "Next.js / React", category: "frontend", level: 90 },
  { name: "TypeScript", category: "frontend", level: 80 },
  { name: "Tailwind CSS", category: "frontend", level: 75 },
  { name: "MongoDB", category: "database", level: 65 },
  { name: "Go", category: "backend", level: 55 },
  { name: "Node.js / Express", category: "backend", level: 50 },
  { name: "PostgreSQL", category: "database", level: 30 },
  { name: "Docker / AWS", category: "infra", level: 15 },
];

export default function SkillsChart() {
  const t = useTranslations("SkillsChart");
  const [showTable, setShowTable] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`sec reveal${visible ? " in" : ""}`}
    >
      <div className="sec-head-row">
        <h2>{t("heading")}</h2>
        <button
          type="button"
          className="view-toggle"
          aria-pressed={showTable}
          onClick={() => setShowTable((v) => !v)}
        >
          {showTable ? t("viewChart") : t("viewTable")}
        </button>
      </div>

      {!showTable && (
        <figure style={{ margin: 0 }}>
          <figcaption className="sr-only">{t("chartCaption")}</figcaption>
          <ol className="bar-list" role="list">
            {SKILLS.map((skill, i) => (
              <li
                key={skill.name}
                className="bar-row"
                tabIndex={0}
                aria-label={t("barAriaLabel", {
                  name: skill.name,
                  category: skill.category,
                  level: skill.level,
                })}
              >
                <div className="bar-row-top">
                  <span className="bar-name">{skill.name}</span>
                  <span className="bar-tag mono">{skill.category}</span>
                </div>
                <div className="bar-track-row">
                  <div className="bar-plot">
                    <div
                      className="bar-fill"
                      style={{
                        width: visible ? `${skill.level}%` : "0%",
                        transitionDelay: `${i * 60}ms`,
                      }}
                    />
                  </div>
                  <span className="bar-value mono">{skill.level}</span>
                </div>
              </li>
            ))}
          </ol>
        </figure>
      )}

      {showTable && (
        <div className="table-scroll">
        <table className="chart-table">
          <caption className="sr-only">{t("tableCaption")}</caption>
          <thead>
            <tr>
              <th scope="col">{t("colSkill")}</th>
              <th scope="col">{t("colCategory")}</th>
              <th scope="col" className="num">
                {t("colLevel")}
              </th>
            </tr>
          </thead>
          <tbody>
            {SKILLS.map((skill) => (
              <tr key={skill.name}>
                <th scope="row">{skill.name}</th>
                <td>{skill.category}</td>
                <td className="num mono">{skill.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      <div className="skillrow next">
        <span className="k">{t("nextLabel")}</span>
        <span className="v">{t("nextValue")}</span>
      </div>
    </section>
  );
}
