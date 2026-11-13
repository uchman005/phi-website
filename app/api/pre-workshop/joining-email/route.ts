// ---------------------------------------------------------------------------
// TEMPORARY. Emails the Zoom joining details to everyone registered for the
// 14 November pre-conference workshop. Delete this folder after the event.
//
//   GET  /api/pre-workshop/joining-email
//        → status: how many are registered, already sent, still to send.
//   POST /api/pre-workshop/joining-email?to=test
//        → sends one copy to uchenna@passionofhope.org and waits for the result.
//   POST /api/pre-workshop/joining-email?to=all&confirm=<number still to send>
//        → sends to everyone not yet emailed, one email each, in the background.
//          `confirm` must match the status count, so nothing goes out by accident.
//
// Every send is logged to data/submissions/<LOG_SOURCE>.jsonl. Anyone already
// emailed successfully is skipped, so running it again only reaches people
// who were missed or whose email failed.
// ---------------------------------------------------------------------------

import { after } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readSubmissions, saveSubmission } from "@/lib/submissions";
import { sendMail } from "@/lib/mail";
import { notifyOps } from "@/lib/notify";
import { PRE_WORKSHOP_SOURCE } from "@/lib/pre-workshop-form";
import { joiningEmail, workshopDayWord } from "@/lib/pre-workshop-joining-email";

export const runtime = "nodejs";

const TEST_TO = "uchenna@passionofhope.org";
const LOG_SOURCE = "kilimo-bunifu-2026-pre-conference-joining-email";
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
  const rows = (await readSubmissions(PRE_WORKSHOP_SOURCE)) ?? [];

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
    wording: workshopDayWord() ?? "workshop is over: sending is disabled",
  });
}

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const day = workshopDayWord();
  if (!day) return json({ error: "The workshop is over, so sending is disabled." }, 410);

  const params = new URL(request.url).searchParams;
  const to = params.get("to");

  if (to === "test") {
    const message = joiningEmail("Uchenna", day);
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
          const result = await sendMail({ to: [person.email], ...joiningEmail(person.name, day) });
          await saveSubmission(LOG_SOURCE, { email: person.email, ...result });
          if (result.ok) ok++;
          else failed++;
          // Without email settings nothing can be sent, so stop rather than log every person as failed.
          if (!result.ok && "skipped" in result && result.skipped) break;
          if (i < a.pending.length - 1) await new Promise((r) => setTimeout(r, GAP_MS));
        }
      } finally {
        running = false;
        await notifyOps("Pre-conference joining email: run finished", { ok, failed, attempted: a.pending.length });
      }
    });

    return json({ started: true, sending: a.pending.length, message: "Sending in the background. Check GET for progress." }, 202);
  }

  return json({ error: "Use ?to=test, or ?to=all&confirm=<number still to send>." }, 400);
}
