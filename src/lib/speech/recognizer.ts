/**
 * Thin wrapper over the browser's speech recognition (Chrome, Edge, Safari).
 * Returns up to three alternative transcripts; the evaluator scores each.
 */

type RecognitionResultEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type Recognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
};

function ctor(): (new () => Recognition) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export const recognitionSupported = () => ctor() !== null;

export type Listening = { result: Promise<string[]>; stop: () => void };

export function listenKorean(): Listening {
  const Ctor = ctor();
  if (!Ctor) throw new Error("Speech recognition isn't available in this browser.");
  const rec = new Ctor();
  rec.lang = "ko-KR";
  rec.interimResults = false;
  rec.maxAlternatives = 3;
  const result = new Promise<string[]>((resolve, reject) => {
    let done = false;
    rec.onresult = (e) => {
      done = true;
      const alts = Array.from(e.results[0] ?? []).map((a) => a.transcript);
      resolve(alts);
    };
    rec.onerror = (e) => {
      done = true;
      if (e.error === "no-speech" || e.error === "aborted") resolve([]);
      else reject(new Error(e.error === "not-allowed" ? "Microphone access was blocked." : `Recognition error: ${e.error}`));
    };
    rec.onend = () => {
      if (!done) resolve([]);
    };
  });
  rec.start();
  return { result, stop: () => rec.stop() };
}
