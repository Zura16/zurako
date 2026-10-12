"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Goal, SelfLevel } from "@/lib/learner/types";
import { useLearner } from "@/components/providers/LearnerProvider";

const LEVELS: { value: SelfLevel; label: string; hint: string }[] = [
  { value: "hangul", label: "I can read Hangul", hint: "but know very little Korean" },
  { value: "beginner", label: "Beginner", hint: "greetings, a few phrases" },
  { value: "elementary", label: "Elementary", hint: "simple conversations, basic past tense" },
  { value: "intermediate", label: "Intermediate", hint: "everyday topics, most common grammar" },
  { value: "advanced", label: "Advanced", hint: "comfortable, polishing nuance" },
];

const GOAL_OPTIONS: { value: Goal; label: string }[] = [
  { value: "conversation", label: "Conversation" },
  { value: "listening", label: "Listening" },
  { value: "grammar", label: "Grammar" },
  { value: "vocabulary", label: "Vocabulary" },
  { value: "media", label: "K-dramas & media" },
  { value: "travel", label: "Travel" },
  { value: "work", label: "Work" },
  { value: "topik", label: "TOPIK" },
];

const COMFORT: { value: 0 | 1 | 2; label: string; hint: string }[] = [
  { value: 0, label: "Not yet", hint: "I mostly know polite 요 forms" },
  { value: 1, label: "Somewhat", hint: "I recognize it but rarely use it" },
  { value: 2, label: "Comfortable", hint: "I use it with friends" },
];

/** Three questions, then straight into the feed. */
export function Onboarding() {
  const { completeOnboarding } = useLearner();
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<SelfLevel | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);

  const finish = (casualComfort: 0 | 1 | 2) => completeOnboarding({ selfLevel: level ?? "beginner", goals, casualComfort });

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 pt-[max(env(safe-area-inset-top),2.5rem)] pb-10">
      <div className="flex items-center justify-between">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="-ml-2 rounded-full p-2 text-muted hover:text-ink" aria-label="Back">
            <ArrowLeft size={20} />
          </button>
        ) : (
          <span lang="ko" className="ko text-2xl font-bold text-accent">
            눈치
          </span>
        )}
        <div className="flex gap-1.5" aria-label={`Step ${step + 1} of 3`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-1.5 w-6 rounded-full ${i <= step ? "bg-accent" : "bg-white/12"}`} />
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="rise mt-10 flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl leading-tight font-bold">Korean the way people actually say it.</h1>
            <p className="text-muted">Three quick questions to set up your feed.</p>
          </div>
          <h2 className="pt-2 text-lg font-semibold">How much Korean do you know?</h2>
          <ul className="space-y-2.5">
            {LEVELS.map((l) => (
              <li key={l.value}>
                <OptionButton
                  selected={level === l.value}
                  onClick={() => {
                    setLevel(l.value);
                    setStep(1);
                  }}
                  label={l.label}
                  hint={l.hint}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 1 && (
        <section className="rise mt-10 flex flex-1 flex-col">
          <h2 className="text-2xl font-bold">What do you care about most?</h2>
          <p className="mt-2 text-muted">Pick any. Your feed leans toward these, without leaving out the rest.</p>
          <div className="mt-6 flex flex-wrap gap-2.5" role="group" aria-label="Goals">
            {GOAL_OPTIONS.map((g) => {
              const on = goals.includes(g.value);
              return (
                <button
                  key={g.value}
                  aria-pressed={on}
                  onClick={() => setGoals(on ? goals.filter((x) => x !== g.value) : [...goals, g.value])}
                  className={`rounded-full border px-4 py-2.5 font-medium transition-colors ${on ? "border-accent bg-accent text-accent-ink" : "border-line bg-white/4 text-ink hover:bg-white/8"}`}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
          <button onClick={() => setStep(2)} className="mt-auto w-full rounded-2xl bg-accent py-4 font-semibold text-accent-ink">
            {goals.length ? "Continue" : "Skip"}
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="rise mt-10 flex-1 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">
              How comfortable are you with casual Korean (
              <span lang="ko" className="ko">
                반말
              </span>
              )?
            </h2>
            <p className="text-muted">
              Like{" "}
              <span lang="ko" className="ko text-ink">
                뭐 해?
              </span>{" "}
              instead of{" "}
              <span lang="ko" className="ko text-ink">
                뭐 해요?
              </span>
            </p>
          </div>
          <ul className="space-y-2.5">
            {COMFORT.map((c) => (
              <li key={c.value}>
                <OptionButton selected={false} onClick={() => finish(c.value)} label={c.label} hint={c.hint} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 0 && (
        <p className="mt-8 text-center text-sm text-faint">
          Saved your progress before?{" "}
          <Link href="/account/" className="text-muted underline underline-offset-4 hover:text-ink">
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}

function OptionButton({ selected, onClick, label, hint }: { selected: boolean; onClick: () => void; label: string; hint: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border px-5 py-4 text-left transition-colors ${selected ? "border-accent bg-accent/10" : "border-line bg-white/4 hover:border-white/25 hover:bg-white/8"}`}
    >
      <span className="block font-semibold">{label}</span>
      <span className="block text-sm text-muted">{hint}</span>
    </button>
  );
}
