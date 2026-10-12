"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { catalog } from "@/content";
import { SingleCard } from "@/components/SingleCard";

/** Practise one card from the To learn list. Answers count toward taking it off the list. */
export function PracticeView() {
  const card = catalog.cards.get(useSearchParams().get("id") ?? "");
  if (!card) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-3 px-8 text-center">
        <p className="text-muted">That card couldn&apos;t be found.</p>
        <Link href="/saved/?tab=learn" className="rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-ink">
          Back to To learn
        </Link>
      </div>
    );
  }
  return <SingleCard key={card.id} card={card} bucket="review" backHref="/saved/?tab=learn" backLabel="To learn" />;
}
