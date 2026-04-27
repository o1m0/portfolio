"use client";

import { useTheme } from "@/app/providers";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="max-w-3xl mx-auto px-6 h-14 flex justify-between items-center">
        <span className="font-medium text-sm">Haru Oba</span>
        <nav className="flex items-center gap-6">
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#career" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Career</a>
          <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Skills</a>
          <a href="#works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Works</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          <button
            onClick={toggleTheme}
            className="text-sm border border-border px-3 py-1 rounded-lg hover:bg-muted transition-colors"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </nav>
      </div>
    </header>
  );
}