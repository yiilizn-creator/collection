"use client";

import { motion } from "framer-motion";
import { photography, screenTitles } from "@/data/portfolio";
import { useTheme } from "@/components/ThemeProvider";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ScreenHeading } from "@/components/ui/ScreenHeading";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { PhotoDrawerGallery } from "@/components/photography/PhotoDrawerGallery";
import { DirectorTheater } from "@/components/photography/RetroCinema";
import { useScreenScrollAnimation } from "@/hooks/useScreenScrollAnimation";
import { cn } from "@/lib/utils";

function StatCard({
  value,
  label,
  dark,
}: {
  value: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "card-float min-w-[5.5rem] rounded-entity px-4 py-3 text-center transition-crossfade sm:min-w-[6.5rem] sm:px-5 sm:py-4",
        dark ? "bg-white/8 shadow-glow-dark" : "border border-entity-shadow/10 bg-white shadow-paper-2"
      )}
    >
      <p
        className={cn(
          "font-display text-xl font-bold sm:text-2xl",
          dark ? "text-[#c9a690]" : "text-entity-accent"
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-1 text-[10px] uppercase tracking-wider sm:text-xs",
          dark ? "text-[#c9b8ae]" : "text-entity-muted"
        )}
      >
        {label}
      </p>
    </div>
  );
}

export function Screen3_Photography() {
  const screenAnim = useScreenScrollAnimation();
  const { isDarkroom } = useTheme();

  return (
    <motion.section
      ref={screenAnim.ref}
      id="darkroom"
      initial={screenAnim.initial}
      animate={screenAnim.animate}
      className={cn(
        "snap-screen relative min-h-screen overflow-x-hidden px-6 py-24 transition-crossfade md:py-32",
        isDarkroom && "darkroom-screen"
      )}
    >
      {isDarkroom && <div className="safety-light" aria-hidden />}

      <div className="relative z-[1] mx-auto flex w-full max-w-6xl flex-col gap-4 pb-16">
        <RevealOnScroll className="mb-12 w-full">
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-5">
            <ScreenHeading
              number="03"
              title={screenTitles.darkroom.title}
              titleEn={screenTitles.darkroom.titleEn}
              dark={isDarkroom}
              className="min-w-[12rem] flex-1"
            >
              <p
                className={cn(
                  "mt-4 font-display text-xl",
                  isDarkroom ? "text-[#c9a690]" : "text-entity-accent"
                )}
              >
                {photography.account}
              </p>
            </ScreenHeading>

            <div className="flex flex-wrap items-end justify-end gap-3 sm:gap-4">
              <StatCard
                value={photography.stats.likes}
                label="点赞收藏"
                dark={isDarkroom}
              />
              <StatCard
                value={photography.stats.monetization}
                label="累计变现"
                dark={isDarkroom}
              />
              <SoundToggle dark={isDarkroom} className="shrink-0" />
            </div>
          </div>
        </RevealOnScroll>

        <PhotoDrawerGallery dark={isDarkroom} />

        <DirectorTheater dark={isDarkroom} />

        <RevealOnScroll
          delay={0.2}
          className={cn(
            "mt-16 rounded-entity p-6 transition-crossfade card-float sm:p-8",
            isDarkroom
              ? "bg-white/5 shadow-glow-dark"
              : "bg-surface shadow-paper-3"
          )}
        >
          <p
            className={cn(
              "text-sm uppercase tracking-widest",
              isDarkroom ? "text-[#a89a90]" : "text-secondary"
            )}
          >
            摄影工作室经历
          </p>
          <p
            className={cn(
              "mt-4 font-body leading-relaxed",
              isDarkroom ? "text-[#e8e0d8]/90" : "text-entity-ink"
            )}
          >
            {photography.studio}
          </p>
          <p
            className={cn(
              "mt-3 text-sm",
              isDarkroom ? "text-[#a89a90]" : "text-secondary"
            )}
          >
            多张照片入选 Vogue IT · 擅长文案、拍摄、后期与 PS
          </p>
        </RevealOnScroll>
      </div>
    </motion.section>
  );
}
