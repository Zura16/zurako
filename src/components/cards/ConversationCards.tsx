"use client";

import { useState } from "react";
import { Eye, EyeOff, Play, Square } from "lucide-react";
import { catalog } from "@/content";
import type { Card } from "@/content/catalog";
import { payloadOf } from "@/content/schema";
import { useAudio } from "@/components/providers/AudioProvider";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useSettings } from "@/components/providers/SettingsProvider";
import { KoreanSentence } from "@/components/korean/KoreanSentence";
import { AudioButton } from "@/components/ui/AudioButton";
import { Choices } from "./shared";

const sentence = (id: string) => catalog.sentences.get(id)!;

export function DialogueCard({ card }: { card: Card }) {
  const p = payloadOf("DIALOGUE", card.payload);
  const { settings } = useSettings();
  const { play, stop } = useAudio();
  const { track } = useLearner();
  const speakers = Object.keys(p.speakers);
  const [translations, setTranslations] = useState(settings.translations);
  const [practice, setPractice] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [playingAll, setPlayingAll] = useState(false);

  const playAll = async () => {
    if (playingAll) {
      stop();
      setPlayingAll(false);
      return;
    }
    setPlayingAll(true);
    track({ type: "audio_played", cardId: card.id, rate: 1 });
    try {
      for (const line of p.lines) {
        await play(`${card.id}:all`, sentence(line.sentence), { speaker: speakers.indexOf(line.speaker) });
        await new Promise((r) => setTimeout(r, 350));
      }
    } catch {
      // Playback interrupted or unavailable.
    }
    setPlayingAll(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold">{p.title}</h2>
        <p className="mt-1 text-sm text-muted">{p.setting}</p>
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <ToolButton onClick={playAll} pressed={playingAll}>
          {playingAll ? <Square size={14} /> : <Play size={14} />} {playingAll ? "Stop" : "Play all"}
        </ToolButton>
        <ToolButton onClick={() => setTranslations(!translations)} pressed={translations}>
          {translations ? <Eye size={14} /> : <EyeOff size={14} />} Translations
        </ToolButton>
        {speakers.map((sp) => (
          <ToolButton
            key={sp}
            pressed={practice === sp}
            onClick={() => {
              setPractice(practice === sp ? null : sp);
              setRevealed(new Set());
            }}
          >
            Be <span className="ko">{p.speakers[sp]}</span>
          </ToolButton>
        ))}
      </div>

      <ol className="space-y-3">
        {p.lines.map((line, i) => {
          const s = sentence(line.sentence);
          const right = speakers.indexOf(line.speaker) % 2 === 1;
          const hidden = practice === line.speaker && !revealed.has(i);
          return (
            <li key={i} className={`flex ${right ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] rounded-3xl px-4 py-3 ${right ? "rounded-br-md bg-surface-2" : "rounded-bl-md bg-white/6"}`}>
                <p className="ko mb-1 text-xs font-semibold text-faint">{p.speakers[line.speaker]}</p>
                {hidden ? (
                  <button onClick={() => setRevealed(new Set(revealed).add(i))} className="text-left">
                    <span className="block text-[15px] text-ink">{s.translation}</span>
                    <span className="mt-1 block text-xs text-accent">Say it in Korean, then tap to check</span>
                  </button>
                ) : (
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <KoreanSentence sentence={s} cardId={card.id} size="md" />
                      {translations && <p className="mt-0.5 text-sm text-muted">{s.translation}</p>}
                    </div>
                    <AudioButton sentence={s} cardId={card.id} size="sm" speaker={speakers.indexOf(line.speaker)} />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ToolButton({ onClick, pressed, children }: { onClick: () => void; pressed: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={pressed}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${pressed ? "bg-accent text-accent-ink" : "bg-white/6 text-muted hover:text-ink"}`}
    >
      {children}
    </button>
  );
}

/** One story episode. Lines appear one at a time; the episode ends on a hook. */
export function StoryCard({ card }: { card: Card }) {
  const p = payloadOf("STORY", card.payload);
  const { track } = useLearner();
  const [shown, setShown] = useState(1);
  const [checked, setChecked] = useState(false);
  const total = [...catalog.cards.values()].filter((c) => c.story?.id === card.story?.id).length;
  const allShown = shown >= p.lines.length;
  const speakers = [...new Set(p.lines.map((l) => l.speaker).filter(Boolean))];

  const advance = () => {
    const next = shown + 1;
    setShown(next);
    if (next >= p.lines.length && !p.check) track({ type: "lesson_completed", cardId: card.id });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold">{p.title}</h2>
        {card.story && total > 1 && (
          <span className="text-sm text-faint">
            Part {card.story.part} of {total}
          </span>
        )}
      </div>

      <ol className="space-y-3" aria-live="polite">
        {p.lines.slice(0, shown).map((line, i) => {
          const s = sentence(line.sentence);
          const right = line.speaker ? speakers.indexOf(line.speaker) % 2 === 1 : false;
          return (
            <li key={i} className={`rise flex ${line.speaker ? (right ? "justify-end" : "justify-start") : ""}`}>
              <div
                className={
                  line.speaker
                    ? `max-w-[88%] rounded-3xl px-4 py-3 ${right ? "rounded-br-md bg-surface-2" : "rounded-bl-md bg-white/6"}`
                    : "w-full"
                }
              >
                {line.speaker && <p className="ko mb-1 text-xs font-semibold text-faint">{line.speaker}</p>}
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <KoreanSentence sentence={s} cardId={card.id} size={line.speaker ? "md" : "lg"} />
                    <p className="mt-0.5 text-sm text-muted">{s.translation}</p>
                  </div>
                  <AudioButton sentence={s} cardId={card.id} size="sm" speaker={line.speaker ? speakers.indexOf(line.speaker) : 0} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {!allShown && (
        <button onClick={advance} className="w-full rounded-2xl border border-dashed border-white/20 py-3 text-muted hover:bg-white/5">
          Continue
        </button>
      )}

      {allShown && p.check && (
        <div className="rise space-y-3">
          <p className="font-semibold">{p.check.prompt}</p>
          <Choices
            options={p.check.options}
            onAnswer={(ok) => {
              setChecked(true);
              track({ type: ok ? "answer_correct" : "answer_incorrect", cardId: card.id, mode: "story" });
              track({ type: "lesson_completed", cardId: card.id });
            }}
          />
        </div>
      )}

      {allShown && p.cliffhanger && (!p.check || checked) && <p className="rise text-lg font-medium text-accent">{p.cliffhanger}</p>}
      {allShown && p.cliffhanger && card.story && card.story.part < total && (
        <p className="text-xs text-faint">The next part will show up in your feed.</p>
      )}
    </div>
  );
}
