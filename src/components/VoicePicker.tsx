"use client";

import { Check, Pause, Play } from "lucide-react";
import { VOICES, type VoiceId } from "@/lib/audio/voices";
import { useAudio } from "@/components/providers/AudioProvider";

/** Choose a voice, with a preview button for each. Used in onboarding and settings. */
export function VoicePicker({ value, onChange }: { value: VoiceId; onChange: (voice: VoiceId) => void }) {
  const { preview, playing, stop } = useAudio();
  return (
    <ul className="space-y-2" role="radiogroup" aria-label="Voice">
      {VOICES.map((v) => {
        const selected = v.id === value;
        const isPlaying = playing === `preview:${v.id}`;
        return (
          <li
            key={v.id}
            className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 ${selected ? "border-accent bg-accent/8" : "border-line bg-white/4"}`}
          >
            <button
              onClick={() => (isPlaying ? stop() : void preview(v.id).catch(() => undefined))}
              aria-label={`${isPlaying ? "Stop" : "Play"} ${v.id} preview`}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isPlaying ? "bg-accent text-accent-ink" : "bg-white/10 text-ink hover:bg-white/15"}`}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            <button
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(v.id)}
              className="flex flex-1 items-center gap-3 py-1 text-left"
            >
              <span className="flex-1">
                <span className="block font-semibold">{v.id}</span>
                <span className="block text-xs text-muted capitalize">{v.gender}</span>
              </span>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${selected ? "border-accent bg-accent text-accent-ink" : "border-white/25"}`}
                aria-hidden
              >
                {selected && <Check size={14} strokeWidth={3} />}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
