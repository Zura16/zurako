import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { LESSONS } from "@/content/lessons";
import { lessonKorean } from "@/content/lessons/schema";
import { UNIQUE_WORDS, WORDS, wordOfTheDay } from "@/content/wordbank";
import { stripPunctuation } from "@/content/schema";

describe("lessons", () => {
  it("starts with honorifics, then lessons 001–006 in order", () => {
    expect(LESSONS.map((l) => l.number)).toEqual(["007", "001", "002-1", "002-2", "003", "004", "005", "006"]);
  });

  it("links only to sentences and concepts that exist, and each link matches its line", () => {
    for (const lesson of LESSONS) {
      for (const id of lesson.teaches) expect(catalog.concepts.has(id), `${lesson.id} teaches ${id}`).toBe(true);
      for (const section of lesson.sections) {
        for (const block of section.blocks) {
          const lines =
            block.kind === "phrases"
              ? block.rows
              : block.kind === "dialogue"
                ? block.lines
                : block.kind === "types"
                  ? block.rows.flatMap((r) => (r.example ? [r.example] : []))
                  : block.kind === "callout"
                    ? block.examples
                    : [];
          for (const line of lines) {
            if (!line.sid) continue;
            const s = catalog.sentences.get(line.sid);
            expect(s, `${lesson.id}: ${line.sid}`).toBeDefined();
            expect(stripPunctuation(s!.korean), `${line.sid} text`).toBe(stripPunctuation(line.ko));
          }
        }
      }
    }
  });

  it("has Korean for audio generation", () => {
    expect(lessonKorean(LESSONS[0]).length).toBeGreaterThan(80);
  });
});

describe("word bank", () => {
  it("imports the whole sheet", () => {
    expect(WORDS).toHaveLength(494);
    expect(WORDS.every((w) => /[가-힣]/.test(w.ko) && w.en && !/[가-힣]/.test(w.rom))).toBe(true);
  });

  it("picks the same word all day and a different one tomorrow", () => {
    const today = wordOfTheDay(new Date(2026, 9, 12, 8));
    expect(wordOfTheDay(new Date(2026, 9, 12, 23))).toEqual(today);
    expect(wordOfTheDay(new Date(2026, 9, 13, 8))).not.toEqual(today);
  });

  it("cycles through every word before repeating", () => {
    const seen = new Set(Array.from({ length: UNIQUE_WORDS.length }, (_, d) => wordOfTheDay(new Date(2026, 0, 1 + d)).ko));
    expect(seen.size).toBe(UNIQUE_WORDS.length);
  });
});
