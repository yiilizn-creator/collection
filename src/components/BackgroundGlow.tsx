"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function BackgroundGlow() {
  const reduced = useReducedMotion();
  const { isDarkroom } = useTheme();
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 35, damping: 28, mass: 0.6 });
  const glowY = useSpring(mouseY, { stiffness: 35, damping: 28, mass: 0.6 });

  useEffect(() => {
    const coarse =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 767px)").matches;
    setIsTouch(coarse);
  }, []);

  useEffect(() => {
    if (reduced || isTouch) return;

    const center = () => {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    };
    center();

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", center);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", center);
    };
  }, [reduced, isTouch, mouseX, mouseY]);

  if (reduced || isTouch) return null;

  const primaryGradient = isDarkroom
    ? "radial-gradient(circle, rgba(255,140,0,0.28) 0%, rgba(139,0,0,0.14) 38%, transparent 68%)"
    : "radial-gradient(circle, rgba(255,249,240,0.25) 0%, rgba(201,166,144,0.15) 42%, transparent 70%)";

  const secondaryGradient = isDarkroom
    ? "radial-gradient(circle, rgba(139,0,0,0.22) 0%, transparent 55%)"
    : "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 58%)";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute h-[80vw] max-h-[900px] w-[80vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          left: glowX,
          top: glowY,
          background: primaryGradient,
        }}
      />
      <motion.div
        className="absolute h-[55vw] max-h-[600px] w-[55vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          left: glowX,
          top: glowY,
          background: secondaryGradient,
        }}
      />
    </div>
  );
}
