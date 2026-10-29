// ---------------------------------------------------------------------------
// Pure date logic for event countdowns and "time ago" labels. No React, no
// side effects — the same functions run on the server (to pick copy) and in
// the browser (to tick), and are easy to check from a script.
// ---------------------------------------------------------------------------

export interface EventWindow {
  /** First day of the event, YYYY-MM-DD, in `timeZone`. */
  startDate: string;
  /** Last day of the event (inclusive), YYYY-MM-DD, in `timeZone`. */
  endDate: string;
  /** IANA zone the dates are local to, e.g. "Africa/Harare". */
  timeZone: string;
}

export type EventPhase = "upcoming" | "live" | "past";

/** UTC offset of `timeZone` at `instant`, in minutes (e.g. +120 for Harare). */
function offsetMinutes(timeZone: string, instant: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(instant);
  const name = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = name.match(/GMT([+-])(\d{2}):?(\d{2})?/);
  if (!m) return 0;
  const sign = m[1] === "-" ? -1 : 1;
  return sign * (Number(m[2]) * 60 + Number(m[3] ?? 0));
}

/** The instant local midnight starts on `date` (YYYY-MM-DD) in `timeZone`. */
export function startOfLocalDay(date: string, timeZone: string): Date {
  const [y, mo, d] = date.split("-").map(Number);
  const utcMidnight = Date.UTC(y, mo - 1, d);
  // Two passes settle the offset even across a DST change.
  let t = utcMidnight - offsetMinutes(timeZone, new Date(utcMidnight)) * 60_000;
  t = utcMidnight - offsetMinutes(timeZone, new Date(t)) * 60_000;
  return new Date(t);
}

function addDays(date: string, days: number): string {
  const [y, mo, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, mo - 1, d + days)).toISOString().slice(0, 10);
}

/** When the event starts, and the instant just after its last day ends. */
export function eventBounds(w: EventWindow): { start: Date; end: Date } {
  return {
    start: startOfLocalDay(w.startDate, w.timeZone),
    end: startOfLocalDay(addDays(w.endDate, 1), w.timeZone),
  };
}

export function eventPhase(now: Date, w: EventWindow): EventPhase {
  const { start, end } = eventBounds(w);
  if (now < start) return "upcoming";
  if (now < end) return "live";
  return "past";
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function countdownParts(now: Date, target: Date): CountdownParts {
  const total = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
  };
}

/** Calendar date (YYYY-MM-DD) of `instant` as seen in `timeZone`. */
function localDate(instant: Date, timeZone: string): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instant);
}

const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;

/**
 * How long ago the event ended, in a single unit — the largest whole
 * calendar unit that has passed: "5 years ago", "11 months ago",
 * "29 days ago". Counted from the event's last day, in its own time zone.
 */
export function timeAgo(now: Date, w: EventWindow): string {
  const [y1, m1, d1] = w.endDate.split("-").map(Number);
  const [y2, m2, d2] = localDate(now, w.timeZone).split("-").map(Number);

  const months = (y2 - y1) * 12 + (m2 - m1) - (d2 < d1 ? 1 : 0);
  if (months >= 12) return `${plural(Math.floor(months / 12), "year")} ago`;
  if (months >= 1) return `${plural(months, "month")} ago`;

  const days = Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86_400_000);
  if (days <= 0) return "today";
  return `${plural(days, "day")} ago`;
}

/** Short single-unit lead time for cards: "in 26 days", "in 5 hours". */
export function timeUntil(now: Date, w: EventWindow): string {
  const { days, hours, minutes } = countdownParts(now, eventBounds(w).start);
  if (days >= 1) return `in ${plural(days, "day")}`;
  if (hours >= 1) return `in ${plural(hours, "hour")}`;
  if (minutes >= 1) return `in ${plural(minutes, "minute")}`;
  return "starting now";
}

/** One-line relative label for any phase. */
export function relativeLabel(now: Date, w: EventWindow): string {
  const phase = eventPhase(now, w);
  if (phase === "upcoming") return timeUntil(now, w);
  if (phase === "live") return "happening now";
  return timeAgo(now, w);
}

/** Human date range: "24 November 2026" or "23–24 November 2020". */
export function formatEventDates(w: EventWindow, month: "long" | "short" = "long"): string {
  const fmt = (date: string, opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts }).format(
      new Date(`${date}T00:00:00Z`)
    );
  const full = { day: "numeric", month, year: "numeric" } as const;
  if (w.startDate === w.endDate) return fmt(w.startDate, full);
  const sameMonth = w.startDate.slice(0, 7) === w.endDate.slice(0, 7);
  if (sameMonth) return `${fmt(w.startDate, { day: "numeric" })}–${fmt(w.endDate, full)}`;
  return `${fmt(w.startDate, { day: "numeric", month })} – ${fmt(w.endDate, full)}`;
}

export type BannerPhase = "pre" | "post" | "hidden";

/**
 * Homepage banner state: promote the event up to and including its day,
 * point to outcomes afterwards, and disappear `hideAfterDays` after it ends.
 */
export function bannerPhase(now: Date, w: EventWindow, hideAfterDays = 60): BannerPhase {
  const { end } = eventBounds(w);
  if (now < end) return "pre";
  if (now.getTime() < end.getTime() + hideAfterDays * 86_400_000) return "post";
  return "hidden";
}
