"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { Question } from "@/content/path";
import { normalize } from "@/lib/speech/evaluate";
import { QUIZ_PASS, passes } from "@/lib/learner/path";
import { AudioButton } from "@/components/ui/AudioButton";

export type QuizResult = { correct: number; total: number; passed: boolean; missed: Question[]; right: Question[] };

/** A quiz whose questions are drawn once, when it mounts; remount it (new key) for a fresh attempt. */
export function DrawnQuiz({ draw, ...rest }: Omit<Parameters<typeof Quiz>[0], "questions"> & { draw: (seed: number) => Question[] }) {
  const [questions] = useState(() => draw(Math.floor(Math.random() * 1e9)));
  return <Quiz questions={questions} {...rest} />;
}

/** One question at a time with instant feedback, then a score screen. */
export function Quiz({
  questions,
  itemId,
  onFinish,
  onRetake,
  done,
}: {
  questions: Question[];
  /** Tracked item that audio plays are logged against. */
  itemId: string;
  onFinish: (result: QuizResult) => void;
  /** Start a new attempt with a fresh set of questions. */
  onRetake: () => void;
  /** Shown under the score: what to do next. */
  done: (result: QuizResult) => React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const q = questions[index];

  const answered = answers.length > index;
  const record = (ok: boolean) => setAnswers((a) => (a.length > index ? a : [...a, ok]));
  const next = () => {
    if (index + 1 < questions.length) return setIndex(index + 1);
    const correct = answers.filter(Boolean).length;
    const r: QuizResult = {
      correct,
      total: questions.length,
      passed: passes(correct, questions.length),
      missed: questions.filter((_, i) => !answers[i]),
      right: questions.filter((_, i) => answers[i]),
    };
    setResult(r);
    onFinish(r);
  };

  if (result) return <Results result={result} onRetake={onRetake} done={done(result)} />;
  if (!q) return null;

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <p className="text-xs text-faint" aria-live="polite">
          Question {index + 1} of {questions.length}
        </p>
        <div className="flex gap-1" aria-hidden>
          {questions.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i < answers.length ? (answers[i] ? "bg-good" : "bg-bad") : i === index ? "bg-accent" : "bg-white/10"}`}
            />
          ))}
        </div>
      </div>
      <QuestionView key={`${index}:${q.id}`} question={q} itemId={itemId} answered={answered} onAnswer={record} />
      {answered && (
        <button onClick={next} className="rise w-full rounded-2xl bg-accent py-4 font-semibold text-accent-ink">
          {index + 1 < questions.length ? "Next" : "See my score"}
        </button>
      )}
    </div>
  );
}

function QuestionView({
  question: q,
  itemId,
  answered,
  onAnswer,
}: {
  question: Question;
  itemId: string;
  answered: boolean;
  onAnswer: (ok: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const typedRight = useMemo(() => q.blank?.answers.some((a) => normalize(a) === normalize(typed)) ?? false, [q.blank, typed]);

  return (
    <div className="space-y-4">
      <p className="text-xl leading-snug font-semibold">{q.prompt}</p>
      {q.context && <p className="text-sm text-muted">{q.context}</p>}

      {q.korean && (
        <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
          {q.listening && !answered ? (
            <p className="flex-1 text-sm text-muted">Listen, then choose.</p>
          ) : (
            <p lang="ko" className="ko flex-1 text-2xl font-semibold">
              {q.korean.ko}
            </p>
          )}
          <AudioButton sentence={{ korean: q.korean.ko, spoken: q.korean.spoken }} cardId={itemId} />
        </div>
      )}
      {q.stem && (
        <p lang="ko" className="ko rounded-2xl bg-white/5 px-4 py-3 text-2xl font-semibold">
          {q.stem}
        </p>
      )}

      {q.blank ? (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!answered && typed.trim()) onAnswer(typedRight);
          }}
        >
          <p lang="ko" className="ko text-2xl leading-loose whitespace-pre-wrap">
            {q.blank.before}
            <input
              autoFocus
              lang="ko"
              value={typed}
              disabled={answered}
              onChange={(e) => setTyped(e.target.value)}
              aria-label="Your answer"
              className={`ko inline-block w-32 rounded-lg border-b-2 bg-white/5 px-2 py-0.5 text-center align-baseline outline-none ${
                !answered ? "border-accent" : typedRight ? "border-good text-good" : "border-bad text-bad"
              }`}
            />
            {q.blank.after}
          </p>
          {!answered && (
            <button disabled={!typed.trim()} className="rounded-xl bg-accent px-5 py-2.5 font-semibold text-accent-ink disabled:opacity-50">
              Check
            </button>
          )}
          {answered && (
            <Feedback ok={typedRight}>
              {typedRight ? "Right." : "Not quite."} Answer:{" "}
              <span lang="ko" className="ko text-ink">
                {q.blank.answers.join(" / ")}
              </span>
            </Feedback>
          )}
        </form>
      ) : (
        <ul className="space-y-2">
          {q.options.map((opt, i) => {
            const state = !answered ? "idle" : i === q.answer ? "right" : i === picked ? "wrong" : "dim";
            return (
              <li key={`${i}:${opt}`}>
                <button
                  disabled={answered}
                  onClick={() => {
                    setPicked(i);
                    onAnswer(i === q.answer);
                  }}
                  lang={q.optionsKorean ? "ko" : undefined}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors ${q.optionsKorean ? "ko text-lg" : ""} ${
                    state === "right"
                      ? "border-good/60 bg-good/10"
                      : state === "wrong"
                        ? "border-bad/60 bg-bad/10"
                        : state === "dim"
                          ? "border-line opacity-50"
                          : "border-line bg-white/4 hover:bg-white/8"
                  }`}
                >
                  <span className="flex-1">{opt}</span>
                  {state === "right" && <Check size={18} className="text-good" aria-label="Correct answer" />}
                  {state === "wrong" && <X size={18} className="text-bad" aria-label="Your answer" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {answered && !q.blank && (
        <Feedback ok={picked === q.answer}>
          {picked === q.answer ? "Right." : "Not quite."} {q.why}
        </Feedback>
      )}
    </div>
  );
}

function Feedback({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <p role="status" className={`rise rounded-xl px-3 py-2.5 text-sm ${ok ? "bg-good/10 text-good" : "bg-bad/10 text-bad"}`}>
      {children}
    </p>
  );
}

function Results({ result, onRetake, done }: { result: QuizResult; onRetake: () => void; done: React.ReactNode }) {
  const pct = Math.round((result.correct / result.total) * 100);
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2 pt-4">
        <p className={`text-5xl font-bold ${result.passed ? "text-good" : "text-accent"}`}>{pct}%</p>
        <p className="text-muted">
          {result.correct} of {result.total} right
        </p>
        <p className="text-lg font-semibold">{result.passed ? "Passed." : `Not yet. You need ${Math.round(QUIZ_PASS * 100)}% to pass.`}</p>
      </div>

      {result.missed.length > 0 && (
        <section className="space-y-2 text-left" aria-labelledby="missed-h">
          <h2 id="missed-h" className="text-xs font-semibold tracking-wider text-faint uppercase">
            To go over
          </h2>
          <ul className="divide-y divide-line rounded-2xl border border-line">
            {result.missed.map((q) => (
              <li key={q.id} className="px-4 py-3">
                <p className="text-sm text-muted">{q.prompt}</p>
                {q.korean && (
                  <p lang="ko" className="ko font-semibold">
                    {q.korean.ko}
                  </p>
                )}
                {q.stem && (
                  <p lang="ko" className="ko font-semibold">
                    {q.stem}
                  </p>
                )}
                <p lang={q.optionsKorean ? "ko" : undefined} className={`text-good ${q.optionsKorean ? "ko" : ""}`}>
                  {q.blank ? q.blank.answers.join(" / ") : q.options[q.answer]}
                </p>
              </li>
            ))}
          </ul>
          {result.missed.some((q) => q.source) && <p className="text-xs text-faint">Missed cards and words are on your To learn list.</p>}
        </section>
      )}

      <div className="space-y-2">
        {done}
        <button
          onClick={onRetake}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-semibold ${
            result.passed ? "bg-white/6 text-ink" : "bg-accent text-accent-ink"
          }`}
        >
          <RotateCcw size={17} /> Retake with new questions
        </button>
      </div>
    </div>
  );
}
