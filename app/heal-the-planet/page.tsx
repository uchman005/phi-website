import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import { TbLeaf, TbTree, TbDroplet, TbRecycle, TbArrowRight } from "react-icons/tb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Heal the Planet",
  description:
    "Ecosystem revival through agro-ecological farming, reforestation, soil restoration, and sustainable water management — returning land to its productive best.",
  openGraph: {
    title: "Heal the Planet | Passion of Hope International",
    description:
      "Ecosystem revival — agro-ecology, reforestation, soil, and water — returning land to its best.",
  },
};

const practices = [
  {
    icon: TbLeaf,
    accent: "bg-green-ll text-green",
    title: "Agro-ecological farming",
    description:
      "Working with nature rather than against it — cover crops, composting, and reduced tillage rebuild living soil and cut chemical inputs.",
  },
  {
    icon: TbTree,
    accent: "bg-green-l text-green-d",
    title: "Reforestation",
    description:
      "Tree planting and agroforestry restore canopy, hold soil, shelter crops, and draw carbon back into the land.",
  },
  {
    icon: TbRecycle,
    accent: "bg-ochre-l text-ochre",
    title: "Soil restoration",
    description:
      "Degraded plots are brought back to life — organic matter, microbial health, and structure rebuilt season after season.",
  },
  {
    icon: TbDroplet,
    accent: "bg-blue-50 text-blue-600",
    title: "Water management",
    description:
      "Rainwater harvesting, micro-irrigation, and wetland care keep land productive through drought and protect it in flood.",
  },
];

export default function HealThePlanetPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Heal the Planet" }]}
        headline="Heal the planet"
        sub="Engage in ecosystem revival — returning land to its productive best through agro-ecological farming, reforestation, soil restoration, and sustainable water management."
      />

      {/* Practices grid */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              How we restore land
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {practices.map((p, i) => {
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
            <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-3">
              Across our hubs
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
              What healing the land looks like
            </h2>
            <p className="text-ink-3 font-sans mb-10 max-w-2xl">
              Each PHI hub puts these principles to work in its own context —
              led from within the community.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Guillain Nabahya",
                hub: "DRC Hub",
                href: "/programs/hubs/drc",
                text: "In Uvira, Guillain turns agricultural waste into clean cooking fuel, rebuilds soils with organic inputs, and restores degraded land with native trees.",
              },
              {
                name: "Mariam Olorundare",
                hub: "Nigeria Hub",
                href: "/programs/hubs/nigeria",
                text: "At Maripha Farms in Kwara State, Mariam runs an integrated organic farm where nothing is wasted and biodiversity is restored across 15 acres.",
              },
              {
                name: "Mary Omega",
                hub: "Kenya Hub",
                href: "/programs/hubs/kenya",
                text: "In Kendu Bay, Mary's widow-led groups replace charcoal and firewood with clean cookstoves and briquettes — easing deforestation while protecting family health.",
              },
            ].map((ex, i) => (
              <RevealOnScroll key={ex.name} delay={(i % 3) * 0.1}>
                <Link
                  href={ex.href}
                  className="group block bg-paper rounded-lg p-8 border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 h-full"
                >
                  <span className="font-mono text-xs text-green uppercase tracking-widest">
                    {ex.hub}
                  </span>
                  <h3 className="font-sans font-bold text-base text-ink mt-2 mb-3">
                    {ex.name}
                  </h3>
                  <p className="text-sm text-ink-2 leading-relaxed mb-4">
                    {ex.text}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-sans font-semibold text-green group-hover:text-green-d transition-colors">
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
              href="/programs/hubs"
              className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-green hover:text-green-d transition-colors"
            >
              Meet all our hubs
              <TbArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Help us heal the land"
        sub="Your support funds the training, trees, and tools that return degraded land to its productive best."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "Explore FEED Africa", href: "/programs/feed-africa" }}
      />
    </>
  );
}
