import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

// ---------------------------------------------------------------------------
// Form submissions are appended, one JSON object per line, to
// `<SUBMISSIONS_DIR>/<source>.jsonl` on the server's own disk (default
// `./data/submissions`, relative to the app directory). The folder is
// git-ignored, and the VPS deploy (`git reset --hard`) leaves untracked files
// alone, so submissions survive deploys.
//
// Read them on the VPS with e.g. `tail -n 20 data/submissions/contact.jsonl`.
// ---------------------------------------------------------------------------

// The turbopackIgnore hint stops the bundler from tracing the whole project
// for this runtime-only path.
const SUBMISSIONS_DIR = path.resolve(
  /* turbopackIgnore: true */ process.cwd(),
  process.env.SUBMISSIONS_DIR ?? "data/submissions"
);

export async function saveSubmission(
  source: string,
  data: Record<string, unknown>
): Promise<void> {
  if (!/^[a-z0-9-]+$/.test(source)) throw new Error(`Invalid source: ${source}`);
  await mkdir(SUBMISSIONS_DIR, { recursive: true });
  const line = JSON.stringify({ source, receivedAt: new Date().toISOString(), ...data });
  await appendFile(path.join(SUBMISSIONS_DIR, `${source}.jsonl`), line + "\n", "utf8");
}
