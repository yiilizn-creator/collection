"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type HoverTooltipProps = {
  content: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
};

export function HoverTooltip({
  content,
  children,
  placement = "bottom",
  className,
}: HoverTooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const gap = 8;
    if (placement === "top") {
      setCoords({ top: rect.top - gap, left: rect.left + rect.width / 2 });
    } else if (placement === "left") {
      setCoords({ top: rect.top + rect.height / 2, left: rect.left - gap });
    } else if (placement === "right") {
      setCoords({ top: rect.top + rect.height / 2, left: rect.right + gap });
    } else {
      setCoords({ top: rect.bottom + gap, left: rect.left + rect.width / 2 });
    }
  }, [placement]);

  const show = () => {
    updatePosition();
    setVisible(true);
  };

  const hide = () => setVisible(false);

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </span>
      {mounted &&
        visible &&
        createPortal(
          <span
            role="tooltip"
            className={cn(
              "portfolio-tooltip pointer-events-none fixed z-[10000] -translate-x-1/2 whitespace-nowrap",
              "rounded-full border border-entity-shadow/15 bg-entity-ink px-3 py-1.5 text-xs font-medium text-[#f5f2ed] shadow-paper-4",
              placement === "top" && "-translate-y-full",
              placement === "left" && "-translate-x-full -translate-y-1/2",
              placement === "right" && "-translate-y-1/2",
              className
            )}
            style={{ top: coords.top, left: coords.left }}
          >
            {content}
          </span>,
          document.body
        )}
    </>
  );
}
