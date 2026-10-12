import { z } from "zod";
import { LEVELS } from "../schema";

/**
 * Lessons for the Learn tab: structured versions of the course documents.
 * Unlike feed cards, a lesson is read top to bottom, like a short chapter,
 * with interactive practice at the end.
 */

/** One Korean line with its meaning. `sid` links a catalog sentence for the tappable breakdown. */
export const LineSchema = z.object({
  ko: z.string(),
  en: z.string(),
  rom: z.string().optional(),
  note: z.string().optional(),
  sid: z.string().regex(/^s\./).optional(),
  /** What text-to-speech should read when it differs from the written form ("7시" → "일곱 시"). */
  spoken: z.string().optional(),
});
export type Line = z.infer<typeof LineSchema>;

const Callout = z.object({
  kind: z.literal("callout"),
  tone: z.enum(["pattern", "tip", "important", "remember"]),
  title: z.string(),
  text: z.string().optional(),
  bullets: z.array(z.string()).default([]),
  examples: z.array(LineSchema).default([]),
});

export const BlockSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("phrases"), rows: z.array(LineSchema).min(1) }),
  z.object({
    kind: z.literal("pairs"),
    /** Plain form → honorific/humble/special form, e.g. 먹다 → 드시다. */
    rows: z.array(z.object({ from: z.string(), to: z.string(), en: z.string(), rom: z.string().optional() })).min(1),
  }),
  z.object({
    kind: z.literal("types"),
    rows: z
      .array(z.object({ name: z.string(), korean: z.string(), forms: z.string(), use: z.string(), example: LineSchema.optional() }))
      .min(1),
  }),
  Callout,
  z.object({
    kind: z.literal("dialogue"),
    title: z.string(),
    lines: z.array(LineSchema.extend({ speaker: z.string() })).min(2),
  }),
  z.object({ kind: z.literal("speaking"), prompts: z.array(LineSchema).min(1) }),
  z.object({
    kind: z.literal("choose"),
    items: z.array(z.object({ en: z.string(), options: z.array(z.string()).min(2), answer: z.number().int().min(0) })).min(1),
  }),
  z.object({ kind: z.literal("match"), pairs: z.array(z.object({ ko: z.string(), en: z.string() })).min(2) }),
  z.object({
    kind: z.literal("fill"),
    items: z
      .array(
        z.object({
          before: z.string(),
          after: z.string(),
          /** Every accepted answer for the blank. */
          answers: z.array(z.string()).min(1),
          en: z.string(),
          hint: z.string().optional(),
        }),
      )
      .min(1),
  }),
]);
export type Block = z.infer<typeof BlockSchema>;

export const LessonSchema = z.object({
  id: z.string().regex(/^lesson\./),
  number: z.string(),
  title: z.string(),
  korean: z.string(),
  goal: z.string(),
  level: z.enum(LEVELS),
  /** Catalog concepts the lesson introduces; finishing the lesson feeds them into review. */
  teaches: z.array(z.string()).default([]),
  /** Changes made to the source document, shown to editors. */
  corrections: z.array(z.string()).default([]),
  sections: z.array(z.object({ title: z.string(), emoji: z.string().optional(), blocks: z.array(BlockSchema).min(1) })).min(1),
});
export type Lesson = z.infer<typeof LessonSchema>;
export type LessonInput = z.input<typeof LessonSchema>;

/** Every Korean string in a lesson as it should be spoken, for audio generation. */
export function lessonKorean(lesson: Lesson): string[] {
  const out: string[] = [];
  const line = (l: { ko: string; spoken?: string }) => out.push(l.spoken ?? l.ko);
  for (const section of lesson.sections) {
    for (const b of section.blocks) {
      switch (b.kind) {
        case "phrases":
          b.rows.forEach(line);
          break;
        case "speaking":
          b.prompts.forEach(line);
          break;
        case "pairs":
          b.rows.forEach((r) => out.push(r.from, r.to));
          break;
        case "types":
          b.rows.forEach((r) => r.example && line(r.example));
          break;
        case "callout":
          b.examples.forEach(line);
          break;
        case "dialogue":
          b.lines.forEach(line);
          break;
        case "match":
          b.pairs.forEach(line);
          break;
        case "choose":
          break;
        case "fill":
          b.items.forEach((i) => out.push(`${i.before}${i.answers[0]}${i.after}`));
          break;
      }
    }
  }
  return [...new Set(out.map((t) => t.trim()).filter(Boolean))];
}
