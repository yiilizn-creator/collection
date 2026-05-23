"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile, contactMethods, screenTitles } from "@/data/portfolio";
import { ScreenHeading } from "@/components/ui/ScreenHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { copyAllContacts } from "@/lib/copyContacts";
import { useScreenScrollAnimation } from "@/hooks/useScreenScrollAnimation";
import { HoverTooltip } from "@/components/ui/HoverTooltip";
import { cn } from "@/lib/utils";

export function Screen4_Contact() {
  const screenAnim = useScreenScrollAnimation();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [footerCopied, setFooterCopied] = useState(false);

  const copyValue = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  const handleFooterCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = await copyAllContacts();
    if (ok) {
      setFooterCopied(true);
      setTimeout(() => setFooterCopied(false), 2000);
    }
  };

  return (
    <motion.section
      ref={screenAnim.ref}
      id="echo"
      initial={screenAnim.initial}
      animate={screenAnim.animate}
      className="snap-screen relative flex min-h-screen items-center px-6 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span className="echo-ring absolute h-64 w-64 rounded-full border border-entity-accent/20" />
        <span className="echo-ring echo-ring-delay absolute h-80 w-80 rounded-full border border-entity-accent/15" />
        <span className="echo-ring absolute h-48 w-48 rounded-full border border-entity-glow/25" style={{ animationDelay: "2.4s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-lg text-center">
        <RevealOnScroll>
          <ScreenHeading
            number="04"
            title={screenTitles.echo.title}
            titleEn={screenTitles.echo.titleEn}
            className="text-center [&_h2]:mx-auto [&_div]:mx-auto [&_p]:mx-auto"
          />
          <p className="mt-10 font-display text-xl italic text-entity-accent">
            爱按下快门的每一次咔嚓
          </p>
          <p className="mt-5 font-body text-base leading-relaxed text-entity-ink/80">
            {profile.echoSlogan}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.12} className="mt-14">
          <div className="card-float rounded-entity bg-surface p-6 text-left sm:p-8">
            <p className="mb-6 text-center text-xs uppercase tracking-[0.25em] text-secondary">
              联系方式 · 点击复制
            </p>
            <ul className="space-y-3">
              {contactMethods.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => copyValue(item.id, item.copyText)}
                    className={cn(
                      "group flex w-full items-center justify-between gap-3 rounded-entity px-4 py-3.5 text-left shadow-paper-1 transition-entity",
                      "hover:-translate-y-0.5 hover:shadow-paper-2 active:shadow-paper-inset"
                    )}
                  >
                    <span className="shrink-0 text-sm font-medium text-secondary">
                      {item.label}
                    </span>
                    <span className="min-w-0 flex-1 text-right font-body text-sm font-medium text-entity-ink">
                      {item.value}
                    </span>
                    {copiedId === item.id ? (
                      <span className="shrink-0 text-xs font-medium text-entity-accent">
                        已复制 ✓
                      </span>
                    ) : (
                      <span className="shrink-0 text-xs text-entity-muted/50 group-hover:text-entity-muted">
                        复制
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.28} className="mt-14 flex flex-col items-center gap-3">
          <HoverTooltip content="复制全部联系方式" placement="top">
            <button
              type="button"
              onClick={handleFooterCopy}
              className={cn(
                "card-float flex h-12 w-12 items-center justify-center rounded-full bg-surface",
                "hover:-translate-y-1 active:shadow-paper-inset",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-entity-accent/40"
              )}
              aria-label="复制全部联系方式"
            >
              <span className="font-display text-lg font-semibold text-entity-accent">
                联
              </span>
            </button>
          </HoverTooltip>
          {footerCopied ? (
            <p className="text-xs font-medium text-entity-accent">已复制联系方式 ✓</p>
          ) : (
            <p className="text-xs text-secondary">
              © {new Date().getFullYear()} {profile.name}
            </p>
          )}
        </RevealOnScroll>
      </div>
    </motion.section>
  );
}
