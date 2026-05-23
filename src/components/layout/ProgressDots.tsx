"use client";

import { motion } from "framer-motion";
import { screens } from "@/data/portfolio";
import { HoverTooltip } from "@/components/ui/HoverTooltip";
import { cn } from "@/lib/utils";

type ProgressDotsProps = {
  activeIndex: number;
  onNavigate: (index: number) => void;
};

function DotIndicator({ isActive }: { isActive: boolean }) {
  return (
    <motion.span
      className={cn(
        "block h-3 w-3 shrink-0 rounded-full bg-surface shadow-paper-2",
        isActive && "shadow-paper-inset"
      )}
      animate={{
        scale: isActive ? 1.25 : 1,
        backgroundColor: isActive ? "#c47b5a" : "#e8e4df",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    />
  );
}

export function ProgressDots({ activeIndex, onNavigate }: ProgressDotsProps) {
  return (
    <nav
      className="fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-5 md:right-6 md:z-[10000]"
      aria-label="屏间导航"
    >
      {screens.map((screen, index) => {
        const isActive = index === activeIndex;
        const dot = <DotIndicator isActive={isActive} />;

        return (
          <button
            key={screen.id}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (index === activeIndex) return;
              onNavigate(index);
            }}
            className="relative flex min-h-[44px] min-w-[44px] items-center justify-center focus-visible:outline-none md:min-h-0 md:min-w-0"
            aria-label={`跳转到${screen.label}屏`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* 桌面端：当前屏显示文字；手机端完全隐藏，避免与正文重叠 */}
            {isActive && (
              <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-xs font-medium tracking-widest text-entity-accent md:block">
                {screen.label}
              </span>
            )}

            {/* 手机端：仅圆点 */}
            <span className="md:hidden">{dot}</span>

            {/* 桌面端：悬停提示 + 圆点 */}
            <span className="hidden md:contents">
              {isActive ? dot : <HoverTooltip content={screen.label} placement="left">{dot}</HoverTooltip>}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
