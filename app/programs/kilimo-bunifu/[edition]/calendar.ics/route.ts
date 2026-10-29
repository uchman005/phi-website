import { notFound } from "next/navigation";
import { editionHref, getEdition, kilimoBunifuEditions } from "@/lib/kilimo-bunifu";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.passionofhope.org";

export const dynamicParams = false;

export function generateStaticParams() {
  return kilimoBunifuEditions.map((e) => ({ edition: e.slug }));
}

/** RFC 5545 text escaping. */
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

/** Fold lines longer than 75 octets, as RFC 5545 requires. */
function fold(line: string): string {
  const out: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    out.push(rest.slice(0, 74));
    rest = " " + rest.slice(74);
  }
  out.push(rest);
  return out.join("\r\n");
}

const icsDate = (iso: string) => iso.replaceAll("-", "");

function nextDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ edition: string }> }
) {
  const { edition: slug } = await params;
  const e = getEdition(slug);
  if (!e) notFound();

  const url = `${SITE_URL}${editionHref(e)}`;
  const location = e.icat.place
    ? `${e.icat.place} (${e.icat.edition}) + online`
    : `Online (${e.icat.edition})`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Passion of Hope International//Kilimo Bunifu//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:kilimo-bunifu-${e.slug}@passionofhope.org`,
    `DTSTAMP:${stamp}`,
    // All-day event; DTEND is exclusive.
    `DTSTART;VALUE=DATE:${icsDate(e.dates.startDate)}`,
    `DTEND;VALUE=DATE:${icsDate(nextDay(e.dates.endDate))}`,
    `SUMMARY:${esc(`Kilimo Bunifu ${e.numeral}: ${e.title}`)}`,
    `DESCRIPTION:${esc(`${e.theme}. ${e.format}. Details and updates: ${url}`)}`,
    `LOCATION:${esc(location)}`,
    `URL:${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(lines.map(fold).join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="kilimo-bunifu-${e.slug}.ics"`,
    },
  });
}
