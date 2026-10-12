"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createAudioProvider, type AudioProvider as Provider, type AudioStatus, type Playable } from "@/lib/audio/provider";
import { DEFAULT_VOICE, type VoiceId } from "@/lib/audio/voices";
import { useLearner } from "./LearnerProvider";

type AudioContext = {
  status: AudioStatus;
  /** Key of the item currently playing, for button state. */
  playing: string | null;
  play: (key: string, item: Playable, opts?: { rate?: number; speaker?: number }) => Promise<void>;
  /** Play a voice's preview clip (onboarding and settings). */
  preview: (voice: VoiceId) => Promise<void>;
  stop: () => void;
};

const Ctx = createContext<AudioContext | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const { learner } = useLearner();
  const voice = learner.profile?.voice ?? DEFAULT_VOICE;
  const ref = useRef<Provider | null>(null);
  const [status, setStatus] = useState<AudioStatus>("ready");
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    const provider = createAudioProvider();
    ref.current = provider;
    setStatus(provider.status());
    return () => provider.stop();
  }, []);

  const run = useCallback(async (key: string, fn: (p: Provider) => Promise<void>) => {
    const provider = ref.current;
    if (!provider) return;
    setPlaying(key);
    try {
      await fn(provider);
    } finally {
      setPlaying((k) => (k === key ? null : k));
    }
  }, []);

  const play = useCallback<AudioContext["play"]>((key, item, opts = {}) => run(key, (p) => p.play(item, { ...opts, voice })), [run, voice]);
  const preview = useCallback((v: VoiceId) => run(`preview:${v}`, (p) => p.playUrl(`audio/${v}/preview.mp3`)), [run]);
  const stop = useCallback(() => {
    ref.current?.stop();
    setPlaying(null);
  }, []);

  const value = useMemo(() => ({ status, playing, play, preview, stop }), [status, playing, play, preview, stop]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAudio(): AudioContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}
