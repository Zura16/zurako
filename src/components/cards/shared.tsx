"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { useSettings } from "@/components/providers/SettingsProvider";

/** Translation that respects the "show translations" setting: hidden ones reveal on tap. */
export function Translation({ text, className = "" }: { text: string; className?: string }) {
  const { settings } = useSettings();
  const [shown, setShown] = useState(false);
  if (settings.translations || shown) return <p className={`text-muted ${className}`}>{text}</p>;
  return (
    <button onClick={() => setShown(true)} className={`text-left text-faint underline decoration-dotted underline-offset-4 ${className}`}>
      Show translation
    </button>
  );
}

export function Note({ children, tone = "plain" }: { children: React.ReactNode; tone?: "plain" | "warn" | "accent" }) {
  const styles = { plain: "bg-white/5 text-muted", warn: "bg-bad/10 text-bad", accent: "bg-surface text-ink" }[tone];
  return <div className={`rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${styles}`}>{children}</div>;
}

export type Choice = { text: string; correct: boolean; why?: string };

/**
 * Answer options. Once answered, the correct option and the learner's pick
 * are marked, with an explanation for each.
 */
export function Choices({
  options,
  onAnswer,
  korean = false,
  disabled = false,
}: {
  options: Choice[];
  onAnswer: (correct: boolean, index: number) => void;
  korean?: boolean;
  disabled?: boolean;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked !== null;
  return (
    <ul className="space-y-2.5" role="list">
      {options.map((o, i) => {
        const state = !done ? "idle" : o.correct ? "right" : i === picked ? "wrong" : "dim";
        return (
          <li key={i}>
            <button
              disabled={done || disabled}
              onClick={() => {
                setPicked(i);
                onAnswer(o.correct, i);
              }}
              className={`w-full rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                state === "right"
                  ? "border-good/60 bg-good/10"
                  : state === "wrong"
                    ? "border-bad/60 bg-bad/10"
                    : state === "dim"
                      ? "border-line opacity-60"
                      : "border-line bg-white/4 hover:border-white/25 hover:bg-white/8"
              } disabled:cursor-default`}
            >
              <span className="flex items-start gap-3">
                <span className={`${korean ? "ko text-lg font-medium" : ""} flex-1`} lang={korean ? "ko" : undefined}>
                  {o.text}
                </span>
                {state === "right" && <Check size={18} className="mt-1 shrink-0 text-good" aria-label="Correct" />}
                {state === "wrong" && <X size={18} className="mt-1 shrink-0 text-bad" aria-label="Your answer, incorrect" />}
              </span>
              {done && o.why && (state === "right" || state === "wrong") && (
                <span className="rise mt-1.5 block text-sm text-muted">{o.why}</span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl leading-snug font-semibold text-ink">{children}</h2>;
}
