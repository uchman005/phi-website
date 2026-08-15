import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import NakuruLegacy from "@/components/home/NakuruLegacy";
import { TbWorld } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Our Legacy",
  description:
    "From a pilot in Nakuru County to a continent-wide movement under the FEED Africa initiative — the journey behind Passion of Hope International.",
  openGraph: {
    title: "Our Legacy | Passion of Hope International",
    description:
      "From a pilot in Nakuru County to a continent-wide movement — PHI's journey so far.",
  },
};

export default function LegacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Our Legacy" }]}
        headline="Be the reason a community breaks the cycle of poverty"
        sub="Every hub, every partnership, every workshop traces back to a simple bet: that communities given the right tools can transform themselves."
      />

      <NakuruLegacy />

      {/* Our Journey */}
      <section className="bg-green-ddd py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-green-bright uppercase tracking-widest mb-3">
                <TbWorld aria-hidden />
                Our journey
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-white mb-4">
                Today, continent-wide
              </h2>
              <p className="text-white/80 leading-relaxed">
                A growing movement of hubs, partners, and community leaders
                connected under the FEED Africa initiative to change the
                narrative behind &ldquo;can Africa feed itself?&rdquo;
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <DarkCTA
        headline="Be part of what comes next"
        sub="Every gift builds on a decade of proof that community-owned development works."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "See our hubs", href: "/programs/hubs" }}
      />
    </>
  );
}
