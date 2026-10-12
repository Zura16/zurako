import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { audioFileName, speakableText, speakerVoice } from "../voices";

describe("speakableText", () => {
  it("uses the spoken form when the written one would be misread", () => {
    expect(speakableText(catalog.sentences.get("s.cs-1")!)).toBe("새벽 두 시에 너무 배고팠어요.");
  });

  it("reads texting shorthand the way people say it", () => {
    expect(speakableText(catalog.sentences.get("s.text-ok")!)).toBe("응응 알겠어 흐흐");
    expect(speakableText(catalog.sentences.get("s.text-sad")!)).toBe("나 내일 시험이야");
    expect(speakableText(catalog.sentences.get("s.ok-take-time")!)).toBe("오케이 천천히 와.");
  });

  it("leaves no bare jamo or Latin letters for the voice to stumble on", () => {
    for (const s of catalog.sentences.values()) expect(speakableText(s), s.id).not.toMatch(/[ㄱ-ㅎㅏ-ㅣA-Za-z]/);
  });
});

describe("voices", () => {
  it("gives a dialogue's second speaker a voice of the other gender", () => {
    expect(speakerVoice("Leda", 0)).toBe("Leda");
    expect(speakerVoice("Leda", 1)).toBe("Alnilam");
    expect(speakerVoice("Achird", 1)).toBe("Erinome");
  });

  it("names files by text, so changed text gets a new file", () => {
    expect(audioFileName("뭐 해?")).toBe(audioFileName("뭐 해?"));
    expect(audioFileName("뭐 해?")).not.toBe(audioFileName("뭐 해요?"));
  });
});
