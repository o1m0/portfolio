"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isMouse, setIsMouse] = useState(false);

  useEffect(() => {
    setIsMouse(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!isMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMouse]);

  if (!isMouse) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[999] pointer-events-none rounded-full bg-gray-500 mix-blend-difference"
      animate={{
        x: position.x - (hovered ? 20 : 6),
        y: position.y - (hovered ? 20 : 6),
        width: hovered ? 40 : 12,
        height: hovered ? 40 : 12,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
}
