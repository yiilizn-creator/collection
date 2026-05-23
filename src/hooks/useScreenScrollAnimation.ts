"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const ease = [0.2, 0.9, 0.4, 1.1] as const;

export function useScreenScrollAnimation() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isInView = useInView(ref, {
    amount: 0.2,
    margin: "-8% 0px -8% 0px",
  });

  if (reduced) {
    return {
      ref,
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
    };
  }

  return {
    ref,
    initial: { opacity: 0, y: 32, filter: "blur(8px)" },
    animate: isInView
      ? {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.75, ease },
        }
      : {
          opacity: 0.08,
          y: 16,
          filter: "blur(6px)",
          transition: { duration: 0.5, ease },
        },
  };
}
