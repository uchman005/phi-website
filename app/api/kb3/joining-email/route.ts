// ---------------------------------------------------------------------------
// TEMPORARY. Emails the Zoom link to everyone who signed up for Kilimo Bunifu
// III. Same flow as the pre-conference sender: GET = status, POST ?to=test =
// one copy to uchenna@, POST ?to=all&confirm=<n> = everyone not yet emailed,
// one email each, logged so nobody gets it twice. Delete after the event.
// ---------------------------------------------------------------------------

import { after } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readSubmissions, saveSubmission } from "@/lib/submissions";
import { sendMail } from "@/lib/mail";
import { notifyOps } from "@/lib/notify";
import { KB3_SOURCE } from "@/lib/kb3-form";
import { isWorkshopDay, joiningEmail } from "@/lib/kb3-joining-email";

export const runtime = "nodejs";

const TEST_TO = "uchenna@passionofhope.org";
const LOG_SOURCE = "kilimo-bunifu-2026-joining-email";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Gap between emails, to stay well inside Gmail's sending limits. */
const GAP_MS = 1500;

// One send at a time per server process.
let running = false;

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });

interface Recipient {
  email: string;
  name: string;
}

async function audience() {
  const rows = (await readSubmissions(KB3_SOURCE)) ?? [];

  // One email per address; a later registration's name wins.
  const byEmail = new Map<string, Recipient>();
  let skippedAddresses = 0;
  for (const r of rows) {
    const email = String(r.email ?? "").trim();
    if (!EMAIL_RE.test(email) || /@example\.(com|org)$/i.test(email)) {
      skippedAddresses++;
      continue;
    }
    byEmail.set(email.toLowerCase(), { email, name: String(r.name ?? "").trim() });
  }

  const log = (await readSubmissions(LOG_SOURCE)) ?? [];
  const lastResult = new Map<string, boolean>();
  for (const entry of log) {
    if (entry.test === true) continue;
    lastResult.set(String(entry.email).toLowerCase(), entry.ok === true);
  }

  const everyone = [...byEmail.values()];
  const pending = everyone.filter((p) => lastResult.get(p.email.toLowerCase()) !== true);
  return {
    registrations: rows.length,
    skippedAddresses,
    everyone,
    pending,
    sent: everyone.length - pending.length,
    failedLastTime: pending.filter((p) => lastResult.get(p.email.toLowerCase()) === false).length,
  };
}

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const a = await audience();
  return json({
    registrations: a.registrations,
    uniqueRecipients: a.everyone.length,
    skippedAddresses: a.skippedAddresses,
    alreadySent: a.sent,
    stillToSend: a.pending.length,
    failedLastTime: a.failedLastTime,
    sendingNow: running,
    sendingAllowed: isWorkshopDay(),
  });
}

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  if (!isWorkshopDay()) return json({ error: "Sending is only allowed on 24 November 2026." }, 410);

  const params = new URL(request.url).searchParams;
  const to = params.get("to");

  if (to === "test") {
    const message = joiningEmail("Uchenna");
    const result = await sendMail({ to: [TEST_TO], ...message });
    await saveSubmission(LOG_SOURCE, { email: TEST_TO, test: true, ...result });
    return json({ sentTo: TEST_TO, subject: message.subject, result }, result.ok ? 200 : 502);
  }

  if (to === "all") {
    if (running) return json({ error: "Already sending. Check GET for progress." }, 409);
    const a = await audience();
    if (a.pending.length === 0) return json({ message: "Everyone has already been emailed.", alreadySent: a.sent });
    if (params.get("confirm") !== String(a.pending.length)) {
      return json(
        { error: `To send, repeat with confirm=${a.pending.length} (the number still to send).`, stillToSend: a.pending.length },
        409
      );
    }

    running = true;
    after(async () => {
      let ok = 0;
      let failed = 0;
      try {
        for (const [i, person] of a.pending.entries()) {
          const result = await sendMail({ to: [person.email], ...joiningEmail(person.name) });
          await saveSubmission(LOG_SOURCE, { email: person.email, ...result });
          if (result.ok) ok++;
          else failed++;
          // Without email settings nothing can be sent, so stop rather than log every person as failed.
          if (!result.ok && "skipped" in result && result.skipped) break;
          if (i < a.pending.length - 1) await new Promise((r) => setTimeout(r, GAP_MS));
        }
      } finally {
        running = false;
        await notifyOps("KB III joining email: run finished", { ok, failed, attempted: a.pending.length });
      }
    });

    return json({ started: true, sending: a.pending.length, message: "Sending in the background. Check GET for progress." }, 202);
  }

  return json({ error: "Use ?to=test, or ?to=all&confirm=<number still to send>." }, 400);
}
