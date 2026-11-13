// ---------------------------------------------------------------------------
// TEMPORARY. GET /api/submissions/<source> → that form's submissions as a
// CSV download, e.g. /api/submissions/kilimo-bunifu-2026-pre-conference.
// Delete this folder once the data has been downloaded.
//
// The data is personal (names, emails, phone numbers), so:
// - Sign-in uses HTTP Basic auth: a browser shows its own username/password
//   box, and `curl -u phi:<password>` works.
// - The repo is public, so only a SHA-256 hash of the password is stored
//   here. The password itself is long and random, so the hash can't be
//   reversed, and it isn't written anywhere in the repo.
// - Each connection gets 20 attempts per 15 minutes, and every download is
//   logged with the IP.
// - Responses are never cached or indexed.
// ---------------------------------------------------------------------------

import { createHash, timingSafeEqual } from "node:crypto";
import { readSubmissions } from "@/lib/submissions";
import { submissionsToCsv } from "@/lib/submissions-csv";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { notifyOps } from "@/lib/notify";

export const runtime = "nodejs";

const USER = "phi";
const PASSWORD_SHA256 = "a49c377259705aba01690aee7215366aeffc26b3ce1e0d6d0b0893b532d2e5af";

const PRIVATE_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

function text(body: string, status: number, extra: Record<string, string> = {}): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", ...PRIVATE_HEADERS, ...extra },
  });
}

const sha256 = (s: string) => createHash("sha256").update(s, "utf8").digest();

function signedIn(request: Request): boolean {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Basic\s+([A-Za-z0-9+/=]+)$/i.exec(header.trim());
  if (!match) return false;
  const decoded = Buffer.from(match[1], "base64").toString("utf8");
  const colon = decoded.indexOf(":");
  if (colon < 0) return false;
  // Constant-time checks of both parts, so timing reveals nothing.
  const userOk = timingSafeEqual(sha256(decoded.slice(0, colon)), sha256(USER));
  const passwordOk = timingSafeEqual(
    sha256(decoded.slice(colon + 1)),
    Buffer.from(PASSWORD_SHA256, "hex")
  );
  return userOk && passwordOk;
}

export async function GET(request: Request, { params }: { params: Promise<{ source: string }> }) {
  const ip = clientIp(request);
  const limit = checkRateLimit(`submissions-export:${ip}`, 20, 15 * 60 * 1000);
  if (!limit.ok) {
    await notifyOps("Submissions export: too many attempts", { ip });
    return text("Too many attempts. Try again later.", 429, {
      "Retry-After": String(limit.retryAfterSeconds ?? 900),
    });
  }

  if (!signedIn(request)) {
    return text("Sign in to download submissions.", 401, {
      "WWW-Authenticate": 'Basic realm="PHI form submissions", charset="UTF-8"',
    });
  }

  // Only after sign-in, so outsiders can't probe which forms exist.
  const { source } = await params;
  const rows = await readSubmissions(source);
  if (!rows) return text(`No submissions saved for "${source}".`, 404);

  await notifyOps("Submissions exported", { source, rows: rows.length, ip });

  const date = new Date().toISOString().slice(0, 10);
  return new Response(submissionsToCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${source}-${date}.csv"`,
      ...PRIVATE_HEADERS,
    },
  });
}
