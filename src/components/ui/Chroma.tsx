"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Spotlight radius in pixels. */
  radius?: number;
  /** Seconds the spotlight takes to catch up with the pointer. */
  damping?: number;
  /** Seconds the spotlight takes to close after the pointer leaves. */
  fadeOut?: number;
};

/**
 * Chroma spotlight over a set of cards. Cards (elements with `data-chroma`)
 * rest plain. Near the pointer they take on their own color, the spotlight
 * eases after the pointer, and each card also glows and lights its border
 * around the pointer (see `.chroma-card` in globals.css). The muted rest state
 * is plain navy rather than grayscale, which would turn the theme charcoal.
 *
 * The position lives in CSS variables on each card, so React never re-renders
 * for it. Only pointers that can hover use it; on touch screens every card
 * shows a faint, fixed tint instead.
 */
export function ChromaSpotlight({ children, className, radius = 260, damping = 0.45, fadeOut = 0.6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.dataset.chromaActive = "";
    const target = { x: 0, y: 0, r: 0 };
    const pos = { x: 0, y: 0, r: 0 };
    let frame = 0;
    let last = 0;
    let started = false;

    const ease = (from: number, to: number, seconds: number, dt: number) =>
      instant ? to : from + (to - from) * (1 - Math.exp(-dt / (seconds / 3)));

    const tick = (now: number) => {
      const dt = last ? (now - last) / 1000 : 0.016;
      last = now;
      pos.x = ease(pos.x, target.x, damping, dt);
      pos.y = ease(pos.y, target.y, damping, dt);
      pos.r = ease(pos.r, target.r, target.r > pos.r ? damping : fadeOut, dt);
      for (const card of root.querySelectorAll<HTMLElement>("[data-chroma]")) {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--sx", `${pos.x - box.left}px`);
        card.style.setProperty("--sy", `${pos.y - box.top}px`);
        card.style.setProperty("--sr", `${pos.r}px`);
      }
      const settled = Math.abs(pos.x - target.x) < 0.5 && Math.abs(pos.y - target.y) < 0.5 && Math.abs(pos.r - target.r) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const run = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      target.r = radius;
      if (!started) {
        // Open the spotlight where the pointer enters instead of sliding in from a corner.
        pos.x = target.x;
        pos.y = target.y;
        started = true;
      }
      run();
    };
    const onLeave = () => {
      target.r = 0;
      run();
    };
    // Scrolling moves the cards under a still pointer.
    const onScroll = () => run();

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      cancelAnimationFrame(frame);
      delete root.dataset.chromaActive;
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, [radius, damping, fadeOut]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
