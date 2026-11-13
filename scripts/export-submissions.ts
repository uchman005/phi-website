// ---------------------------------------------------------------------------
// Turn a form's saved submissions (data/submissions/<source>.jsonl) into a CSV
// that opens in Excel or Google Sheets. Run it on the server, in the app folder:
//
//   bun scripts/export-submissions.ts kilimo-bunifu-2026-pre-conference
//       → writes data/submissions/kilimo-bunifu-2026-pre-conference.csv
//
//   bun scripts/export-submissions.ts kilimo-bunifu-2026-pre-conference --stdout
//       → prints the CSV instead, e.g. to download it in one step:
//         ssh <user>@<server> 'cd <app folder> && bun scripts/export-submissions.ts <source> --stdout' > registrations.csv
//
// A summary (rows, duplicate emails, phone numbers that don't check out,
// entries that look like tests) is printed to the terminal; it never goes
// into the CSV, and no row is ever dropped.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";

const HEADINGS: Record<string, string> = {
  receivedAt: "Registered (UTC)",
  name: "Name",
  email: "Email",
  phone: "Phone",
};

type Row = Record<string, unknown>;

/** One CSV cell: quoted when needed, and never read as a spreadsheet formula. */
function cell(value: unknown, column: string): string {
  let text = value == null ? "" : typeof value === "string" ? value : JSON.stringify(value);
  // Phone numbers are checked to be "+" and digits only, so they're left alone.
  const safePhone = column === "phone" && /^\+\d+$/.test(text);
  if (!safePhone && /^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** "+254 (712) 345-678" → "+254712345678". Unreadable numbers are kept as typed. */
function normalisePhone(raw: unknown): { value: unknown; ok: boolean } {
  if (typeof raw !== "string") return { value: raw, ok: false };
  const parsed = parsePhoneNumberFromString(raw);
  return parsed?.isValid() ? { value: parsed.number, ok: true } : { value: raw, ok: false };
}

function main(): void {
  const args = process.argv.slice(2);
  const source = args.find((a) => !a.startsWith("--"));
  const toStdout = args.includes("--stdout");

  if (!source || !/^[a-z0-9-]+$/.test(source)) {
    console.error("Usage: bun scripts/export-submissions.ts <source> [--stdout]");
    console.error("e.g.   bun scripts/export-submissions.ts kilimo-bunifu-2026-pre-conference");
    process.exit(1);
  }

  const dir = path.resolve(process.cwd(), process.env.SUBMISSIONS_DIR ?? "data/submissions");
  const input = path.join(dir, `${source}.jsonl`);

  let lines: string[];
  try {
    lines = readFileSync(input, "utf8").split(/\r?\n/).filter((l) => l.trim());
  } catch {
    console.error(`No submissions file at ${input}`);
    process.exit(1);
  }

  const rows: Row[] = [];
  let unreadable = 0;
  for (const line of lines) {
    try {
      rows.push(JSON.parse(line) as Row);
    } catch {
      unreadable++;
    }
  }
  rows.sort((a, b) => String(a.receivedAt).localeCompare(String(b.receivedAt)));

  // Columns: the known ones first, then anything else the form saved.
  const columns: string[] = [];
  for (const key of ["receivedAt", "name", "email", "phone"]) {
    if (rows.some((r) => key in r)) columns.push(key);
  }
  for (const r of rows) {
    for (const key of Object.keys(r)) {
      if (key !== "source" && !columns.includes(key)) columns.push(key);
    }
  }

  const badPhones: string[] = [];
  for (const r of rows) {
    if (!("phone" in r)) continue;
    const { value, ok } = normalisePhone(r.phone);
    r.phone = value;
    if (!ok) badPhones.push(`${r.name ?? "?"}: ${String(r.phone)}`);
  }

  const csv =
    "﻿" + // tells Excel the file is UTF-8, so names with accents show correctly
    [
      columns.map((c) => cell(HEADINGS[c] ?? c, "")).join(","),
      ...rows.map((r) => columns.map((c) => cell(r[c], c)).join(",")),
    ].join("\r\n") +
    "\r\n";

  // Summary
  const byEmail = new Map<string, number>();
  for (const r of rows) {
    const e = String(r.email ?? "").trim().toLowerCase();
    if (e) byEmail.set(e, (byEmail.get(e) ?? 0) + 1);
  }
  const repeated = [...byEmail].filter(([, n]) => n > 1);
  // Only flagged, never removed: a person decides.
  const looksLikeTest = rows.filter((r) =>
    /@example\.(com|org)$|\btest\b/i.test(`${r.name ?? ""} ${r.email ?? ""}`)
  );

  const out = path.join(dir, `${source}.csv`);
  if (toStdout) process.stdout.write(csv);
  else writeFileSync(out, csv, "utf8");

  const log = (s: string) => console.error(s);
  log(`${rows.length} submission(s) from ${input}`);
  if (rows.length) log(`First: ${rows[0].receivedAt}   Last: ${rows[rows.length - 1].receivedAt}`);
  log(`${byEmail.size} different email address(es)`);
  if (repeated.length) {
    log(`Signed up more than once (all rows are kept in the CSV):`);
    for (const [e, n] of repeated) log(`  ${e} × ${n}`);
  }
  if (badPhones.length) {
    log(`Phone numbers that don't check out (kept as typed):`);
    for (const p of badPhones) log(`  ${p}`);
  }
  if (looksLikeTest.length) {
    log(`Look like test entries (kept in the CSV — check before using the list):`);
    for (const r of looksLikeTest) log(`  ${r.name ?? "?"} <${r.email ?? "?"}>`);
  }
  if (unreadable) log(`${unreadable} line(s) could not be read and were skipped`);
  if (!toStdout) log(`Saved ${out}`);
}

main();
