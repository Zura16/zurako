import { audioPath, speakableText, speakerVoice, type VoiceId } from "./voices";

/**
 * Audio playback behind one interface. Order of preference:
 *   1. a native recording (sentence.audioUrl),
 *   2. the pre-generated Google voice clip for the learner's chosen voice,
 *   3. the device's own text-to-speech, if a clip is missing.
 */

export type Playable = { korean: string; spoken?: string; audioUrl?: string };
export type PlayOptions = {
  rate?: number;
  voice: VoiceId;
  /** 0, 1, … gives each dialogue speaker a distinct voice. */
  speaker?: number;
};
export type AudioStatus = "ready" | "unsupported";

export interface AudioProvider {
  status(): AudioStatus;
  play(item: Playable, opts: PlayOptions): Promise<void>;
  playUrl(url: string, rate?: number): Promise<void>;
  stop(): void;
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

class RecordedAudio {
  private el: HTMLAudioElement | null = null;

  play(url: string, rate: number): Promise<void> {
    this.stop();
    const el = new Audio(url);
    el.playbackRate = rate;
    el.preservesPitch = true;
    this.el = el;
    return new Promise((resolve, reject) => {
      el.onended = () => resolve();
      el.onpause = () => resolve();
      el.onerror = () => reject(new Error(`Could not play ${url}`));
      el.play().catch(reject);
    });
  }

  stop() {
    this.el?.pause();
    this.el = null;
  }
}

class DeviceSpeech {
  supported() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  speak(text: string, rate: number): Promise<void> {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ko-KR";
    u.rate = rate;
    const voice = speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("ko"));
    if (voice) u.voice = voice;
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

export function createAudioProvider(): AudioProvider {
  const recorded = new RecordedAudio();
  const device = new DeviceSpeech();
  return {
    status: () => (typeof Audio === "undefined" ? "unsupported" : "ready"),
    async play(item, opts) {
      const rate = opts.rate ?? 1;
      if (item.audioUrl) return recorded.play(item.audioUrl, rate);
      const text = speakableText(item);
      const voice = speakerVoice(opts.voice, opts.speaker ?? 0);
      try {
        await recorded.play(`${BASE}/${audioPath(voice, text)}`, rate);
      } catch {
        if (!device.supported()) throw new Error("Audio isn't available for this sentence.");
        await device.speak(text, rate);
      }
    },
    playUrl: (url, rate = 1) => recorded.play(`${BASE}/${url}`, rate),
    stop() {
      recorded.stop();
      device.stop();
    },
  };
}
