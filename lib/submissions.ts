import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

// ---------------------------------------------------------------------------
// Form submissions are appended, one JSON object per line, to
// `<SUBMISSIONS_DIR>/<source>.jsonl` on the server's own disk (default
// `./data/submissions`, relative to the app directory). The folder is
// git-ignored, and the VPS deploy (`git reset --hard`) leaves untracked files
// alone, so submissions survive deploys.
//
// Download one as a spreadsheet from /api/submissions/<source> (see
// app/api/submissions/[source]/route.ts), or read it on the VPS with e.g.
// `tail -n 20 data/submissions/contact.jsonl`.
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
  if (!isValidSource(source)) throw new Error(`Invalid source: ${source}`);
  await mkdir(SUBMISSIONS_DIR, { recursive: true });
  const line = JSON.stringify({ source, receivedAt: new Date().toISOString(), ...data });
  await appendFile(path.join(SUBMISSIONS_DIR, `${source}.jsonl`), line + "\n", "utf8");
}

/** Source names double as file names, so only these characters are allowed. */
export function isValidSource(source: string): boolean {
  return /^[a-z0-9-]+$/.test(source);
}

/**
 * Every saved submission for a form, oldest first, or null if that form has
 * no file. Lines that aren't valid JSON are skipped.
 */
export async function readSubmissions(source: string): Promise<Record<string, unknown>[] | null> {
  if (!isValidSource(source)) return null;
  let text: string;
  try {
    text = await readFile(path.join(SUBMISSIONS_DIR, `${source}.jsonl`), "utf8");
  } catch {
    return null;
  }
  const rows: Record<string, unknown>[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    try {
      rows.push(JSON.parse(line));
    } catch {
      // A half-written or hand-edited line; skip it rather than fail the export.
    }
  }
  return rows.sort((a, b) => String(a.receivedAt).localeCompare(String(b.receivedAt)));
}
