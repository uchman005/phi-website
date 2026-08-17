import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const legacyProjects = [
  {
    image: "/images/programs/jiimarishe-honey.jpg",
    title: "Jiimarishe Honey Pilot — Gilgil",
    description:
      "A 2021 pilot with 20 farmers in Gilgil paired rainwater harvesting with beekeeping — producing up to a five-fold increase in household income and a model for rural enterprise.",
    metric: "5× income increase",
  },
  {
    image: "/images/programs/adopt-a-school.jpeg",
    title: "Clean Water for Schools",
    description:
      "With Running Water International, rainwater harvesting systems brought clean, safe water to 90 schools and more than 36,000 students across the Meru and Nakuru regions.",
    metric: "90 schools · 36,000+ students",
  },
  {
    image: "/images/gallery/gallery-07.jpg",
    title: "Chama Micro-Lending",
    description:
      "Community savings groups collectively invested in water tanks, beehives, and hand-washing stations — building financial resilience and shared infrastructure together.",
    metric: "Community-owned savings",
  },
];

export default function NakuruLegacy() {
  return (
    <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <RevealOnScroll>
          <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-3">
            Our legacy
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
            The work that shaped us — Nakuru, Kenya
          </h2>
          <p className="text-ink-3 font-sans mb-10 max-w-2xl">
            Before our hubs took their current form, PHI&apos;s early projects in
            Nakuru County proved what community-owned development can do. These
            achievements remain the foundation everything since is built on.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legacyProjects.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.1}>
              <article className="bg-cream rounded-lg overflow-hidden border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="font-sans font-bold text-base text-ink">
                    {p.title}
                  </h3>
                  <p className="text-ink-2 text-sm leading-relaxed flex-1">
                    {p.description}
                  </p>
                  <span className="inline-block font-mono text-xs text-green-d bg-green-ll px-3 py-1 rounded-pill w-fit">
                    {p.metric}
                  </span>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
