"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Grid line color. */
  lineColor?: string;
  /** Fill for hovered and rippled cells. */
  hoverFillColor?: string;
  /** Peak opacity of a hovered cell's fill. */
  fillOpacity?: number;
  cellSize?: number;
  /** Diagonal drift, in pixels per frame at 60 fps. */
  speed?: number;
  /** 0–1: how long a hovered cell keeps glowing after the pointer leaves. */
  trail?: number;
  /** 0–1: soft halo around lit cells. */
  glow?: number;
  /** Overall strength of the whole effect, 0–1. Keeps it in the background. */
  strength?: number;
  /** A click sends a ripple of lit cells outward. */
  clickCascade?: boolean;
};

type Ripple = { x: number; y: number; start: number };

/**
 * A slowly drifting square grid behind the page. Cells under the pointer light
 * up and fade, and a click sends a ripple outward. Drawn on one canvas that
 * ignores pointer events, so it never gets in the way of the content above it.
 * With reduced motion the grid stays still and ripples are off.
 */
export function ShapeGrid({
  lineColor = "#2a2734",
  hoverFillColor = "#ffffff",
  fillOpacity = 0.15,
  cellSize = 40,
  speed = 0.5,
  trail = 0.6,
  glow = 0.35,
  strength = 1,
  clickCascade = true,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const drift = still ? 0 : speed;
    const lit = new Map<string, number>();
    const ripples: Ripple[] = [];
    const pointer = { x: -1, y: -1, inside: false };
    let offset = 0;
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Cells are keyed in grid space, so a lit cell drifts along with the grid.
    const cellAt = (x: number, y: number) => [Math.floor((x + offset) / cellSize), Math.floor((y + offset) / cellSize)] as const;

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      offset = (offset + drift * dt) % (cellSize * 1000);
      ctx.clearRect(0, 0, width, height);

      if (pointer.inside) {
        const [i, j] = cellAt(pointer.x, pointer.y);
        lit.set(`${i},${j}`, 1);
      }
      for (const r of ripples) {
        const t = (now - r.start) / 1000;
        const radius = t * 520;
        const fadeOut = Math.max(0, 1 - t / 1.4);
        const [ci, cj] = cellAt(r.x, r.y);
        const reach = Math.ceil(radius / cellSize) + 1;
        for (let di = -reach; di <= reach; di++) {
          for (let dj = -reach; dj <= reach; dj++) {
            const d = Math.hypot(di, dj) * cellSize;
            if (Math.abs(d - radius) < cellSize * 0.6) {
              const key = `${ci + di},${cj + dj}`;
              lit.set(key, Math.max(lit.get(key) ?? 0, 0.7 * fadeOut));
            }
          }
        }
      }
      for (let k = ripples.length - 1; k >= 0; k--) if (now - ripples[k].start > 1400) ripples.splice(k, 1);

      // Lit cells: fill and an optional soft halo, fading per the trail setting.
      const decay = Math.pow(0.86 + trail * 0.12, dt);
      ctx.fillStyle = hoverFillColor;
      for (const [key, v] of lit) {
        const [i, j] = key.split(",").map(Number);
        const x = i * cellSize - offset;
        const y = j * cellSize - offset;
        ctx.globalAlpha = v * fillOpacity * strength;
        ctx.shadowColor = hoverFillColor;
        ctx.shadowBlur = glow * 16 * v;
        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        const next = v * decay;
        if (next < 0.02) lit.delete(key);
        else lit.set(key, next);
      }
      ctx.shadowBlur = 0;

      ctx.globalAlpha = strength;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const shift = offset % cellSize;
      for (let x = -shift; x <= width; x += cellSize) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, height);
      }
      for (let y = -shift; y <= height; y += cellSize) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(width, Math.round(y) + 0.5);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.inside = true;
    };
    const onLeave = () => {
      pointer.inside = false;
    };
    const onDown = (e: PointerEvent) => {
      if (clickCascade && !still) ripples.push({ x: e.clientX, y: e.clientY, start: performance.now() });
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [lineColor, hoverFillColor, fillOpacity, cellSize, speed, trail, glow, strength, clickCascade]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="shape-grid pointer-events-none fixed inset-0 -z-1 h-full w-full"
      // Fade toward the edges so only a glimpse of the grid shows.
      style={{ maskImage: "radial-gradient(ellipse at 50% 30%, black 10%, transparent 75%)" }}
    />
  );
}
