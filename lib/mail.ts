// ---------------------------------------------------------------------------
// Outgoing email via the ZeptoMail REST API (plain fetch, no SDK).
//
// Environment (see .env.local.example):
//   ZEPTOMAIL_API_KEY       Send Mail token from ZeptoMail → Mail Agents → SMTP/API.
//                           Paste it with or without the "Zoho-enczapikey " prefix.
//   ZEPTOMAIL_FROM_ADDRESS  A sender on a domain verified in ZeptoMail,
//                           e.g. noreply@passionofhope.org.
//   ZEPTOMAIL_FROM_NAME     Optional display name.
//   ZEPTOMAIL_API_URL       Optional; defaults to the US data centre. Use
//                           https://api.zeptomail.eu/v1.1/email (EU) or
//                           https://api.zeptomail.in/v1.1/email (India) if your
//                           ZeptoMail account lives there.
//
// When the key or sender isn't set, sending is skipped and logged, so local
// development and builds work without credentials.
// ---------------------------------------------------------------------------

const DEFAULT_API_URL = "https://api.zeptomail.com/v1.1/email";
const TIMEOUT_MS = 10_000;

export interface MailMessage {
  to: string[];
  subject: string;
  html: string;
  text: string;
  /** Lets recipients reply straight to, e.g., the person who signed up. */
  replyTo?: { address: string; name?: string };
}

export type MailResult =
  | { ok: true }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped?: false; status?: number; error: string };

function authHeader(key: string): string {
  const trimmed = key.trim();
  return /^Zoho-enczapikey\s/i.test(trimmed) ? trimmed : `Zoho-enczapikey ${trimmed}`;
}

export async function sendMail(message: MailMessage): Promise<MailResult> {
  const key = process.env.ZEPTOMAIL_API_KEY;
  const fromAddress = process.env.ZEPTOMAIL_FROM_ADDRESS;
  if (!key || !fromAddress) {
    return { ok: false, skipped: true, reason: "ZEPTOMAIL_API_KEY or ZEPTOMAIL_FROM_ADDRESS not set" };
  }

  const body = {
    from: {
      address: fromAddress,
      name: process.env.ZEPTOMAIL_FROM_NAME || "Passion of Hope International",
    },
    to: message.to.map((address) => ({ email_address: { address } })),
    ...(message.replyTo ? { reply_to: [message.replyTo] } : {}),
    subject: message.subject,
    htmlbody: message.html,
    textbody: message.text,
  };

  try {
    const res = await fetch(process.env.ZEPTOMAIL_API_URL || DEFAULT_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authHeader(key),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.ok) return { ok: true };
    // ZeptoMail explains failures (bad token, unverified sender…) in the body.
    const detail = (await res.text()).slice(0, 500);
    return { ok: false, status: res.status, error: detail };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * A simple two-column email (label → value) in both HTML and plain text.
 * Empty values are left out.
 */
export function fieldsEmail(
  heading: string,
  rows: [label: string, value: string | undefined][],
  footer?: string
): { html: string; text: string } {
  const filled = rows.filter((r): r is [string, string] => Boolean(r[1]?.trim()));
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#FBF7EF;font-family:Arial,Helvetica,sans-serif;color:#1A2620">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #E8E1D3;border-radius:12px;padding:24px">
<h1 style="margin:0 0 16px;font-size:20px;color:#0A4636">${escapeHtml(heading)}</h1>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
${filled
  .map(
    ([label, value]) =>
      `<tr><td style="padding:8px 12px 8px 0;vertical-align:top;color:#5C6460;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px 0;vertical-align:top;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
  )
  .join("\n")}
</table>
${footer ? `<p style="margin:20px 0 0;font-size:12px;color:#5C6460">${escapeHtml(footer)}</p>` : ""}
</div></body></html>`;
  const text = [heading, "", ...filled.map(([label, value]) => `${label}: ${value}`), ...(footer ? ["", footer] : [])].join("\n");
  return { html, text };
}
