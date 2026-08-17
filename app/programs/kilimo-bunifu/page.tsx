import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import { TbTool, TbFlask, TbClipboardData, TbUsersGroup } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Kilimo Bunifu Workshop",
  description:
    "Kilimo Bunifu is PHI's hands-on farming workshop — training smallholder farmers as scientists through agro-ecology, enterprise development, and community governance.",
  openGraph: {
    title: "Kilimo Bunifu Workshop | Passion of Hope International",
    description:
      "Hands-on training that turns smallholder farmers into scientists across rural Africa.",
  },
};

const modules = [
  {
    icon: TbFlask,
    accent: "bg-green-ll text-green-d",
    title: "The farmer as scientist",
    description:
      "Farmers are trained to observe, experiment, record, and share — turning their fields into living laboratories for agro-ecological innovation instead of simply following instructions.",
  },
  {
    icon: TbTool,
    accent: "bg-ochre-l text-ochre-d",
    title: "Hands-on, in the field",
    description:
      "In-person and online sessions cover soil health, water management, composting, and post-harvest processing — practical skills learned by doing, not by lecture.",
  },
  {
    icon: TbClipboardData,
    accent: "bg-terra-l text-terra-d",
    title: "Data & enterprise",
    description:
      "Workshops build the record-keeping, cost analysis, and market-linkage skills farmers need to run their plots as sustainable enterprises, not just subsistence plots.",
  },
  {
    icon: TbUsersGroup,
    accent: "bg-green-l text-green-d",
    title: "Community governance",
    description:
      "Hub leaders and partners are equipped to run cooperatives and farmer field schools — so the training multiplies through every community that hosts a workshop.",
  },
];

export default function KilimoBunifuPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Programs", href: "/programs/kilimo-bunifu" },
          { label: "Kilimo Bunifu Workshop" },
        ]}
        headline="Kilimo Bunifu — innovative agro-ecological farming"
        sub="Hands-on workshops that train smallholder farmers as scientists and their fields as living laboratories."
      />

      {/* Intro */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div>
                <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-3">
                  The workshop
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">
                  Learning by doing
                </h2>
                <p className="text-ink-2 leading-relaxed mb-4">
                  Traditional agricultural development trains farmers to follow
                  instructions. Kilimo Bunifu does the opposite — it trains
                  smallholder farmers to ask questions, run experiments, record
                  data, and share findings with their peers.
                </p>
                <p className="text-ink-2 leading-relaxed">
                  Every workshop rebuilds soil health, cuts input costs, and
                  raises yields — while creating a community-owned knowledge base
                  that adapts to local soils, microclimates, and markets.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/hero/rice-fields-uganda.jpg"
                  alt="Kilimo Bunifu workshop — agro-ecological farming"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              What the workshop covers
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <RevealOnScroll key={m.title} delay={(i % 2) * 0.1}>
                  <article className="bg-paper rounded-lg p-8 border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 flex gap-5">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${m.accent}`}
                    >
                      <Icon className="text-2xl" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-ink mb-2">
                        {m.title}
                      </h3>
                      <p className="text-sm text-ink-2 leading-relaxed">
                        {m.description}
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
        headline="Train a farmer, feed a community"
        sub="$50 puts one farmer through a Kilimo Bunifu workshop — a skill they keep, and teach, for life."
        primary={{ label: "Donate to Kilimo Bunifu", href: "/donate" }}
        secondary={{ label: "Explore FEED Africa", href: "/programs/feed-africa" }}
      />
    </>
  );
}
