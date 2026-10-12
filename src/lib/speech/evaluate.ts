import type { Payload, Sentence, SpeechLevel } from "@/content/schema";
import { stripPunctuation } from "@/content/schema";
import type { SpeakingGrade } from "@/lib/learner/events";

/**
 * Answer evaluation for speaking and typed answers. Several natural answers
 * are accepted per prompt; the learner's answer is compared against each, and
 * required forms (e.g. past tense 갔) are checked separately so feedback can
 * say what was right as well as what was off. Pronunciation is not scored:
 * a transcript cannot measure it honestly.
 */

export const normalize = (text: string) => stripPunctuation(text).replace(/\s+/g, "");

export function similarity(a: string, b: string): number {
  const x = normalize(a);
  const y = normalize(b);
  if (!x && !y) return 1;
  return 1 - levenshtein(x, y) / Math.max(x.length, y.length);
}

function levenshtein(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

/** Guess the speech level from the sentence ending. */
export function detectSpeechLevel(text: string): SpeechLevel {
  const t = normalize(text);
  if (/(니다|니까|십시오|읍시다|ㅂ시다)$/.test(t)) return "FORMAL";
  if (/요$/.test(t)) return "POLITE";
  return "CASUAL";
}

export type SpeakingResult = {
  grade: SpeakingGrade;
  /** Closest accepted answer. */
  closest: Sentence;
  similarity: number;
  checks: { label: string; passed: boolean }[];
  detectedLevel: SpeechLevel;
  levelNote: string | null;
};

const LEVEL_NAME: Record<SpeechLevel, string> = { CASUAL: "반말", POLITE: "해요체", FORMAL: "하십시오체" };

export function evaluateSpeaking(transcripts: string[], payload: Payload<"SPEAKING">, sentences: Map<string, Sentence>): SpeakingResult {
  const accepted = payload.accepted.map((id) => sentences.get(id)).filter((s): s is Sentence => !!s);
  let best = { transcript: transcripts[0] ?? "", closest: accepted[0], sim: -1 };
  for (const t of transcripts) {
    for (const s of accepted) {
      const sim = similarity(t, s.korean);
      if (sim > best.sim) best = { transcript: t, closest: s, sim };
    }
  }

  const said = normalize(best.transcript);
  const checks = payload.checks.map((c) => ({ label: c.label, passed: c.anyOf.some((form) => said.includes(normalize(form))) }));
  const allChecks = checks.every((c) => c.passed);

  const grade: SpeakingGrade =
    best.sim >= 0.85 || (allChecks && best.sim >= 0.7) ? "good" : allChecks || best.sim >= 0.55 ? "close" : "miss";

  const detectedLevel = detectSpeechLevel(best.transcript);
  const target = best.closest?.speechLevel;
  const wrongLevel = target !== undefined && said.length > 0 && detectedLevel !== target;
  const levelNote = wrongLevel
    ? `That ending sounds like ${LEVEL_NAME[detectedLevel]}. This prompt called for ${LEVEL_NAME[target]}.`
    : null;

  // Right words at the wrong speech level is a social mistake, so it can't be "good".
  return {
    grade: wrongLevel && grade === "good" ? "close" : grade,
    closest: best.closest,
    similarity: Math.max(0, best.sim),
    checks,
    detectedLevel,
    levelNote,
  };
}

/** Transform cards: does the built tile sequence match any accepted answer? */
export function matchTiles(tiles: string[], accepted: Sentence[]): Sentence | null {
  const built = normalize(tiles.join(" "));
  return accepted.find((s) => normalize(s.korean) === built) ?? null;
}

/**
 * Free-form speaking check against plain model texts (Learn-tab prompts,
 * which have no catalog sentence or required forms).
 */
export function evaluateAgainst(transcripts: string[], models: string[]): { grade: SpeakingGrade; heard: string; similarity: number } {
  let best = { heard: transcripts[0] ?? "", similarity: 0 };
  for (const t of transcripts)
    for (const m of models) {
      const sim = similarity(t, m);
      if (sim > best.similarity) best = { heard: t, similarity: sim };
    }
  const grade: SpeakingGrade = best.similarity >= 0.85 ? "good" : best.similarity >= 0.6 ? "close" : "miss";
  return { grade, ...best };
}
