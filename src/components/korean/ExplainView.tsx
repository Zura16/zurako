"use client";

import { catalog } from "@/content";
import { LEVEL_LABELS } from "@/content/schema";
import { Tag } from "@/components/ui/tags";

/** Short explanations of the concepts a card teaches. */
export function ExplainView({ cardId }: { cardId: string }) {
  const card = catalog.cards.get(cardId);
  const taught = (card?.concepts ?? [])
    .filter((c) => c.role === "TEACH")
    .map((c) => catalog.concepts.get(c.id)!)
    .filter(Boolean);
  const used = (card?.concepts ?? [])
    .filter((c) => c.role === "USE" && c.id.startsWith("g."))
    .map((c) => catalog.concepts.get(c.id)!)
    .filter(Boolean);

  if (taught.length === 0 && used.length === 0)
    return <p className="text-muted">Nothing extra to explain here. Tap any Korean word for its breakdown.</p>;

  return (
    <div className="space-y-4">
      {taught.map((c) => (
        <article key={c.id} className="space-y-2 rounded-2xl border border-line p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 lang="ko" className="ko text-xl font-semibold">
              {c.label}
            </h3>
            <Tag>{LEVEL_LABELS[c.level]}</Tag>
          </div>
          <p className="text-ink">{c.meaning}</p>
          {c.details.pattern && <p className="text-sm text-accent">{c.details.pattern}</p>}
          {c.details.explanation && <p className="text-sm text-muted">{c.details.explanation}</p>}
          {c.details.examples.map((ex) => (
            <p key={ex.ko} className="text-sm">
              <span lang="ko" className="ko font-medium">
                {ex.ko}
              </span>{" "}
              <span className="text-faint">{ex.en}</span>
            </p>
          ))}
        </article>
      ))}
      {used.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-xs font-semibold tracking-wider text-faint uppercase">Also in this card</h3>
          <ul className="space-y-1.5 text-sm">
            {used.map((c) => (
              <li key={c.id}>
                <span lang="ko" className="ko font-semibold">
                  {c.label}
                </span>{" "}
                <span className="text-muted">{c.meaning}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
