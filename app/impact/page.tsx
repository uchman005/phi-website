import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import LatestPosts from "@/components/blog/LatestPosts";
import {
  TbDroplet,
  TbHeart,
  TbSchool,
  TbUsers,
  TbHome,
  TbPlant2,
} from "react-icons/tb";
import { withShareImage } from "@/lib/seo";
import { stat } from "@/lib/site-facts";
import SourceNote from "@/components/ui/SourceNote";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "PHI's impact — the areas we work across and the families behind the figures, from clean water and education to health and housing.",
  openGraph: withShareImage({
    title: "Impact | Passion of Hope International",
    description:
      "The areas we work across and the real stories of change behind every figure.",
  }),
};

// Values, sources and as-of dates live in lib/site-facts.ts.
const metrics = [
  { ...stat("jiimarisheIncome"), accent: "bg-green-ll" },
  { ...stat("activeHubs"), accent: "bg-terra-l" },
  { ...stat("countries"), accent: "bg-ochre-l" },
  { ...stat("communitiesReached"), accent: "bg-green-l" },
];

const areas = [
  {
    icon: TbDroplet,
    accent: "bg-blue-50 text-blue-600",
    title: "Clean Water",
    description:
      "Access to safe, reliable water is foundational to health, agriculture, and human dignity. PHI installs bore-holes, rainwater harvesting systems, and trains community water committees.",
    metric: "3 water projects",
  },
  {
    icon: TbHeart,
    accent: "bg-red-50 text-red-500",
    title: "Health",
    description:
      "Mobile health clinics, community health worker training, and partnerships with local medical facilities expand access to preventive and primary care in remote communities.",
    metric: "4 health outreaches",
  },
  {
    icon: TbSchool,
    accent: "bg-ochre-l text-ochre-d",
    title: "Education",
    description:
      "Adopt-a-School builds and equips rural classrooms, trains teachers, and provides learning materials — because every child deserves a quality education regardless of geography.",
    metric: "20+ schools supported",
  },
  {
    icon: TbUsers,
    accent: "bg-terra-l text-terra-d",
    title: "Empowering Women",
    description:
      "Women are at the centre of every PHI intervention. Entrepreneurship training, savings groups, legal literacy, and leadership programmes unlock women's full economic potential.",
    metric: "5× income increase",
  },
  {
    icon: TbHome,
    accent: "bg-green-ll text-green-d",
    title: "Housing",
    description:
      "Dignified, climate-resilient housing built with local materials and labour. PHI integrates solar energy, rainwater collection, and ventilation into affordable community housing.",
    metric: "Community-built",
  },
  {
    icon: TbPlant2,
    accent: "bg-green-ll text-green-d",
    title: "Agriculture",
    description:
      "Agro-ecological farming restores soil health, reduces input costs, and increases yields. Farmer field schools train smallholders as scientists — experimenting, recording, and sharing results.",
    metric: "Kilimo Bunifu model",
  },
];

const stories = [
  {
    quote:
      "Since Passion of Hope International came on board, our lives have greatly changed. It has restored our dignity and given us hope for the future.",
    name: "Grace Adede",
    role: "Chairlady, Kamser Seka Blessed Widows Group",
    location: "Kamser Seka, Kenya",
    photo: "/images/people/testimonials/grace-adede.jpg",
  },
  {
    quote:
      "It was one of the most meaningful and eye-opening experiences of my life. I plan to carry these ideas forward in my own work.",
    name: "Juliet Ngaji",
    role: "Communications & Media Student, Egerton University",
    location: "Kenya",
    photo: "/images/people/team/juliet-ngaji.jpg",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Impact" }]}
        headline="Behind every figure is a family"
        sub="Numbers matter — but stories show why they do."
      />

      {/* Metrics band */}
      <section className="bg-green py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <RevealOnScroll key={m.label} delay={i * 0.08}>
                <div className={`rounded-lg p-6 text-center ${m.accent}`}>
                  <div className="font-display text-4xl font-semibold mb-1 text-ink">
                    {m.value}
                  </div>
                  <div className="font-sans font-semibold text-xs mb-0.5 text-ink-2">
                    {m.label}
                  </div>
                  <div className="font-sans text-xs text-ink-2">
                    {m.sub}
                  </div>
                  <SourceNote stat={m} className="mt-1" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Impact areas */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-3">
              Impact areas
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
              Let&apos;s change lives through any of these projects
            </h2>
            <p className="text-ink-3 font-sans mb-10 max-w-xl">
              Six interconnected dimensions of rural development — each one
              essential, all of them interdependent.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <RevealOnScroll key={area.title} delay={(i % 3) * 0.1}>
                  <article className="bg-cream rounded-lg p-8 border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4 h-full">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${area.accent}`}
                    >
                      <Icon className="text-2xl" aria-hidden />
                    </div>
                    <h3 className="font-sans font-bold text-base text-ink">
                      {area.title}
                    </h3>
                    <p className="text-sm text-ink-2 leading-relaxed flex-1">
                      {area.description}
                    </p>
                    <span className="inline-block font-mono text-xs text-green-d bg-green-ll px-3 py-1 rounded-pill w-fit">
                      {area.metric}
                    </span>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured story */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-3">
              Impact stories
            </span>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((s, i) => (
              <RevealOnScroll key={s.name} delay={i * 0.1}>
                <figure className="bg-paper rounded-lg p-8 border border-line h-full flex flex-col gap-5">
                  <blockquote className="font-display text-lg text-ink italic leading-relaxed flex-1">
                    &ldquo;{s.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={s.photo}
                        alt={s.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-sm text-ink">
                        {s.name}
                      </p>
                      <p className="font-sans text-xs text-ink-3">
                        {s.role}
                        {s.location ? ` · ${s.location}` : ""}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <LatestPosts />

      <DarkCTA
        headline="Your investment creates stories like these"
        sub="Every donation funds the training, tools, and time that communities need to transform their lives."
        primary={{ label: "Donate now", href: "/donate" }}
        secondary={{ label: "Meet our team", href: "/team" }}
      />
    </>
  );
}
