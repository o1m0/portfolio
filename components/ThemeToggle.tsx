"use client"

import { useTranslations } from "next-intl"

export default function ThemeToggle() {
  const t = useTranslations("ThemeToggle")
  function toggle() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const current = document.documentElement.getAttribute("data-theme") || (prefersDark ? "dark" : "light")
    const next = current === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", next)
    try {
      localStorage.setItem("theme", next)
    } catch {
      // localStorage unavailable — theme just won't persist across reloads
    }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={t("ariaLabel")}>
      <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.4M12 19.1v2.4M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.4 19.6l1.7-1.7M17.9 6.1l1.7-1.7" />
      </svg>
      <svg className="moon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a7 7 0 0 0 11.1 11.1z" />
      </svg>
    </button>
  )
}
