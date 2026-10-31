import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import {
  TbSchool,
  TbBuilding,
  TbUsers,
  TbNetwork,
} from "react-icons/tb";
import { withShareImage } from "@/lib/seo";
import { partners } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "PHI partners with academic institutions, local governments, civil society, and knowledge networks to amplify community-led development across Africa.",
  openGraph: withShareImage({
    title: "Partners | Passion of Hope International",
    description:
      "Academic, government, civil society, and knowledge partners amplifying PHI's community-led mission.",
  }),
};

const categories = [
  {
    icon: TbSchool,
    accent: "bg-green-ll text-green-d",
    title: "Academic Institutions",
    description:
      "Universities and research centres that provide technical expertise, field research capacity, and student engagement for PHI's agro-ecology and development programmes.",
  },
  {
    icon: TbBuilding,
    accent: "bg-ochre-l text-ochre-d",
    title: "Local Government",
    description:
      "County and municipal governments that co-invest in infrastructure, land rights, and policy frameworks that enable PHI programmes to scale and sustain.",
  },
  {
    icon: TbUsers,
    accent: "bg-terra-l text-terra-d",
    title: "Civil Society",
    description:
      "NGOs, cooperatives, faith communities, and grassroots organisations that extend PHI's reach and ensure programmes are culturally grounded and locally owned.",
  },
  {
    icon: TbNetwork,
    accent: "bg-green-l text-green-d",
    title: "Knowledge & Technology",
    description:
      "Innovation labs, technology companies, and digital networks that contribute tools, platforms, and data capabilities to the Chakula Bora knowledge network.",
  },
];


const grantCategories = [
  {
    title: "Programme grants",
    text: "Multi-year grants supporting specific impact areas — agriculture, education, health, or women's empowerment.",
    amount: "From $10,000",
  },
  {
    title: "Major gifts",
    text: "Transformational gifts that fund hub infrastructure, technology systems, or enterprise seed capital.",
    amount: "From $50,000",
  },
  {
    title: "Corporate partnerships",
    text: "Strategic relationships with companies whose supply chains, ESG commitments, or markets align with PHI communities.",
    amount: "Tailored",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Partners" }]}
        headline="Partnership is how change scales"
        sub="PHI connects those who have resources with those who know how to use them."
      />

      {/* Category cards */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              Partnership areas
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <RevealOnScroll key={cat.title} delay={(i % 2) * 0.1}>
                  <article className="bg-cream rounded-lg p-6 border border-line flex gap-5 h-full">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${cat.accent}`}
                    >
                      <Icon className="text-2xl" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-ink mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-ink-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners directory */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
              Our partners
            </h2>
            <p className="text-ink-3 font-sans mb-10 max-w-xl">
              Organisations we work alongside across research, water, land, and
              knowledge networks.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {partners.map((partner, i) => (
              <RevealOnScroll key={partner.name} delay={(i % 4) * 0.07}>
                <div className="group bg-paper rounded-xl border border-line p-6 flex flex-col items-center justify-center gap-4 min-h-[180px] h-full hover:border-green-l hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  {partner.logo ? (
                    <div className="relative w-full h-24 sm:h-28">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                      />
                    </div>
                  ) : (
                    // No logo yet: the name itself is the mark.
                    <p className="font-display text-xl text-ink text-center leading-snug">
                      {partner.name}
                    </p>
                  )}
                  {partner.logo && (
                    <p className="font-sans text-xs text-ink-3 text-center leading-snug">
                      {partner.name}
                    </p>
                  )}
                  {partner.blurb && (
                    <p className="font-sans text-xs text-ink-2 text-center leading-snug">
                      {partner.blurb}
                    </p>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Funding categories */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
              Funding &amp; grants
            </h2>
            <p className="text-ink-3 font-sans mb-10 max-w-xl">
              Multiple ways to invest in the PHI mission.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {grantCategories.map((g, i) => (
              <RevealOnScroll key={g.title} delay={i * 0.1}>
                <div className="bg-green-ll rounded-lg p-6 border border-green-l h-full">
                  <div className="font-mono text-sm text-green-d font-semibold mb-3">
                    {g.amount}
                  </div>
                  <h3 className="font-sans font-bold text-base text-ink mb-2">
                    {g.title}
                  </h3>
                  <p className="text-sm text-ink-2 leading-relaxed">{g.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Become a PHI partner"
        sub="Whether you bring funding, expertise, or networks — your partnership multiplies impact."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "Learn our model", href: "/about" }}
      />
    </>
  );
}
