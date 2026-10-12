import {
  ConceptSchema,
  SentenceSchema,
  levelValue,
  parseCard,
  sentenceRefs,
  stripPunctuation,
  type CardDef,
  type CardType,
  type Concept,
  type Sentence,
  type Skill,
} from "./schema";

export type ConceptRole = "TEACH" | "USE";

/** A card as the app consumes it: authored fields plus derived concept links. */
export type Card = CardDef & {
  levelValue: number;
  concepts: { id: string; role: ConceptRole }[];
  sentenceIds: string[];
};

export type Catalog = {
  concepts: Map<string, Concept>;
  sentences: Map<string, Sentence>;
  cards: Map<string, Card>;
  /** Sentences sharing a variant group, e.g. casual/polite/formal versions. */
  variants: Map<string, Sentence[]>;
};

type RawUnit = { sentences: unknown[]; cards: unknown[] };

/**
 * Build the in-memory catalog. Parses everything through the content schema,
 * so malformed content fails loudly at startup and in tests.
 */
export function buildCatalog(rawConcepts: unknown[], units: RawUnit[]): Catalog {
  const concepts = new Map<string, Concept>();
  for (const raw of rawConcepts) {
    const c = ConceptSchema.parse(raw);
    if (concepts.has(c.id)) throw new Error(`Duplicate concept ${c.id}`);
    concepts.set(c.id, c);
  }

  const sentences = new Map<string, Sentence>();
  const variants = new Map<string, Sentence[]>();
  const cards = new Map<string, Card>();

  for (const unit of units) {
    for (const raw of unit.sentences) {
      const sentence = SentenceSchema.parse(raw);
      if (sentences.has(sentence.id)) throw new Error(`Duplicate sentence ${sentence.id}`);
      sentences.set(sentence.id, sentence);
      if (sentence.variantGroup) {
        variants.set(sentence.variantGroup, [...(variants.get(sentence.variantGroup) ?? []), sentence]);
      }
    }
  }

  for (const unit of units) {
    for (const raw of unit.cards) {
      const def = parseCard(raw);
      if (cards.has(def.id)) throw new Error(`Duplicate card ${def.id}`);
      const sentenceIds = sentenceRefs(def);
      const links = new Map<string, ConceptRole>();
      for (const id of def.teaches) links.set(id, "TEACH");
      for (const id of conceptRefsInPayload(def)) links.set(id, "TEACH");
      for (const sid of sentenceIds) {
        for (const seg of sentences.get(sid)?.segments ?? []) {
          for (const id of seg.concepts) if (!links.has(id)) links.set(id, "USE");
        }
      }
      cards.set(def.id, {
        ...def,
        levelValue: levelValue(def.level),
        concepts: [...links].map(([id, role]) => ({ id, role })),
        sentenceIds,
      });
    }
  }

  return { concepts, sentences, cards, variants };
}

function conceptRefsInPayload(card: CardDef): string[] {
  const p = card.payload as { concept?: string };
  return p.concept ? [p.concept] : [];
}

/**
 * Cross-reference checks the schema can't express. Returns human-readable
 * problems; an empty list means the catalog is consistent.
 */
export function validateCatalog(catalog: Catalog): string[] {
  const problems: string[] = [];
  const { concepts, sentences, cards } = catalog;

  for (const c of concepts.values()) {
    for (const pre of c.prerequisites) {
      if (!concepts.has(pre)) problems.push(`${c.id}: unknown prerequisite ${pre}`);
    }
  }

  for (const s of sentences.values()) {
    const joined = s.segments.map((seg) => seg.text).join(" ");
    if (joined !== stripPunctuation(s.korean)) {
      problems.push(`${s.id}: segments "${joined}" do not rebuild "${stripPunctuation(s.korean)}"`);
    }
    for (const seg of s.segments) {
      for (const id of seg.concepts) if (!concepts.has(id)) problems.push(`${s.id}: unknown concept ${id}`);
    }
  }

  for (const card of cards.values()) {
    for (const sid of card.sentenceIds) {
      if (!sentences.has(sid)) problems.push(`${card.id}: unknown sentence ${sid}`);
    }
    for (const { id } of card.concepts) {
      if (!concepts.has(id)) problems.push(`${card.id}: unknown concept ${id}`);
    }
    problems.push(...checkPayload(card, catalog));
  }
  return problems;
}

function checkPayload(card: Card, { sentences }: Catalog): string[] {
  const out: string[] = [];
  const ko = (id: string) => sentences.get(id)?.korean ?? "";
  const oneCorrect = (opts: { correct: boolean }[]) => {
    const n = opts.filter((o) => o.correct).length;
    if (n !== 1) out.push(`${card.id}: expected exactly one correct option, found ${n}`);
  };

  switch (card.type) {
    case "LISTENING": {
      const { options, answer, sentence } = card.payload;
      if (answer >= options.length) out.push(`${card.id}: answer index out of range`);
      const opt = options[answer] ?? "";
      if (/[가-힣]/.test(opt) && !/[A-Za-z]/.test(opt) && stripPunctuation(opt) !== stripPunctuation(ko(sentence))) {
        out.push(`${card.id}: Korean answer option does not match the audio sentence`);
      }
      break;
    }
    case "FILL_BLANK": {
      const { sentence, blank, options } = card.payload;
      const text = ko(sentence);
      if (text.split(blank).length !== 2) out.push(`${card.id}: blank "${blank}" must appear exactly once`);
      if (!options.includes(blank)) out.push(`${card.id}: options must include the blank`);
      break;
    }
    case "TRANSFORM": {
      const { tiles, accepted } = card.payload;
      for (const id of accepted) {
        const words = stripPunctuation(ko(id)).split(" ");
        const pool = [...tiles];
        for (const word of words) {
          const i = pool.indexOf(word);
          if (i < 0) out.push(`${card.id}: accepted answer ${id} needs tile "${word}"`);
          else pool.splice(i, 1);
        }
      }
      break;
    }
    case "MULTIPLE_CHOICE":
    case "MISTAKE":
      oneCorrect(card.payload.options);
      break;
    case "STORY":
      if (card.payload.check) oneCorrect(card.payload.check.options);
      if (!card.story) out.push(`${card.id}: story cards need story metadata`);
      break;
    case "DIALOGUE":
      for (const line of card.payload.lines) {
        if (!(line.speaker in card.payload.speakers)) out.push(`${card.id}: unknown speaker ${line.speaker}`);
      }
      break;
  }
  return out;
}

export function cardsOfType<T extends CardType>(catalog: Catalog, type: T) {
  return [...catalog.cards.values()].filter((c): c is Extract<Card, { type: T }> => c.type === type);
}

export function primarySkill(card: Card): Skill {
  return card.skills[0];
}
