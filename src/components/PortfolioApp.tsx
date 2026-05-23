"use client";

import { useCallback, useEffect, useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { ProgressDots } from "@/components/layout/ProgressDots";
import { Screen1_Hero } from "@/components/screens/Screen1_Hero";
import { Screen2_Journey } from "@/components/screens/Screen2_Journey";
import { Screen3_Photography } from "@/components/screens/Screen3_Photography";
import { Screen4_Contact } from "@/components/screens/Screen4_Contact";
import { BackgroundGlow } from "@/components/BackgroundGlow";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  ShutterSoundProvider,
  useShutterSound,
} from "@/components/ui/ShutterSound";
import { screens } from "@/data/portfolio";

const screenIds = screens.map((s) => s.id);

function GlobalClickSound() {
  const { enabled, playClick } = useShutterSound();

  useEffect(() => {
    if (!enabled) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-no-shutter]")) return;
      if (target.closest("button, a, [role='button']")) {
        playClick();
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [enabled, playClick]);

  return null;
}

function PortfolioContent() {
  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveIndex = useCallback(() => {
    if (screenIds.length === 0) return;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 4) {
      setActiveIndex(screenIds.length - 1);
      return;
    }

    const anchor = window.scrollY + window.innerHeight * 0.35;
    let next = 0;
    for (let i = 0; i < screenIds.length; i++) {
      const el = document.getElementById(screenIds[i]);
      if (!el) continue;
      if (el.offsetTop <= anchor) next = i;
    }
    setActiveIndex(next);
  }, []);

  const scrollToScreen = useCallback((index: number) => {
    const id = screenIds[index];
    const el = document.getElementById(id);
    if (el) {
      setActiveIndex(index);
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    syncActiveIndex();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncActiveIndex);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [syncActiveIndex]);

  return (
    <div className="relative min-h-screen">
      <BackgroundGlow />
      <GlobalClickSound />
      <Navigation activeIndex={activeIndex} onNavigate={scrollToScreen} />
      <ProgressDots activeIndex={activeIndex} onNavigate={scrollToScreen} />
      <main className="relative z-[1]">
        <Screen1_Hero />
        <Screen2_Journey />
        <Screen3_Photography />
        <Screen4_Contact />
      </main>
    </div>
  );
}

export function PortfolioApp() {
  return (
    <ThemeProvider>
      <ShutterSoundProvider>
        <PortfolioContent />
      </ShutterSoundProvider>
    </ThemeProvider>
  );
}
