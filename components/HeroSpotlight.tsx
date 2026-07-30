"use client"

import { useEffect, useRef } from "react"

export default function HeroSpotlight() {
  const frame = useRef<number | null>(null)
  const latest = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const target = document.getElementById("about")
    if (!target) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    function scheduleUpdate() {
      if (frame.current !== null) return
      frame.current = requestAnimationFrame(() => {
        frame.current = null
        if (!latest.current) return
        const rect = target!.getBoundingClientRect()
        const x = ((latest.current.x - rect.left) / rect.width) * 100
        const y = ((latest.current.y - rect.top) / rect.height) * 100
        target!.style.setProperty("--spot-x", `${x}%`)
        target!.style.setProperty("--spot-y", `${y}%`)
      })
    }

    function handleMove(e: PointerEvent) {
      latest.current = { x: e.clientX, y: e.clientY }
      scheduleUpdate()
    }

    window.addEventListener("pointermove", handleMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handleMove)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  return null
}
