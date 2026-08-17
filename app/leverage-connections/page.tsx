import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import {
  TbUsersGroup,
  TbFlask,
  TbCalendarEvent,
  TbNetwork,
  TbArrowRight,
} from "react-icons/tb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leverage the Power of Connection",
  description:
    "PHI takes advantage of existing community efforts, research, outreach, and events to promote sustainable development practices across Africa — rather than starting from zero.",
  openGraph: {
    title: "Leverage the Power of Connection | Passion of Hope International",
    description:
      "Existing community efforts, research, outreach, and events — connected to promote sustainable development.",
  },
};

const pillars = [
  {
    icon: TbUsersGroup,
    accent: "bg-green-ll text-green-d",
    title: "Community efforts",
    description:
      "Rather than starting from zero, PHI's hubs plug into chama groups, cooperatives, and community organisations already doing the work — and help them go further.",
  },
  {
    icon: TbFlask,
    accent: "bg-terra-l text-terra-d",
    title: "Research & institutions",
    description:
      "Partnerships with universities and research centres — from the Songhaï Centre to the University of Ilorin — bring evidence-based, locally-adapted practice to every programme.",
  },
  {
    icon: TbCalendarEvent,
    accent: "bg-ochre-l text-ochre-d",
    title: "Outreach & events",
    description:
      "World Food Day showcases, school farm tours, and field days put community-led innovation in front of new farmers, students, and partners.",
  },
  {
    icon: TbNetwork,
    accent: "bg-green-l text-green-d",
    title: "Knowledge networks",
    description:
      "ChakulaBora connects hubs, clubs, and partners digitally — so a lesson learned in one community reaches every other one in real time.",
  },
];

export default function LeverageConnectionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Leverage the Power of Connection" }]}
        headline="Leverage the power of connection"
        sub="Take advantage of existing community efforts, research, outreach, and events to promote sustainable development practices — change moves faster when it isn't starting alone."
      />

      {/* Pillars grid */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              How we connect
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <RevealOnScroll key={p.title} delay={(i % 2) * 0.1}>
                  <article className="bg-cream rounded-lg p-8 border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 flex gap-5">
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

      {/* Examples — across our hubs */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-3">
              Across our hubs
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
              Connection in practice
            </h2>
            <p className="text-ink-3 font-sans mb-10 max-w-2xl">
              Each PHI hub draws on the efforts, institutions, and networks
              already around it — led from within the community.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Mary Omega",
                hub: "Kenya Hub",
                href: "/programs/hubs/kenya",
                text: "In Kendu Bay, Mary brings widow groups and school clubs to World Food Day showcases — connecting members with partners and buyers across the county.",
              },
              {
                name: "Mariam Olorundare",
                hub: "Nigeria Hub",
                href: "/programs/hubs/nigeria",
                text: "At Maripha Farms, Mariam's partnership with the University of Ilorin turns the farm into a research and incubator centre for the next generation of agro-entrepreneurs.",
              },
              {
                name: "Guillain Nabahya",
                hub: "DRC Hub",
                href: "/programs/hubs/drc",
                text: "In Uvira, Guillain's farmer field schools connect smallholders directly to each other — spreading biochar and briquette techniques farmer to farmer.",
              },
            ].map((ex, i) => (
              <RevealOnScroll key={ex.name} delay={(i % 3) * 0.1}>
                <Link
                  href={ex.href}
                  className="group block bg-paper rounded-lg p-8 border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 h-full"
                >
                  <span className="font-mono text-xs text-green-d uppercase tracking-widest">
                    {ex.hub}
                  </span>
                  <h3 className="font-sans font-bold text-base text-ink mt-2 mb-3">
                    {ex.name}
                  </h3>
                  <p className="text-sm text-ink-2 leading-relaxed mb-4">
                    {ex.text}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-sans font-semibold text-green-d group-hover:text-green-dd transition-colors">
                    Explore hub
                    <TbArrowRight
                      className="group-hover:translate-x-0.5 transition-transform"
                      aria-hidden
                    />
                  </span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-green-d hover:text-green-dd transition-colors"
            >
              Meet our partners
              <TbArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Multiply what already works"
        sub="Your support helps PHI connect communities, institutions, and networks that are already doing the work — so nothing has to start from zero."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "Become a partner", href: "/partners" }}
      />
    </>
  );
}
