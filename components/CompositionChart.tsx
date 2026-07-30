"use client";

import { useEffect, useRef, useState } from "react";

export const TONE_VARS = [
  "var(--accent)",
  "var(--accent-75)",
  "var(--accent-50)",
  "var(--accent-25)",
];

type CompItem = { name: string; pct: number };

export default function CompositionChart({
  composition,
  ariaLabel,
}: {
  composition: CompItem[];
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
    <div className="comp-bar" ref={ref} role="img" aria-label={ariaLabel}>
      {composition.map((c, i) => (
        <span
          key={c.name}
          className="seg"
          style={{
            flexGrow: visible ? c.pct : 0,
            background: TONE_VARS[i % TONE_VARS.length],
            transitionDelay: `${i * 70}ms`,
          }}
          title={`${c.name} — ${c.pct}%`}
        />
      ))}
    </div>
  );
}
