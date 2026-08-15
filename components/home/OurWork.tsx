import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";

const projects = [
  {
    label: "Education",
    image: "/images/hubs/nigeria/mef-3.jpeg",
    title: "Farmer Education",
    description:
      "Partnering with rural schools to improve infrastructure, provide learning materials, and train teachers — giving every child a fair start.",
    href: "/impact",
  },
  {
    label: "Enterprise",
    image: "/images/programs/jiimarishe-honey.jpg",
    title: "Jiimarishe",
    description:
      "A pilot apiculture enterprise in Gilgil, Kenya, that increased household income by 5× — now scaling across East Africa as a model for rural enterprise.",
    href: "/programs/jiimarishe",
  },
  {
    label: "Community",
    image: "/images/field-work/mission-team.jpeg",
    title: "Chakula Bora",
    description:
      "Holistic community interventions — clean water, health outreach, women's empowerment, and housing — addressing the intersecting dimensions of poverty.",
    href: "/impact",
  },
];

export default function OurWork() {
  return (
    <section className="bg-cream-2 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <RevealOnScroll>
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
            Our Work
          </h2>
          <p className="text-ink-3 font-sans mb-10 max-w-xl">
            Community-centred projects across rural Africa.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.1}>
              <article className="bg-paper rounded-lg overflow-hidden border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute bottom-3 left-3 font-mono text-xs text-white uppercase tracking-widest [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                    {p.label}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="font-sans font-bold text-base text-ink">
                    {p.title}
                  </h3>
                  <p className="text-ink-2 text-sm leading-relaxed flex-1">
                    {p.description}
                  </p>
                  <Button variant="ghost" size="sm" href={p.href}>
                    Learn more
                  </Button>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
