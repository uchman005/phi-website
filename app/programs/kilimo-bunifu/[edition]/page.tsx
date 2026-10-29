import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  TbArrowLeft,
  TbArrowRight,
  TbCalendarPlus,
  TbCircleCheck,
  TbClock,
  TbMapPin,
  TbQuote,
} from "react-icons/tb";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import EventClock from "@/components/kilimo-bunifu/EventClock";
import PersonCard from "@/components/kilimo-bunifu/PersonCard";
import EngagementForm from "@/components/kilimo-bunifu/EngagementForm";
import {
  editionHref,
  editionsNewestFirst,
  getEdition,
  kilimoBunifuEditions,
  type Fgd,
  type KilimoBunifuEdition,
} from "@/lib/kilimo-bunifu";
import { eventPhase, formatEventDates } from "@/lib/event-time";
import { pageTitle, withShareImage } from "@/lib/seo";

// Pre/post-event copy (CTA labels, form intro) is chosen on the server;
// re-render hourly so it flips on the day without a redeploy.
export const revalidate = 3600;
export const dynamicParams = false;

interface EditionPageProps {
  params: Promise<{ edition: string }>;
}

export function generateStaticParams() {
  return kilimoBunifuEditions.map((e) => ({ edition: e.slug }));
}

function fullTitle(e: KilimoBunifuEdition): string {
  return e.title === `Kilimo Bunifu ${e.numeral}`
    ? `${e.title} (${e.slug})`
    : `Kilimo Bunifu ${e.numeral}: ${e.title}`;
}

function description(e: KilimoBunifuEdition): string {
  return `${e.theme}. ${formatEventDates(e.dates)} · ${e.format} · ${e.icat.edition}.`;
}

export async function generateMetadata({ params }: EditionPageProps): Promise<Metadata> {
  const { edition: slug } = await params;
  const e = getEdition(slug);
  if (!e) return {};
  return {
    title: pageTitle(fullTitle(e)),
    description: description(e),
    openGraph: withShareImage({
      title: `${fullTitle(e)} | Passion of Hope International`,
      description: description(e),
      images: [{ url: e.image.src, width: e.image.width, height: e.image.height, alt: e.image.alt }],
    }),
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.passionofhope.org";

function eventSchema(e: KilimoBunifuEdition) {
  const online = { "@type": "VirtualLocation", url: `${SITE_URL}${editionHref(e)}` };
  const inPerson = e.icat.place
    ? { "@type": "Place", name: `${e.icat.edition}, ${e.icat.place}`, address: e.icat.place }
    : null;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: fullTitle(e),
    description: description(e),
    startDate: e.dates.startDate,
    endDate: e.dates.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: inPerson
      ? "https://schema.org/MixedEventAttendanceMode"
      : "https://schema.org/OnlineEventAttendanceMode",
    location: inPerson ? [inPerson, online] : online,
    image: [`${SITE_URL}${e.image.src}`],
    organizer: { "@type": "NGO", name: "Passion of Hope International", url: SITE_URL },
  };
}

function SectionHeading({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <RevealOnScroll>
      {kicker && (
        <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-green-d">
          {kicker}
        </span>
      )}
      <h2 className="font-display text-2xl text-ink sm:text-3xl">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl font-sans text-ink-3">{sub}</p>}
    </RevealOnScroll>
  );
}

const fgdStatus: Record<Fgd["status"], { label: string; className: string }> = {
  completed: { label: "Completed", className: "bg-green-l text-green-dd" },
  upcoming: { label: "Upcoming", className: "bg-ochre-l text-ochre-d" },
  tbc: { label: "To be confirmed", className: "bg-cream-2 text-ink-2" },
};

export default async function EditionPage({ params }: EditionPageProps) {
  const { edition: slug } = await params;
  const e = getEdition(slug);
  if (!e) notFound();

  const phase = eventPhase(new Date(), e.dates);
  const isUpcoming = phase !== "past";
  const ordered = editionsNewestFirst();
  const i = ordered.findIndex((x) => x.slug === e.slug);
  const newer = ordered[i - 1];
  const older = ordered[i + 1];
  const latest = ordered[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(e)) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-green-ddd px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 font-sans text-sm text-white/70">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/programs/kilimo-bunifu" className="hover:text-white">Kilimo Bunifu</Link></li>
                <li aria-hidden>/</li>
                <li className="text-white">KB {e.numeral}</li>
              </ol>
            </nav>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ochre">
              {e.strapline ?? `Kilimo Bunifu ${e.numeral} · ${e.icat.edition}`}
            </p>
            <h1 className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              {e.title}
            </h1>
            <p className="mt-4 max-w-xl font-sans text-lg text-white/85">{e.theme}</p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm text-white/85">
              <li className="flex items-center gap-1.5">
                <TbClock aria-hidden className="text-ochre" />
                <time dateTime={e.dates.startDate}>{formatEventDates(e.dates)}</time>
              </li>
              <li className="flex items-center gap-1.5">
                <TbMapPin aria-hidden className="text-ochre" />
                {e.format}
              </li>
              <li>{e.icat.edition}{e.icat.place ? ` · ${e.icat.place}` : ""}</li>
            </ul>
            {e.dateConfirmed === null && (
              <p className="mt-2 font-sans text-xs text-white/70">
                Date subject to ICAT confirmation.
              </p>
            )}

            <div className="mt-8">
              <EventClock dates={e.dates} variant="tiles" tone="dark" liveLabel="Happening today — join online" />
            </div>

            {e.registration && (
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={isUpcoming ? "#join" : "#afterwards"}
                  className="inline-flex items-center gap-2 rounded-pill bg-ochre px-6 py-3 font-sans text-sm font-semibold text-green-ddd shadow-sm transition-colors hover:bg-ochre-l"
                >
                  {isUpcoming ? "Join the workshop" : "See outcomes"}
                  <TbArrowRight aria-hidden />
                </Link>
                <Link
                  href="/partners"
                  className="inline-flex items-center gap-2 rounded-pill border border-white/30 bg-white/10 px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  Partner with us
                </Link>
              </div>
            )}
          </div>

          <div className="relative">
            <div
              className="relative overflow-hidden rounded-xl bg-black/20 shadow-2xl"
              style={{ aspectRatio: `${e.image.width} / ${e.image.height}` }}
            >
              <Image
                src={e.image.src}
                alt={e.image.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* KB III: the provocation */}
      {e.quote && e.intro && (
        <section className="bg-paper px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[900px]">
            <RevealOnScroll>
              <figure>
                <TbQuote className="mb-3 text-4xl text-ochre" aria-hidden />
                <blockquote className="font-display text-3xl italic leading-snug text-ink sm:text-4xl">
                  &ldquo;{e.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-3 font-sans text-sm text-ink-3">— {e.quote.by}</figcaption>
              </figure>
              <p className="mt-8 font-sans text-lg leading-relaxed text-ink-2">{e.intro}</p>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* About this edition */}
      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading kicker={`Kilimo Bunifu ${e.numeral}`} title="About this edition" />
            <div className="mt-6 flex flex-col gap-4">
              {e.summary.map((p) => (
                <p key={p.slice(0, 32)} className="leading-relaxed text-ink-2">{p}</p>
              ))}
              {e.origin && (
                <p className="border-l-4 border-ochre pl-4 leading-relaxed text-ink-2">{e.origin}</p>
              )}
            </div>
            {e.facts && (
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {e.facts.map((f) => (
                  <li key={f} className="flex gap-2.5 rounded-md border border-line bg-paper p-4 text-sm text-ink-2">
                    <TbCircleCheck className="mt-0.5 shrink-0 text-green-d" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="flex flex-col gap-6 self-start rounded-lg border border-line bg-paper p-6">
            {e.host && (
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-3">Hosted by</p>
                <PersonCard person={e.host} layout="row" />
              </div>
            )}
            {e.lead && (
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-3">Led by</p>
                <PersonCard person={e.lead} layout="row" />
              </div>
            )}
            {e.facilitators && (
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-3">Facilitated by</p>
                {e.facilitators.map((f) => (
                  <PersonCard key={f.name} person={f} layout="row" />
                ))}
              </div>
            )}
            {e.supporters && (
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-ink-3">With support from</p>
                <ul className="text-sm text-ink-2">
                  {e.supporters.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            )}
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-ink-3">Held alongside</p>
              <p className="text-sm text-ink-2">
                The {e.icat.edition.replace(" ICAT", "")}{" "}
                International Conference on Appropriate Technology
                {e.icat.dates ? `, ${e.icat.dates}` : ""}
                {e.icat.place ? `, ${e.icat.place}` : ""}
                {e.icat.organiser ? ` — organised by ${e.icat.organiser}` : ""}.
              </p>
              {e.icat.theme && (
                <p className="mt-2 text-xs italic text-ink-3">Conference theme: &ldquo;{e.icat.theme}&rdquo;</p>
              )}
              {e.icat.url && (
                <a
                  href={e.icat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-green-d hover:text-green-dd"
                >
                  Conference website <TbArrowRight aria-hidden />
                </a>
              )}
            </div>
            {e.region && (
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-ink-3">{e.region.label}</p>
                <p className="text-sm text-ink-2">{e.region.countries.join(" · ")}</p>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* KB III: why now */}
      {e.stats && (
        <section className="bg-paper px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading kicker="Why now" title="A continent of young people" />
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {e.stats.map((s, n) => (
                <RevealOnScroll key={s.value} delay={n * 0.08}>
                  <div className="flex h-full flex-col gap-3 rounded-lg bg-green-ddd p-7 text-white">
                    <span className="font-display text-5xl text-ochre">{s.value}</span>
                    <p className="flex-1 leading-relaxed text-white/85">{s.text}</p>
                    {s.source && (
                      <a href={s.source} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white/80 underline hover:text-white">
                        Source
                      </a>
                    )}
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* KB III: three conversations */}
      {e.fgds && (
        <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading
              kicker="Listening first"
              title="Three conversations, one workshop"
              sub="Before the workshop, we held focus group discussions with three groups. What they said is the evidence the day is built on."
            />
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {e.fgds.map((f, n) => {
                const status = fgdStatus[f.status];
                return (
                  <RevealOnScroll key={f.label} delay={n * 0.08}>
                    <article className="flex h-full flex-col gap-3 rounded-lg border border-line bg-paper p-6">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-green-d">{f.label}</span>
                        <span className={`rounded-pill px-2.5 py-0.5 font-sans text-[11px] font-semibold ${status.className}`}>
                          {status.label}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl text-ink">{f.audience}</h3>
                      <p className="text-sm text-ink-2">{f.description}</p>
                      {(f.place || f.date) && (
                        <p className="font-sans text-xs text-ink-3">
                          {[f.place, f.date && formatEventDates({ startDate: f.date, endDate: f.date, timeZone: "UTC" }, "short")]
                            .filter(Boolean)
                            .join(" · ")}
                          {f.facilitator ? ` · Facilitated by ${f.facilitator}` : ""}
                        </p>
                      )}
                      {f.summary && (
                        <p className="mt-auto border-t border-line pt-3 text-sm leading-relaxed text-ink-2">{f.summary}</p>
                      )}
                    </article>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* KB III: findings */}
      {e.findings && (
        <section className="bg-paper px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading kicker={e.findings.source} title={e.findings.heading} />
            <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {e.findings.items.map((item, n) => (
                <RevealOnScroll key={item.slice(0, 24)} delay={(n % 2) * 0.06}>
                  <li className="flex h-full gap-4 rounded-lg border border-line bg-cream p-5">
                    <span className="font-display text-2xl leading-none text-ochre-d" aria-hidden>
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-relaxed text-ink-2">{item}</p>
                  </li>
                </RevealOnScroll>
              ))}
            </ol>
            {e.findings.question && (
              <p className="mt-8 font-display text-xl italic text-ink">
                The question we&apos;re carrying forward: &ldquo;{e.findings.question}&rdquo;
              </p>
            )}
          </div>
        </section>
      )}

      {/* KB III: the day */}
      {e.daySteps && (
        <section className="bg-green-ll px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading kicker={formatEventDates(e.dates)} title="The day" />
            <ol className="mt-10 grid grid-cols-1 gap-0 md:grid-cols-5 md:gap-4">
              {e.daySteps.map((step, n) => (
                <li key={step.title} className="relative flex gap-4 pb-8 md:flex-col md:pb-0">
                  {/* Connector: vertical on mobile, horizontal from md up. */}
                  {n < e.daySteps!.length - 1 && (
                    <span
                      className="absolute left-5 top-10 h-full w-px bg-green md:left-10 md:top-5 md:h-px md:w-full"
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-d font-mono text-sm font-semibold text-white">
                    {n + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-bold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm text-ink-2">{step.line}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Panelists / speakers */}
      {e.people && (
        <section className="bg-paper px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading kicker="Who spoke" title={e.peopleHeading ?? "Speakers"} />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {e.people.map((p, n) => (
                <RevealOnScroll key={p.name} delay={(n % 3) * 0.06}>
                  <PersonCard person={p} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Agenda */}
      {e.agenda && (
        <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[900px]">
            <SectionHeading kicker="Agenda" title={e.agenda.heading} sub={e.agenda.note} />
            <ol className="mt-8 border-l-2 border-green-l">
              {e.agenda.items.map((item) => (
                <li key={item.time} className="relative pb-6 pl-6 last:pb-0">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-green" aria-hidden />
                  <p className="font-mono text-xs text-green-d">{item.time}</p>
                  <p className="font-sans font-semibold text-ink">{item.title}</p>
                  {item.detail && <p className="text-sm text-ink-3">{item.detail}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Breakout teams */}
      {e.breakouts && (
        <section className="bg-paper px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading
              kicker="Breakaway rooms"
              title="Three teams, three names"
              sub="Each breakaway room named itself, chose a slogan and a chant, and wrote its own challenge statements."
            />
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {e.breakouts.map((t, n) => (
                <RevealOnScroll key={t.name} delay={n * 0.08}>
                  <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-cream">
                    {t.card && (
                      <div className="relative aspect-[2/1] bg-paper">
                        <Image src={t.card} alt={`${t.name}'s "Who we are?" slide`} fill className="object-contain" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <p className="font-mono text-xs uppercase tracking-widest text-ink-3">{t.room}</p>
                      <h3 className="font-display text-2xl text-ink">{t.name}</h3>
                      <p className="text-sm italic text-ink-2">{t.meaning}</p>
                      {t.slogan && (
                        <p className="text-sm text-ink-2"><span className="font-semibold text-ink">Slogan:</span> {t.slogan}</p>
                      )}
                      {t.chant && (
                        <p className="text-sm text-ink-2"><span className="font-semibold text-ink">Chant:</span> {t.chant}</p>
                      )}
                      <p className="mt-auto pt-2 text-xs text-green-d">Focus: {t.focus}</p>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {e.gallery && e.gallery.length > 0 && (
        <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading kicker="From the session" title="Shared on the day" />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {e.gallery.map((g) => (
                <figure key={g.src} className={g.wide ? "sm:col-span-2" : ""}>
                  <a
                    href={g.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-[16/10] overflow-hidden rounded-lg border border-line bg-paper"
                    aria-label={`Open full size: ${g.caption}`}
                  >
                    <Image src={g.src} alt={g.alt} fill className="object-contain transition-transform duration-300 hover:scale-[1.02]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw" />
                  </a>
                  <figcaption className="mt-2 font-sans text-xs text-ink-3">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What followed */}
      {e.followUps && (
        <section className="bg-paper px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[900px]">
            <SectionHeading title={e.followUps.heading} />
            <div className="mt-6 flex flex-col gap-4">
              {e.followUps.items.map((t) => (
                <p key={t.slice(0, 32)} className="leading-relaxed text-ink-2">{t}</p>
              ))}
            </div>
            {e.followUps.links && (
              <div className="mt-6 flex flex-wrap gap-4">
                {e.followUps.links.map((l) => (
                  <Link key={l.href} href={l.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-d hover:text-green-dd">
                    {l.label} <TbArrowRight aria-hidden />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* KB III: team */}
      {(e.lead || e.team) && e.registration && (
        <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading kicker="The team" title="Who is making it happen" />
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr]">
              {e.lead && (
                <RevealOnScroll>
                  <PersonCard person={e.lead} />
                </RevealOnScroll>
              )}
              {e.team && (
                <div>
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-3">Supporting team</p>
                  <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {e.team.map((p) => (
                      <li key={p.name}><PersonCard person={p} layout="row" /></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {e.universities && (
              <div className="mt-12 border-t border-line pt-8">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-3">Participating universities</p>
                <ul className="flex flex-wrap gap-3">
                  {e.universities.map((u) => (
                    <li key={u.name} className="rounded-pill border border-line bg-paper px-4 py-2 text-sm text-ink">
                      {u.name} <span className="text-ink-3">· {u.place}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* KB III: join */}
      {e.registration && (
        <section id="join" className="scroll-mt-24 bg-paper px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <SectionHeading
                kicker={isUpcoming ? "Join us" : "Keep going"}
                title={isUpcoming ? "Join the workshop" : "Join the December study groups"}
                sub={
                  isUpcoming
                    ? "Come to Bulawayo, join online, speak, partner — or just stay in the loop."
                    : "The workshop was a benchmark, not the end. Tell us how you want to stay involved."
                }
              />
              {isUpcoming && (
                <a
                  href={`${editionHref(e)}/calendar.ics`}
                  download
                  className="mt-6 inline-flex items-center gap-2 rounded-pill border border-line px-5 py-2.5 font-sans text-sm font-semibold text-ink transition-colors hover:border-green hover:text-green-d"
                >
                  <TbCalendarPlus aria-hidden /> Add to calendar
                </a>
              )}
            </div>
            <EngagementForm phase={isUpcoming ? "pre" : "post"} />
          </div>
        </section>
      )}

      {/* KB III: afterwards */}
      {e.afterwards && (
        <section id="afterwards" className="scroll-mt-24 bg-cream px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[900px]">
            <SectionHeading kicker="After the day" title="The workshop is a benchmark, not the end" />
            <ul className="mt-6 flex flex-col gap-3">
              {e.afterwards.map((a) => (
                <li key={a} className="flex gap-3 text-ink-2">
                  <TbCircleCheck className="mt-1 shrink-0 text-green-d" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Other editions */}
      <nav aria-label="Other Kilimo Bunifu editions" className="border-t border-line bg-paper px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
          {older ? (
            <Link href={editionHref(older)} className="group inline-flex items-center gap-2 font-sans text-sm text-ink-2 hover:text-green-d">
              <TbArrowLeft aria-hidden className="transition-transform group-hover:-translate-x-0.5" />
              <span>
                <span className="block text-xs text-ink-3">Earlier · KB {older.numeral}</span>
                {older.title}
              </span>
            </Link>
          ) : <span />}
          <Link href="/programs/kilimo-bunifu" className="font-sans text-sm font-semibold text-green-d hover:text-green-dd">
            All editions
          </Link>
          {newer ? (
            <Link href={editionHref(newer)} className="group inline-flex items-center gap-2 text-right font-sans text-sm text-ink-2 hover:text-green-d">
              <span>
                <span className="block text-xs text-ink-3">Next · KB {newer.numeral}</span>
                {newer.title}
              </span>
              <TbArrowRight aria-hidden className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : <span />}
        </div>
      </nav>

      {!e.registration && latest.registration && (
        <DarkCTA
          headline={`Kilimo Bunifu ${latest.numeral}: ${latest.title}`}
          sub={`${formatEventDates(latest.dates)} · ${latest.format}. ${latest.theme}.`}
          primary={{ label: "See the next edition", href: editionHref(latest) }}
          secondary={{ label: "Back the next generation", href: "/donate?project=kilimo-bunifu-workshops" }}
        />
      )}
    </>
  );
}
