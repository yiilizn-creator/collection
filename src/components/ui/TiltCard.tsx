"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  circular?: boolean;
};

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  circular = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const shadowDepth = useMotionValue(3);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 18, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 18, mass: 0.6 });
  const springShadow = useSpring(shadowDepth, { stiffness: 200, damping: 20 });

  const shadowStyle = useTransform(springShadow, (d) => {
    const spread = 8 + d * 4;
    return `${spread}px ${spread + 2}px ${spread * 2}px rgba(150,142,130,${0.25 + d * 0.05}), -${spread / 2}px -${spread / 2}px ${spread}px rgba(255,255,255,0.8)`;
  });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * maxTilt * 2);
    rotateX.set(-y * maxTilt * 2);
    shadowDepth.set(4);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    shadowDepth.set(3);
  };

  const shapeClass = circular
    ? "rounded-full overflow-hidden"
    : "rounded-entity";

  if (reduced || isMobile) {
    return (
      <div className={cn("relative", shapeClass, className)}>{children}</div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative", shapeClass, className)}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 800,
        boxShadow: circular ? "none" : shadowStyle,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
