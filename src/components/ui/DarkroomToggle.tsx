"use client";

import { useTheme } from "@/components/ThemeProvider";
import { HoverTooltip } from "@/components/ui/HoverTooltip";
import { useIsMobile } from "@/lib/useIsMobile";
import { cn } from "@/lib/utils";

export function DarkroomToggle({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { isDarkroom, toggleDarkroom } = useTheme();
  const isMobile = useIsMobile();

  const button = (
    <button
      type="button"
      data-no-shutter
      onClick={(e) => {
        e.stopPropagation();
        toggleDarkroom();
      }}
      className={cn(
        "relative z-[1] flex touch-manipulation items-center justify-center rounded-full text-lg transition-crossfade",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-entity-accent/50",
        isDarkroom
          ? cn(
              "border border-entity-shadow/15 bg-white/90 text-entity-ink shadow-paper-2 hover:bg-white",
              compact
                ? "h-9 w-9 min-h-[44px] min-w-[44px] shrink-0 sm:h-10 sm:w-auto sm:min-h-0 sm:min-w-0 sm:gap-2 sm:px-4"
                : "h-10 w-auto shrink-0 gap-2 px-3 sm:px-4"
            )
          : cn(
              "border border-entity-shadow/15 bg-white text-entity-ink shadow-paper-2 hover:shadow-paper-3",
              compact
                ? "h-9 w-9 min-h-[44px] min-w-[44px] shrink-0 sm:h-10 sm:w-10 sm:min-h-0 sm:min-w-0"
                : "h-10 w-10 shrink-0"
            )
      )}
      aria-label={isDarkroom ? "切换至亮色模式" : "切换至暗房模式"}
    >
      <span className="shrink-0 select-none leading-none" aria-hidden>
        {isDarkroom ? "☀️" : "🌙"}
      </span>
      {isDarkroom && (
        <span
          className={cn(
            "whitespace-nowrap text-xs font-semibold leading-none text-entity-ink",
            compact && "hidden sm:inline"
          )}
        >
          切换亮色
        </span>
      )}
    </button>
  );

  return (
    <div className={cn("relative z-[60] shrink-0", className)}>
      {isMobile || isDarkroom ? (
        button
      ) : (
        <HoverTooltip content="点点看～" placement="bottom">
          {button}
        </HoverTooltip>
      )}
    </div>
  );
}
