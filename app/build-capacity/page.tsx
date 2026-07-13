import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import { TbSchool, TbBulb, TbUsersGroup, TbSeedling, TbArrowRight } from "react-icons/tb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Build Capacity",
  description:
    "Educate, train, and empower community leaders, farmers, and entrepreneurs. When people have knowledge and agency, transformation is sustainable and self-propelling.",
  openGraph: {
    title: "Build Capacity | Passion of Hope International",
    description:
      "Educate, train, and empower — building the knowledge and agency that make change self-propelling.",
  },
};

const pillars = [
  {
    icon: TbSchool,
    accent: "bg-ochre-l text-ochre",
    title: "Educate",
    description:
      "From secondary-school students to adult learners, we open doors to knowledge — practical, locally relevant, and taught by people the community trusts.",
  },
  {
    icon: TbSeedling,
    accent: "bg-green-ll text-green",
    title: "Train",
    description:
      "Hands-on training in farming, enterprise, and stewardship equips people with skills they keep for life — and pass on to others.",
  },
  {
    icon: TbBulb,
    accent: "bg-terra-l text-terra",
    title: "Empower",
    description:
      "Knowledge becomes agency. Leaders, farmers, and entrepreneurs gain the confidence and tools to act, decide, and lead in their own communities.",
  },
  {
    icon: TbUsersGroup,
    accent: "bg-green-l text-green-d",
    title: "Multiply",
    description:
      "When capacity is built locally, transformation is sustainable and self-propelling — each person trained becomes a teacher for the next.",
  },
];

export default function BuildCapacityPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Build Capacity" }]}
        headline="Build capacity"
        sub="Educate, train, and empower community leaders, farmers, and entrepreneurs — because when people have knowledge and agency, transformation is sustainable and self-propelling."
      />

      {/* Pillars grid */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              How we build capacity
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

      {/* Example — Mariam & secondary school students */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto max-w-3xl">
          <RevealOnScroll>
            <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-3">
              An example
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">
              Mariam &amp; the secondary-school students
            </h2>
            <p className="text-ink-2 leading-relaxed mb-4">
              At PHI&apos;s Nigeria hub, Mariam Olorundare works directly with
              secondary-school students — introducing them to agro-ecology,
              enterprise, and stewardship long before they leave the classroom.
            </p>
            <p className="text-ink-2 leading-relaxed mb-8">
              It is capacity-building at its most durable: young people who learn
              to grow food, run a small enterprise, and think like problem-solvers
              carry that knowledge into every community they go on to shape.
            </p>
            <Link
              href="/programs/hubs"
              className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-green hover:text-green-d transition-colors"
            >
              Meet our hubs
              <TbArrowRight aria-hidden />
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      <DarkCTA
        headline="Invest in people, not just projects"
        sub="Your support trains the leaders, farmers, and young people who will carry change forward for a generation."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "See our impact", href: "/impact" }}
      />
    </>
  );
}
