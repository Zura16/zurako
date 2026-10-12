"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookmarkX, Check, ScanText, X } from "lucide-react";
import { catalog } from "@/content";
import type { Card } from "@/content/catalog";
import { TO_LEARN_DAYS } from "@/lib/learner/model";
import type { CardState } from "@/lib/learner/types";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useSheets } from "@/components/providers/SheetProvider";
import { AudioButton } from "@/components/ui/AudioButton";
import { QUIZ_TYPES, TYPE_LABEL } from "@/components/feed/cardMeta";

type Tab = "saved" | "learn";

/** Cards with a question or recall step, so practising them can count as getting them right. */
const answerable = (card: Card) =>
  QUIZ_TYPES.has(card.type) || card.type === "PHRASE" || card.type === "EXPRESSION" || (card.type === "STORY" && !!card.payload.check);

export function SavedView() {
  const { learner } = useLearner();
  const params = useSearchParams();
  const router = useRouter();
  const tab: Tab = params.get("tab") === "learn" ? "learn" : "saved";
  const all = Object.values(learner.cards).filter((c) => catalog.cards.has(c.cardId));
  const saved = all.filter((c) => c.saved).sort((a, b) => b.updatedAt - a.updatedAt);
  const toLearn = all.filter((c) => c.toLearn).sort((a, b) => (a.toLearnSince ?? 0) - (b.toLearnSince ?? 0));

  return (
    <div className="mx-auto max-w-xl px-5 pt-[max(env(safe-area-inset-top),1.5rem)] pb-28">
      <h1 className="text-2xl font-bold">Saved</h1>
      <div className="mt-4 flex gap-1.5" role="tablist">
        <TabButton selected={tab === "saved"} onClick={() => router.replace("/saved/")}>
          Saved {saved.length > 0 && <span className="opacity-70">{saved.length}</span>}
        </TabButton>
        <TabButton selected={tab === "learn"} onClick={() => router.replace("/saved/?tab=learn")}>
          To learn {toLearn.length > 0 && <span className="opacity-70">{toLearn.length}</span>}
        </TabButton>
      </div>

      <div role="tabpanel" className="mt-5">
        {tab === "saved" ? <SavedList items={saved} /> : <ToLearnList items={toLearn} />}
      </div>
    </div>
  );
}

function TabButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium ${
        selected ? "bg-accent text-accent-ink" : "bg-white/6 text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-12 space-y-4 text-center">
      <p className="text-muted">{children}</p>
      <Link href="/" className="inline-block rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-ink">
        Back to the feed
      </Link>
    </div>
  );
}

function CardSummary({ card }: { card: Card }) {
  const sentence = card.sentenceIds[0] ? catalog.sentences.get(card.sentenceIds[0]) : undefined;
  return (
    <>
      <p className="text-xs font-semibold tracking-wider text-accent uppercase">{TYPE_LABEL[card.type]}</p>
      {sentence && (
        <>
          <p lang="ko" className="ko mt-1.5 text-xl font-semibold">
            {sentence.korean}
          </p>
          <p className="text-sm text-muted">{sentence.translation}</p>
        </>
      )}
    </>
  );
}

function SavedList({ items }: { items: CardState[] }) {
  const { track } = useLearner();
  const { openXRay } = useSheets();
  if (items.length === 0) return <Empty>Nothing saved yet. Tap the bookmark on any card to keep it here.</Empty>;
  return (
    <ul className="space-y-2.5">
      {items.map((state) => {
        const card = catalog.cards.get(state.cardId)!;
        const sentence = card.sentenceIds[0] ? catalog.sentences.get(card.sentenceIds[0]) : undefined;
        return (
          <li key={card.id} className="rounded-2xl border border-line p-4">
            <CardSummary card={card} />
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
  );
}

function ToLearnList({ items }: { items: CardState[] }) {
  const { track } = useLearner();
  if (items.length === 0) {
    return <Empty>Nothing here yet. Tap &ldquo;Too hard&rdquo; on any card and it waits here until you&apos;ve got it.</Empty>;
  }
  return (
    <>
      <p className="mb-4 text-sm text-muted">
        Get a card right on {TO_LEARN_DAYS} different days and it leaves this list. These cards also come back in your feed.
      </p>
      <ul className="space-y-2.5">
        {items.map((state) => {
          const card = catalog.cards.get(state.cardId)!;
          return (
            <li key={card.id} className="rounded-2xl border border-bad/25 p-4">
              <div className="flex items-start gap-3">
                <X size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-bad" aria-hidden />
                <div className="min-w-0 flex-1">
                  <CardSummary card={card} />
                  <div className="mt-2.5 flex items-center gap-2 text-xs text-faint">
                    {answerable(card) ? (
                      <>
                        <span className="flex gap-1" aria-hidden>
                          {Array.from({ length: TO_LEARN_DAYS }, (_, i) => (
                            <span key={i} className={`h-1.5 w-5 rounded-full ${i < state.recoveries ? "bg-good" : "bg-white/12"}`} />
                          ))}
                        </span>
                        <span>
                          {state.recoveries} of {TO_LEARN_DAYS} days right
                        </span>
                      </>
                    ) : (
                      <span>No question on this card. Mark it known once it sticks.</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Link
                  href={`/practice/?id=${card.id}`}
                  className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-ink"
                >
                  Practice
                </Link>
                <button
                  onClick={() => track({ type: "marked_known", cardId: card.id })}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-good hover:bg-good/10"
                >
                  <Check size={14} strokeWidth={2.6} /> I know this
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
