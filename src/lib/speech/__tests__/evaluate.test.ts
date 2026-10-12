import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { payloadOf } from "@/content/schema";
import { detectSpeechLevel, evaluateSpeaking, matchTiles } from "../evaluate";

const speakSchool = catalog.cards.get("k.speak-school")!;
const payload = payloadOf("SPEAKING", speakSchool.payload);

describe("evaluateSpeaking", () => {
  it("accepts every listed natural answer, with or without particles", () => {
    expect(evaluateSpeaking(["어제 학교에 갔어요"], payload, catalog.sentences).grade).toBe("good");
    expect(evaluateSpeaking(["어제 학교 갔어요."], payload, catalog.sentences).grade).toBe("good");
  });

  it("gives credit for the right forms even when wording differs, and flags the speech level", () => {
    const r = evaluateSpeaking(["어제 학교 갔어"], payload, catalog.sentences);
    expect(r.grade).toBe("good");
    expect(r.checks.every((c) => c.passed)).toBe(true);
    expect(r.levelNote).toMatch(/반말/);
  });

  it("marks a wrong tense as close, not correct", () => {
    const r = evaluateSpeaking(["어제 학교에 가요"], payload, catalog.sentences);
    expect(r.grade).toBe("close");
    expect(r.checks.find((c) => c.label === "Past tense")?.passed).toBe(false);
  });

  it("misses an unrelated answer and picks the best of several transcripts", () => {
    expect(evaluateSpeaking(["안녕하세요"], payload, catalog.sentences).grade).toBe("miss");
    expect(evaluateSpeaking(["안녕하세요", "어제 학교에 갔어요"], payload, catalog.sentences).grade).toBe("good");
  });
});

describe("detectSpeechLevel", () => {
  it("reads the ending", () => {
    expect(detectSpeechLevel("뭐 해?")).toBe("CASUAL");
    expect(detectSpeechLevel("뭐 해요?")).toBe("POLITE");
    expect(detectSpeechLevel("무엇을 하십니까?")).toBe("FORMAL");
  });
});

describe("matchTiles", () => {
  it("accepts any of several correct orders", () => {
    const accepted = ["s.home-casual", "s.home-casual-e"].map((id) => catalog.sentences.get(id)!);
    expect(matchTiles(["나", "집", "가"], accepted)?.id).toBe("s.home-casual");
    expect(matchTiles(["나", "집에", "가"], accepted)?.id).toBe("s.home-casual-e");
    expect(matchTiles(["저는", "집에", "갑니다"], accepted)).toBeNull();
  });
});
