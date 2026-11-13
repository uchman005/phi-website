// ---------------------------------------------------------------------------
// TEMPORARY. The joining-details email for the 14 November 2026 pre-conference
// workshop, sent by app/api/pre-workshop/joining-email/route.ts. Wording as
// supplied by the team; Zoom details from the meeting invitation.
// ---------------------------------------------------------------------------

import { escapeHtml } from "@/lib/mail";

const ZOOM = {
  url: "https://us06web.zoom.us/j/89172229418?pwd=Z8mxSfGMa3LsdI4FMamGYUJjS5CSdc.1",
  meetingId: "891 7222 9418",
  passcode: "776771",
};

const THEMES =
  "the next generation feeding Africa, food sovereignty and regenerative agriculture, good governance through citizen engagement, and local economic sovereignty";

/**
 * "today" or "tomorrow", judged by the date in Lagos, where the meeting is
 * scheduled (12:00 WAT on 14 November). Null once the day has passed.
 */
export function workshopDayWord(now: Date = new Date()): "today" | "tomorrow" | null {
  const lagosDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" }).format(now);
  if (lagosDate === "2026-11-13") return "tomorrow";
  if (lagosDate === "2026-11-14") return "today";
  return null;
}

export function joiningEmail(participant: string, day: "today" | "tomorrow") {
  const name = participant.trim() || "participant";
  const subject = `Your link for ${day}: Kilimo Bunifu Pre-Workshop Engagement`;

  const text = `Dear ${name},

Thank you for registering for the Kilimo Bunifu pre-workshop engagement. We are glad to have you with us and look forward to seeing you ${day}.

Date: Saturday, 14 November 2026
Time:
  • East Africa Time: 2:00 PM
  • Zimbabwe (CAT): 1:00 PM
  • West Africa Time (Nigeria): 12:00 PM
Duration: 1 hour
Zoom link: ${ZOOM.url}
Meeting ID: ${ZOOM.meetingId}
Passcode: ${ZOOM.passcode}

What to expect
  • A short research insights segment sharing what we've learned so far
  • Four guest speakers
  • Four breakout rooms, one for each of our themes: ${THEMES}
  • An open, lively conversation where your voice matters

Please join a few minutes early so we can start on time. If you have any trouble with the link, reply to this email or reach us on WhatsApp.

See you!!!

Warm regards,
Passion of Hope International
`;

  const li = (s: string) => `<li style="margin:0 0 6px">${s}</li>`;
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#FBF7EF;font-family:Arial,Helvetica,sans-serif;color:#1A2620;font-size:15px;line-height:1.55">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #E8E1D3;border-radius:12px;padding:28px">
<p style="margin:0 0 16px">Dear ${escapeHtml(name)},</p>
<p style="margin:0 0 20px">Thank you for registering for the Kilimo Bunifu pre-workshop engagement. We are glad to have you with us and look forward to seeing you ${day}.</p>

<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 20px;background:#F3EFE6;border-radius:8px">
<tr><td style="padding:16px 18px">
<p style="margin:0 0 8px"><strong>Date:</strong> Saturday, 14 November 2026</p>
<p style="margin:0 0 4px"><strong>Time:</strong></p>
<ul style="margin:0 0 8px;padding-left:20px">
${li("East Africa Time: 2:00 PM")}
${li("Zimbabwe (CAT): 1:00 PM")}
${li("West Africa Time (Nigeria): 12:00 PM")}
</ul>
<p style="margin:0 0 8px"><strong>Duration:</strong> 1 hour</p>
<p style="margin:0 0 14px"><strong>Meeting ID:</strong> ${ZOOM.meetingId} &nbsp;·&nbsp; <strong>Passcode:</strong> ${ZOOM.passcode}</p>
<a href="${ZOOM.url}" style="display:inline-block;background:#0A4636;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:999px">Join the Zoom meeting</a>
<p style="margin:12px 0 0;font-size:12px;color:#5C6460;word-break:break-all">Or copy this link: ${ZOOM.url}</p>
</td></tr>
</table>

<p style="margin:0 0 8px"><strong>What to expect</strong></p>
<ul style="margin:0 0 20px;padding-left:20px">
${li("A short research insights segment sharing what we&#39;ve learned so far")}
${li("Four guest speakers")}
${li(`Four breakout rooms, one for each of our themes: ${THEMES}`)}
${li("An open, lively conversation where your voice matters")}
</ul>

<p style="margin:0 0 16px">Please join a few minutes early so we can start on time. If you have any trouble with the link, reply to this email or reach us on WhatsApp.</p>
<p style="margin:0 0 16px">See you!!!</p>
<p style="margin:0">Warm regards,<br>Passion of Hope International</p>
</div></body></html>`;

  return { subject, text, html };
}
