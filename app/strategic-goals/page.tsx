import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import { TbBrain, TbUsers, TbTool } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Strategic Goals",
  description:
    "PHI's three strategic goals — investing in knowledge systems, people in rural communities, and appropriate technologies — define the long arc of our work.",
  openGraph: {
    title: "Strategic Goals | Passion of Hope International",
    description:
      "Three strategic goals defining the long arc of PHI's work in rural Africa.",
  },
};

const goals = [
  {
    number: "01",
    icon: TbBrain,
    accent: "bg-green-ll text-green-d",
    title: "Invest in Knowledge Systems",
    description:
      "Build and connect knowledge networks that enable communities, researchers, and practitioners to learn from each other. The Chakula Bora digital network aggregates field research, farmer data, and best practices — making knowledge a shared resource, not a proprietary one.",
    points: [
      "Chakula Bora digital knowledge network",
      "Field research documentation and sharing",
      "Academic and civil-society partnerships",
      "Community-led data collection",
    ],
  },
  {
    number: "02",
    icon: TbUsers,
    accent: "bg-terra-l text-terra-d",
    title: "Invest in People in Rural Communities",
    description:
      "Human capacity is the most durable asset a community can build. PHI's training programmes, leadership development, and enterprise support equip individuals to become drivers of change in their own households, villages, and regions.",
    points: [
      "Farmer field schools (agro-ecology)",
      "Women's entrepreneurship and leadership",
      "Youth skills and vocational training",
      "Community governance and advocacy",
    ],
  },
  {
    number: "03",
    icon: TbTool,
    accent: "bg-ochre-l text-ochre-d",
    title: "Invest in Appropriate Technologies & Infrastructure",
    description:
      "Technology that fits the context — affordable, maintainable, and ecologically sound. From drip irrigation to solar energy, from mobile health kits to community grain stores, PHI backs practical innovation that communities can adopt, adapt, and own.",
    points: [
      "Low-cost drip irrigation systems",
      "Off-grid and solar energy solutions",
      "Post-harvest storage infrastructure",
      "Renewable water infrastructure",
    ],
  },
];

const metrics = [
  {
    value: "3",
    label: "Knowledge hubs",
    sub: "Across East & West Africa",
    accent: "bg-green-ll",
  },
  {
    value: "20+",
    label: "Communities reached",
    sub: "Direct programme beneficiaries",
    accent: "bg-terra-l",
  },
  {
    value: "5×",
    label: "Income increase",
    sub: "Jiimarishe pilot results",
    accent: "bg-ochre-l",
  },
];

export default function StrategicGoalsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "About", href: "/about" },
          { label: "Strategic Goals" },
        ]}
        headline="Our three strategic goals"
        sub="Everything PHI does maps back to one of three long-term investments."
      />

      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal, i) => {
              const Icon = goal.icon;
              return (
                <RevealOnScroll key={goal.number} delay={i * 0.1}>
                  <article className="bg-cream rounded-lg p-8 border border-line flex flex-col gap-5 h-full">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${goal.accent}`}
                      >
                        <Icon className="text-2xl" aria-hidden />
                      </div>
                      <span className="font-mono text-4xl font-bold text-line leading-none">
                        {goal.number}
                      </span>
                    </div>
                    <h2 className="font-sans font-bold text-base text-ink">
                      {goal.title}
                    </h2>
                    <p className="text-sm text-ink-2 leading-relaxed flex-1">
                      {goal.description}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {goal.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-2 text-xs text-ink-2"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-green mt-1.5 shrink-0"
                            aria-hidden
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-green-ll py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10 text-center">
              Progress so far
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {metrics.map((m, i) => (
              <RevealOnScroll key={m.label} delay={i * 0.1}>
                <div
                  className={`rounded-lg p-8 text-center ${m.accent} border border-transparent`}
                >
                  <div className="font-display text-5xl font-semibold mb-2 text-ink">
                    {m.value}
                  </div>
                  <div className="font-sans font-semibold text-sm mb-1 text-ink-2">
                    {m.label}
                  </div>
                  <div className="font-sans text-xs text-ink-2">{m.sub}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Invest alongside us"
        sub="Your resources — financial, intellectual, or relational — accelerate all three goals."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "Become a partner", href: "/partners" }}
      />
    </>
  );
}
