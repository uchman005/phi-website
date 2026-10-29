"use client";

import { useSyncExternalStore } from "react";
import {
  countdownParts,
  eventBounds,
  eventPhase,
  relativeLabel,
  timeAgo,
  type EventWindow,
} from "@/lib/event-time";

// One shared 1-second ticker for every clock on the page.
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(onTick: () => void) {
  listeners.add(onTick);
  timer ??= setInterval(() => listeners.forEach((l) => l()), 1000);
  return () => {
    listeners.delete(onTick);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

/**
 * Current time, quantised so React only re-renders when the visible value
 * can change: every second while counting down, every minute otherwise.
 * The server snapshot is null, so server HTML and the hydrating render
 * match exactly; the live value appears right after hydration.
 */
function useNow(dates: EventWindow): Date | null {
  const ms = useSyncExternalStore(
    subscribe,
    () => {
      const now = Date.now();
      const step = now < eventBounds(dates).start.getTime() ? 1000 : 60_000;
      return now - (now % step);
    },
    () => null
  );
  return ms === null ? null : new Date(ms);
}

interface EventClockProps {
  dates: EventWindow;
  /** "tiles": full D·H·M·S countdown. "inline": one short phrase. */
  variant?: "tiles" | "inline";
  /** "inherit" takes the surrounding text colour (e.g. on the ochre banner). */
  tone?: "light" | "dark" | "inherit";
  /** Shown while live, e.g. "Happening today — join online". */
  liveLabel?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function EventClock({
  dates,
  variant = "inline",
  tone = "light",
  liveLabel = "Happening today",
}: EventClockProps) {
  const now = useNow(dates);
  const dark = tone === "dark";

  if (variant === "inline") {
    return (
      <span
        className={`font-mono text-xs ${tone === "inherit" ? "" : dark ? "text-white/80" : "text-ink-3"}`}
      >
        {now ? relativeLabel(now, dates) : " "}
      </span>
    );
  }

  const phase = now ? eventPhase(now, dates) : null;

  if (phase === "live") {
    return (
      <p className="inline-flex items-center gap-2 rounded-pill bg-green-bright/20 px-4 py-2 font-sans text-sm font-semibold text-white">
        <span className="h-2 w-2 rounded-full bg-green-bright animate-pulse" aria-hidden />
        {liveLabel}
      </p>
    );
  }

  if (phase === "past") {
    return (
      <p className={`font-mono text-sm ${dark ? "text-white/80" : "text-ink-3"}`}>
        {timeAgo(now!, dates)}
      </p>
    );
  }

  // Upcoming (or not yet hydrated): four tiles. Before hydration they show
  // dashes so the layout doesn't jump when the numbers arrive.
  const parts = now ? countdownParts(now, eventBounds(dates).start) : null;
  const units: [string, string][] = [
    ["days", parts ? String(parts.days) : "–"],
    ["hours", parts ? pad(parts.hours) : "–"],
    ["min", parts ? pad(parts.minutes) : "–"],
    ["sec", parts ? pad(parts.seconds) : "–"],
  ];

  return (
    <div>
      {/* Read once by screen readers; the ticking tiles are hidden from them. */}
      <p className="sr-only">
        {parts ? `${parts.days} days to go` : "Countdown to the workshop"}
      </p>
      <ol className="flex gap-2 sm:gap-3" aria-hidden>
        {units.map(([label, value]) => (
          <li
            key={label}
            className={`flex min-w-[64px] flex-col items-center rounded-md px-3 py-2.5 sm:min-w-[76px] ${
              dark ? "bg-white/10 text-white" : "bg-paper text-ink border border-line"
            }`}
          >
            <span className="font-display text-2xl sm:text-3xl tabular-nums leading-none">
              {value}
            </span>
            <span
              className={`mt-1 font-mono text-[10px] uppercase tracking-widest ${
                dark ? "text-white/70" : "text-ink-3"
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
