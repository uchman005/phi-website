// ---------------------------------------------------------------------------
// Outgoing email over SMTP with nodemailer.
//
// Environment (see .env.local.example). For Google (Gmail / Workspace):
//   SMTP_HOST          smtp.gmail.com
//   SMTP_PORT          465 (TLS from the start) or 587 (STARTTLS, default)
//   SMTP_USER          the full Google address that sends, e.g. noreply@passionofhope.org
//   SMTP_PASS          a 16-character App Password for that account (needs
//                      2-Step Verification); spaces as Google displays them are fine
//   MAIL_FROM_ADDRESS  SMTP_USER itself, or a "Send mail as" alias on that
//                      account — Gmail rewrites any other From address
//   MAIL_FROM_NAME     optional display name
//   SMTP_REQUIRE_TLS   optional; "false" only for a local test server — by
//                      default the connection must be encrypted
//
// When host, credentials or sender aren't set, sending is skipped and
// logged, so local development and builds work without credentials.
// ---------------------------------------------------------------------------

import nodemailer, { type Transporter } from "nodemailer";

export interface MailMessage {
  to: string[];
  subject: string;
  html: string;
  text: string;
  /** Lets recipients reply straight to, e.g., the person who signed up. */
  replyTo?: { address: string; name?: string };
}

export type MailResult =
  | { ok: true; messageId?: string }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped?: false; error: string };

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: { address: string; name: string };
  requireTLS: boolean;
}

function readConfig(): SmtpConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM_ADDRESS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_FROM_ADDRESS) return null;
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    user: SMTP_USER,
    // Google shows App Passwords in groups ("abcd efgh ijkl mnop"); the
    // password itself has no spaces.
    pass: /(^|\.)gmail\.com$/i.test(SMTP_HOST) ? SMTP_PASS.replace(/\s+/g, "") : SMTP_PASS.trim(),
    from: { address: MAIL_FROM_ADDRESS, name: process.env.MAIL_FROM_NAME || "Passion of Hope International" },
    requireTLS: process.env.SMTP_REQUIRE_TLS !== "false",
  };
}

// One transporter per process, rebuilt only if the configuration changes.
let cached: { key: string; transporter: Transporter } | undefined;

function transporterFor(c: SmtpConfig): Transporter {
  const key = JSON.stringify([c.host, c.port, c.user, c.pass, c.requireTLS]);
  if (cached?.key !== key) {
    const implicitTls = c.port === 465;
    cached = {
      key,
      transporter: nodemailer.createTransport({
        host: c.host,
        port: c.port,
        secure: implicitTls,
        // On 587, refuse to send unless the server upgrades to TLS.
        requireTLS: !implicitTls && c.requireTLS,
        auth: { user: c.user, pass: c.pass },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      }),
    };
  }
  return cached.transporter;
}

export async function sendMail(message: MailMessage): Promise<MailResult> {
  const config = readConfig();
  if (!config) {
    return { ok: false, skipped: true, reason: "SMTP_HOST, SMTP_USER, SMTP_PASS or MAIL_FROM_ADDRESS not set" };
  }
  try {
    const info = await transporterFor(config).sendMail({
      from: config.from,
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    // Includes the server's reply, e.g. "535 Authentication Failed".
    const e = err as { message?: string; response?: string };
    return { ok: false, error: (e.response || e.message || String(err)).slice(0, 500) };
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
