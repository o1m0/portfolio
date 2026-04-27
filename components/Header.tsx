"use client";

import { useTheme } from "@/app/providers";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = (
    <>
      {["About", "Career", "Skills", "Works", "Contact"].map((item) => (
        <motion.a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          {item}
        </motion.a>
      ))}
      <motion.button
        onClick={toggleTheme}
        className="text-xs border border-border px-3 py-1 rounded-full hover:bg-muted transition-colors"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "light" ? "Dark" : "Light"}
      </motion.button>
    </>
  );

  return (
    <>
      <AnimatePresence>
        {!scrolled && (
          <motion.header
            key="header-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background"
          >
            <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
              <span className="font-medium text-sm">Haru Oba</span>
              <nav className="flex items-center gap-6">{navLinks}</nav>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="header-float"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center"
          >
            <header className="border border-border rounded-full px-6 py-2 bg-background shadow-md">
              <nav className="flex items-center gap-6">
                <span className="font-medium text-sm">Haru Oba</span>
                {navLinks}
              </nav>
            </header>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
