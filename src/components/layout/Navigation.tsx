"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { screens } from "@/data/portfolio";
import { DarkroomToggle } from "@/components/ui/DarkroomToggle";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

type NavigationProps = {
  activeIndex: number;
  onNavigate: (index: number) => void;
};

export function Navigation({ activeIndex, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { isDarkroom } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-40 overflow-visible transition-entity",
        scrolled && "nav-scrolled"
      )}
    >
      <div
        className={cn(
          "nav-glass relative overflow-visible px-2 py-2 sm:px-6 sm:py-4",
          scrolled && "nav-glass-active"
        )}
      >
        <div className="relative z-[1] mx-auto flex max-w-6xl items-center gap-1 overflow-visible sm:gap-3">
          <div
            className="hidden h-11 shrink-0 items-center sm:flex sm:min-w-[5.5rem]"
            aria-hidden
          />

          <nav
            className="flex min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 sm:gap-2.5"
            aria-label="主导航"
          >
            {screens.map((screen, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.button
                  key={screen.id}
                  type="button"
                  onClick={() => onNavigate(index)}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-[11px] font-medium leading-tight sm:px-5 sm:py-2.5 sm:text-sm",
                    "transition-entity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-entity-accent/50",
                    isActive
                      ? "nav-glass-pill-active font-semibold text-entity-accent"
                      : "nav-glass-pill text-entity-ink"
                  )}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span className="sm:hidden">{screen.shortLabel}</span>
                  <span className="hidden sm:inline">{screen.label}</span>
                </motion.button>
              );
            })}
          </nav>

          <div className="relative z-[60] flex shrink-0 items-center gap-1.5 overflow-visible sm:gap-2.5">
            <DarkroomToggle compact />
            <SoundToggle dark={isDarkroom} compact />
          </div>
        </div>
      </div>

      {scrolled && (
        <motion.div
          className="nav-bottom-mask pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.2, 0.9, 0.4, 1.1] }}
          aria-hidden
        />
      )}
    </header>
  );
}
