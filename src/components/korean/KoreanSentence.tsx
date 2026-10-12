"use client";

import { Fragment } from "react";
import { layoutSegments, type Sentence } from "@/content/schema";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useSheets } from "@/components/providers/SheetProvider";

const SIZES = {
  xl: "text-[2.4rem] leading-[1.25] sm:text-5xl font-semibold",
  lg: "text-3xl leading-snug font-semibold",
  md: "text-xl leading-snug font-medium",
  sm: "text-base leading-snug",
} as const;

/**
 * A Korean sentence whose chunks are tappable. Tapping a chunk opens the
 * sentence X-ray focused on it and records a word_tapped event (evidence the
 * learner didn't know it).
 */
export function KoreanSentence({
  sentence,
  cardId,
  size = "lg",
  className = "",
}: {
  sentence: Sentence;
  cardId: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const { openXRay } = useSheets();
  const { track } = useLearner();

  return (
    <p lang="ko" className={`ko ${SIZES[size]} ${className}`}>
      {layoutSegments(sentence).map(({ segment: seg, before, after }, i) => (
        // Punctuation stays glued to its chunk so lines never start with "." or ",".
        <Fragment key={i}>
          <span className="whitespace-nowrap">
            {before}
            <button
              onClick={() => {
                track({ type: "word_tapped", cardId, text: seg.text, conceptIds: seg.concepts });
                openXRay(cardId, sentence.id, i);
              }}
              className="rounded-md decoration-white/25 decoration-dotted underline-offset-[0.2em] transition-colors hover:bg-white/6 hover:underline focus-visible:bg-white/6"
              aria-label={`${seg.text}: ${seg.gloss}. Show breakdown`}
            >
              {seg.text}
            </button>
            {after}
          </span>
          {i < sentence.segments.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
