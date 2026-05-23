"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { photography } from "@/data/portfolio";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { PlayCircleIcon } from "@/components/ui/PlayCircleIcon";
import { cn } from "@/lib/utils";

type VideoItem = (typeof photography.videos)[number];

function FilmFlipCard({
  video,
  dark,
  featured = false,
}: {
  video: VideoItem;
  dark?: boolean;
  featured?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const ensureVideoAudible = useCallback((el: HTMLVideoElement) => {
    el.muted = false;
    el.defaultMuted = false;
    el.volume = 1;
  }, []);

  const updateProgress = useCallback(() => {
    const el = videoRef.current;
    const fill = progressFillRef.current;
    if (!el?.duration || !fill) return;
    fill.style.width = `${(el.currentTime / el.duration) * 100}%`;
  }, []);

  const handleFlipToPlayer = () => {
    if (flipped) return;
    setFlipped(true);
  };

  const handleFlipBack = useCallback(() => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    if (progressFillRef.current) {
      progressFillRef.current.style.width = "0%";
    }
    setPlaying(false);
    setFlipped(false);
  }, []);

  return (
    <div className={cn("film-card-shell w-full flex-1", featured ? "max-w-3xl" : "max-w-sm")}>
      <div className="flip-scene mx-auto w-full">
        <div
          className={cn(
            "flip-card relative w-full",
            featured ? "aspect-video" : "aspect-[16/10]",
            flipped && "is-flipped"
          )}
          style={
            reduced
              ? undefined
              : { transition: "transform 0.65s cubic-bezier(0.2, 0.9, 0.4, 1.05)" }
          }
        >
          {/* 正面 · 海报 */}
          <div
            className={cn(
              "group flip-face absolute inset-0 overflow-hidden rounded-lg",
              !flipped && "cursor-pointer"
            )}
            onClick={!flipped ? handleFlipToPlayer : undefined}
            onKeyDown={(e) => !flipped && e.key === "Enter" && handleFlipToPlayer()}
            role={flipped ? undefined : "button"}
            tabIndex={flipped ? -1 : 0}
            aria-label={flipped ? undefined : `播放 ${video.title}`}
            aria-hidden={flipped}
          >
            <div className="film-card-inner relative h-full w-full rounded-lg p-3">
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <Image
                  src={video.poster}
                  alt={video.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="flex h-16 w-16 items-center justify-center text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105">
                    <PlayCircleIcon className="h-full w-full" />
                  </span>
                </div>
              </div>
              <p className="mt-3 text-center font-display text-sm text-[#e8e0d8]/90">
                {video.title}
              </p>
            </div>
          </div>

          {/* 背面 · 播放器（翻转后再挂载 video，避免预加载大文件 + 3D 面同时解码） */}
          <div
            className="flip-face flip-face-back absolute inset-0 overflow-hidden rounded-lg"
            aria-hidden={!flipped}
          >
            <div
              className={cn(
                "film-card-inner relative flex h-full w-full flex-col rounded-lg p-3 transition-shadow duration-300",
                playing && "video-glow-playing"
              )}
            >
              {flipped ? (
                <video
                  ref={videoRef}
                  className="h-full min-h-0 flex-1 rounded-md object-contain bg-black/80"
                  src={video.src}
                  poster={video.poster}
                  controls
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(e) => ensureVideoAudible(e.currentTarget)}
                  onPlay={(e) => {
                    ensureVideoAudible(e.currentTarget);
                    setPlaying(true);
                  }}
                  onPause={() => setPlaying(false)}
                  onEnded={() => {
                    setPlaying(false);
                    if (progressFillRef.current) {
                      progressFillRef.current.style.width = "0%";
                    }
                  }}
                  onTimeUpdate={updateProgress}
                />
              ) : null}
              <div className="film-progress-track mt-3 overflow-hidden" aria-hidden>
                <div
                  ref={progressFillRef}
                  className="film-progress-fill"
                  style={{ width: "0%" }}
                />
              </div>
              <button
                type="button"
                data-no-shutter
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlipBack();
                }}
                className={cn(
                  "mt-3 flex items-center justify-center gap-2 rounded-full py-2 text-xs font-medium transition-entity",
                  dark
                    ? "bg-white/10 text-[#e8e0d8] hover:bg-white/15"
                    : "bg-entity-ink/10 text-entity-ink hover:bg-entity-ink/15"
                )}
                aria-label="返回海报"
              >
                <span aria-hidden>↺</span>
                返回海报
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DirectorTheater({ dark }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto mt-16 w-full max-w-6xl border-t pt-16",
        dark ? "border-white/10" : "border-entity-shadow/15"
      )}
    >
      <RevealOnScroll delay={0.1}>
        <div className="mb-10">
          <h3
            className={cn(
              "font-display text-2xl font-light tracking-tight sm:text-3xl",
              dark ? "text-[#f5f0eb]" : "text-entity-ink"
            )}
          >
            导演剧场
          </h3>
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
              dark ? "text-[#a89a90]" : "text-secondary"
            )}
          >
            Director&apos;s Theater · 视频作品
          </p>
        </div>
      </RevealOnScroll>

      <div className="flex flex-col items-center gap-8">
        {photography.videos.map((video, index) => (
          <RevealOnScroll
            key={video.id}
            delay={0.12 + index * 0.08}
            className={cn(
              "flex w-full justify-center",
              "featured" in video && video.featured && "max-w-3xl"
            )}
          >
            <FilmFlipCard video={video} dark={dark} featured={"featured" in video && !!video.featured} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
