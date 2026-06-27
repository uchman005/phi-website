import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import TeamCard from "@/components/team/TeamCard";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the leadership, hub leaders, staff, and board of directors behind Passion of Hope International's work across rural Africa.",
  openGraph: {
    title: "Meet the Team | Passion of Hope International",
    description:
      "Leadership, hub leaders, staff, and board of directors behind PHI's mission.",
  },
};

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  location?: string;
}

const sections: { heading: string; members: TeamMember[] }[] = [
  {
    heading: "Leadership",
    members: [
      {
        name: "Brian Stephenson",
        role: "President, Passion of Hope",
        photo: "/images/people/team/brian-stephenson.jpg",
        location: "USA",
      },
      {
        name: "Victor Ibeto",
        role: "Chief Operating Officer, PHI (USA); Board Member, Maripha Empowerment Foundation (Nigeria)",
        photo: "/images/people/team/victor-ibeto.jpg",
        location: "USA",
      },
    ],
  },
  {
    heading: "Hub Leaders",
    members: [
      {
        name: "Mariam Olorundare",
        role: "CEO, Maripha Empowerment Foundation, PHI Nigeria",
        photo: "/images/people/team/mariam-olorundare.jpg",
        location: "Maripha, Nigeria",
      },
      {
        name: "Guillain Nabahya",
        role: "Board Chair and Director, Nabahya Food Institute",
        photo: "/images/people/team/guillain-nabahya.jpg",
        location: "Uvira, DRC",
      },
      {
        name: "Mary Omega",
        role: "Hub Leader, Passion of Hope, Kenya",
        photo: "/images/people/team/mary-omega.jpg",
        location: "Kendu Bay, Kenya",
      },
    ],
  },
  {
    heading: "Staff",
    members: [
      {
        name: "Patricia Green",
        role: "Marketing Coordinator",
        photo: "/images/people/team/patricia-green.jpg",
      },
      {
        name: "Obiefuna Marcel Uchenna",
        role: "Web Developer, Passion of Hope International",
        photo: "/images/people/team/obiefuna-marcel-uchenna.jpg",
      },
    ],
  },
  {
    heading: "Board of Directors",
    members: [
      {
        name: "Rebecca Carsky-Stephenson, Ph.D.",
        role: "Head Teacher, The English International School (Benin)",
        photo: "/images/people/team/rebecca-carsky-stephenson.jpg",
      },
      {
        name: "Olakunle Olaniyan, MD, MBA, FACP, FHFMA",
        role: "Medical Director at Anthem National Accounts (USA)",
        photo: "/images/people/team/olakunle-olaniyan.jpg",
      },
      {
        name: "Michael S Jackson, Esq.",
        role: "Chief Legal Officer, Strother Enterprises Inc. (USA)",
        photo: "/images/people/team/michael-jackson.jpg",
      },
      {
        name: "Simeon Ehui, Ph.D.",
        role: "Regional Director, Continental Africa, CGIAR; Director General, IITA (Nigeria)",
        photo: "/images/people/team/simeon-ehui.jpg",
      },
      {
        name: "Dr. Sarah Olembo",
        role: "Kenyan Scientist",
        photo: "/images/people/team/sarah-olembo.jpg",
      },
      {
        name: "Sharon Waswa",
        role: "PHK Board Member",
        photo: "/images/people/team/sharon-waswa.jpg",
      },
      {
        name: "Audrey Bracey Deegan",
        role: "Head of Business Development — Indian Ocean",
        photo: "/images/people/team/audrey-bracey-deegan.jpg",
      },
    ],
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Meet the Team" }]}
        headline="The people behind the mission"
        sub="Leadership, hub leaders, staff, and board members rooted in the communities PHI serves."
      />

      {sections.map((section, si) => (
        <section
          key={section.heading}
          className={`py-16 px-4 sm:px-6 lg:px-8 ${si % 2 === 0 ? "bg-paper" : "bg-cream"}`}
        >
          <div className="max-w-[1200px] mx-auto">
            <RevealOnScroll>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
                {section.heading}
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.members.map((member, i) => (
                <RevealOnScroll key={member.name} delay={i * 0.1}>
                  <TeamCard {...member} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      ))}

      <DarkCTA
        headline="Ready to join the movement?"
        sub="Your support helps us walk alongside more communities."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
