"use client";

import { useTheme } from "@/app/providers";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_ITEMS = ["About", "Career", "Skills", "Works", "Articles", "Contact"];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = `/#${id}`;
  }
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const themeToggle = (
    <motion.button
      onClick={toggleTheme}
      className="text-xs border border-border px-3 py-1 rounded-full hover:bg-muted transition-colors"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {theme === "light" ? "Dark" : "Light"}
    </motion.button>
  );

  const hamburger = (
    <button
      className="sm:hidden flex flex-col justify-center gap-[5px] w-6 h-6"
      onClick={() => setMenuOpen((v) => !v)}
      aria-label="メニュー"
    >
      <motion.span
        className="block h-px bg-foreground origin-center"
        animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-px bg-foreground"
        animate={{ opacity: menuOpen ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="block h-px bg-foreground origin-center"
        animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );

  const mobileDropdown = (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="sm:hidden overflow-hidden border-t border-border"
        >
          <div className="px-6 py-5 flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
onClick={() => {
    setMenuOpen(false);
    setTimeout(() => scrollToSection(item.toLowerCase()), 300);
}}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
            <div className="pt-3 border-t border-border">{themeToggle}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-medium text-sm">
                Haru Oba
              </Link>
              <div className="flex items-center gap-4">
                <nav className="hidden sm:flex items-center gap-6">
                  {NAV_ITEMS.map((item) => (
                    <motion.a
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                  {themeToggle}
                </nav>
                {hamburger}
              </div>
            </div>
            {mobileDropdown}
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
            className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
          >
            <header className="w-full sm:w-auto border border-border rounded-2xl sm:rounded-full px-6 py-2 bg-background shadow-md">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-medium text-sm">
                  Haru Oba
                </Link>
                <nav className="hidden sm:flex items-center gap-6">
                  {NAV_ITEMS.map((item) => (
                    <motion.a
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                  {themeToggle}
                </nav>
                {hamburger}
              </div>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="sm:hidden overflow-hidden"
                  >
                    <div className="pt-4 pb-2 mt-2 border-t border-border flex flex-col gap-5">
                      {NAV_ITEMS.map((item) => (
                        <a
                          key={item}
onClick={() => {
    setMenuOpen(false);
    setTimeout(() => scrollToSection(item.toLowerCase()), 300);
}}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          {item}
                        </a>
                      ))}
                      <div className="pt-3 border-t border-border">{themeToggle}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}