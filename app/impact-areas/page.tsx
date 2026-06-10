import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import {
  TbDroplet,
  TbHeart,
  TbSchool,
  TbUsers,
  TbHome,
  TbPlant2,
} from "react-icons/tb";

export const metadata: Metadata = {
  title: "Impact Areas",
  description:
    "PHI works across six interconnected impact areas — water, health, education, women, housing, and agriculture — addressing the root dimensions of rural poverty.",
  openGraph: {
    title: "Impact Areas | Passion of Hope International",
    description:
      "Six interconnected impact areas addressing the root dimensions of rural poverty in Africa.",
  },
};

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
    accent: "bg-ochre-l text-ochre",
    title: "Education",
    description:
      "Adopt-a-School builds and equips rural classrooms, trains teachers, and provides learning materials — because every child deserves a quality education regardless of geography.",
    metric: "20+ schools supported",
  },
  {
    icon: TbUsers,
    accent: "bg-terra-l text-terra",
    title: "Empowering Women",
    description:
      "Women are at the centre of every PHI intervention. Entrepreneurship training, savings groups, legal literacy, and leadership programmes unlock women's full economic potential.",
    metric: "5× income increase",
  },
  {
    icon: TbHome,
    accent: "bg-green-ll text-green",
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

export default function ImpactAreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Impact Areas" }]}
        headline="Partner with us through any of our projects"
        sub="Six interconnected dimensions of rural development — each one essential, all of them interdependent."
      />

      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
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
                    <h2 className="font-sans font-bold text-base text-ink">
                      {area.title}
                    </h2>
                    <p className="text-sm text-ink-2 leading-relaxed flex-1">
                      {area.description}
                    </p>
                    <span className="inline-block font-mono text-xs text-green bg-green-ll px-3 py-1 rounded-pill w-fit">
                      {area.metric}
                    </span>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Every area needs a champion"
        sub="Choose an impact area to sponsor and become a champion for change."
        primary={{ label: "Donate to an area", href: "/donate" }}
        secondary={{ label: "Learn about our goals", href: "/strategic-goals" }}
      />
    </>
  );
}
