"use client";

import { motion } from "framer-motion";
import {
  journeyIntro,
  journeyHighlights,
  workExperiences,
  projectCards,
  screenTitles,
} from "@/data/portfolio";
import { DraggableCard } from "@/components/ui/DraggableCard";
import { ScreenHeading } from "@/components/ui/ScreenHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { formatBoldText } from "@/lib/formatBoldText";
import { useScreenScrollAnimation } from "@/hooks/useScreenScrollAnimation";

function WorkCard({ item }: { item: (typeof workExperiences)[number] }) {
  return (
    <DraggableCard className="h-full min-h-[280px]">
      <div
        className="mb-4 h-1 w-12 rounded-full"
        style={{ backgroundColor: item.color }}
      />
      <h3 className="font-display text-xl font-semibold leading-snug text-entity-ink">
        {item.company}
      </h3>
      <p className="mt-1 text-sm font-medium tracking-wide text-entity-accent">
        {item.role}
      </p>
      <p className="text-sm tracking-widest text-secondary">{item.period}</p>
      <ul className="mt-5 space-y-3 border-l border-entity-accent/25 pl-4">
        {item.bullets.map((bullet) => (
          <li
            key={bullet}
            className="relative text-base leading-relaxed text-entity-ink/80"
          >
            <span
              className="absolute -left-4 top-2.5 h-1 w-1 rounded-full bg-entity-accent/70"
              aria-hidden
            />
            {formatBoldText(bullet)}
          </li>
        ))}
      </ul>
    </DraggableCard>
  );
}

function ProjectCard({ item }: { item: (typeof projectCards)[number] }) {
  return (
    <DraggableCard
      featured
      className="project-card h-full min-h-[300px] bg-[#faf6f0] -rotate-1 hover:rotate-0 transition-entity"
    >
      <span className="inline-block rounded-full bg-entity-accent/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-entity-accent">
        核心项目
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-entity-ink">
        {item.title}
      </h3>
      <p className="mt-1 text-sm font-medium tracking-wide text-entity-accent">
        {item.role}
      </p>
      <p className="text-sm tracking-widest text-secondary">{item.period}</p>
      <ul className="mt-5 space-y-3 border-l border-entity-accent/20 pl-4">
        {item.bullets.map((bullet) => (
          <li
            key={bullet}
            className="relative text-base leading-relaxed text-entity-ink/80"
          >
            <span
              className="absolute -left-4 top-2.5 h-1 w-1 rounded-full bg-entity-accent"
              aria-hidden
            />
            {formatBoldText(bullet)}
          </li>
        ))}
      </ul>
    </DraggableCard>
  );
}

export function Screen2_Journey() {
  const screenAnim = useScreenScrollAnimation();

  return (
    <motion.section
      ref={screenAnim.ref}
      id="journey"
      initial={screenAnim.initial}
      animate={screenAnim.animate}
      className="snap-screen flex min-h-screen flex-col justify-center px-6 py-24 md:py-32"
    >
      <RevealOnScroll className="mx-auto mb-16 w-full max-w-6xl">
        <ScreenHeading
          number="02"
          title={screenTitles.journey.title}
          titleEn={screenTitles.journey.titleEn}
        />
        <p className="mt-8 max-w-3xl font-body text-base leading-relaxed text-entity-ink/80">
          {formatBoldText(journeyIntro)}
        </p>
      </RevealOnScroll>

      <div className="mx-auto w-full max-w-6xl">
        <RevealOnScroll delay={0.08}>
          <h3 className="mb-8 flex items-center gap-3 font-display text-2xl font-semibold text-entity-ink">
            <span className="h-px flex-1 max-w-[48px] bg-entity-accent/40" />
            工作经历
          </h3>
        </RevealOnScroll>

        <div className="grid gap-8 md:grid-cols-3">
          {workExperiences.map((item, index) => (
            <RevealOnScroll key={item.id} delay={0.1 + index * 0.08}>
              <WorkCard item={item} />
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <RevealOnScroll delay={0.12} className="mx-auto mt-20 w-full max-w-6xl">
        <div className="flex flex-wrap items-center justify-center gap-6 rounded-entity bg-surface/80 px-8 py-8 shadow-paper-3 card-float sm:gap-10 sm:px-12">
          {journeyHighlights.map((item, i) => (
            <div key={item.label} className="flex items-center gap-6 sm:gap-10">
              {i > 0 && (
                <span
                  className="hidden h-10 w-px bg-entity-shadow/30 sm:block"
                  aria-hidden
                />
              )}
              <div className="text-center">
                <p className="font-display text-3xl font-light text-entity-accent sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-secondary">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <div className="mx-auto mt-20 w-full max-w-6xl rounded-[2rem] bg-surface-dark/30 p-6 sm:p-10">
        <RevealOnScroll delay={0.05}>
          <h3 className="mb-10 flex items-center gap-3 font-display text-2xl font-semibold text-entity-ink">
            <span className="rounded-full bg-entity-accent/20 px-3 py-1 text-xs font-body font-medium text-entity-accent">
              Featured
            </span>
            核心项目
          </h3>
        </RevealOnScroll>

        <div className="grid gap-10 lg:grid-cols-2">
          {projectCards.map((item, index) => (
            <RevealOnScroll key={item.id} delay={0.12 + index * 0.1}>
              <ProjectCard item={item} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
