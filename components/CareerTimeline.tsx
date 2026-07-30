"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type CareerEntry = {
  year: string;
  text: string;
  note?: string;
  achievements?: string[];
  current?: boolean;
};

export default function CareerTimeline() {
  const t = useTranslations("CareerTimeline");
  const ENTRIES = t.raw("entries") as CareerEntry[];
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [inFlags, setInFlags] = useState<boolean[]>(() =>
    ENTRIES.map(() => false),
  );
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    let sectionObserver: IntersectionObserver | undefined;
    if (sectionEl) {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setSectionVisible(true);
              sectionObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 },
      );
      sectionObserver.observe(sectionEl);
    }

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = itemRefs.current.findIndex((el) => el === entry.target);
          if (idx === -1) return;
          setInFlags((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          setRevealedCount((c) => Math.max(c, idx + 1));
          itemObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );
    itemRefs.current.forEach((el) => el && itemObserver.observe(el));

    return () => {
      sectionObserver?.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  const progressPct = (revealedCount / ENTRIES.length) * 100;

  return (
    <section
      id="career"
      ref={sectionRef}
      className={`sec reveal${sectionVisible ? " in" : ""}`}
    >
      <h2>{t("heading")}</h2>
      <div className="timeline">
        <div className="tl-track" aria-hidden="true" />
        <div
          className="tl-progress"
          style={{ height: `${progressPct}%` }}
          aria-hidden="true"
        />
        {ENTRIES.map((entry, i) => (
          <div
            key={entry.year}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={`tl-item${inFlags[i] ? " in" : ""}`}
          >
            <span className={`tl-node${entry.current ? " current" : ""}`} />
            <span className="tl-year mono">{entry.year}</span>
            <p className="tl-text">
              {entry.text}
              {entry.note && <span className="tl-note">{entry.note}</span>}
            </p>
            {entry.achievements && (
              <ul className="tl-achievements">
                {entry.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
