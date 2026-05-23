"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "darkroom";

const STORAGE_KEY = "portfolio-darkroom";

type ThemeContextValue = {
  mode: ThemeMode;
  isDarkroom: boolean;
  toggleDarkroom: () => void;
  setDarkroom: (enabled: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "darkroom") setMode("darkroom");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("darkroom-mode", mode === "darkroom");
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode, hydrated]);

  const setDarkroom = useCallback((enabled: boolean) => {
    setMode(enabled ? "darkroom" : "light");
  }, []);

  const toggleDarkroom = useCallback(() => {
    setMode((m) => (m === "darkroom" ? "light" : "darkroom"));
  }, []);

  const value = useMemo(
    () => ({
      mode,
      isDarkroom: mode === "darkroom",
      toggleDarkroom,
      setDarkroom,
    }),
    [mode, toggleDarkroom, setDarkroom]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
