"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Keyboard, Mic, Square, X } from "lucide-react";
import { catalog } from "@/content";
import type { Card } from "@/content/catalog";
import { payloadOf, type Sentence } from "@/content/schema";
import type { SpeakingGrade } from "@/lib/learner/events";
import { evaluateSpeaking, type SpeakingResult } from "@/lib/speech/evaluate";
import { listenKorean, recognitionSupported, type Listening } from "@/lib/speech/recognizer";
import { useLearner } from "@/components/providers/LearnerProvider";
import { AudioButton } from "@/components/ui/AudioButton";
import { SpeechTag } from "@/components/ui/tags";
import { Heading } from "./shared";

type Mode = "idle" | "listening" | "typing" | "self" | "result";

const GRADE_TEXT: Record<SpeakingGrade, { label: string; color: string }> = {
  good: { label: "Natural, nice", color: "text-good" },
  close: { label: "Close", color: "text-accent" },
  miss: { label: "Not yet", color: "text-bad" },
};

/**
 * Speaking practice. Several natural answers are accepted. With browser speech
 * recognition the answer is transcribed and checked; without it, the learner
 * can type it or compare against the model answers and rate themselves.
 */
export function SpeakingCard({ card }: { card: Card }) {
  const p = payloadOf("SPEAKING", card.payload);
  const accepted = p.accepted.map((id) => catalog.sentences.get(id)!);
  const { track } = useLearner();
  const [mode, setMode] = useState<Mode>("idle");
  const [heard, setHeard] = useState<string | null>(null);
  const [result, setResult] = useState<SpeakingResult | null>(null);
  const [selfGrade, setSelfGrade] = useState<SpeakingGrade | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [canListen, setCanListen] = useState(false);
  const session = useRef<Listening | null>(null);

  useEffect(() => {
    setCanListen(recognitionSupported());
    return () => session.current?.stop();
  }, []);

  const finish = (transcripts: string[], method: "recognition" | "typed") => {
    const r = evaluateSpeaking(transcripts, p, catalog.sentences);
    setHeard(transcripts[0] ?? "");
    setResult(r);
    setMode("result");
    track({ type: "speaking_completed", cardId: card.id, grade: r.grade, method });
  };

  const startMic = async () => {
    setError(null);
    track({ type: "speaking_started", cardId: card.id });
    try {
      const s = listenKorean();
      session.current = s;
      setMode("listening");
      const transcripts = await s.result;
      session.current = null;
      if (transcripts.length === 0) {
        setMode("idle");
        setError("Didn't catch that. Try again, or type it.");
        return;
      }
      finish(transcripts, "recognition");
    } catch (e) {
      setMode("idle");
      setError(e instanceof Error ? e.message : "The microphone isn't available.");
    }
  };

  const target = accepted[0].speechLevel;

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium text-accent">Say it in Korean</p>
      <Heading>{p.prompt}</Heading>
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {target && <SpeechTag level={target} showKorean />}
        {p.context && <span>{p.context}</span>}
      </div>

      {(mode === "idle" || mode === "listening") && (
        <div className="flex flex-col items-center gap-4 py-2">
          {canListen ? (
            <button
              onClick={mode === "listening" ? () => session.current?.stop() : startMic}
              aria-label={mode === "listening" ? "Stop recording" : "Start speaking"}
              className={`flex h-20 w-20 items-center justify-center rounded-full transition-colors ${
                mode === "listening" ? "animate-pulse bg-bad text-white" : "bg-accent text-accent-ink"
              }`}
            >
              {mode === "listening" ? <Square size={26} /> : <Mic size={30} />}
            </button>
          ) : (
            <p className="text-center text-sm text-faint">
              Speech recognition isn&apos;t available in this browser. Type your answer or say it aloud and compare.
            </p>
          )}
          {mode === "listening" && (
            <p className="text-sm text-muted" aria-live="polite">
              Listening…
            </p>
          )}
          {error && (
            <p className="text-sm text-bad" role="alert">
              {error}
            </p>
          )}
          <div className="flex gap-4 text-sm">
            <button onClick={() => setMode("typing")} className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
              <Keyboard size={15} /> Type it
            </button>
            <button onClick={() => setMode("self")} className="text-muted hover:text-ink">
              Say it aloud &amp; compare
            </button>
          </div>
        </div>
      )}

      {mode === "typing" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (typed.trim()) finish([typed], "typed");
          }}
          className="space-y-3"
        >
          <input
            autoFocus
            lang="ko"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="한국어로 입력하세요"
            aria-label="Your answer in Korean"
            className="ko w-full rounded-2xl border border-line bg-white/5 px-4 py-3.5 text-xl outline-none focus:border-accent"
          />
          <button type="submit" className="w-full rounded-2xl bg-accent py-3.5 font-semibold text-accent-ink">
            Check
          </button>
        </form>
      )}

      {mode === "self" && (
        <div className="rise space-y-4">
          <AnswerList accepted={accepted} cardId={card.id} />
          {selfGrade === null ? (
            <div className="grid grid-cols-3 gap-2">
              {(["miss", "close", "good"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setSelfGrade(g);
                    track({ type: "speaking_completed", cardId: card.id, grade: g, method: "self" });
                  }}
                  className={`rounded-2xl py-3 text-sm font-semibold ${g === "good" ? "bg-accent text-accent-ink" : "bg-white/6 hover:bg-white/10"}`}
                >
                  {g === "good" ? "Nailed it" : g === "close" ? "Close" : "Missed"}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">Logged. Speaking it out loud is what makes it stick.</p>
          )}
        </div>
      )}

      {mode === "result" && result && (
        <div className="rise space-y-4" aria-live="polite">
          <p className={`text-lg font-semibold ${GRADE_TEXT[result.grade].color}`}>{GRADE_TEXT[result.grade].label}</p>
          {heard && (
            <p className="text-sm text-muted">
              We heard:{" "}
              <span lang="ko" className="ko text-base text-ink">
                {heard}
              </span>
            </p>
          )}
          {result.checks.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {result.checks.map((c) => (
                <li
                  key={c.label}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${c.passed ? "bg-good/10 text-good" : "bg-bad/10 text-bad"}`}
                >
                  {c.passed ? <Check size={12} /> : <X size={12} />} {c.label}
                </li>
              ))}
            </ul>
          )}
          {result.levelNote && <p className="text-sm text-accent">{result.levelNote}</p>}
          <AnswerList accepted={accepted} cardId={card.id} highlight={result.closest.id} />
          <p className="text-xs text-faint">Pronunciation isn&apos;t scored. Play the model answer and shadow it.</p>
          <button
            onClick={() => {
              setMode("idle");
              setResult(null);
              setTyped("");
            }}
            className="text-sm text-muted hover:text-ink"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

function AnswerList({ accepted, cardId, highlight }: { accepted: Sentence[]; cardId: string; highlight?: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold tracking-wider text-faint uppercase">
        {accepted.length > 1 ? "Natural answers" : "Model answer"}
      </p>
      <ul className="space-y-2">
        {accepted.map((s) => (
          <li key={s.id} className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 ${highlight === s.id ? "bg-good/10" : "bg-white/4"}`}>
            <span lang="ko" className="ko flex-1 text-lg font-semibold">
              {s.korean}
            </span>
            <AudioButton sentence={s} cardId={cardId} size="sm" />
          </li>
        ))}
      </ul>
    </div>
  );
}
