/**
 * Audio playback behind one interface, so content can move from browser
 * text-to-speech to native recordings (or a cloud TTS) without touching the UI.
 * A sentence with an audioUrl always plays the recording.
 */

export type Playable = { korean: string; audioUrl?: string };
export type PlayOptions = { rate?: number; /** 0, 1, … picks a distinct voice per dialogue speaker */ speaker?: number };
export type AudioStatus = "ready" | "no-korean-voice" | "unsupported";

export interface AudioProvider {
  status(): AudioStatus;
  play(item: Playable, opts?: PlayOptions): Promise<void>;
  stop(): void;
}

class RecordedAudio {
  private el: HTMLAudioElement | null = null;

  play(url: string, rate: number): Promise<void> {
    this.stop();
    const el = new Audio(url);
    el.playbackRate = rate;
    this.el = el;
    return new Promise((resolve, reject) => {
      el.onended = () => resolve();
      el.onerror = () => reject(new Error(`Could not play ${url}`));
      el.play().catch(reject);
    });
  }

  stop() {
    this.el?.pause();
    this.el = null;
  }
}

class BrowserSpeech {
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (!this.supported()) return;
    const load = () => {
      this.voices = speechSynthesis
        .getVoices()
        .filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith("ko"));
      // Prefer higher-quality voices when the OS offers them.
      this.voices.sort((a, b) => quality(b) - quality(a));
    };
    load();
    speechSynthesis.addEventListener("voiceschanged", load);
  }

  supported() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  hasKoreanVoice() {
    return this.voices.length > 0;
  }

  speak(text: string, rate: number, speaker: number): Promise<void> {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ko-KR";
    u.rate = rate;
    if (this.voices.length > 0) u.voice = this.voices[speaker % this.voices.length];
    // With a single voice, vary pitch so dialogue speakers stay distinguishable.
    if (this.voices.length < 2 && speaker % 2 === 1) u.pitch = 0.8;
    return new Promise((resolve, reject) => {
      u.onend = () => resolve();
      u.onerror = (e) => (e.error === "interrupted" || e.error === "canceled" ? resolve() : reject(new Error(e.error)));
      speechSynthesis.speak(u);
    });
  }

  stop() {
    if (this.supported()) speechSynthesis.cancel();
  }
}

function quality(v: SpeechSynthesisVoice): number {
  const name = v.name.toLowerCase();
  return (name.includes("premium") ? 2 : 0) + (name.includes("enhanced") ? 1 : 0) + (v.localService ? 0.5 : 0);
}

export function createAudioProvider(): AudioProvider {
  const recorded = new RecordedAudio();
  const tts = new BrowserSpeech();
  return {
    status() {
      if (!tts.supported()) return "unsupported";
      return tts.hasKoreanVoice() ? "ready" : "no-korean-voice";
    },
    async play(item, opts = {}) {
      const rate = opts.rate ?? 1;
      if (item.audioUrl) return recorded.play(item.audioUrl, rate);
      if (!tts.supported()) throw new Error("Speech playback isn't supported in this browser.");
      // TTS reads 반말-style fragments fine, but strips texting jamo like ㅋㅋ awkwardly.
      return tts.speak(item.korean.replace(/[ㄱ-ㅎㅏ-ㅣ]+/g, " "), rate * 0.95, opts.speaker ?? 0);
    },
    stop() {
      recorded.stop();
      tts.stop();
    },
  };
}
