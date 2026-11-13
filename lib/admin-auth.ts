// ---------------------------------------------------------------------------
// TEMPORARY sign-in for the admin-only API routes (submissions export and the
// pre-conference joining email). Delete with those routes.
//
// HTTP Basic auth: a browser shows its own username/password box, and
// `curl -u phi:<password>` works. The repo is public, so only a SHA-256 hash
// of the password is stored. The password is long and random, so the hash
// can't be reversed, and it isn't written anywhere in the repo.
// ---------------------------------------------------------------------------

import { createHash, timingSafeEqual } from "node:crypto";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { notifyOps } from "@/lib/notify";

const USER = "phi";
const PASSWORD_SHA256 = "a49c377259705aba01690aee7215366aeffc26b3ce1e0d6d0b0893b532d2e5af";

export const PRIVATE_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

export function plainText(body: string, status: number, extra: Record<string, string> = {}): Response {
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

/**
 * Returns a response to send back (429 or 401) when the request isn't allowed
 * through, or null when the caller is signed in. Each connection gets 20
 * attempts per 15 minutes.
 */
export async function requireAdmin(request: Request): Promise<Response | null> {
  const ip = clientIp(request);
  const limit = checkRateLimit(`admin:${ip}`, 20, 15 * 60 * 1000);
  if (!limit.ok) {
    await notifyOps("Admin API: too many attempts", { ip });
    return plainText("Too many attempts. Try again later.", 429, {
      "Retry-After": String(limit.retryAfterSeconds ?? 900),
    });
  }
  if (!signedIn(request)) {
    return plainText("Sign in to continue.", 401, {
      "WWW-Authenticate": 'Basic realm="PHI admin", charset="UTF-8"',
    });
  }
  return null;
}
