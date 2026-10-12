"use client";

import { Snail, Volume2 } from "lucide-react";
import type { Sentence } from "@/content/schema";
import { useAudio } from "@/components/providers/AudioProvider";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useSettings } from "@/components/providers/SettingsProvider";

/** Sentences played at least once this visit, to tell first plays from replays. */
const playedOnce = new Set<string>();

/** Plays a sentence and logs audio_played / audio_replayed. */
export function AudioButton({
  sentence,
  cardId,
  rate,
  speaker,
  size = "md",
  label,
}: {
  sentence: Sentence;
  cardId: string;
  rate?: number;
  speaker?: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const { play, playing, status } = useAudio();
  const { track } = useLearner();
  const { settings } = useSettings();
  const key = `${cardId}:${sentence.id}:${rate ?? "d"}`;
  const active = playing === key;
  const effectiveRate = rate ?? (settings.slowAudio ? 0.75 : 1);
  const slow = rate !== undefined && rate < 0.8;
  const Icon = slow ? Snail : Volume2;
  const dims = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-8 w-8" : "h-11 w-11";

  const onClick = () => {
    const replay = playedOnce.has(`${cardId}:${sentence.id}`);
    playedOnce.add(`${cardId}:${sentence.id}`);
    track({ type: replay ? "audio_replayed" : "audio_played", cardId, rate: effectiveRate });
    void play(key, sentence, { rate: effectiveRate, speaker }).catch(() => undefined);
  };

  return (
    <button
      onClick={onClick}
      disabled={status === "unsupported"}
      aria-label={label ?? `Play audio: ${sentence.korean}`}
      className={`${dims} inline-flex shrink-0 items-center justify-center gap-1 rounded-full transition-colors ${
        active ? "bg-accent text-accent-ink" : "bg-white/8 text-ink hover:bg-white/14"
      } disabled:opacity-40`}
    >
      <Icon size={size === "lg" ? 26 : size === "sm" ? 15 : 19} className={active ? "pop" : ""} />
    </button>
  );
}
