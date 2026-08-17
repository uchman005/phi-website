import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import { TbNetwork, TbDeviceLaptop, TbUsersGroup, TbArrowRight, TbExternalLink  } from "react-icons/tb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ChakulaBora Digital Network",
  description:
    "ChakulaBora is PHI's digital knowledge network — connecting hubs, clubs, farmers, and partners across Africa for real-time, reciprocal learning.",
  openGraph: {
    title: "ChakulaBora Digital Network | Passion of Hope International",
    description:
      "PHI's digital knowledge network connecting hubs, clubs, and communities across Africa.",
  },
};

const features = [
  {
    icon: TbNetwork,
    accent: "bg-green-ll text-green-d",
    title: "One connected network",
    description:
      "ChakulaBora digitally links PHI's hubs, partner organisations, academic institutions, and community leaders — so a breakthrough in one community reaches every other in real time.",
  },
  {
    icon: TbDeviceLaptop,
    accent: "bg-ochre-l text-ochre-d",
    title: "An open knowledge platform",
    description:
      "Field research, farmer innovations, market data, and policy analysis are aggregated into an open, community-accessible resource — knowledge as a shared good, not a gated one.",
  },
  {
    icon: TbUsersGroup,
    accent: "bg-terra-l text-terra-d",
    title: "ChakulaBora Clubs",
    description:
      "Local clubs bring the network to the ground — youth and community members meet, exchange ideas, and carry innovations back into their own villages and schools.",
  },
];

export default function ChakulaBoraPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Programs", href: "/programs/chakula-bora" },
          { label: "ChakulaBora Digital Network" },
        ]}
        headline="ChakulaBora — a digital network for shared knowledge"
        sub="Connecting grassroots wisdom with global research to accelerate community-led innovation across Africa."
      />

      {/* Intro */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-3">
                The network
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">
                Knowledge that flows both ways
              </h2>
              <p className="text-ink-2 leading-relaxed mb-4">
                ChakulaBora — Swahili for &ldquo;good food&rdquo; and
                &ldquo;good things&rdquo; — is PHI&apos;s digital knowledge
                platform. Rather than knowledge flowing one way, from experts to
                farmers, it is built on reciprocal learning: every community
                member is both a learner and a teacher.
              </p>
              <p className="text-ink-2 leading-relaxed mb-8">
                The result is a living, community-owned knowledge system that
                adapts to local soils, microclimates, and markets — far more
                resilient than any top-down extension service could provide.
              </p>
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-green-d hover:text-green-dd transition-colors"
              >
                See our knowledge partners
                <TbArrowRight aria-hidden />
              </Link>
              <div>
              <Link
                href="https://www.chakulabora.net/"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-green-d hover:text-green-dd transition-colors"
              >
                Expore the network
                <TbExternalLink aria-hidden />
              </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              How the network works
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <RevealOnScroll key={f.title} delay={(i % 3) * 0.1}>
                  <article className="bg-paper rounded-lg p-8 border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4 h-full">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${f.accent}`}
                    >
                      <Icon className="text-2xl" aria-hidden />
                    </div>
                    <h3 className="font-sans font-bold text-base text-ink">
                      {f.title}
                    </h3>
                    <p className="text-sm text-ink-2 leading-relaxed flex-1">
                      {f.description}
                    </p>
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
