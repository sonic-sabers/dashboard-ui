"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

/**
 * Custom hook for theme management
 * Handles theme switching and persistence
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    const initialTheme = savedTheme || (prefersLight ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return { theme, toggleTheme };
}
