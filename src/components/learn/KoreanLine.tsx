"use client";

import { catalog } from "@/content";
import type { Line } from "@/content/lessons/schema";
import { KoreanSentence } from "@/components/korean/KoreanSentence";
import { useSettings } from "@/components/providers/SettingsProvider";
import { AudioButton } from "@/components/ui/AudioButton";

/**
 * A Korean line in a lesson: audio (normal and slow), optional romanization,
 * the meaning, and, when the line is a catalog sentence, a tappable breakdown.
 */
export function KoreanLine({ line, itemId, size = "md", speaker }: { line: Line; itemId: string; size?: "md" | "lg"; speaker?: number }) {
  const { settings } = useSettings();
  const sentence = line.sid ? catalog.sentences.get(line.sid) : undefined;
  return (
    <div className="flex items-start gap-3">
      <div className="min-w-0 flex-1">
        {sentence ? (
          <KoreanSentence sentence={sentence} cardId={itemId} size={size} />
        ) : (
          <p lang="ko" className={`ko ${size === "lg" ? "text-2xl font-semibold" : "text-lg font-semibold"} leading-snug`}>
            {line.ko}
          </p>
        )}
        {settings.romanization && line.rom && <p className="text-xs tracking-wide text-faint">{line.rom}</p>}
        <p className="text-sm text-muted">{line.en}</p>
        {line.note && <p className="mt-0.5 text-xs text-faint">{line.note}</p>}
      </div>
      <AudioButton sentence={sentence ?? { korean: line.ko, spoken: line.spoken }} cardId={itemId} size="sm" speaker={speaker} />
    </div>
  );
}

export function RomanizationToggle() {
  const { settings, update } = useSettings();
  return (
    <button
      onClick={() => update({ romanization: !settings.romanization })}
      aria-pressed={settings.romanization}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        settings.romanization ? "bg-accent text-accent-ink" : "bg-white/6 text-muted hover:text-ink"
      }`}
    >
      {settings.romanization ? "Romanization on" : "Show romanization"}
    </button>
  );
}
