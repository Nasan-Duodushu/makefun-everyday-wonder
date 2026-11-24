// Everyday Wonder — a single sentence, at most 200 characters, that makes a
// small everyday moment strange and new. The angle is the surprise: a cracked
// phone screen reframing the sunset. Written to /output/entry.txt.
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const SENTENCE =
  'The crack in my phone screen turns every sunset into a stained-glass window I never commissioned.';

function problemWith(text: string): string | null {
  // The gate wants 1-200 characters of UTF-8 text, a single sentence.
  if (text.length < 1 || text.length > 200) {
    return `sentence must be 1-200 characters, got ${text.length}`;
  }
  if (text.includes('\n')) return 'sentence must be a single line';
  // One sentence: exactly one full stop, at the end.
  const stops = [...text].filter((ch) => ch === '.').length;
  if (stops !== 1 || !text.endsWith('.')) return 'sentence must be one sentence';
  return null;
}

async function writeEntry(): Promise<void> {
  const problem = problemWith(SENTENCE);
  if (problem !== null) throw new Error(problem);
  const folder = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
  await mkdir(folder, { recursive: true });
  await writeFile(resolve(folder, 'entry.txt'), SENTENCE, { encoding: 'utf8', mode: 0o644 });
}

await writeEntry();
