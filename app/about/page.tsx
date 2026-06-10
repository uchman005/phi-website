import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import DarkCTA from "@/components/home/DarkCTA";
import {
  TbBulb,
  TbScale,
  TbPlant2,
  TbMapPin,
} from "react-icons/tb";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Passion of Hope International — our story, the team behind the mission, and the values that drive community-centred development across rural Africa.",
  openGraph: {
    title: "About Us | Passion of Hope International",
    description:
      "Our story, team, and the values that drive community-centred development across rural Africa.",
  },
};

const milestones = [
  {
    year: "Founded",
    location: "Maryland, USA",
    text: "PHI incorporated as a US 501(c)(3), committing to community-led development over top-down aid.",
  },
  {
    year: "First Hubs",
    location: "Kenya · Nigeria · DRC",
    text: "Grassroots partnerships established in three countries, embedding PHI in local networks and knowledge systems.",
  },
  {
    year: "2021",
    location: "Gilgil, Kenya",
    text: "The Jiimarishe honey pilot launched — increasing household income by 5× and proving the agro-enterprise model.",
  },
  {
    year: "Today",
    location: "Continent-wide",
    text: "A growing movement of hubs, partners, and community leaders building a continent-wide knowledge network.",
  },
];

const beliefs = [
  {
    icon: TbBulb,
    title: "Vision",
    text: "Resilient African communities leading their own development — food-sovereign, economically empowered, ecologically restored.",
    accent: "bg-green-ll text-green",
  },
  {
    icon: TbPlant2,
    title: "Mission",
    text: "To catalyze appropriate and sustainable development — equipping communities with tools, knowledge, and networks for self-sufficiency.",
    accent: "bg-terra-l text-terra",
  },
  {
    icon: TbScale,
    title: "Belief",
    text: "The people closest to a problem are best placed to solve it. Real change comes from within — PHI's role is to unlock what is already there.",
    accent: "bg-ochre-l text-ochre",
  },
];

const guides = [
  {
    title: "Appropriate Development",
    text: "Solutions must fit the ecological, cultural, and economic context of each community — not imported wholesale from elsewhere.",
  },
  {
    title: "Poverty Alleviation",
    text: "Addressing the root causes of poverty — land rights, knowledge access, market linkages — rather than treating symptoms.",
  },
  {
    title: "Triple Bottom Line",
    text: "Every intervention must deliver for people, planet, and long-term productivity. We refuse to choose between them.",
  },
];

const team = [
  {
    name: "Mariam Olorundare",
    role: "Nigeria Hub CEO",
    location: "Maripha, Nigeria",
    initials: "MO",
    accent: "bg-terra text-white",
    bio: "Mariam leads PHI's Nigeria operations, overseeing women's empowerment programmes and agro-ecological training across Maripha.",
  },
  {
    name: "Guillain Nabahya",
    role: "Board Chair",
    location: "Uvira, DRC",
    initials: "GN",
    accent: "bg-green text-white",
    bio: "Guillain chairs the PHI board and anchors our DRC hub, bringing deep expertise in community governance and conflict-affected development.",
  },
  {
    name: "Mary Omega",
    role: "Kenya Hub Leader",
    location: "Kendu Bay, Kenya",
    initials: "MO",
    accent: "bg-ochre text-white",
    bio: "Mary leads the Kendu Bay hub, coordinating Jiimarishe enterprise scale-up and farmer training across the Lake Victoria region.",
  },
  {
    name: "Victor",
    role: "US Management",
    location: "Maryland, USA",
    initials: "BV",
    accent: "bg-green-d text-white",
    bio: "PHI's US-based leadership team manages operations, partnerships, fundraising, and the Chakula Bora knowledge network.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us" }]}
        headline="The people closest to a problem are best placed to solve it"
        sub="PHI exists to unlock that capacity — not to replace it."
      />

      {/* Our Story */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div>
                <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-3">
                  Our Story
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">
                  Catalyzing change, not imposing it
                </h2>
                <p className="text-ink-2 leading-relaxed mb-4">
                  Passion of Hope International was founded on a simple but
                  radical premise: that rural African communities already hold
                  the knowledge, resourcefulness, and determination needed to
                  transform their lives. What they often lack is not capability
                  — it is access to capital, networks, and appropriate
                  technology.
                </p>
                <p className="text-ink-2 leading-relaxed">
                  PHI&apos;s role is to bridge those gaps — connecting grassroots
                  leaders with academic institutions, civil society
                  organisations, and technology partners to create systems that
                  are owned, operated, and sustained by the communities
                  themselves.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <ImagePlaceholder
                variant="forest"
                label="PHI Field Work"
                aspectRatio="aspect-[4/3]"
                className="rounded-xl"
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10 text-center">
              Our journey
            </h2>
          </RevealOnScroll>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <RevealOnScroll key={m.year} delay={i * 0.1} as="li">
                <div className="bg-paper rounded-lg p-6 border border-line h-full">
                  <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-1">
                    {m.year}
                  </span>
                  <div className="flex items-center gap-1.5 mb-3">
                    <TbMapPin
                      className="text-ink-3 text-sm shrink-0"
                      aria-hidden
                    />
                    <span className="text-xs text-ink-3 font-sans">
                      {m.location}
                    </span>
                  </div>
                  <p className="text-sm text-ink-2 leading-relaxed">
                    {m.text}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </section>

      {/* Vision / Mission / Belief */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((b, i) => {
              const Icon = b.icon;
              return (
                <RevealOnScroll key={b.title} delay={i * 0.1}>
                  <div className="bg-cream rounded-lg p-8 border border-line h-full flex flex-col gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${b.accent}`}
                    >
                      <Icon className="text-xl" aria-hidden />
                    </div>
                    <h3 className="font-sans font-bold text-base text-ink">
                      {b.title}
                    </h3>
                    <p className="text-sm text-ink-2 leading-relaxed flex-1">
                      {b.text}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Guides Us */}
      <section className="bg-green-ll py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              What guides us
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((g, i) => (
              <RevealOnScroll key={g.title} delay={i * 0.1}>
                <div className="bg-paper rounded-lg p-6 border border-green-l h-full">
                  <h3 className="font-sans font-semibold text-base text-ink mb-3">
                    {g.title}
                  </h3>
                  <p className="text-sm text-ink-2 leading-relaxed">{g.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
              Meet the team
            </h2>
            <p className="text-ink-3 font-sans mb-10">
              Leaders rooted in the communities they serve.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <RevealOnScroll key={member.name} delay={i * 0.1}>
                <article className="bg-cream rounded-lg overflow-hidden border border-line flex flex-col h-full">
                  <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-green-l to-green-ll">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center font-sans font-bold text-2xl ${member.accent}`}
                      aria-hidden
                    >
                      {member.initials}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <h3 className="font-sans font-bold text-sm text-ink">
                      {member.name}
                    </h3>
                    <p className="font-sans text-xs text-green font-semibold">
                      {member.role}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-ink-3">
                      <TbMapPin className="shrink-0" aria-hidden />
                      <span>{member.location}</span>
                    </div>
                    <p className="text-xs text-ink-2 leading-relaxed mt-1">
                      {member.bio}
                    </p>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Ready to join the movement?"
        sub="Your support helps us walk alongside more communities."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
