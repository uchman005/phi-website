import Link from "next/link";
import type { Metadata } from "next";
import { TbArrowRight, TbClock, TbMapPin } from "react-icons/tb";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import EventClock from "@/components/kilimo-bunifu/EventClock";
import EditionCard from "@/components/kilimo-bunifu/EditionCard";
import ImageCarousel, { type CarouselSlide } from "@/components/kilimo-bunifu/ImageCarousel";
import { Avatar } from "@/components/kilimo-bunifu/PersonCard";
import { editionHref, featuredEdition, kilimoBunifuEditions } from "@/lib/kilimo-bunifu";
import { eventPhase, formatEventDates } from "@/lib/event-time";
import { withShareImage } from "@/lib/seo";

// The featured edition's CTA flips after the event; re-render hourly.
export const revalidate = 3600;

const featured = featuredEdition();

const IMG = "/images/kilimo-bunifu";

// Drawn from the editions' own material; the full KB I collage leads.
const carouselSlides: CarouselSlide[] = [
  { src: `${IMG}/2020/collage.jpg`, alt: "Collage from Kilimo Bunifu I: the welcome slide, panelists, Zoom sessions, breakaway-room boards and each team's outcomes", caption: "Kilimo Bunifu I, 2020 — the session at a glance", href: "/programs/kilimo-bunifu/2020" },
  { src: `${IMG}/2020/cards/session.jpg`, alt: "Zoom gallery of Kilimo Bunifu I participants, many waving", caption: "Kilimo Bunifu I — participants on the call", href: "/programs/kilimo-bunifu/2020" },
  { src: `${IMG}/2020/cards/insights-room-2.jpg`, alt: "Sticky-note board titled Breakaway Room 2: Insights from the morning", caption: "Kilimo Bunifu I — Breakaway Room 2's insights", href: "/programs/kilimo-bunifu/2020" },
  { src: `${IMG}/2020/cards/team-jabali.jpg`, alt: "Slide: Who we are? Jabali — firm foundation and strong rock; slogan: strong and lasting partnerships", caption: "Kilimo Bunifu I — team Jabali names itself", href: "/programs/kilimo-bunifu/2020" },
  { src: `${IMG}/2020/cards/million-belay-talk.jpg`, alt: "Title slide: Adapting agriculture to change in Africa — the path to agroecology, Million Belay (PhD)", caption: "Kilimo Bunifu I — Dr. Million Belay's talk", href: "/programs/kilimo-bunifu/2020" },
  { src: `${IMG}/2022/sahel-map.jpg`, alt: "Map of the Sahel belt across West Africa, shaded by dryland zone", caption: "Kilimo Bunifu II, 2022 — food, land and peace in the Sahel", href: "/programs/kilimo-bunifu/2022" },
  { src: `${IMG}/2026/flyer-cover.jpg`, alt: "Kilimo Bunifu III flyer: Passion of Hope International launches Thee Next Gen Awakening – Africa 4.0, youth agency towards sovereignty in Africa", caption: "Kilimo Bunifu III, 2026 — Thee Next Gen Awakening", href: "/programs/kilimo-bunifu/2026" },
];

export const metadata: Metadata = {
  title: "Kilimo Bunifu",
  description: `PHI's open workshops on sustainable farming, food sovereignty and African food autonomy, held alongside ICAT. Next: Kilimo Bunifu ${featured.numeral}, ${formatEventDates(featured.dates)}.`,
  openGraph: withShareImage({
    title: "Kilimo Bunifu | Passion of Hope International",
    description:
      "Open workshops on sustainable farming, food sovereignty and African food autonomy, held alongside the International Conference on Appropriate Technology.",
    images: [{ url: featured.image.src, width: featured.image.width, height: featured.image.height, alt: featured.image.alt }],
  }),
};

export default function KilimoBunifuPage() {
  const phase = eventPhase(new Date(), featured.dates);
  const upcoming = phase !== "past";
  // Oldest first: the series reads left to right.
  const editions = [...kilimoBunifuEditions].sort((a, b) =>
    a.dates.startDate.localeCompare(b.dates.startDate)
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: "Programs" }, { label: "Kilimo Bunifu" }]}
        headline="Kilimo Bunifu — innovative agriculture"
        sub="Open workshops on sustainable farming, food sovereignty and Africa feeding itself on its own terms."
      />

      {/* What it is */}
      <section className="bg-paper px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 md:grid-cols-2">
          <RevealOnScroll>
            <div>
              <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-green-d">
                The series
              </span>
              <h2 className="mb-5 font-display text-2xl text-ink sm:text-3xl">
                A conversation, not a curriculum
              </h2>
              <p className="mb-4 leading-relaxed text-ink-2">
                <em>Kilimo Bunifu</em> is Swahili for &ldquo;innovative agriculture&rdquo;. It is a
                series of open workshops that Passion of Hope International convenes alongside the
                International Conference on Appropriate Technology (ICAT).
              </p>
              <p className="mb-4 leading-relaxed text-ink-2">
                There is no fixed syllabus. Each edition takes up whatever is most holding back
                agricultural production in Africa at that moment — or the conversation we believe
                most needs to happen — always in service of sustainable farming, food sovereignty
                and African food autonomy.
              </p>
              <p className="leading-relaxed text-ink-2">
                Farmers, researchers, policymakers, students and practitioners talk it through
                together, and the threads they pick up carry on after the day.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <ImageCarousel slides={carouselSlides} label="Moments from Kilimo Bunifu" />
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured edition */}
      <section className="bg-green-ddd px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <RevealOnScroll>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ochre">
                {upcoming ? "Next" : "Latest"} · Kilimo Bunifu {featured.numeral}
              </p>
              <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-lg text-white/85">{featured.theme}</p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm text-white/85">
                <li className="flex items-center gap-1.5">
                  <TbClock aria-hidden className="text-ochre" />
                  <time dateTime={featured.dates.startDate}>{formatEventDates(featured.dates)}</time>
                </li>
                <li className="flex items-center gap-1.5">
                  <TbMapPin aria-hidden className="text-ochre" />
                  {featured.format}
                </li>
              </ul>
              {featured.summary[0] && (
                <p className="mt-5 max-w-xl leading-relaxed text-white/80">{featured.summary[0]}</p>
              )}
              {featured.lead && (
                <div className="mt-6 flex items-center gap-3">
                  <Avatar name={featured.lead.name} photo={featured.lead.photo} size={48} />
                  <p className="font-sans text-sm text-white/85">
                    Led by{" "}
                    <Link href="/team" className="font-semibold text-white underline-offset-2 hover:underline">
                      {featured.lead.name}
                    </Link>
                    , Program Lead
                  </p>
                </div>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`${editionHref(featured)}${upcoming && featured.registration ? "#join" : ""}`}
                  className="inline-flex items-center gap-2 rounded-pill bg-ochre px-6 py-3 font-sans text-sm font-semibold text-green-ddd transition-colors hover:bg-ochre-l"
                >
                  {upcoming && featured.registration ? "Join the workshop" : "See outcomes"}
                  <TbArrowRight aria-hidden />
                </Link>
                <Link
                  href={editionHref(featured)}
                  className="inline-flex items-center gap-2 rounded-pill border border-white/30 bg-white/10 px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  About Kilimo Bunifu {featured.numeral}
                </Link>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="flex flex-col items-start gap-5 rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-white/70">
                {upcoming ? "Counting down" : "It happened"}
              </p>
              <EventClock dates={featured.dates} variant="tiles" tone="dark" liveLabel="Happening today — join online" />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* All editions */}
      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <RevealOnScroll>
            <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-green-d">
              Every edition
            </span>
            <h2 className="mb-10 font-display text-2xl text-ink sm:text-3xl">
              {editions.length} editions
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {editions.map((e, i) => (
              <RevealOnScroll key={e.slug} delay={i * 0.08}>
                <EditionCard edition={e} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Back the next generation"
        sub="Support Kilimo Bunifu III — young Africans, evidence and commitments on food sovereignty. 24 Nov 2026, Bulawayo."
        primary={{
          label: "Donate to Kilimo Bunifu",
          href: "/donate?project=kilimo-bunifu-workshops",
        }}
        secondary={{ label: "Kilimo Bunifu III →", href: editionHref(featured) }}
      />
    </>
  );
}
