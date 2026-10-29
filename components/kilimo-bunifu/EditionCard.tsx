import Image from "next/image";
import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";
import EventClock from "@/components/kilimo-bunifu/EventClock";
import { editionHref, type KilimoBunifuEdition } from "@/lib/kilimo-bunifu";
import { formatEventDates } from "@/lib/event-time";

export default function EditionCard({ edition }: { edition: KilimoBunifuEdition }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-paper transition-all duration-200 hover:-translate-y-1 hover:border-green-l has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-green">
      <div className="relative aspect-[16/9] bg-cream-2">
        <Image
          src={edition.image.src}
          alt={edition.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-4 top-4 rounded-pill bg-green-ddd/90 px-3 py-1 font-display text-lg text-white">
          KB {edition.numeral}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <time dateTime={edition.dates.startDate} className="font-mono text-xs text-green-d">
            {formatEventDates(edition.dates, "short")}
          </time>
          <EventClock dates={edition.dates} />
        </div>
        <h3 className="font-sans font-bold text-base leading-snug text-ink">
          {/* The whole card is clickable via this link's ::after overlay. */}
          <Link
            href={editionHref(edition)}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {edition.title}
          </Link>
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-ink-2">{edition.theme}</p>
        <p className="font-sans text-xs text-ink-3">
          {edition.format} · {edition.icat.edition}
        </p>
        <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-green-d group-hover:text-green-dd">
          See this edition <TbArrowRight aria-hidden />
        </span>
      </div>
    </article>
  );
}
