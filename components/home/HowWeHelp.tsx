import { TbLeaf, TbUsers } from "react-icons/tb";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";

const cards = [
  {
    icon: TbLeaf,
    iconBg: "bg-green-ll text-green",
    title: "Heal the planet",
    description:
      "Engage in ecosystem revival through agro-ecological farming, reforestation, soil restoration, and sustainable water management — returning land to its productive best.",
    cta: { label: "FEED Africa", href: "/programs/feed-africa" },
  },
  {
    icon: TbUsers,
    iconBg: "bg-terra-l text-terra",
    title: "Build capacity",
    description:
      "Educate, train, and empower community leaders, farmers, and entrepreneurs. When people have knowledge and agency, transformation is sustainable and self-propelling.",
    cta: { label: "Our programs", href: "/impact-areas" },
  },
];

export default function HowWeHelp() {
  return (
    <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <RevealOnScroll>
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10 text-center">
            How can we help?
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <RevealOnScroll key={card.title} delay={i * 0.1}>
                <article className="bg-cream rounded-lg p-8 flex flex-col gap-4 h-full border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.iconBg}`}
                  >
                    <Icon className="text-2xl" aria-hidden />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-ink">
                    {card.title}
                  </h3>
                  <p className="text-ink-2 text-sm leading-relaxed flex-1">
                    {card.description}
                  </p>
                  <Button variant="ghost" size="sm" href={card.cta.href}>
                    {card.cta.label}
                  </Button>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
