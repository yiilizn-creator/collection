"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
type ElasticButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
  variant?: "pill" | "default";
};

export function ElasticButton({
  children,
  className,
  variant = "default",
  onClick,
  ...props
}: ElasticButtonProps) {
  return (
    <motion.button
      className={cn(
        "font-body font-medium text-entity-ink transition-entity",
        variant === "pill"
          ? "rounded-full bg-surface px-5 py-2.5 text-sm shadow-paper-2"
          : "rounded-entity bg-surface px-6 py-3 shadow-paper-2",
        className
      )}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
