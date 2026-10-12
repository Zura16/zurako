import { buildCatalog, validateCatalog, type Catalog } from "@/content/catalog";
import { levelValue, type LevelName, type SpeechLevel } from "@/content/schema";
import { detectSpeechLevel } from "@/lib/speech/evaluate";

/**
 * Constrained content generation.
 *
 * An LLM never edits the curriculum directly. It receives a narrow request
 * (target grammar, known grammar, allowed vocabulary, speech level, topic,
 * level ceiling) and must return content in the same schema as hand-authored
 * units. validateGenerated() then rejects anything that:
 *   - fails the content schema or catalog integrity checks,
 *   - invents concepts that aren't in the canonical inventory,
 *   - uses grammar the learner hasn't met (other than the target),
 *   - uses vocabulary outside the allowed frequency bands,
 *   - is at the wrong speech level or above the level ceiling,
 *   - doesn't actually teach the target grammar.
 * Content that passes is marked "generated" and still waits for human review
 * before it joins the canonical curriculum.
 *
 * Nothing in the app calls an LLM yet; this module defines the contract.
 */

export type GenerationRequest = {
  targetLevel: LevelName;
  targetGrammar: string;
  knownGrammar: string[];
  /** Vocabulary frequency bands allowed; anything rarer is rejected. */
  vocabularyBands: ("core" | "common" | "less-common")[];
  speechLevel: SpeechLevel;
  topic: string;
  cardTypes: ("PHRASE" | "FILL_BLANK" | "LISTENING" | "SPEAKING")[];
  count: number;
};

export type GeneratedUnit = { sentences: unknown[]; cards: unknown[] };

export type ValidationResult = { ok: true; problems: [] } | { ok: false; problems: string[] };

const SPEECH_NAME: Record<SpeechLevel, string> = { CASUAL: "반말 (해체)", POLITE: "해요체", FORMAL: "하십시오체" };

export function buildPrompt(req: GenerationRequest, catalog: Catalog): string {
  const target = catalog.concepts.get(req.targetGrammar);
  const vocab = [...catalog.concepts.values()]
    .filter((c) => c.kind === "VOCAB" && req.vocabularyBands.includes(c.details.frequency ?? "less-common"))
    .map((c) => `${c.id} (${c.meaning})`);
  return [
    `Write ${req.count} short, natural Korean learning items as JSON: {"sentences": Sentence[], "cards": Card[]}.`,
    `Target grammar: ${target?.id} ${target?.label}: ${target?.meaning}.`,
    `Grammar the learner already knows (you may use only these plus the target): ${req.knownGrammar.join(", ")}.`,
    `Speech level for every sentence: ${SPEECH_NAME[req.speechLevel]}.`,
    `Topic: ${req.topic}. Level ceiling: ${req.targetLevel}. Card types: ${req.cardTypes.join(", ")}.`,
    `Use only these vocabulary concept ids in segment "concepts" (plus grammar ids above): ${vocab.join("; ")}.`,
    `Sentences must sound like something a Korean speaker would actually say in this situation. No textbook-only phrasing.`,
    `Split each sentence into segments whose texts, joined by single spaces, equal the sentence without punctuation.`,
    `Prefix ids with "s.gen-" for sentences and "k.gen-" for cards. Every card must list "${req.targetGrammar}" in "teaches".`,
  ].join("\n");
}

export function validateGenerated(
  unit: GeneratedUnit,
  req: GenerationRequest,
  canonical: { concepts: unknown[]; units: GeneratedUnit[] },
): ValidationResult {
  let merged: Catalog;
  try {
    merged = buildCatalog(canonical.concepts, [...canonical.units, unit]);
  } catch (e) {
    return { ok: false, problems: [`schema: ${e instanceof Error ? e.message.slice(0, 300) : String(e)}`] };
  }

  const problems: string[] = [];
  const genSentenceIds = new Set(unit.sentences.map((s) => (s as { id?: string }).id));
  const genCardIds = new Set(unit.cards.map((c) => (c as { id?: string }).id));
  const allowedGrammar = new Set([...req.knownGrammar, req.targetGrammar]);
  const ceiling = levelValue(req.targetLevel);

  // Integrity problems that involve generated content only.
  for (const p of validateCatalog(merged)) {
    if ([...genSentenceIds, ...genCardIds].some((id) => id && p.startsWith(`${id}:`))) problems.push(p);
  }

  for (const id of genSentenceIds) {
    const s = id ? merged.sentences.get(id) : undefined;
    if (!s) continue;
    if (!id!.startsWith("s.gen-")) problems.push(`${id}: generated sentence ids must start with s.gen-`);
    if (s.speechLevel !== req.speechLevel || detectSpeechLevel(s.korean) !== req.speechLevel) {
      problems.push(`${id}: expected ${SPEECH_NAME[req.speechLevel]}`);
    }
    if (levelValue(s.level) > ceiling) problems.push(`${id}: above level ceiling ${req.targetLevel}`);
    for (const seg of s.segments) {
      for (const cid of seg.concepts) {
        const c = merged.concepts.get(cid);
        if (!c) continue; // reported by integrity checks
        if (c.kind === "GRAMMAR" && !allowedGrammar.has(cid)) problems.push(`${id}: uses grammar ${cid} the learner hasn't met`);
        if (c.kind === "VOCAB" && !req.vocabularyBands.includes(c.details.frequency ?? "less-common")) {
          problems.push(`${id}: vocabulary ${cid} is outside the allowed frequency bands`);
        }
      }
    }
  }

  for (const id of genCardIds) {
    const card = id ? merged.cards.get(id) : undefined;
    if (!card) continue;
    if (!id!.startsWith("k.gen-")) problems.push(`${id}: generated card ids must start with k.gen-`);
    if (!(req.cardTypes as string[]).includes(card.type)) problems.push(`${id}: card type ${card.type} wasn't requested`);
    if (!card.teaches.includes(req.targetGrammar)) problems.push(`${id}: must teach ${req.targetGrammar}`);
    if (card.levelValue > ceiling) problems.push(`${id}: above level ceiling ${req.targetLevel}`);
  }

  return problems.length ? { ok: false, problems } : { ok: true, problems: [] };
}
