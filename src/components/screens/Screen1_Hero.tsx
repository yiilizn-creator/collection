"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile, heroTags, screenTitles } from "@/data/portfolio";
import { TiltCard } from "@/components/ui/TiltCard";
import { ElasticButton } from "@/components/ui/ElasticButton";
import { ScreenHeading } from "@/components/ui/ScreenHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { useScreenScrollAnimation } from "@/hooks/useScreenScrollAnimation";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useShutterSound } from "@/components/ui/ShutterSound";

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const reduced = useReducedMotion();
  const { enabled, playTypewriter } = useShutterSound();

  useEffect(() => {
    if (reduced) {
      setDisplayed(text);
      return;
    }
    if (!enabled) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      playTypewriter();
      if (i >= text.length) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, [text, reduced, enabled, playTypewriter]);

  return (
    <p className="min-h-[2rem] font-display text-xl text-entity-accent sm:text-2xl">
      {displayed}
      {!reduced && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="ml-0.5 inline-block h-6 w-0.5 align-middle bg-entity-accent"
        />
      )}
    </p>
  );
}

export function Screen1_Hero() {
  const screenAnim = useScreenScrollAnimation();
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const parallaxX = useTransform(springX, [-1, 1], [-12, 12]);
  const parallaxY = useTransform(springY, [-1, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced) return;
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  return (
    <motion.section
      ref={screenAnim.ref}
      id="prologue"
      initial={screenAnim.initial}
      animate={screenAnim.animate}
      className="snap-screen relative flex min-h-screen items-center overflow-hidden px-6 py-24 md:py-32"
      onMouseMove={handleMouseMove}
    >
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ x: parallaxX, y: parallaxY }}
          aria-hidden
        >
          <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-entity-accent/5 blur-3xl" />
        </motion.div>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <RevealOnScroll className="order-2 flex justify-center lg:order-1 lg:justify-start" once>
          <TiltCard circular>
            <div
              className="relative rounded-full p-2 sm:p-2.5"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(201,166,144,0.45) 50%, rgba(160,152,140,0.25) 100%)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.9), 0 0 0 3px rgba(201,166,144,0.35), 0 0 0 5px rgba(196,123,90,0.15), 0 24px 48px rgba(150,142,130,0.28)",
              }}
            >
              <div className="relative h-56 w-56 overflow-hidden rounded-full ring-1 ring-white/90 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
                <Image
                  src="/avatar.png"
                  alt={`${profile.name} 个人头像`}
                  fill
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                  className="object-cover object-[center_20%]"
                />
              </div>
            </div>
          </TiltCard>
        </RevealOnScroll>

        <div className="order-1 space-y-8 text-center lg:order-2 lg:text-left">
          <RevealOnScroll delay={0.05}>
            <ScreenHeading
              number="01"
              title={screenTitles.prologue.title}
              titleEn={screenTitles.prologue.titleEn}
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <p className="font-display text-3xl font-semibold text-entity-ink sm:text-4xl lg:text-5xl">
              {profile.name}
            </p>
            <p className="mt-3 font-body text-lg tracking-wide text-secondary sm:text-xl">
              {profile.title}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <TypewriterText text={profile.tagline} />
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.2}
            className="flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {heroTags.map((tag) => (
              <ElasticButton key={tag} variant="pill">
                {tag}
              </ElasticButton>
            ))}
          </RevealOnScroll>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs text-entity-muted"
        animate={reduced ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: [0.2, 0.9, 0.4, 1.1] }}
      >
        向下滚动
      </motion.div>
    </motion.section>
  );
}
