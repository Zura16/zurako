"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { catalog } from "@/content";
import { nextCards, type FeedPick } from "@/lib/feed/engine";
import { QUICK_SWIPE_MS } from "@/lib/learner/events";
import { useLearner } from "@/components/providers/LearnerProvider";
import { CardBody } from "@/components/cards/CardBody";
import { CardFrame } from "./CardFrame";

const BATCH = 3;
/** Cards this far from the active one render as empty placeholders. */
const RENDER_WINDOW = 2;

/**
 * The vertical feed. CSS scroll snapping gives native touch, wheel and
 * trackpad behaviour; arrow keys and j/k move between cards. Leaving a card
 * records how long it was on screen, which the learner model uses.
 */
export function Feed() {
  const { learner, track } = useLearner();
  const [picks, setPicks] = useState<FeedPick[]>([]);
  const [active, setActive] = useState(0);
  const learnerRef = useRef(learner);
  const container = useRef<HTMLDivElement>(null);
  const activeSince = useRef(Date.now());
  learnerRef.current = learner;

  const extend = useCallback((n: number) => {
    setPicks((prev) => {
      const session = prev.map((p) => ({
        cardId: p.cardId,
        bucket: p.bucket,
        outcome: learnerRef.current.cards[p.cardId]?.lastOutcome ?? undefined,
      }));
      return [...prev, ...nextCards({ catalog, learner: learnerRef.current, now: Date.now(), session, rng: Math.random }, n)];
    });
  }, []);

  useEffect(() => {
    extend(BATCH + 1);
  }, [extend]);

  useEffect(() => {
    if (picks.length > 0 && active >= picks.length - 2) extend(BATCH);
  }, [active, picks.length, extend]);

  // Track which card is on screen.
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { root, threshold: 0.6 },
    );
    root.querySelectorAll("[data-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [picks.length]);

  // Record dwell time on the card being left.
  const previous = useRef<number | null>(null);
  useEffect(() => {
    const prev = previous.current;
    const now = Date.now();
    if (prev !== null && prev !== active && picks[prev]) {
      const dwellMs = now - activeSince.current;
      track({ type: dwellMs < QUICK_SWIPE_MS ? "lesson_swiped" : "lesson_viewed", cardId: picks[prev].cardId, dwellMs });
    }
    previous.current = active;
    activeSince.current = now;
  }, [active, picks, track]);

  const goTo = useCallback((index: number) => {
    const el = container.current?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    el?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, [role=dialog]")) return;
      if (["ArrowDown", "PageDown", "j"].includes(e.key)) {
        e.preventDefault();
        goTo(Math.min(active + 1, picks.length - 1));
      } else if (["ArrowUp", "PageUp", "k"].includes(e.key)) {
        e.preventDefault();
        goTo(Math.max(active - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, picks.length, goTo]);

  if (picks.length === 0) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-3 px-8 text-center">
        <p className="text-lg font-semibold">You&apos;re all caught up</p>
        <p className="text-muted">Nothing new fits your level right now. Reviews will come due soon.</p>
        <Link href="/progress/" className="mt-2 rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-ink">
          See your progress
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={container}
      className="no-scrollbar h-dvh snap-y snap-mandatory overflow-y-scroll overscroll-y-contain"
      aria-label="Lesson feed"
    >
      {picks.map((pick, i) => {
        const card = catalog.cards.get(pick.cardId)!;
        const near = Math.abs(i - active) <= RENDER_WINDOW;
        return (
          <section key={`${pick.cardId}:${i}`} data-index={i} className="h-dvh snap-start snap-always" inert={i !== active}>
            {near && (
              <CardFrame card={card} pick={pick} active={i === active} onAdvance={() => goTo(i + 1)}>
                <CardBody card={card} pick={pick} active={i === active} />
              </CardFrame>
            )}
          </section>
        );
      })}
      {active === 0 && (
        <p className="pointer-events-none fixed inset-x-0 bottom-[8.5rem] text-center text-xs text-faint" aria-hidden>
          Swipe up · ↑↓ keys
        </p>
      )}
    </div>
  );
}
