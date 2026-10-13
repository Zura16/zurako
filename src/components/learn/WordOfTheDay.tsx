"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { wordId, wordOfTheDay, type Word } from "@/content/wordbank";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useSettings } from "@/components/providers/SettingsProvider";
import { AudioButton } from "@/components/ui/AudioButton";

export function WordOfTheDay() {
  // Picked on the client so it follows the learner's local date.
  const [word, setWord] = useState<Word | null>(null);
  useEffect(() => {
    setWord(wordOfTheDay(new Date()));
  }, []);
  if (!word) return <div className="h-40 rounded-3xl bg-white/4" aria-hidden />;
  return <WordCard word={word} label="Word of the day" />;
}

export function WordCard({ word, label }: { word: Word; label: string }) {
  const { learner, track } = useLearner();
  const { settings } = useSettings();
  const id = wordId(word);
  const learned = learner.cards[id]?.known ?? false;
  return (
    <section className="rounded-3xl border border-accent/30 bg-accent/5 p-5" aria-label={label}>
      <p className="text-xs font-semibold tracking-wider text-accent uppercase">{label}</p>
      <div className="mt-3 flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p lang="ko" className="ko text-4xl font-bold tracking-tight">
            {word.ko}
          </p>
          {settings.romanization && <p className="mt-1 text-sm text-faint">{word.rom}</p>}
          <p className="mt-1.5 text-lg text-muted">{word.en}</p>
          <p className="mt-1 text-xs text-faint">{word.category}</p>
        </div>
        <AudioButton sentence={{ korean: word.ko }} cardId={id} />
      </div>
      <button
        onClick={() => track({ type: learned ? "word_unlearned" : "word_learned", cardId: id })}
        aria-pressed={learned}
        className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          learned ? "bg-good text-bg" : "bg-white/8 text-ink hover:bg-white/12"
        }`}
      >
        <Check size={15} strokeWidth={3} /> {learned ? "Learned" : "Mark as learned"}
      </button>
    </section>
  );
}
