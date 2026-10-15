import { describe, expect, it } from "vitest";
import { PATH } from "@/content/path";
import { hasOwnArt } from "../ChapterArt";

describe("chapter art", () => {
  it("gives every chapter its own picture rather than the category fallback", () => {
    const missing = PATH.flatMap((l) => l.chapters)
      .filter((c) => !hasOwnArt(c.id))
      .map((c) => c.id);
    expect(missing).toEqual([]);
  });
});
