"use client";

import { useEffect, useRef, useState } from "react";
import { Bookmark, Check, Lightbulb, MoreHorizontal, ScanText, TrendingDown, TrendingUp } from "lucide-react";
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

/**
 * Shared chrome for every feed card: metadata on top, the card body in the
 * middle, and a small action rail. Rarely used actions sit behind "More".
 */
export function CardFrame({ card, pick, active, children }: { card: Card; pick: FeedPick; active: boolean; children: React.ReactNode }) {
  const { learner, track } = useLearner();
  const { openXRay, openExplain } = useSheets();
  const { settings } = useSettings();
  const { play, stop } = useAudio();
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const saved = learner.cards[card.id]?.saved ?? false;
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

  const feedback = (type: "marked_known" | "marked_easy" | "marked_difficult", message: string) => {
    track({ type, cardId: card.id });
    setMenu(false);
    setToast(message);
  };

  const bucketTag = BUCKET_TAG[pick.bucket];

  return (
    <article
      aria-roledescription="lesson card"
      aria-label={`${TYPE_LABEL[card.type]}, ${LEVEL_LABELS[card.level]}`}
      className="relative mx-auto flex h-full w-full max-w-xl flex-col px-5 pt-[max(env(safe-area-inset-top),1rem)] pb-24 sm:px-8"
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
        {bucketTag && (
          <span className="ml-auto" title={pick.reason}>
            <Tag tone={pick.bucket === "review" ? "accent" : "plain"}>{bucketTag}</Tag>
          </span>
        )}
      </header>

      {/* my-auto centres short cards; tall ones scroll from the top instead of clipping it. */}
      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto py-6 pr-14">
        <div className="my-auto">{children}</div>
      </div>

      <nav aria-label="Card actions" className="absolute right-3 bottom-28 flex flex-col items-center gap-3 sm:right-5">
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
        <div className="relative">
          <RailButton label="More options" expanded={menu} onClick={() => setMenu((m) => !m)}>
            <MoreHorizontal size={20} />
          </RailButton>
          {menu && (
            <div
              role="menu"
              className="rise absolute right-12 bottom-0 w-48 overflow-hidden rounded-2xl border border-line bg-surface shadow-xl"
            >
              {!QUIZ_TYPES.has(card.type) && (
                <MenuItem
                  icon={<Check size={16} />}
                  onClick={() => feedback("marked_known", "Marked as known. It'll come back much later.")}
                >
                  I know this
                </MenuItem>
              )}
              <MenuItem icon={<TrendingUp size={16} />} onClick={() => feedback("marked_easy", "Got it. Stepping things up.")}>
                Too easy
              </MenuItem>
              <MenuItem
                icon={<TrendingDown size={16} />}
                onClick={() => feedback("marked_difficult", "Okay. Easing off and reviewing basics.")}
              >
                Too hard
              </MenuItem>
            </div>
          )}
        </div>
      </nav>

      {toast && (
        <div
          role="status"
          className="rise absolute inset-x-0 bottom-24 mx-auto w-fit rounded-full bg-surface-2 px-4 py-2 text-sm text-ink shadow-lg"
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

function MenuItem({ icon, onClick, children }: { icon: React.ReactNode; onClick: () => void; children: React.ReactNode }) {
  return (
    <button role="menuitem" onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-white/6">
      <span className="text-accent">{icon}</span>
      {children}
    </button>
  );
}
