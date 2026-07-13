import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import {
  TbNetwork,
  TbMicrophone,
  TbTool,
  TbBuildingStore,
  TbArrowRight,
} from "react-icons/tb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Think Global",
  description:
    "Chakula Bora is PHI's knowledge network — connecting researchers, practitioners, and community leaders to accelerate learning and share innovations across Africa.",
  openGraph: {
    title: "Think Global | Passion of Hope International",
    description:
      "Chakula Bora — the PHI knowledge network connecting innovators and communities across Africa.",
  },
};

const pillars = [
  {
    icon: TbNetwork,
    accent: "bg-green-ll text-green",
    title: "Knowledge Network",
    description:
      "Chakula Bora digitally connects PHI's hubs, partner organisations, academic institutions, and community leaders — enabling real-time knowledge exchange across borders.",
  },
  // {
  //   icon: TbMicrophone,
  //   accent: "bg-terra-l text-terra",
  //   title: "Speaker Series",
  //   description:
  //     "Monthly virtual dialogues bringing together farmers, researchers, policymakers, and entrepreneurs to share innovations, challenge assumptions, and co-create solutions.",
  // },
  {
    icon: TbTool,
    accent: "bg-ochre-l text-ochre",
    title: "Kilimo Bunifu Workshop",
    description:
      "Hands-on training events — in-person and online — covering agro-ecology, enterprise development, data collection, and community governance for hub leaders and partners.",
  },
  // {
  //   icon: TbBuildingStore,
  //   accent: "bg-green-l text-green-d",
  //   title: "Jiimarishe Enterprise",
  //   description:
  //     "The flagship PHI enterprise model — a scalable, community-owned apiculture cooperative that generates income while restoring ecosystems through pollination and forest stewardship.",
  // },
];

export default function ThinkGlobalPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Programs", href: "/programs/think-global" },
          { label: "Think Global" },
        ]}
        headline="Chakula Bora — a knowledge network for Africa"
        sub="Connecting grassroots wisdom with global research to accelerate community-led innovation."
      />

      {/* Network description */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-3">
                The network
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">
                Knowledge as a shared resource
              </h2>
              <p className="text-ink-2 leading-relaxed mb-4">
                Chakula Bora — Swahili for &ldquo;good food&rdquo; and
                &ldquo;good things&rdquo; — is PHI&apos;s digital and physical
                knowledge platform. It aggregates field research, farmer
                innovations, market data, and policy analysis into an open,
                community-accessible resource.
              </p>
              <p className="text-ink-2 leading-relaxed mb-8">
                Rather than knowledge flowing one way — from experts to farmers
                — Chakula Bora is built on reciprocal learning: every community
                member is both a learner and a teacher.
              </p>
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-green hover:text-green-d transition-colors"
              >
                See our knowledge partners
                <TbArrowRight aria-hidden />
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Pillars grid */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              Programme pillars
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <RevealOnScroll key={p.title} delay={(i % 2) * 0.1}>
                  <article className="bg-paper rounded-lg p-8 border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 flex gap-5">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${p.accent}`}
                    >
                      <Icon className="text-2xl" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-ink mb-2">
                        {p.title}
                      </h3>
                      <p className="text-sm text-ink-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Think globally, act locally"
        sub="Support the knowledge infrastructure that makes every PHI programme smarter and more impactful."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "Become a knowledge partner", href: "/partners" }}
      />
    </>
  );
}
