import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import HubImage from "@/components/hubs/HubImage";
import { hubs } from "@/lib/hubs";
import { TbMapPin, TbUser, TbArrowRight } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Our Hubs",
  description:
    "PHI's hubs are the powerhouses of the organisation — locally led teams in the DRC, Nigeria, and Kenya, each running its own projects rooted in its community.",
  openGraph: {
    title: "Our Hubs | Passion of Hope International",
    description:
      "Locally led hubs across East and West Africa — each a powerhouse running its own community projects.",
  },
};

export default function HubsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Programs", href: "/programs/hubs" },
          { label: "Our Hubs" },
        ]}
        headline="Our hubs — the powerhouses of PHI"
        sub="Locally led teams across East and West Africa. Each hub is embedded in its community, led from within, and runs its own portfolio of projects. Click a hub to explore its work."
      />

      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubs.map((hub, i) => (
              <RevealOnScroll key={hub.slug} delay={(i % 3) * 0.1}>
                <Link
                  href={`/programs/hubs/${hub.slug}`}
                  className={`group block bg-cream rounded-lg border border-line border-t-4 ${hub.accent} overflow-hidden h-full hover:-translate-y-1 hover:border-green-l transition-all duration-200`}
                >
                  <HubImage
                    image={hub.heroImage}
                    aspectRatio="aspect-[16/9]"
                    className="rounded-none"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <span className="text-2xl mb-2 block" aria-hidden>
                        {hub.flag}
                      </span>
                      <div className="flex items-start gap-1.5">
                        <TbMapPin
                          className="text-green-d mt-0.5 shrink-0"
                          aria-hidden
                        />
                        <div>
                          <h2 className="font-sans font-bold text-base text-ink">
                            {hub.shortName}
                          </h2>
                          <p className="font-sans text-xs text-ink-3">
                            {hub.city} · {hub.region}, {hub.country}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-ink-2 leading-relaxed">
                      {hub.tagline}
                    </p>

                    <div className="flex items-center gap-2">
                      <TbUser className="text-ink-3 text-sm" aria-hidden />
                      <p className="font-sans text-xs text-ink-2">
                        <span className="font-semibold text-ink">
                          {hub.leader}
                        </span>{" "}
                        — {hub.leaderRole}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-xs text-green-d bg-green-ll px-3 py-1 rounded-pill">
                        {hub.projects.length} projects
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-sans font-semibold text-green-d group-hover:text-green-dd transition-colors">
                        Explore hub
                        <TbArrowRight
                          className="group-hover:translate-x-0.5 transition-transform"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Support a hub near you"
        sub="Sponsor a specific hub and build a direct connection to the community it serves."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
