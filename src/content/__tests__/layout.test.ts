import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { layoutSegments } from "@/content/schema";

const layout = (id: string) => layoutSegments(catalog.sentences.get(id)!).map((l) => `${l.before}${l.segment.text}${l.after}`);

describe("layoutSegments", () => {
  it("keeps commas and final punctuation attached to the right chunk", () => {
    expect(layout("s.no-thanks")).toEqual(["아니요,", "괜찮아요."]);
    expect(layout("s.one-moment")).toEqual(["네,", "잠시만", "기다려 주세요."]);
  });

  it("handles multi-sentence lines and texting jamo", () => {
    expect(layout("s.ate-reply")).toEqual(["응,", "먹었어.", "너는?"]);
    expect(layout("s.text-ok")).toEqual(["ㅇㅇ", "알겠어", "ㅎㅎ"]);
  });

  it("rebuilds every sentence in the catalog exactly", () => {
    for (const s of catalog.sentences.values()) {
      expect(
        layoutSegments(s)
          .map((l) => `${l.before}${l.segment.text}${l.after}`)
          .join(" "),
      ).toBe(s.korean);
    }
  });
});
