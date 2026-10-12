import type { Sentence } from "@/content/schema";

/** The voices offered to learners, all Google Chirp 3 HD Korean voices. The first is the default. */
export const VOICES = [
  { id: "Erinome", gender: "female" },
  { id: "Laomedeia", gender: "female" },
  { id: "Leda", gender: "female" },
  { id: "Alnilam", gender: "male" },
  { id: "Achird", gender: "male" },
] as const;

export type VoiceId = (typeof VOICES)[number]["id"];
export const DEFAULT_VOICE: VoiceId = VOICES[0].id;
export const isVoiceId = (v: unknown): v is VoiceId => VOICES.some((x) => x.id === v);

/** Text used for the voice preview in onboarding and settings. */
export const PREVIEW_TEXT = "안녕하세요! 오늘 날씨 진짜 좋네요. 이따 같이 커피 마실래요?";

/**
 * Voice for each dialogue speaker: the learner's choice first, then the
 * first voice of the other gender, so two speakers always sound different.
 */
export function speakerVoice(chosen: VoiceId, speaker: number): VoiceId {
  if (speaker % 2 === 0) return chosen;
  const gender = VOICES.find((v) => v.id === chosen)!.gender;
  return VOICES.find((v) => v.gender !== gender)!.id;
}

/** Texting shorthand read the way Koreans say it aloud. */
const SPOKEN_JAMO: [RegExp, string][] = [
  [/ㅋ{2,}/g, "크크"],
  [/ㅎ{2,}/g, "흐흐"],
  [/ㅇㅋ/g, "오케이"],
  [/ㅇㅇ/g, "응응"],
  [/ㅠ+|ㅜ+/g, ""],
];

export function speakableText(sentence: Pick<Sentence, "korean" | "spoken">): string {
  let text = sentence.spoken ?? sentence.korean;
  for (const [pattern, replacement] of SPOKEN_JAMO) text = text.replace(pattern, replacement);
  return text.replace(/\s+/g, " ").trim();
}

/** Stable file name for a text, so edited sentences get new audio and unchanged ones keep theirs. */
export function audioFileName(text: string): string {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return `${(h >>> 0).toString(36)}-${text.length}.mp3`;
}

export const audioPath = (voice: VoiceId, text: string) => `audio/${voice}/${audioFileName(text)}`;
