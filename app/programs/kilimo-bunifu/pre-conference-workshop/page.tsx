import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TbArrowRight, TbClock, TbInfoCircle, TbWorld } from "react-icons/tb";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import EventClock from "@/components/kilimo-bunifu/EventClock";
import PreWorkshopForm from "@/components/kilimo-bunifu/PreWorkshopForm";
import { editionHref, featuredEdition, preConferenceWorkshop as workshop } from "@/lib/kilimo-bunifu";
import { eventPhase } from "@/lib/event-time";
import { siteFacts } from "@/lib/site-facts";
import { withShareImage } from "@/lib/seo";

// Registration closes after the event; re-render hourly so it does so on time.
export const revalidate = 3600;

const TITLE = "Pre-Conference Workshop, 14 November 2026 — Kilimo Bunifu III";
const DESCRIPTION =
  "Register for the virtual pre-conference workshop on 14 November 2026: Thee Next Gen Awakening – Africa 4.0. Conversations on sovereignty, with an emphasis on food systems.";

const shareImage = {
  url: workshop.share.src,
  width: workshop.share.width,
  height: workshop.share.height,
  alt: workshop.share.alt,
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: withShareImage({
    title: TITLE,
    description: DESCRIPTION,
    images: [shareImage],
  }),
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [shareImage],
    ...(siteFacts.social.xHandle ? { site: siteFacts.social.xHandle } : {}),
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.passionofhope.org";

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: TITLE,
  description: DESCRIPTION,
  startDate: workshop.dates.startDate,
  endDate: workshop.dates.endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  location: { "@type": "VirtualLocation", url: `${SITE_URL}${workshop.href}` },
  image: [`${SITE_URL}${workshop.share.src}`],
  organizer: { "@type": "NGO", name: siteFacts.organisation.name, url: SITE_URL },
};

export default function PreConferenceWorkshopPage() {
  const open = eventPhase(new Date(), workshop.dates) !== "past";
  const main = featuredEdition();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      {/* Hero */}
      <section className="bg-green-ddd px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 font-sans text-sm text-white/70">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/programs/kilimo-bunifu" className="hover:text-white">Kilimo Bunifu</Link></li>
                <li aria-hidden>/</li>
                <li><Link href={editionHref(main)} className="hover:text-white">KB {main.numeral}</Link></li>
                <li aria-hidden>/</li>
                <li className="text-white">Pre-conference workshop</li>
              </ol>
            </nav>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ochre">
              Kilimo Bunifu III · Africa 4.0
            </p>
            <h1 className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              Pre-Conference Workshop: 14 November 2026
            </h1>
            <p className="mt-4 max-w-xl font-sans text-lg text-white/85">
              Thee Next Gen Awakening – Africa 4.0. Conversations on sovereignty, with an emphasis
              on food systems.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm text-white/85">
              <li className="flex items-center gap-1.5">
                <TbClock aria-hidden className="text-ochre" />
                <time dateTime={workshop.dates.startDate}>Saturday 14 November 2026</time>
              </li>
              <li className="flex items-center gap-1.5">
                <TbWorld aria-hidden className="text-ochre" />
                Virtual
              </li>
            </ul>

            <p className="mt-6 flex max-w-xl gap-3 rounded-md border border-ochre/40 bg-white/5 p-4 font-sans text-sm leading-relaxed text-white/90">
              <TbInfoCircle className="mt-0.5 shrink-0 text-lg text-ochre" aria-hidden />
              <span>
                <strong className="text-white">This is the pre-conference workshop, happening
                online on 14 November.</strong>{" "}
                It comes before the 12th International Conference on Appropriate Technology and the
                main Kilimo Bunifu III workshop in Bulawayo on 24 November.
              </span>
            </p>

            <div className="mt-8">
              <EventClock dates={workshop.dates} variant="tiles" tone="dark" liveLabel="Happening today" />
            </div>

            {open && (
              <a
                href="#register"
                className="mt-8 inline-flex items-center gap-2 rounded-pill bg-ochre px-6 py-3 font-sans text-sm font-semibold text-green-ddd shadow-sm transition-colors hover:bg-ochre-l"
              >
                Register now
                <TbArrowRight aria-hidden />
              </a>
            )}
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div
              className="relative overflow-hidden rounded-xl shadow-2xl"
              style={{ aspectRatio: `${workshop.flyer.width} / ${workshop.flyer.height}` }}
            >
              <Image
                src={workshop.flyer.src}
                alt={workshop.flyer.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 384px, 384px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The questions + registration */}
      <section id="register" className="scroll-mt-24 bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <div>
              <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-green-d">
                The conversation
              </span>
              <h2 className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                Africa is home to the majority of the world&apos;s remaining uncultivated arable land.
              </h2>
              <p className="mt-6 font-display text-xl italic text-ochre-d">… so …</p>
              <p className="mt-2 font-sans text-lg font-semibold text-ink">
                Why are 1 in 5 Africans hungry, yet our food is grown for global export?
              </p>
              <p className="mt-6 font-display text-xl italic text-ochre-d">… and …</p>
              <p className="mt-2 font-sans text-lg font-semibold text-ink">
                Why are we importing basic staples that we can grow ourselves?
              </p>
            </div>
          </RevealOnScroll>

          {open ? (
            <PreWorkshopForm />
          ) : (
            <div className="rounded-lg border border-line bg-paper p-8">
              <h3 className="font-display text-2xl text-ink">Registration has closed</h3>
              <p className="mt-2 text-ink-2">
                The pre-conference workshop took place on 14 November 2026.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* On to the main workshop */}
      <section className="bg-paper px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <p className="max-w-2xl text-ink-2">
            The conversation continues at the main Kilimo Bunifu III workshop, 24 November 2026,
            in Bulawayo and online.
          </p>
          <Link
            href={editionHref(main)}
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-green-d hover:text-green-dd"
          >
            About Kilimo Bunifu III <TbArrowRight aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
