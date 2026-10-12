/**
 * Generate sentence audio with Google Cloud Text-to-Speech (Chirp 3 HD).
 *
 *   GOOGLE_TTS_API_KEY=... npm run audio
 *
 * Writes public/audio/<voice>/<hash>.mp3 for every sentence in every offered
 * voice, plus a preview clip per voice. Files are named by the spoken text,
 * so the script only calls the API for new or edited sentences. Stale files
 * from edited sentences are deleted.
 */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { catalog } from "../src/content";
import { PREVIEW_TEXT, VOICES, audioFileName, speakableText, type VoiceId } from "../src/lib/audio/voices";

const KEY = process.env.GOOGLE_TTS_API_KEY;
if (!KEY) {
  console.error("Set GOOGLE_TTS_API_KEY (see .env.local).");
  process.exit(1);
}
const OUT = path.join(process.cwd(), "public", "audio");
const CONCURRENCY = 4;

async function synthesize(text: string, voice: VoiceId): Promise<Buffer> {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: "ko-KR", name: `ko-KR-Chirp3-HD-${voice}` },
        audioConfig: { audioEncoding: "MP3" },
      }),
    });
    if (res.ok) return Buffer.from(((await res.json()) as { audioContent: string }).audioContent, "base64");
    if (attempt >= 7 || (res.status !== 429 && res.status < 500)) throw new Error(`${res.status} ${await res.text()}`);
    await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
  }
}

async function main() {
  const texts = [...new Set([...catalog.sentences.values()].map(speakableText))];
  const jobs: { voice: VoiceId; text: string; file: string }[] = [];
  for (const { id: voice } of VOICES) {
    const dir = path.join(OUT, voice);
    mkdirSync(dir, { recursive: true });
    const wanted = new Set(texts.map(audioFileName));
    wanted.add("preview.mp3");
    for (const f of readdirSync(dir)) if (!wanted.has(f)) rmSync(path.join(dir, f));
    for (const text of texts) {
      const file = path.join(dir, audioFileName(text));
      if (!existsSync(file)) jobs.push({ voice, text, file });
    }
    const preview = path.join(dir, "preview.mp3");
    if (!existsSync(preview)) jobs.push({ voice, text: PREVIEW_TEXT, file: preview });
  }

  console.log(`${texts.length} sentences × ${VOICES.length} voices: ${jobs.length} to generate`);
  let done = 0;
  let failed = 0;
  const queue = [...jobs];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      for (let job = queue.shift(); job; job = queue.shift()) {
        try {
          writeFileSync(job.file, await synthesize(job.text, job.voice));
        } catch (e) {
          failed++;
          console.error(`\n${job.voice} "${job.text}": ${e instanceof Error ? e.message.slice(0, 200) : e}`);
        }
        if (++done % 50 === 0 || done === jobs.length) process.stdout.write(`\r${done}/${jobs.length}`);
      }
    }),
  );
  console.log(failed ? `\n${failed} failed; run again to retry.` : "\nAll audio up to date.");
  if (failed) process.exit(1);
}

void main();
