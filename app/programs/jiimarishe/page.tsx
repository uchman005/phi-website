import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import { TbHexagon, TbTrendingUp, TbLeaf, TbArrowRight } from "react-icons/tb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jiimarishe Enterprise",
  description:
    "Jiimarishe is PHI's flagship enterprise model — a community-owned apiculture cooperative that lifts household income fivefold while restoring ecosystems.",
  openGraph: {
    title: "Jiimarishe Enterprise | Passion of Hope International",
    description:
      "A community-owned apiculture cooperative that raises income and restores ecosystems.",
  },
};

const outcomes = [
  {
    icon: TbTrendingUp,
    accent: "bg-green-ll text-green",
    title: "5× household income",
    description:
      "The Jiimarishe honey pilot in Kendu Bay lifted participating households to five times their previous income — enough to pay school fees in full and reinvest in the enterprise.",
  },
  {
    icon: TbHexagon,
    accent: "bg-ochre-l text-ochre",
    title: "Community-owned",
    description:
      "Jiimarishe is a scalable, community-owned cooperative model. Members own the hives, the harvest, and the profit — building enterprise that stays rooted in the community.",
  },
  {
    icon: TbLeaf,
    accent: "bg-green-l text-green-d",
    title: "Restoring ecosystems",
    description:
      "Apiculture generates income while restoring ecosystems through pollination and forest stewardship — enterprise and ecology working in the same direction.",
  },
];

export default function JiimarishePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Programs", href: "/programs/jiimarishe" },
          { label: "Jiimarishe Enterprise" },
        ]}
        headline="Jiimarishe — enterprise that restores"
        sub="A flagship, community-owned apiculture model that raises income while healing the land it depends on."
      />

      {/* Featured pilot */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/programs/jiimarishe-honey.jpg"
                  alt="Jiimarishe apiculture enterprise"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div>
                <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-3">
                  The Jiimarishe honey pilot
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">
                  From subsistence to enterprise
                </h2>
                <p className="text-ink-2 leading-relaxed mb-4">
                  Jiimarishe began as an apiculture pilot in Gilgil and Kendu
                  Bay, Kenya. Widows and smallholder farmers were trained to keep
                  bees, harvest and process honey, and sell into fair-price
                  markets through a shared cooperative.
                </p>
                <p className="text-ink-2 leading-relaxed mb-6">
                  Within three years, participants like Syprina Auma were
                  managing cooperatives of a dozen hives, earning five times
                  their previous income, and mentoring new entrants — the model
                  is now scaling across East and West Africa.
                </p>
                <Link
                  href="/impact"
                  className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-green hover:text-green-d transition-colors"
                >
                  Read Syprina&apos;s story
                  <TbArrowRight aria-hidden />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Outcomes grid */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              Why the model works
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map((o, i) => {
              const Icon = o.icon;
              return (
                <RevealOnScroll key={o.title} delay={(i % 3) * 0.1}>
                  <article className="bg-paper rounded-lg p-8 border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4 h-full">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${o.accent}`}
                    >
                      <Icon className="text-2xl" aria-hidden />
                    </div>
                    <h3 className="font-sans font-bold text-base text-ink">
                      {o.title}
                    </h3>
                    <p className="text-sm text-ink-2 leading-relaxed flex-1">
                      {o.description}
                    </p>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Back an enterprise that pays it forward"
        sub="Your gift funds hives, training, and cooperative tools — income for a family and stewardship for the land."
        primary={{ label: "Donate to Jiimarishe", href: "/donate" }}
        secondary={{ label: "See our impact", href: "/impact" }}
      />
    </>
  );
}
