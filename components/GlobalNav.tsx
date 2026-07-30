"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ThemeToggle from "./ThemeToggle";
import CommandPalette from "./CommandPalette";
import LocaleSwitcher from "./LocaleSwitcher";

type PaletteItem = { label: string; hint: string; href: string };

const SECTION_IDS = ["about", "career", "skills", "works"] as const;

export default function GlobalNav({ works = [] }: { works?: PaletteItem[] }) {
  const t = useTranslations("Nav");
  const HOME_SECTIONS = SECTION_IDS.map((id) => ({ id, label: t(id) }));
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    function updateScrollChrome() {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      if (progressRef.current) progressRef.current.style.width = `${progress}%`;
      ticking = false;
    }
    function onScroll() {
      setMenuOpen(false);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateScrollChrome);
    }
    updateScrollChrome();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = [...SECTION_IDS, "articles", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    let ticking = false;
    function updateActiveSection() {
      const trigger = window.scrollY + window.innerHeight * 0.5;
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      let current = sections[0].id;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= trigger) current = section.id;
      }
      setActiveSection(
        atBottom ? sections[sections.length - 1].id : current,
      );
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "/" && !paletteOpen) {
        const tag = (document.activeElement as HTMLElement | null)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setMenuOpen(false);
        setPaletteOpen(true);
      } else if (e.key === "Escape" && paletteOpen) {
        setPaletteOpen(false);
      } else if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [paletteOpen, menuOpen]);

  function isActive(id: string) {
    if (id === "articles")
      return (
        pathname.startsWith("/articles") ||
        (pathname === "/" && activeSection === "articles")
      );
    if (id === "works")
      return (
        pathname.startsWith("/works") ||
        (pathname === "/" && activeSection === "works")
      );
    return pathname === "/" && activeSection === id;
  }

  function navLinks(onNavigate?: () => void) {
    return (
      <>
        {HOME_SECTIONS.map((s) => (
          <Link
            key={s.id}
            href={`/#${s.id}`}
            className={isActive(s.id) ? "active" : ""}
            onClick={onNavigate}
          >
            {s.label}
          </Link>
        ))}
        <Link
          href="/articles"
          className={isActive("articles") ? "active" : ""}
          onClick={onNavigate}
        >
          {t("articles")}
        </Link>
        <Link
          href="/#contact"
          className={isActive("contact") ? "active" : ""}
          onClick={onNavigate}
        >
          {t("contact")}
        </Link>
      </>
    );
  }

  return (
    <>
      <nav className={`gnav${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
        <Link className="brand" href="/#about">
          Haru Oba
        </Link>
        <div className="gnav-right">
          <div className="links">{navLinks()}</div>
          <button
            type="button"
            className="cmdk-trigger"
            onClick={() => {
              setMenuOpen(false);
              setPaletteOpen(true);
            }}
            aria-label={t("searchAriaLabel")}
          >
            <span>{t("searchLabel")}</span>
            <span className="kbd mono">/</span>
          </button>
          <LocaleSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={t("menuAriaLabel")}
            aria-expanded={menuOpen}
            aria-controls="gnav-mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
        <div id="gnav-mobile-menu" className="mobile-menu">
          {navLinks(() => setMenuOpen(false))}
        </div>
      </nav>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        extraItems={works}
      />
    </>
  );
}
