"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Card } from "@/content/catalog";
import type { FeedPick } from "@/lib/feed/engine";
import { CardBody } from "@/components/cards/CardBody";
import { CardFrame } from "@/components/feed/CardFrame";

/** One card outside the feed, full screen, with a way back. */
export function SingleCard({
  card,
  bucket,
  backHref,
  backLabel,
}: {
  card: Card;
  bucket: FeedPick["bucket"];
  backHref: string;
  backLabel: string;
}) {
  const pick: FeedPick = { cardId: card.id, bucket, reason: bucket === "review" ? "To learn" : "Preview", score: 0 };
  return (
    <div className="flex h-dvh flex-col">
      <div className="mx-auto w-full max-w-xl px-4 pt-[max(env(safe-area-inset-top),0.75rem)]">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs text-muted hover:text-ink"
        >
          <ArrowLeft size={13} /> {backLabel}
        </Link>
      </div>
      <div className="min-h-0 flex-1">
        <CardFrame card={card} pick={pick} active>
          <CardBody card={card} pick={pick} active />
        </CardFrame>
      </div>
    </div>
  );
}
