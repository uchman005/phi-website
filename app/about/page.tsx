import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import DarkCTA from "@/components/home/DarkCTA";
import TeamCard from "@/components/team/TeamCard";
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
    text: "FOUNDED Maryland, USA PHI incorporated as a US 501(c)(3), committing to community-led development in Africa, over top-down aid.",
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
    text: "An empowered Africa with resilient and food sovereign communities.",
    accent: "bg-green-ll text-green-d",
  },
  {
    icon: TbPlant2,
    title: "Mission",
    text: "To invest in knowledge and people in rural communities, building climate-resilient, and sustainable food systems.",
    accent: "bg-terra-l text-terra-d",
  },
  {
    icon: TbScale,
    title: "Belief",
    text: "The people closest to a problem are best placed to solve it. Real change comes from within — PHI's role is to unlock what is already there.",
    accent: "bg-ochre-l text-ochre-d",
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
    role: "Nigeria Hub Director",
    location: "Maripha Farms, Nigeria",
    photo: "/images/people/team/mariam-olorundare.jpg",
    bio: "Mariam leads PHI's Nigeria hub, overseeing agro-ecological farm-to-fork production and training in Kwara State.",
  },
  {
    name: "Guillain Nabahya",
    role: "DRC Hub Director",
    location: "Nabahya Food Institute, DRC",
    photo: "/images/people/team/guillain-nabahya.jpg",
    bio: "Guillain leads PHI’s DRC hub, bringing deep expertise in clean-energy solutions and community-led development in Uviria and Lubumbashi.",
  },
  {
    name: "Mary Omega",
    role: "Kenya Hub Director",
    location: "Kamser Seka Widows, Kenya.",
    photo: "/images/people/team/mary-omega.jpg",
    bio: "Mary leads PHI’s Kendu Bay hub, coordinating chama groups of widows and youths into corporative enterprises in Homa Bay.",
  },
  {
    name: "Victor Ibeto",
    role: "US Management COO",
    location: "Maryland, USA",
    photo: "/images/people/team/victor-ibeto.jpg",
    bio: "PHI's US-Africa leadership team manages operations, partnerships, fundraising, and the Chakula Bora Digital Network.",
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
                <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-3">
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
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/field-work/about-story.jpg"
                  alt="PHI field work — community farming in rural Africa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
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
                  <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-1">
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
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
                  Meet the team
                </h2>
                <p className="text-ink-3 font-sans">
                  Leaders rooted in the communities they serve.
                </p>
              </div>
              <Button variant="ghost" size="sm" href="/team">
                View full team
              </Button>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <RevealOnScroll key={member.name} delay={i * 0.1}>
                <TeamCard {...member} />
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
