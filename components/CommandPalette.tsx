"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"

type PaletteItem = {
  label: string
  hint: string
  href: string
}

export default function CommandPalette({
  open,
  onClose,
  extraItems = [],
}: {
  open: boolean
  onClose: () => void
  extraItems?: PaletteItem[]
}) {
  const t = useTranslations("CommandPalette")
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(0)
  const [wasOpen, setWasOpen] = useState(open)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastFocus = useRef<Element | null>(null)

  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) {
      setQuery("")
      setSelected(0)
    }
  }

  const baseItems: PaletteItem[] = useMemo(
    () => [
      { label: "About", hint: t("hintSection"), href: "/#about" },
      { label: "Career", hint: t("hintSection"), href: "/#career" },
      { label: "Skills", hint: t("hintSection"), href: "/#skills" },
      { label: "Works", hint: t("hintSection"), href: "/#works" },
      { label: "Contact", hint: t("hintSection"), href: "/#contact" },
      { label: "Articles", hint: t("hintPage"), href: "/articles" },
    ],
    [t]
  )
  const items = useMemo(() => [...baseItems, ...extraItems], [baseItems, extraItems])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) => item.label.toLowerCase().includes(q))
  }, [items, query])

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement
      requestAnimationFrame(() => inputRef.current?.focus())
    } else if (lastFocus.current instanceof HTMLElement) {
      lastFocus.current.focus()
    }
  }, [open])

  function navigate(item: PaletteItem) {
    router.push(item.href)
    onClose()
  }

  if (!open) return null

  return (
    <div
      className="cmdk-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="cmdk" role="dialog" aria-modal="true" aria-label={t("dialogAriaLabel")}>
        <input
          ref={inputRef}
          type="text"
          className="cmdk-input"
          placeholder={t("placeholder")}
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelected(0)
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setSelected((s) => Math.min(s + 1, filtered.length - 1))
            } else if (e.key === "ArrowUp") {
              e.preventDefault()
              setSelected((s) => Math.max(s - 1, 0))
            } else if (e.key === "Enter") {
              e.preventDefault()
              if (filtered[selected]) navigate(filtered[selected])
            } else if (e.key === "Escape") {
              onClose()
            }
          }}
        />
        <ul className="cmdk-list" role="listbox">
          {filtered.length === 0 && <li className="cmdk-empty">{t("empty")}</li>}
          {filtered.map((item, i) => (
            <li
              key={item.href}
              className="cmdk-item"
              role="option"
              aria-selected={i === selected}
              onMouseEnter={() => setSelected(i)}
              onClick={() => navigate(item)}
            >
              <span>{item.label}</span>
              <span className="hint">{item.hint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
