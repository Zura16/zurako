"use client";

import { useEffect, useRef, useState } from "react";
import { Bookmark, Check, ChevronsUp, Lightbulb, ScanText, X } from "lucide-react";
import type { Card } from "@/content/catalog";
import { catalog } from "@/content";
import { LEVEL_LABELS } from "@/content/schema";
import type { FeedPick } from "@/lib/feed/engine";
import { useAudio } from "@/components/providers/AudioProvider";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useSettings } from "@/components/providers/SettingsProvider";
import { useSheets } from "@/components/providers/SheetProvider";
import { Tag } from "@/components/ui/tags";
import { QUIZ_TYPES, TYPE_LABEL, primarySentenceId } from "./cardMeta";

const BUCKET_TAG: Partial<Record<FeedPick["bucket"], string>> = { review: "Review", new: "New", story: "Story continues" };

/** Delay before moving on after "I know this" / "Too easy", so the confirmation registers. */
const ADVANCE_DELAY_MS = 600;

/**
 * Shared chrome for every feed card: metadata on top, the card body in the
 * middle, a small action rail, and the learner's verdict row at the bottom.
 */
export function CardFrame({
  card,
  pick,
  active,
  onAdvance,
  children,
}: {
  card: Card;
  pick: FeedPick;
  active: boolean;
  /** Move to the next card; absent outside the feed. */
  onAdvance?: () => void;
  children: React.ReactNode;
}) {
  const { learner, track } = useLearner();
  const { openXRay, openExplain } = useSheets();
  const { settings } = useSettings();
  const { play, stop } = useAudio();
  const [toast, setToast] = useState<string | null>(null);
  const state = learner.cards[card.id];
  const saved = state?.saved ?? false;
  const sentenceId = primarySentenceId(card);
  const canXRay = sentenceId !== null && !QUIZ_TYPES.has(card.type);
  const autoplayed = useRef(false);

  useEffect(() => {
    if (!active) return;
    if (settings.autoplay && !autoplayed.current && sentenceId && !QUIZ_TYPES.has(card.type) && card.type !== "STORY") {
      autoplayed.current = true;
      const s = catalog.sentences.get(sentenceId);
      if (s) void play(`${card.id}:auto`, s).catch(() => undefined);
    }
    return () => stop();
  }, [active, settings.autoplay, sentenceId, card.id, card.type, play, stop]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const verdict = (type: "marked_known" | "marked_easy" | "marked_difficult") => {
    if (type === "marked_difficult" && state?.toLearn) return setToast("Already in To learn.");
    track({ type, cardId: card.id });
    if (type === "marked_difficult") return setToast("Added to To learn. It stays there until you've got it.");
    setToast(type === "marked_known" ? "Nice. It'll come back much later." : "Got it. Stepping things up.");
    if (onAdvance) setTimeout(onAdvance, ADVANCE_DELAY_MS);
  };

  const bucketTag = BUCKET_TAG[pick.bucket];

  return (
    <article
      aria-roledescription="lesson card"
      aria-label={`${TYPE_LABEL[card.type]}, ${LEVEL_LABELS[card.level]}`}
      className="relative mx-auto flex h-full w-full max-w-xl flex-col px-5 pt-[max(env(safe-area-inset-top),1rem)] pb-36 sm:px-8"
    >
      <header className="flex items-center gap-2 pt-2 pr-1 text-xs">
        <span className="font-semibold tracking-wider text-accent uppercase">{TYPE_LABEL[card.type]}</span>
        <span className="text-faint" aria-hidden>
          ·
        </span>
        <span className="text-muted">{LEVEL_LABELS[card.level]}</span>
        <span className="text-faint" aria-hidden>
          ·
        </span>
        <span className="truncate text-muted">{card.topic}</span>
        {pick.reason === "To learn" ? (
          <span className="ml-auto">
            <Tag tone="bad">To learn</Tag>
          </span>
        ) : (
          bucketTag && (
            <span className="ml-auto" title={pick.reason}>
              <Tag tone={pick.bucket === "review" ? "accent" : "plain"}>{bucketTag}</Tag>
            </span>
          )
        )}
      </header>

      {/* my-auto centres short cards; tall ones scroll from the top instead of clipping it. */}
      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto py-6 pr-14">
        <div className="my-auto">{children}</div>
      </div>

      <nav aria-label="Card actions" className="absolute right-3 bottom-44 flex flex-col items-center gap-3 sm:right-5">
        <RailButton
          label={saved ? "Remove from saved" : "Save"}
          active={saved}
          onClick={() => track({ type: saved ? "lesson_unsaved" : "lesson_saved", cardId: card.id })}
        >
          <Bookmark size={20} fill={saved ? "currentColor" : "none"} className={saved ? "pop" : ""} />
        </RailButton>
        {canXRay && (
          <RailButton
            label="Sentence breakdown"
            onClick={() => {
              track({ type: "breakdown_opened", cardId: card.id });
              openXRay(card.id, sentenceId!);
            }}
          >
            <ScanText size={20} />
          </RailButton>
        )}
        <RailButton
          label="Explain"
          onClick={() => {
            track({ type: "explanation_opened", cardId: card.id });
            openExplain(card.id);
          }}
        >
          <Lightbulb size={20} />
        </RailButton>
      </nav>

      <div role="group" aria-label="How was this card?" className="absolute inset-x-5 bottom-20 grid grid-cols-3 gap-2 sm:inset-x-8">
        <VerdictButton
          tone="good"
          pressed={state?.known ?? false}
          onClick={() => verdict("marked_known")}
          icon={<Check size={17} strokeWidth={2.6} />}
        >
          I know this
        </VerdictButton>
        <VerdictButton tone="plain" pressed={false} onClick={() => verdict("marked_easy")} icon={<ChevronsUp size={17} />}>
          Too easy
        </VerdictButton>
        <VerdictButton
          tone="bad"
          pressed={state?.toLearn ?? false}
          onClick={() => verdict("marked_difficult")}
          icon={<X size={17} strokeWidth={2.6} />}
        >
          Too hard
        </VerdictButton>
      </div>

      {toast && (
        <div
          role="status"
          className="rise absolute inset-x-0 bottom-[8.25rem] z-10 mx-auto w-fit max-w-[90%] rounded-full bg-surface-2 px-4 py-2 text-sm text-ink shadow-lg"
        >
          {toast}
        </div>
      )}
    </article>
  );
}

function RailButton({
  label,
  onClick,
  active = false,
  expanded,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  expanded?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={expanded === undefined ? active : undefined}
      aria-expanded={expanded}
      className={`flex h-11 w-11 items-center justify-center rounded-full backdrop-blur transition-colors ${
        active ? "bg-accent text-accent-ink" : "bg-white/8 text-ink hover:bg-white/15"
      }`}
    >
      {children}
    </button>
  );
}

const VERDICT_TONE = {
  good: { idle: "border-good/30 bg-good/8 text-good", on: "border-good bg-good text-bg" },
  bad: { idle: "border-bad/30 bg-bad/8 text-bad", on: "border-bad bg-bad text-bg" },
  plain: { idle: "border-line bg-white/5 text-muted", on: "border-line bg-white/5 text-muted" },
} as const;

function VerdictButton({
  tone,
  pressed,
  onClick,
  icon,
  children,
}: {
  tone: keyof typeof VERDICT_TONE;
  pressed: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={tone === "plain" ? undefined : pressed}
      className={`flex h-11 items-center justify-center gap-1.5 rounded-2xl border text-[13px] font-semibold transition-colors active:scale-[0.97] ${
        pressed ? VERDICT_TONE[tone].on : `${VERDICT_TONE[tone].idle} hover:brightness-125`
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
