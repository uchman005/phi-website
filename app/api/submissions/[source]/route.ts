// ---------------------------------------------------------------------------
// TEMPORARY. GET /api/submissions/<source> → that form's submissions as a
// CSV download, e.g. /api/submissions/kilimo-bunifu-2026-pre-conference.
// Delete this folder once the data has been downloaded.
//
// Sign-in, rate limiting and private headers come from lib/admin-auth.ts.
// Every download is logged with the IP.
// ---------------------------------------------------------------------------

import { readSubmissions } from "@/lib/submissions";
import { submissionsToCsv } from "@/lib/submissions-csv";
import { PRIVATE_HEADERS, plainText, requireAdmin } from "@/lib/admin-auth";
import { clientIp } from "@/lib/rate-limit";
import { notifyOps } from "@/lib/notify";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: Promise<{ source: string }> }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  // Only after sign-in, so outsiders can't probe which forms exist.
  const { source } = await params;
  const rows = await readSubmissions(source);
  if (!rows) return plainText(`No submissions saved for "${source}".`, 404);

  await notifyOps("Submissions exported", { source, rows: rows.length, ip: clientIp(request) });

  const date = new Date().toISOString().slice(0, 10);
  return new Response(submissionsToCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${source}-${date}.csv"`,
      ...PRIVATE_HEADERS,
    },
  });
}
