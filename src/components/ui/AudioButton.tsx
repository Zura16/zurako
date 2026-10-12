"use client";

import { Snail, Volume2 } from "lucide-react";
import type { Playable } from "@/lib/audio/provider";
import { useAudio } from "@/components/providers/AudioProvider";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useSettings } from "@/components/providers/SettingsProvider";

/** Playback speed of the slow-motion button. */
export const SLOW_RATE = 0.6;

/** Sentences played at least once this visit, to tell first plays from replays. */
const playedOnce = new Set<string>();

type Size = "xs" | "sm" | "md" | "lg";
const DIMS: Record<Size, string> = { xs: "h-7 w-7", sm: "h-8 w-8", md: "h-11 w-11", lg: "h-16 w-16" };
const ICON: Record<Size, number> = { xs: 13, sm: 15, md: 19, lg: 26 };
const SMALLER: Record<Size, Size> = { xs: "xs", sm: "xs", md: "sm", lg: "md" };

type Props = {
  sentence: Playable;
  /** Card, lesson or word id the play is logged against. */
  cardId: string;
  /** Fixed speed. Without it, the button plays at normal speed and gets a slow-motion partner. */
  rate?: number;
  speaker?: number;
  size?: Size;
  label?: string;
};

/**
 * Play button for a Korean sentence, followed by a slow-motion button so
 * every piece of audio can be heard at reduced speed.
 */
export function AudioButton(props: Props) {
  if (props.rate !== undefined) return <PlayButton {...props} />;
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5">
      <PlayButton {...props} />
      <PlayButton {...props} rate={SLOW_RATE} size={SMALLER[props.size ?? "md"]} label={`Play slowly: ${props.sentence.korean}`} />
    </span>
  );
}

function PlayButton({ sentence, cardId, rate, speaker, size = "md", label }: Props) {
  const { play, playing, status } = useAudio();
  const { track } = useLearner();
  const { settings } = useSettings();
  const key = `${cardId}:${sentence.korean}:${rate ?? "d"}`;
  const active = playing === key;
  const effectiveRate = rate ?? (settings.slowAudio ? 0.75 : 1);
  const slow = rate !== undefined && rate < 0.8;
  const Icon = slow ? Snail : Volume2;

  const onClick = () => {
    const replay = playedOnce.has(`${cardId}:${sentence.korean}`);
    playedOnce.add(`${cardId}:${sentence.korean}`);
    track({ type: replay ? "audio_replayed" : "audio_played", cardId, rate: effectiveRate });
    void play(key, sentence, { rate: effectiveRate, speaker }).catch(() => undefined);
  };

  return (
    <button
      onClick={onClick}
      disabled={status === "unsupported"}
      aria-label={label ?? `Play audio: ${sentence.korean}`}
      title={slow ? "Slow motion" : undefined}
      className={`${DIMS[size]} inline-flex shrink-0 items-center justify-center rounded-full transition-colors ${
        active
          ? "bg-accent text-accent-ink"
          : slow
            ? "bg-white/5 text-muted hover:bg-white/12 hover:text-ink"
            : "bg-white/8 text-ink hover:bg-white/14"
      } disabled:opacity-40`}
    >
      <Icon size={ICON[size]} className={active ? "pop" : ""} />
    </button>
  );
}
