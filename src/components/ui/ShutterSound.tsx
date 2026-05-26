"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { assetPath } from "@/lib/assetPath";

const SOUND_STORAGE_KEY = "portfolio-audio-enabled";
const TYPEWRITER_SRC = assetPath("/audio/typewriter.mp3");
const CLICK_VOLUME = 0.55;
const TYPEWRITER_VOLUME = 0.55;
const TYPEWRITER_POOL_SIZE = 4;

type ShutterContextValue = {
  enabled: boolean;
  setEnabled: (value: boolean) => Promise<void>;
  playClick: () => void;
  playShutter: () => void;
  playRustle: () => void;
  playTypewriter: () => void;
};

const ShutterContext = createContext<ShutterContextValue | null>(null);

export function useShutterSound() {
  const ctx = useContext(ShutterContext);
  return (
    ctx ?? {
      enabled: false,
      setEnabled: async () => {},
      playClick: () => {},
      playShutter: () => {},
      playRustle: () => {},
      playTypewriter: () => {},
    }
  );
}

function createAudioContext() {
  if (typeof window === "undefined") return null;
  return new (window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext)();
}

function playUIClick(ctx: AudioContext) {
  const t = ctx.currentTime;

  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = "sine";
  clickOsc.frequency.setValueAtTime(1200, t);
  clickOsc.frequency.exponentialRampToValueAtTime(400, t + 0.05);
  clickGain.gain.setValueAtTime(CLICK_VOLUME * 0.25, t);
  clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  clickOsc.connect(clickGain);
  clickGain.connect(ctx.destination);
  clickOsc.start(t);
  clickOsc.stop(t + 0.09);

  const bufferSize = Math.floor(ctx.sampleRate * 0.025);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "highpass";
  noiseFilter.frequency.value = 1800;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(CLICK_VOLUME * 0.18, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(t);
}

function playRustleNoise(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 0.12;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1200;
  const gain = ctx.createGain();
  gain.gain.value = 0.12;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

export function ShutterSoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const typewriterPoolRef = useRef<HTMLAudioElement[]>([]);
  const typewriterIndexRef = useRef(0);

  useEffect(() => {
    const stored = localStorage.getItem(SOUND_STORAGE_KEY);
    if (stored === "false") {
      setEnabledState(false);
    } else {
      setEnabledState(true);
      if (stored !== "true") {
        localStorage.setItem(SOUND_STORAGE_KEY, "true");
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    typewriterPoolRef.current = Array.from({ length: TYPEWRITER_POOL_SIZE }, () => {
      const audio = new Audio(TYPEWRITER_SRC);
      audio.volume = TYPEWRITER_VOLUME;
      audio.preload = "auto";
      return audio;
    });
    return () => {
      typewriterPoolRef.current.forEach((a) => {
        a.pause();
        a.src = "";
      });
      typewriterPoolRef.current = [];
    };
  }, []);

  const unlockAudio = useCallback(async () => {
    const ctx = ctxRef.current ?? createAudioContext();
    if (!ctx) return null;
    ctxRef.current = ctx;
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    return ctx;
  }, []);

  const setEnabled = useCallback(
    async (value: boolean) => {
      setEnabledState(value);
      localStorage.setItem(SOUND_STORAGE_KEY, String(value));
      if (value) {
        const ctx = await unlockAudio();
        if (ctx) playUIClick(ctx);
      }
    },
    [unlockAudio]
  );

  useEffect(() => {
    if (!hydrated || !enabled) return;

    void unlockAudio();

    const prime = typewriterPoolRef.current[0];
    if (prime) {
      void prime.play().then(() => {
        prime.pause();
        prime.currentTime = 0;
      }).catch(() => {});
    }

    const resumeOnGesture = () => {
      void unlockAudio();
    };
    document.addEventListener("pointerdown", resumeOnGesture, { once: true });
    document.addEventListener("keydown", resumeOnGesture, { once: true });
    return () => {
      document.removeEventListener("pointerdown", resumeOnGesture);
      document.removeEventListener("keydown", resumeOnGesture);
    };
  }, [enabled, hydrated, unlockAudio]);

  const playClick = useCallback(() => {
    if (!enabled) return;
    void unlockAudio().then((ctx) => {
      if (ctx) playUIClick(ctx);
    });
  }, [enabled, unlockAudio]);

  const playShutter = playClick;

  const playRustle = useCallback(() => {
    if (!enabled) return;
    void unlockAudio().then((ctx) => {
      if (ctx) playRustleNoise(ctx);
    });
  }, [enabled, unlockAudio]);

  const playTypewriter = useCallback(() => {
    if (!enabled) return;
    const pool = typewriterPoolRef.current;
    if (!pool.length) return;
    const audio = pool[typewriterIndexRef.current % pool.length];
    typewriterIndexRef.current += 1;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }, [enabled]);

  return (
    <ShutterContext.Provider
      value={{
        enabled,
        setEnabled,
        playClick,
        playShutter,
        playRustle,
        playTypewriter,
      }}
    >
      {children}
    </ShutterContext.Provider>
  );
}
