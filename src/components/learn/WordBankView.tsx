"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Search } from "lucide-react";
import { WORDS, wordId } from "@/content/wordbank";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useSettings } from "@/components/providers/SettingsProvider";
import { AudioButton } from "@/components/ui/AudioButton";
import { RomanizationToggle } from "./KoreanLine";

const CATEGORIES = [...new Set(WORDS.map((w) => w.category))];

export function WordBankView() {
  const { learner, track } = useLearner();
  const { settings } = useSettings();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WORDS.filter(
      (w) =>
        (!category || w.category === category) &&
        (!q || w.ko.includes(q) || w.en.toLowerCase().includes(q) || w.rom.replace(/-/g, "").includes(q.replace(/-/g, ""))),
    );
  }, [query, category]);

  return (
    <div className="mx-auto max-w-xl px-5 pt-[max(env(safe-area-inset-top),1rem)] pb-28">
      <div className="flex items-center justify-between py-3">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          <ArrowLeft size={16} /> Learn
        </Link>
        <RomanizationToggle />
      </div>
      <h1 className="text-2xl font-bold">Word bank</h1>

      <label className="mt-4 flex items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 py-3 focus-within:border-accent">
        <Search size={17} className="text-faint" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Korean, English or romanization"
          aria-label="Search words"
          className="ko min-w-0 flex-1 bg-transparent outline-none"
        />
      </label>

      <div className="no-scrollbar -mx-5 mt-3 flex gap-1.5 overflow-x-auto px-5" role="group" aria-label="Category">
        {[null, ...CATEGORIES].map((c) => (
          <button
            key={c ?? "all"}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${category === c ? "bg-accent text-accent-ink" : "bg-white/6 text-muted hover:text-ink"}`}
          >
            {c ?? "All"}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-faint" aria-live="polite">
        {results.length} {results.length === 1 ? "word" : "words"}
      </p>
      <ul className="mt-2 divide-y divide-line rounded-2xl border border-line">
        {results.map((w) => {
          const id = wordId(w);
          const learned = learner.cards[id]?.known ?? false;
          return (
            <li key={`${w.category}:${w.ko}`} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p lang="ko" className="ko text-lg font-semibold">
                  {w.ko}
                </p>
                {settings.romanization && <p className="text-xs text-faint">{w.rom}</p>}
                <p className="text-sm text-muted">{w.en}</p>
              </div>
              <AudioButton sentence={{ korean: w.ko }} cardId={id} size="sm" />
              <button
                onClick={() => track({ type: learned ? "word_unlearned" : "word_learned", cardId: id })}
                aria-pressed={learned}
                aria-label={learned ? `${w.ko}: learned` : `Mark ${w.ko} as learned`}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${learned ? "border-good bg-good text-bg" : "border-white/20 text-faint hover:text-ink"}`}
              >
                <Check size={14} strokeWidth={3} />
              </button>
            </li>
          );
        })}
      </ul>
      {results.length === 0 && <p className="mt-6 text-center text-muted">No words match. Try a different search.</p>}
    </div>
  );
}
