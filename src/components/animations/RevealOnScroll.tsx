"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  offset?: number;
  /** false 时滚动离开会淡出 */
  once?: boolean;
};

const ease = [0.2, 0.9, 0.4, 1.1] as const;

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  offset = 20,
  once = false,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isInView = useInView(ref, {
    once,
    amount: 0.15,
    margin: "-40px 0px -40px 0px",
  });

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: offset, filter: "blur(6px)" }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, delay, ease },
            }
          : {
              opacity: 0.12,
              y: offset * 0.4,
              filter: "blur(4px)",
              transition: { duration: 0.45, ease },
            }
      }
    >
      {children}
    </motion.div>
  );
}
