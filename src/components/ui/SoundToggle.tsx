"use client";

import { useShutterSound } from "@/components/ui/ShutterSound";
import { HoverTooltip } from "@/components/ui/HoverTooltip";
import { useIsMobile } from "@/lib/useIsMobile";
import { cn } from "@/lib/utils";

export function SoundToggle({
  className,
  dark,
  compact,
}: {
  className?: string;
  dark?: boolean;
  compact?: boolean;
}) {
  const { enabled, setEnabled } = useShutterSound();
  const isMobile = useIsMobile();

  const tooltip = enabled ? "打字机与点击音效已开启" : "开启打字机与点击音效";

  const button = (
    <button
      type="button"
      data-no-shutter
      onClick={(e) => {
        e.stopPropagation();
        void setEnabled(!enabled);
      }}
      className={cn(
        "relative z-[1] flex touch-manipulation items-center justify-center rounded-full text-base transition-entity",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-entity-accent/50",
        compact
          ? "h-9 w-9 min-h-[44px] min-w-[44px] shrink-0 gap-0 px-2 sm:h-10 sm:w-auto sm:min-h-0 sm:min-w-0 sm:gap-1.5 sm:px-3"
          : "h-10 w-auto shrink-0 gap-1.5 px-3",
        dark
          ? "border border-entity-shadow/15 bg-white/90 text-entity-ink shadow-paper-2 hover:bg-white"
          : "border border-entity-shadow/15 bg-white text-entity-ink shadow-paper-2 hover:shadow-paper-3",
        enabled && (dark ? "ring-1 ring-[#c9a690]/70" : "ring-2 ring-entity-accent/40"),
        className
      )}
      aria-label={enabled ? "关闭打字机与点击音效" : "开启打字机与点击音效"}
    >
      <span className="shrink-0 select-none leading-none" aria-hidden>
        {enabled ? "🔊" : "🔇"}
      </span>
      {enabled && (
        <span
          className={cn(
            "whitespace-nowrap text-xs font-semibold leading-none text-entity-ink",
            compact && "hidden sm:inline"
          )}
        >
          音效
        </span>
      )}
    </button>
  );

  if (isMobile) {
    return <div className="shrink-0">{button}</div>;
  }

  return (
    <div className="shrink-0">
      <HoverTooltip content={tooltip} placement="bottom">
        {button}
      </HoverTooltip>
    </div>
  );
}
