"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ArrowRight, Check, Keyboard, Lightbulb, Mic, Sparkles, Square, X } from "lucide-react";
import type { Block } from "@/content/lessons/schema";
import { normalize } from "@/lib/speech/evaluate";
import { evaluateAgainst } from "@/lib/speech/evaluate";
import { listenKorean, recognitionSupported } from "@/lib/speech/recognizer";
import type { SpeakingGrade } from "@/lib/learner/events";
import { useSettings } from "@/components/providers/SettingsProvider";
import { AudioButton } from "@/components/ui/AudioButton";
import { KoreanLine } from "./KoreanLine";

export function BlockView({ block, itemId }: { block: Block; itemId: string }) {
  switch (block.kind) {
    case "phrases":
      return (
        <ul className="divide-y divide-line rounded-2xl border border-line">
          {block.rows.map((line, i) => (
            <li key={i} className="px-4 py-3">
              <KoreanLine line={line} itemId={itemId} />
            </li>
          ))}
        </ul>
      );
    case "pairs":
      return <Pairs block={block} itemId={itemId} />;
    case "types":
      return (
        <ol className="space-y-3">
          {block.rows.map((row, i) => (
            <li key={row.name} className="rounded-2xl border border-line p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-accent">{i + 1}</span>
                <h4 className="font-semibold">{row.name}</h4>
                <span lang="ko" className="ko text-sm text-faint">
                  {row.korean}
                </span>
              </div>
              <p lang="ko" className="ko mt-1.5 text-sm font-semibold text-accent">
                {row.forms}
              </p>
              <p className="mt-1 text-sm text-muted">{row.use}</p>
              {row.example && (
                <div className="mt-3 rounded-xl bg-white/4 px-3 py-2.5">
                  <KoreanLine line={row.example} itemId={itemId} />
                </div>
              )}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return <Callout block={block} itemId={itemId} />;
    case "dialogue":
      return <Dialogue block={block} itemId={itemId} />;
    case "speaking":
      return <Speaking block={block} itemId={itemId} />;
    case "match":
      return <Match block={block} />;
    case "choose":
      return <Choose block={block} />;
    case "fill":
      return <Fill block={block} />;
  }
}

function Pairs({ block, itemId }: { block: Extract<Block, { kind: "pairs" }>; itemId: string }) {
  const { settings } = useSettings();
  return (
    <ul className="divide-y divide-line rounded-2xl border border-line">
      {block.rows.map((r, i) => (
        <li key={i} className="flex items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p lang="ko" className="ko flex flex-wrap items-center gap-2 text-lg">
              <span className="text-muted">{r.from}</span>
              <ArrowRight size={14} className="text-faint" aria-label="becomes" />
              <span className="font-semibold text-accent">{r.to}</span>
            </p>
            {settings.romanization && r.rom && <p className="text-xs tracking-wide text-faint">{r.rom}</p>}
            <p className="text-sm text-muted">{r.en}</p>
          </div>
          <AudioButton sentence={{ korean: r.to }} cardId={itemId} size="sm" />
        </li>
      ))}
    </ul>
  );
}

const CALLOUT = {
  pattern: { icon: Sparkles, label: "Pattern", className: "border-accent/30 bg-accent/5", iconClass: "text-accent" },
  tip: { icon: Lightbulb, label: "Tip", className: "border-polite/30 bg-polite/5", iconClass: "text-polite" },
  important: { icon: AlertCircle, label: "Important", className: "border-bad/30 bg-bad/5", iconClass: "text-bad" },
  remember: { icon: Check, label: "Remember", className: "border-good/30 bg-good/5", iconClass: "text-good" },
} as const;

function Callout({ block, itemId }: { block: Extract<Block, { kind: "callout" }>; itemId: string }) {
  const style = CALLOUT[block.tone];
  const Icon = style.icon;
  return (
    <aside className={`rounded-2xl border p-4 ${style.className}`}>
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Icon size={16} className={style.iconClass} aria-hidden />
        <span className="sr-only">{style.label}: </span>
        {block.title}
      </p>
      {block.text && <p className="ko mt-2 text-[15px] leading-relaxed text-muted">{block.text}</p>}
      {block.bullets.length > 0 && (
        <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-muted">
          {block.bullets.map((b) => (
            <li key={b} className="ko flex gap-2">
              <span className={style.iconClass} aria-hidden>
                •
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {block.examples.length > 0 && (
        <div className="mt-3 space-y-2.5">
          {block.examples.map((ex) => (
            <KoreanLine key={ex.ko} line={ex} itemId={itemId} />
          ))}
        </div>
      )}
    </aside>
  );
}

function Dialogue({ block, itemId }: { block: Extract<Block, { kind: "dialogue" }>; itemId: string }) {
  const speakers = [...new Set(block.lines.map((l) => l.speaker))];
  return (
    <div className="rounded-2xl border border-line p-4">
      <h4 className="mb-3 text-sm font-semibold text-muted">{block.title}</h4>
      <ol className="space-y-3">
        {block.lines.map((line, i) => {
          const right = speakers.indexOf(line.speaker) % 2 === 1;
          return (
            <li key={i} className={`flex ${right ? "justify-end" : ""}`}>
              <div className={`max-w-[92%] rounded-3xl px-4 py-3 ${right ? "rounded-br-md bg-surface-2" : "rounded-bl-md bg-white/6"}`}>
                <p className="mb-1 text-xs font-semibold text-faint">{line.speaker}</p>
                <KoreanLine line={line} itemId={itemId} speaker={speakers.indexOf(line.speaker)} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const GRADE_LABEL: Record<SpeakingGrade, { text: string; className: string }> = {
  good: { text: "Natural, nice", className: "text-good" },
  close: { text: "Close", className: "text-accent" },
  miss: { text: "Not yet", className: "text-bad" },
};

function Speaking({ block, itemId }: { block: Extract<Block, { kind: "speaking" }>; itemId: string }) {
  return (
    <ol className="space-y-3">
      {block.prompts.map((p, i) => (
        <SpeakingPrompt key={i} prompt={p} itemId={itemId} />
      ))}
    </ol>
  );
}

function SpeakingPrompt({ prompt, itemId }: { prompt: Extract<Block, { kind: "speaking" }>["prompts"][number]; itemId: string }) {
  const [mode, setMode] = useState<"idle" | "listening" | "typing" | "done">("idle");
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<ReturnType<typeof evaluateAgainst> | null>(null);
  const [shown, setShown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canListen = typeof window !== "undefined" && recognitionSupported();

  const check = (transcripts: string[]) => {
    setResult(evaluateAgainst(transcripts, [prompt.ko]));
    setMode("done");
    setShown(true);
  };

  return (
    <li className="rounded-2xl border border-line p-4">
      <p className="font-medium">{prompt.en}</p>
      {mode === "typing" ? (
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (typed.trim()) check([typed]);
          }}
        >
          <input
            autoFocus
            lang="ko"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            aria-label="Your answer in Korean"
            className="ko min-w-0 flex-1 rounded-xl border border-line bg-white/5 px-3 py-2 outline-none focus:border-accent"
          />
          <button className="rounded-xl bg-accent px-4 font-semibold text-accent-ink">Check</button>
        </form>
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {canListen && (
            <button
              onClick={async () => {
                setError(null);
                if (mode === "listening") return;
                setMode("listening");
                try {
                  const t = await listenKorean().result;
                  if (t.length) check(t);
                  else {
                    setMode("idle");
                    setError("Didn't catch that. Try again.");
                  }
                } catch (e) {
                  setMode("idle");
                  setError(e instanceof Error ? e.message : "Microphone unavailable.");
                }
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium ${mode === "listening" ? "animate-pulse bg-bad text-white" : "bg-accent text-accent-ink"}`}
            >
              {mode === "listening" ? <Square size={13} /> : <Mic size={14} />} {mode === "listening" ? "Listening…" : "Say it"}
            </button>
          )}
          <button
            onClick={() => setMode("typing")}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/6 px-3 py-1.5 text-muted hover:text-ink"
          >
            <Keyboard size={14} /> Type it
          </button>
          {!shown && (
            <button onClick={() => setShown(true)} className="rounded-full px-3 py-1.5 text-muted hover:text-ink">
              Show answer
            </button>
          )}
        </div>
      )}
      {error && (
        <p className="mt-2 text-sm text-bad" role="alert">
          {error}
        </p>
      )}
      {result && (
        <p className="mt-3 text-sm" aria-live="polite">
          <span className={`font-semibold ${GRADE_LABEL[result.grade].className}`}>{GRADE_LABEL[result.grade].text}</span>
          {result.heard && (
            <span className="text-muted">
              {" "}
              · heard{" "}
              <span lang="ko" className="ko text-ink">
                {result.heard}
              </span>
            </span>
          )}
        </p>
      )}
      {shown && (
        <div className="rise mt-3 rounded-xl bg-white/4 px-3 py-2.5">
          <KoreanLine line={prompt} itemId={itemId} />
        </div>
      )}
    </li>
  );
}

/** Seeded shuffle so the order stays put across renders. */
function shuffle<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let h = seed;
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function Match({ block }: { block: Extract<Block, { kind: "match" }> }) {
  const meanings = useMemo(
    () =>
      shuffle(
        block.pairs.map((p) => p.en),
        7,
      ),
    [block.pairs],
  );
  const [picked, setPicked] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const done = matched.size === block.pairs.length;

  const choose = (en: string) => {
    if (!picked) return;
    const pair = block.pairs.find((p) => p.ko === picked)!;
    if (pair.en === en) {
      setMatched(new Set(matched).add(picked));
      setPicked(null);
    } else {
      setWrong(en);
      setTimeout(() => setWrong(null), 600);
    }
  };

  return (
    <div className="rounded-2xl border border-line p-4">
      <p className="mb-3 text-sm text-muted">Match each word with its meaning. Tap a Korean word, then its meaning.</p>
      <div className="grid grid-cols-2 gap-2">
        <ul className="space-y-2">
          {block.pairs.map((p) => {
            const isDone = matched.has(p.ko);
            return (
              <li key={p.ko}>
                <button
                  disabled={isDone}
                  onClick={() => setPicked(p.ko)}
                  aria-pressed={picked === p.ko}
                  lang="ko"
                  className={`ko w-full rounded-xl border px-3 py-2.5 text-left font-semibold transition-colors ${
                    isDone
                      ? "border-good/50 bg-good/10 text-good"
                      : picked === p.ko
                        ? "border-accent bg-accent/10"
                        : "border-line bg-white/4 hover:bg-white/8"
                  }`}
                >
                  {p.ko}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-2">
          {meanings.map((en) => {
            const isDone = block.pairs.some((p) => p.en === en && matched.has(p.ko));
            return (
              <li key={en}>
                <button
                  disabled={isDone || !picked}
                  onClick={() => choose(en)}
                  className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                    isDone
                      ? "border-good/50 bg-good/10 text-good"
                      : wrong === en
                        ? "border-bad bg-bad/10"
                        : "border-line bg-white/4 hover:bg-white/8 disabled:opacity-60"
                  }`}
                >
                  {en}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {done && (
        <p className="rise mt-3 text-sm font-semibold text-good" role="status">
          All matched.
        </p>
      )}
    </div>
  );
}

function Choose({ block }: { block: Extract<Block, { kind: "choose" }> }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => block.items.map(() => null));
  return (
    <ol className="space-y-3 rounded-2xl border border-line p-4">
      <p className="text-sm text-muted">Choose the correct form.</p>
      {block.items.map((item, i) => (
        <li key={i} className="space-y-2">
          <p className="font-medium">{item.en}</p>
          <div className="flex flex-wrap gap-2">
            {item.options.map((opt, j) => {
              const chosen = picked[i] === j;
              const state = picked[i] === null ? "idle" : j === item.answer ? "right" : chosen ? "wrong" : "dim";
              return (
                <button
                  key={opt}
                  disabled={picked[i] !== null}
                  onClick={() => setPicked(picked.map((p, k) => (k === i ? j : p)))}
                  lang="ko"
                  className={`ko rounded-xl border px-3 py-2 transition-colors ${
                    state === "right"
                      ? "border-good/60 bg-good/10"
                      : state === "wrong"
                        ? "border-bad/60 bg-bad/10"
                        : state === "dim"
                          ? "border-line opacity-50"
                          : "border-line bg-white/4 hover:bg-white/8"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Fill({ block }: { block: Extract<Block, { kind: "fill" }> }) {
  const [values, setValues] = useState<string[]>(() => block.items.map(() => ""));
  const [checked, setChecked] = useState(false);
  const right = block.items.map((item, i) => item.answers.some((a) => normalize(a) === normalize(values[i])));
  return (
    <div className="space-y-3 rounded-2xl border border-line p-4">
      <p className="text-sm text-muted">Fill in the blanks.</p>
      <ol className="space-y-3">
        {block.items.map((item, i) => (
          <li key={i}>
            {/* Inline, so the blank sits flush against the stem when the sentence has no space there (앉_으세요). */}
            <p lang="ko" className="ko text-lg leading-loose whitespace-pre-wrap">
              {item.before}
              <input
                value={values[i]}
                onChange={(e) => {
                  const next = [...values];
                  next[i] = e.target.value;
                  setValues(next);
                  setChecked(false);
                }}
                aria-label={`Blank ${i + 1}: ${item.en}`}
                className={`ko inline-block w-28 rounded-lg border-b-2 bg-white/5 px-2 py-0.5 text-center align-baseline outline-none ${
                  !checked ? "border-accent" : right[i] ? "border-good text-good" : "border-bad text-bad"
                }`}
              />
              {item.after}
              {checked &&
                (right[i] ? (
                  <Check size={16} className="ml-1.5 inline text-good" aria-label="Correct" />
                ) : (
                  <X size={16} className="ml-1.5 inline text-bad" aria-label="Incorrect" />
                ))}
            </p>
            <p className="text-sm text-muted">{item.en}</p>
            {checked && !right[i] && (
              <p className="text-sm text-faint">
                Answer:{" "}
                <span lang="ko" className="ko text-ink">
                  {item.answers.join(" / ")}
                </span>
              </p>
            )}
            {!checked && item.hint && <p className="text-xs text-faint">Hint: {item.hint}</p>}
          </li>
        ))}
      </ol>
      <button onClick={() => setChecked(true)} className="rounded-xl bg-accent px-5 py-2.5 font-semibold text-accent-ink">
        Check answers
      </button>
      {checked && (
        <p className="text-sm text-muted" role="status">
          {right.filter(Boolean).length} of {block.items.length} right.
        </p>
      )}
    </div>
  );
}
