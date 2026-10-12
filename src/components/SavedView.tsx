"use client";

import Link from "next/link";
import { BookmarkX, ScanText } from "lucide-react";
import { catalog } from "@/content";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useSheets } from "@/components/providers/SheetProvider";
import { AudioButton } from "@/components/ui/AudioButton";
import { TYPE_LABEL } from "@/components/feed/cardMeta";

export function SavedView() {
  const { learner, track } = useLearner();
  const { openXRay } = useSheets();
  const saved = Object.values(learner.cards)
    .filter((c) => c.saved && catalog.cards.has(c.cardId))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="mx-auto max-w-xl px-5 pt-[max(env(safe-area-inset-top),1.5rem)] pb-28">
      <h1 className="text-2xl font-bold">Saved</h1>
      {saved.length === 0 ? (
        <div className="mt-16 space-y-3 text-center">
          <p className="text-muted">Nothing saved yet. Tap the bookmark on any card to keep it here.</p>
          <Link href="/" className="inline-block rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-ink">
            Back to the feed
          </Link>
        </div>
      ) : (
        <ul className="mt-5 space-y-2.5">
          {saved.map((state) => {
            const card = catalog.cards.get(state.cardId)!;
            const sentence = card.sentenceIds[0] ? catalog.sentences.get(card.sentenceIds[0]) : undefined;
            return (
              <li key={card.id} className="rounded-2xl border border-line p-4">
                <p className="text-xs font-semibold tracking-wider text-accent uppercase">{TYPE_LABEL[card.type]}</p>
                {sentence && (
                  <>
                    <p lang="ko" className="ko mt-1.5 text-xl font-semibold">
                      {sentence.korean}
                    </p>
                    <p className="text-sm text-muted">{sentence.translation}</p>
                  </>
                )}
                <div className="mt-3 flex items-center gap-2">
                  {sentence && <AudioButton sentence={sentence} cardId={card.id} size="sm" />}
                  {sentence && (
                    <button
                      onClick={() => openXRay(card.id, sentence.id)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/6 px-3 py-1.5 text-sm text-muted hover:text-ink"
                    >
                      <ScanText size={14} /> Breakdown
                    </button>
                  )}
                  <button
                    onClick={() => track({ type: "lesson_unsaved", cardId: card.id })}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-faint hover:text-bad"
                    aria-label="Remove from saved"
                  >
                    <BookmarkX size={14} /> Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
