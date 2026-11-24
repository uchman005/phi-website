// ---------------------------------------------------------------------------
// TEMPORARY. The Zoom joining email for Kilimo Bunifu III (24 November 2026),
// sent by app/api/kb3/joining-email/route.ts. Zoom details from the meeting
// invitation; programme from lib/kilimo-bunifu.ts (daySteps).
// ---------------------------------------------------------------------------

import { escapeHtml } from "@/lib/mail";
import { getEdition } from "@/lib/kilimo-bunifu";

const ZOOM = {
  url: "https://us06web.zoom.us/j/85149955108?pwd=WVMDg4py4vzNPkmYG7U6ORa9ig8qza.1",
  meetingId: "851 4995 5108",
  passcode: "502008",
};

/** Sending is only allowed on the day itself (Harare date). */
export function isWorkshopDay(now: Date = new Date()): boolean {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Harare" }).format(now) === "2026-11-24";
}

const TIMES = [
  "Zimbabwe / South Africa (CAT): 9:00 AM",
  "East Africa Time: 10:00 AM",
  "West Africa Time (Nigeria): 8:00 AM",
];

export function joiningEmail(participant: string) {
  const name = participant.trim() || "participant";
  const steps = (getEdition("2026")?.daySteps ?? []).map((s) => `${s.title}: ${s.line}`);
  const subject = "Your Zoom link for today: Kilimo Bunifu III – Africa 4.0";

  const text = `Dear ${name},

Thank you for signing up for Kilimo Bunifu III – Thee Next Gen Awakening: Africa 4.0. We're glad to have you with us today.

Date: Tuesday, 24 November 2026
Time:
${TIMES.map((t) => `  • ${t}`).join("\n")}
Zoom link: ${ZOOM.url}
Meeting ID: ${ZOOM.meetingId}
Passcode: ${ZOOM.passcode}

What to expect
${steps.map((s) => `  • ${s}`).join("\n")}

Please join a few minutes early so we can start on time. If you have any trouble with the link, reply to this email.

See you shortly!

Warm regards,
Passion of Hope International
`;

  const li = (s: string) => `<li style="margin:0 0 6px">${escapeHtml(s)}</li>`;
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#FBF7EF;font-family:Arial,Helvetica,sans-serif;color:#1A2620;font-size:15px;line-height:1.55">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #E8E1D3;border-radius:12px;padding:28px">
<p style="margin:0 0 16px">Dear ${escapeHtml(name)},</p>
<p style="margin:0 0 20px">Thank you for signing up for Kilimo Bunifu III – Thee Next Gen Awakening: Africa 4.0. We&#39;re glad to have you with us today.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 20px;background:#F3EFE6;border-radius:8px">
<tr><td style="padding:16px 18px">
<p style="margin:0 0 8px"><strong>Date:</strong> Tuesday, 24 November 2026</p>
<p style="margin:0 0 4px"><strong>Time:</strong></p>
<ul style="margin:0 0 8px;padding-left:20px">${TIMES.map(li).join("")}</ul>
<p style="margin:0 0 14px"><strong>Meeting ID:</strong> ${ZOOM.meetingId} &nbsp;·&nbsp; <strong>Passcode:</strong> ${ZOOM.passcode}</p>
<a href="${ZOOM.url}" style="display:inline-block;background:#0A4636;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:999px">Join the Zoom meeting</a>
<p style="margin:12px 0 0;font-size:12px;color:#5C6460;word-break:break-all">Or copy this link: ${ZOOM.url}</p>
</td></tr>
</table>
<p style="margin:0 0 8px"><strong>What to expect</strong></p>
<ul style="margin:0 0 20px;padding-left:20px">${steps.map(li).join("")}</ul>
<p style="margin:0 0 16px">Please join a few minutes early so we can start on time. If you have any trouble with the link, reply to this email.</p>
<p style="margin:0 0 16px">See you shortly!</p>
<p style="margin:0">Warm regards,<br>Passion of Hope International</p>
</div></body></html>`;

  return { subject, text, html };
}
