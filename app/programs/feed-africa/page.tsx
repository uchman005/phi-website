import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import DarkCTA from "@/components/home/DarkCTA";
import {
  TbTractor,
  TbLeaf,
  TbDroplet,
  TbSun,
  TbBuildingStore,
  TbArrowRight,
} from "react-icons/tb";

export const metadata: Metadata = {
  title: "Feed Africa",
  description:
    "Kilimo Bunifu — PHI's innovative farming programme — trains smallholder farmers as scientists, building food sovereignty across rural Africa through agro-ecological methods.",
  openGraph: {
    title: "Feed Africa | Passion of Hope International",
    description:
      "Kilimo Bunifu — innovative farming for food sovereignty across rural Africa.",
  },
};

const farmToFork = [
  { icon: TbLeaf, label: "Soil health" },
  { icon: TbDroplet, label: "Water management" },
  { icon: TbTractor, label: "Agro-ecological farming" },
  { icon: TbSun, label: "Post-harvest processing" },
  { icon: TbBuildingStore, label: "Market linkages" },
];

const principles = [
  {
    title: "The farmer as scientist",
    text: "Smallholder farmers are trained to observe, experiment, record, and share — turning their fields into living laboratories for agro-ecological innovation.",
  },
  {
    title: "Soil-first approach",
    text: "Before yields, before profits — healthy soil. Composting, cover crops, and reduced tillage rebuild organic matter and cut input costs by over 60%.",
  },
  {
    title: "Water sovereignty",
    text: "Rainwater harvesting, micro-irrigation, and wetland conservation keep farms productive even in drought years — reducing vulnerability to climate shocks.",
  },
  {
    title: "Market connections",
    text: "Cooperatives, digital market platforms, and PHI's partner networks link farmers to fair-price buyers — closing the gap between harvest and household income.",
  },
];

export default function FeedAfricaPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Programs", href: "/programs/feed-africa" },
          { label: "Feed Africa" },
        ]}
        headline="Kilimo Bunifu — innovative farming"
        sub="Agro-ecological methods that restore land, feed families, and build economic resilience — led by farmers, for farmers."
      />

      {/* The farmer as scientist */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div>
                <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-3">
                  Our approach
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">
                  The farmer as a scientist
                </h2>
                <p className="text-ink-2 leading-relaxed mb-4">
                  Traditional agricultural development trains farmers to follow
                  instructions. Kilimo Bunifu does the opposite — it trains
                  smallholder farmers to ask questions, run experiments, record
                  data, and share findings with their peers.
                </p>
                <p className="text-ink-2 leading-relaxed">
                  The result is a living, community-owned knowledge system that
                  adapts to local soils, microclimates, and markets — far more
                  resilient than any top-down extension service could provide.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <ImagePlaceholder
                variant="forest"
                label="Kilimo Bunifu Field"
                aspectRatio="aspect-[4/3]"
                className="rounded-xl"
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Farm-to-fork chain */}
      <section className="bg-green-ll py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2 text-center">
              Farm to fork
            </h2>
            <p className="text-ink-3 text-center mb-10">
              End-to-end food systems support
            </p>
          </RevealOnScroll>
          <nav aria-label="Farm to fork steps">
            <ol className="flex flex-wrap items-center justify-center gap-3">
              {farmToFork.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.label}
                    className="flex items-center gap-3"
                  >
                    <RevealOnScroll delay={i * 0.08}>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-14 h-14 rounded-xl bg-green flex items-center justify-center text-white shadow-sm">
                          <Icon className="text-2xl" aria-hidden />
                        </div>
                        <span className="font-sans text-xs text-ink-2 text-center max-w-[80px]">
                          {step.label}
                        </span>
                      </div>
                    </RevealOnScroll>
                    {i < farmToFork.length - 1 && (
                      <TbArrowRight
                        className="text-green-d text-lg shrink-0 mt-[-18px]"
                        aria-hidden
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </section>

      {/* Principles grid */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              Food sovereignty in practice
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((p, i) => (
              <RevealOnScroll key={p.title} delay={(i % 2) * 0.1}>
                <div className="bg-cream rounded-lg p-6 border border-line">
                  <h3 className="font-sans font-bold text-base text-ink mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-ink-2 leading-relaxed">{p.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Feed a family. Fund a farmer."
        sub="$50 trains one farmer in Kilimo Bunifu methods — feeding their family and their community for years."
        primary={{ label: "Donate to Feed Africa", href: "/donate" }}
        secondary={{ label: "Impact stories", href: "/impact" }}
      />
    </>
  );
}
