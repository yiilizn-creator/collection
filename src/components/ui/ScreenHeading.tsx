"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScreenHeadingProps = {
  number: string;
  title: string;
  titleEn: string;
  className?: string;
  children?: ReactNode;
  dark?: boolean;
};

export function ScreenHeading({
  number,
  title,
  titleEn,
  className,
  children,
  dark = false,
}: ScreenHeadingProps) {
  return (
    <div className={cn("w-full", className)}>
      <span
        className={cn(
          "font-display text-6xl font-light tracking-tight sm:text-7xl",
          dark ? "text-white/10" : "text-entity-shadow/20"
        )}
      >
        {number}
      </span>
      <div className="-mt-2 sm:-mt-4">
        <h2
          className={cn(
            "font-display text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl",
            dark ? "text-[#f5f0eb]" : "text-entity-ink"
          )}
        >
          {title}
        </h2>
        <div
          className={cn(
            "mt-4 h-0.5 w-12 origin-left",
            dark ? "bg-[#c9a690]/80" : "bg-[#c9a690]"
          )}
          style={{ transform: "rotate(0.5deg)" }}
        />
        <p
          className={cn(
            "mt-3 font-body text-sm uppercase tracking-[0.35em]",
            dark ? "text-[#a89a90]" : "text-entity-muted"
          )}
        >
          {titleEn}
        </p>
      </div>
      {children}
    </div>
  );
}
