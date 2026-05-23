"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useShutterSound } from "./ShutterSound";
import { useIsMobile } from "@/lib/useIsMobile";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Point = { x: number; y: number };

type DraggableCardProps = {
  children: ReactNode;
  className?: string;
  featured?: boolean;
};

const ORIGIN: Point = { x: 0, y: 0 };
const SPRING = { type: "spring" as const, stiffness: 300, damping: 22, mass: 0.8 };
const MAGNET_RADIUS = 100;

function applyMagneticPullToOrigin(current: Point, radius: number): Point {
  const dist = Math.hypot(current.x, current.y);
  if (dist > radius || dist < 2) return current;
  const strength = 1 - dist / radius;
  const pull = 0.5 * strength;
  return {
    x: current.x * (1 - pull),
    y: current.y * (1 - pull),
  };
}

export function DraggableCard({
  children,
  className,
  featured = false,
}: DraggableCardProps) {
  const { playRustle } = useShutterSound();
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDrag = (_: unknown, info: { offset: { x: number; y: number } }) => {
    const pulled = applyMagneticPullToOrigin(
      { x: info.offset.x, y: info.offset.y },
      MAGNET_RADIUS
    );
    x.set(pulled.x);
    y.set(pulled.y);
  };

  const handleDragEnd = () => {
    animate(x, ORIGIN.x, SPRING);
    animate(y, ORIGIN.y, SPRING);
    playRustle();
  };

  if (reduced || isMobile) {
    return (
      <div
        className={cn(
          "draggable-card card-float relative rounded-entity bg-surface p-5",
          featured && "project-card ring-2 ring-entity-accent/25",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="relative pt-2">
      <span
        aria-hidden
        className="absolute inset-x-3 top-3 h-full rounded-entity bg-surface-dark/60 shadow-paper-1"
        style={{ transform: "translateY(6px) scale(0.98)" }}
      />
      <span
        aria-hidden
        className="absolute inset-x-2 top-2 h-full rounded-entity bg-surface-dark/40 shadow-paper-1"
        style={{ transform: "translateY(3px) scale(0.99)" }}
      />

      <motion.div
        drag
        dragElastic={0.18}
        dragMomentum={false}
        dragTransition={{
          bounceStiffness: 300,
          bounceDamping: 20,
          power: 0.2,
        }}
        style={{ x, y }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileDrag={{
          scale: 1.03,
          rotate: featured ? 3 : 2,
          y: -8,
          boxShadow: "var(--shadow-paper-5)",
          zIndex: 30,
        }}
        className={cn(
          "draggable-card card-float relative cursor-grab touch-manipulation rounded-entity bg-surface p-5 active:cursor-grabbing",
          featured
            ? "project-card ring-2 ring-entity-accent/30"
            : "",
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
