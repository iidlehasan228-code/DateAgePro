"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Clock } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="border-b border-line dark:border-line-dark">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-glow">
            <Clock size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Age<span className="text-accent">Calculator</span>
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted dark:text-muted-dark md:flex">
          <a href="#calculator" className="hover:text-ink dark:hover:text-ink-dark transition-colors">
            Calculator
          </a>
          <a href="#faq" className="hover:text-ink dark:hover:text-ink-dark transition-colors">
            FAQ
          </a>
        </nav>

        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line dark:border-line-dark text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark transition-colors"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        )}
      </div>
    </header>
  );
}
