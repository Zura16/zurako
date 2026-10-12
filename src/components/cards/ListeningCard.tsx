"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { catalog } from "@/content";
import type { Card } from "@/content/catalog";
import { payloadOf } from "@/content/schema";
import { useAudio } from "@/components/providers/AudioProvider";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useActiveSince } from "@/components/feed/useActiveSince";
import { KoreanSentence } from "@/components/korean/KoreanSentence";
import { AudioButton } from "@/components/ui/AudioButton";
import { SpeechTag } from "@/components/ui/tags";
import { Choices, Heading, Translation } from "./shared";

/** Audio first, no text. The sentence and its breakdown appear only after answering. */
export function ListeningCard({ card, active }: { card: Card; active: boolean }) {
  const p = payloadOf("LISTENING", card.payload);
  const s = catalog.sentences.get(p.sentence)!;
  const { play, playing, status } = useAudio();
  const { track } = useLearner();
  const elapsed = useActiveSince(active);
  const [plays, setPlays] = useState(0);
  const [answered, setAnswered] = useState(false);
  const key = `${card.id}:listen`;
  const korean = p.options.every((o) => /[가-힣]/.test(o) && !/[A-Za-z]/.test(o));

  const listen = () => {
    track({ type: plays === 0 ? "audio_played" : "audio_replayed", cardId: card.id, rate: 1 });
    setPlays((n) => n + 1);
    void play(key, s).catch(() => undefined);
  };

  return (
    <div className="space-y-7">
      {!answered && (
        <div className="flex flex-col items-center gap-3 py-2">
          <button
            onClick={listen}
            aria-label={plays === 0 ? "Listen" : "Listen again"}
            className={`flex h-24 w-24 items-center justify-center rounded-full transition-colors ${
              playing === key ? "bg-accent text-accent-ink" : "bg-white/10 text-ink hover:bg-white/15"
            }`}
          >
            <Volume2 size={38} className={playing === key ? "pop" : ""} />
          </button>
          <p className="text-sm text-muted">{plays === 0 ? "Tap to listen" : "Tap to hear it again"}</p>
          {status === "no-korean-voice" && (
            <p className="text-center text-sm text-bad">
              This device has no Korean voice installed, so audio may not play. On a Mac, add one under System Settings → Accessibility →
              Spoken Content.
            </p>
          )}
        </div>
      )}

      <Heading>{p.question}</Heading>
      <Choices
        options={p.options.map((text, i) => ({ text, correct: i === p.answer }))}
        korean={korean}
        disabled={plays === 0}
        onAnswer={(ok) => {
          setAnswered(true);
          track({ type: ok ? "answer_correct" : "answer_incorrect", cardId: card.id, mode: "listening", responseMs: elapsed() });
        }}
      />

      {answered && (
        <div className="rise space-y-3 rounded-3xl border border-line p-5">
          <p className="text-xs font-semibold tracking-wider text-faint uppercase">What they said</p>
          <KoreanSentence sentence={s} cardId={card.id} size="lg" />
          <Translation text={s.translation} />
          <div className="flex items-center gap-2">
            <AudioButton sentence={s} cardId={card.id} rate={1} label="Normal speed" />
            <AudioButton sentence={s} cardId={card.id} rate={0.65} size="sm" label="Slow" />
            {s.speechLevel && (
              <span className="ml-auto">
                <SpeechTag level={s.speechLevel} />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
