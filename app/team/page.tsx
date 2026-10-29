import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import TeamCard from "@/components/team/TeamCard";
import { teamSections } from "@/lib/team";
import { withShareImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the leadership, hub leaders, staff, and board of directors behind Passion of Hope International's work across rural Africa.",
  openGraph: withShareImage({
    title: "Meet the Team | Passion of Hope International",
    description:
      "Leadership, hub leaders, staff, and board of directors behind PHI's mission.",
  }),
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Meet the Team" }]}
        headline="The people behind the mission"
        sub="Leadership, hub leaders, staff, and board members rooted in the communities PHI serves."
      />

      {teamSections.map((section, si) => (
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
