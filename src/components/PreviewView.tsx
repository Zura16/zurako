"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { catalog } from "@/content";
import { CARD_TYPES } from "@/content/schema";
import { SingleCard } from "@/components/SingleCard";
import { TYPE_LABEL } from "@/components/feed/cardMeta";
import { WithoutTracking } from "@/components/providers/LearnerProvider";

/**
 * Content review: every card, grouped by type, each viewable on its own.
 * Not linked from the main navigation; interactions here don't affect progress.
 */
export function PreviewView() {
  const id = useSearchParams().get("id");
  const card = id ? catalog.cards.get(id) : undefined;

  if (card) {
    return (
      <WithoutTracking>
        <SingleCard card={card} bucket="familiar" backHref="/preview/" backLabel="All cards" />
      </WithoutTracking>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 pt-6 pb-28">
      <h1 className="text-2xl font-bold">Content preview</h1>
      <p className="mt-1 text-sm text-muted">
        {catalog.cards.size} cards, {catalog.sentences.size} sentences, {catalog.concepts.size} concepts. Opening a card here doesn&apos;t
        affect your progress.
      </p>
      {CARD_TYPES.map((type) => {
        const cards = [...catalog.cards.values()].filter((c) => c.type === type);
        return (
          <section key={type} className="mt-6">
            <h2 className="text-xs font-semibold tracking-wider text-faint uppercase">
              {TYPE_LABEL[type]} · {cards.length}
            </h2>
            <ul className="mt-2 divide-y divide-line rounded-2xl border border-line">
              {cards.map((c) => {
                const s = c.sentenceIds[0] ? catalog.sentences.get(c.sentenceIds[0]) : undefined;
                return (
                  <li key={c.id}>
                    <Link href={`/preview/?id=${c.id}`} className="flex items-baseline gap-3 px-4 py-2.5 hover:bg-white/4">
                      <span className="w-14 shrink-0 text-xs text-faint">{c.level}</span>
                      <span lang="ko" className="ko min-w-0 flex-1 truncate">
                        {s?.korean ?? c.id}
                      </span>
                      <span className="shrink-0 text-xs text-faint">{c.topic}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
