"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { photography } from "@/data/portfolio";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { CollapseCircleIcon } from "@/components/ui/CollapseCircleIcon";

const VISIBLE_COUNT = 3;
const STAGGER = 0.08;

export type PhotoWork = (typeof photography.works)[number];

const ROTATIONS = [-1, 0.6, 1, -0.5, 0.8];

function FilmStripPullRing({
  expanded,
  onToggle,
  dark,
}: {
  expanded: boolean;
  onToggle: () => void;
  dark?: boolean;
}) {
  return (
    <motion.button
      type="button"
      data-no-shutter
      onClick={onToggle}
      className={cn(
        "card-float mx-auto mt-8 flex w-full max-w-md items-center justify-center gap-3 rounded-full px-6 py-3.5 transition-crossfade",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-entity-accent/40",
        dark
          ? "bg-white/10 text-[#f5f0eb] shadow-glow-dark hover:bg-white/15"
          : "border border-entity-shadow/12 bg-white text-entity-ink shadow-paper-3 hover:shadow-paper-4"
      )}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full text-sm",
          dark ? "bg-white/10 text-white ring-1 ring-white/20" : "bg-surface-dark/60 text-entity-ink ring-1 ring-entity-shadow/20"
        )}
        aria-hidden
      >
        {expanded ? (
          <CollapseCircleIcon className="h-5 w-5" />
        ) : (
          "🔘"
        )}
      </span>
      <span
        className={cn(
          "font-body text-sm font-semibold tracking-wide",
          dark ? "text-[#f5f0eb]" : "text-entity-ink"
        )}
      >
        {expanded ? "收起底片夹" : "拉开底片夹"}
      </span>
    </motion.button>
  );
}

function PhotoCard({
  work,
  index,
  dark,
  rotation = 0,
  onLift,
}: {
  work: PhotoWork;
  index: number;
  dark?: boolean;
  rotation?: number;
  onLift?: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      layout
      className="group"
      initial={false}
    >
      <motion.div
        className={cn(
          "photo-item card-float relative flex min-h-[220px] cursor-pointer items-center justify-center overflow-hidden rounded-entity p-2 transition-crossfade sm:min-h-[280px] lg:min-h-[320px]",
          dark ? "bg-white/5 shadow-glow-dark" : "bg-surface-dark/40 shadow-paper-3"
        )}
        whileHover={
          reduced
            ? {}
            : { rotate: rotation + (index % 2 === 0 ? 1 : -1) * 0.5, scale: 1.02, y: -4 }
        }
        onDoubleClick={onLift}
      >
        <Image
          src={work.src}
          alt={work.alt}
          width={work.width}
          height={work.height}
          sizes="(max-width: 640px) 33vw, 360px"
          className="h-auto max-h-[min(360px,42vh)] w-full object-contain"
        />
      </motion.div>
    </motion.article>
  );
}

function PhotoLightbox({
  work,
  dark,
  onClose,
}: {
  work: PhotoWork;
  dark?: boolean;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-entity-ink/50 p-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={cn(
          "relative flex max-h-[85vh] w-full max-w-2xl items-center justify-center overflow-hidden rounded-entity p-4",
          dark ? "bg-[#1a1a1a] shadow-glow-dark" : "bg-surface shadow-paper-5"
        )}
        initial={{ scale: 0.88, y: 60, rotate: -2 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={work.src}
          alt={work.alt}
          width={work.width}
          height={work.height}
          sizes="800px"
          className="h-auto max-h-[75vh] w-auto max-w-full object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

export function PhotoDrawerGallery({ dark }: { dark?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [lifted, setLifted] = useState<PhotoWork | null>(null);
  const reduced = useReducedMotion();

  const visibleWorks = useMemo(
    () => photography.works.slice(0, VISIBLE_COUNT),
    []
  );
  const hiddenWorks = useMemo(
    () => photography.works.slice(VISIBLE_COUNT),
    []
  );

  return (
    <div className="mx-auto w-full max-w-6xl">
      <RevealOnScroll delay={0.05}>
        <h3
          className={cn(
            "mb-8 font-display text-2xl font-light tracking-tight",
            dark ? "text-[#f5f0eb]" : "text-entity-ink"
          )}
        >
          摄影作品
        </h3>
      </RevealOnScroll>

      <div className="grid grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
        {visibleWorks.map((work, index) => (
          <RevealOnScroll key={work.id} delay={index * 0.06}>
            <PhotoCard
              work={work}
              index={index}
              dark={dark}
              onLift={() => setLifted(work)}
            />
          </RevealOnScroll>
        ))}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            key="drawer-expanded"
            className="mt-6 grid grid-cols-3 gap-3 sm:gap-5 lg:gap-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: {
                transition: { staggerChildren: reduced ? 0 : STAGGER, delayChildren: 0.05 },
              },
              hidden: {
                transition: {
                  staggerChildren: reduced ? 0 : STAGGER,
                  staggerDirection: -1,
                },
              },
            }}
          >
            {hiddenWorks.map((work, index) => (
              <motion.div
                key={work.id}
                variants={
                  reduced
                    ? {
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }
                    : {
                        hidden: {
                          opacity: 0,
                          y: 20,
                          rotate: ROTATIONS[index % ROTATIONS.length],
                          scale: 0.9,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotate: ROTATIONS[index % ROTATIONS.length],
                          scale: 1,
                          transition: {
                            duration: 0.45,
                            ease: [0.2, 0.9, 0.4, 1.1],
                          },
                        },
                      }
                }
              >
                <PhotoCard
                  work={work}
                  index={index + VISIBLE_COUNT}
                  dark={dark}
                  rotation={ROTATIONS[index % ROTATIONS.length]}
                  onLift={() => setLifted(work)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <FilmStripPullRing
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
        dark={dark}
      />

      <AnimatePresence>
        {lifted && (
          <PhotoLightbox work={lifted} dark={dark} onClose={() => setLifted(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
