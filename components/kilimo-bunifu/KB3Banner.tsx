import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";
import EventClock from "@/components/kilimo-bunifu/EventClock";
import { editionHref, featuredEdition } from "@/lib/kilimo-bunifu";
import { bannerPhase, formatEventDates } from "@/lib/event-time";

/**
 * Site-wide promo strip for the featured Kilimo Bunifu edition. The phase is
 * decided on the server (pages using it revalidate hourly), so the copy is
 * identical in server HTML and on hydration; only the countdown ticks.
 */
export default function KB3Banner() {
  const edition = featuredEdition();
  const phase = bannerPhase(new Date(), edition.dates);
  if (phase === "hidden") return null;

  const pre = phase === "pre";
  const href = `${editionHref(edition)}${pre ? "#join" : "#afterwards"}`;
  // "24 Nov" and "Bulawayo", derived from the edition data.
  const day = formatEventDates(edition.dates, "short").replace(/\s\d{4}$/, "");
  const city = edition.icat.place?.split(",")[0];

  return (
    <aside aria-label={`Kilimo Bunifu ${edition.numeral}`} className="bg-ochre px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center font-sans text-sm text-green-ddd">
        <p>
          {pre ? (
            <>
              <strong>Kilimo Bunifu {edition.numeral}</strong> · {day}
              {city ? ` · ${city} + online` : " · online"}
            </>
          ) : (
            <strong>Kilimo Bunifu {edition.numeral} outcomes</strong>
          )}
        </p>
        {pre && (
          <span className="rounded-pill bg-green-ddd/10 px-2.5 py-0.5">
            <EventClock dates={edition.dates} tone="inherit" />
          </span>
        )}
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 hover:no-underline"
        >
          {pre ? "Join the workshop" : "See what was committed"}
          <TbArrowRight aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
