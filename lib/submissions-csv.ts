// ---------------------------------------------------------------------------
// Turns saved form submissions into a CSV for Excel or Google Sheets. Used by
// /api/submissions/<source>. Server only: the phone rules are large.
// ---------------------------------------------------------------------------

import { parsePhoneNumberFromString } from "libphonenumber-js/max";

type Row = Record<string, unknown>;

const HEADINGS: Record<string, string> = {
  receivedAt: "Received (UTC)",
  name: "Name",
  email: "Email",
  phone: "Phone",
};

/** Columns shown first, in this order, when a form has them. */
const LEADING = ["receivedAt", "name", "email", "phone"];

/** One CSV cell: quoted when needed, and never read as a spreadsheet formula. */
function cell(text: string, isCheckedPhone = false): string {
  // A checked phone number is "+" and digits only, so it can't be a formula.
  if (!isCheckedPhone && /^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function asText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(asText).join("; ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}

/** "2026-11-08T09:00:12.345Z" → "2026-11-08 09:00", which spreadsheets read as a date. */
function asTime(value: unknown): string {
  const t = asText(value);
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(t) ? t.slice(0, 16).replace("T", " ") : t;
}

export function submissionsToCsv(rows: Row[]): string {
  const columns = LEADING.filter((key) => rows.some((r) => key in r));
  for (const r of rows) {
    for (const key of Object.keys(r)) {
      if (key !== "source" && !columns.includes(key)) columns.push(key);
    }
  }

  // Notes flag rows for a person to check. Nothing is ever dropped.
  const emailCount = new Map<string, number>();
  for (const r of rows) {
    const e = asText(r.email).trim().toLowerCase();
    if (e) emailCount.set(e, (emailCount.get(e) ?? 0) + 1);
  }

  const lines = [[...columns.map((c) => HEADINGS[c] ?? c), "Notes"].map((h) => cell(h)).join(",")];

  for (const r of rows) {
    const notes: string[] = [];
    const cells = columns.map((c) => {
      if (c === "receivedAt") return cell(asTime(r[c]));
      if (c === "phone" && r[c] != null) {
        // Older entries were saved as typed, e.g. "+254 (712) 345-678".
        const parsed = parsePhoneNumberFromString(asText(r[c]));
        if (parsed?.isValid()) return cell(parsed.number, true);
        notes.push("Phone number doesn't check out");
      }
      return cell(asText(r[c]));
    });

    const times = emailCount.get(asText(r.email).trim().toLowerCase()) ?? 0;
    if (times > 1) notes.push(`Same email appears ${times} times`);
    if (/@example\.(com|org)$|\btest\b/i.test(`${asText(r.name)} ${asText(r.email)}`)) {
      notes.push("Looks like a test entry");
    }

    lines.push([...cells, cell(notes.join("; "))].join(","));
  }

  // The byte-order mark tells Excel the file is UTF-8, so accented names show correctly.
  return "﻿" + lines.join("\r\n") + "\r\n";
}
