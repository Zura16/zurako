"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  createAudioProvider,
  type AudioProvider as Provider,
  type AudioStatus,
  type Playable,
  type PlayOptions,
} from "@/lib/audio/provider";

type AudioContext = {
  status: AudioStatus;
  /** Key of the item currently playing, for button state. */
  playing: string | null;
  play: (key: string, item: Playable, opts?: PlayOptions) => Promise<void>;
  stop: () => void;
};

const Ctx = createContext<AudioContext | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<Provider | null>(null);
  const [status, setStatus] = useState<AudioStatus>("ready");
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    const provider = createAudioProvider();
    ref.current = provider;
    setStatus(provider.status());
    // Voices load asynchronously in some browsers.
    const t = setTimeout(() => setStatus(provider.status()), 800);
    return () => {
      clearTimeout(t);
      provider.stop();
    };
  }, []);

  const play = useCallback(async (key: string, item: Playable, opts?: PlayOptions) => {
    const provider = ref.current;
    if (!provider) return;
    setStatus(provider.status());
    setPlaying(key);
    try {
      await provider.play(item, opts);
    } finally {
      setPlaying((k) => (k === key ? null : k));
    }
  }, []);

  const stop = useCallback(() => {
    ref.current?.stop();
    setPlaying(null);
  }, []);

  const value = useMemo(() => ({ status, playing, play, stop }), [status, playing, play, stop]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAudio(): AudioContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}
