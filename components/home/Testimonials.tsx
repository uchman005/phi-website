import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TestimonialCard from "@/components/testimonials/TestimonialCard";

const testimonials = [
  {
    quote:
      "PHI doesn't come to us with ready-made solutions. They sit with us, listen to what we know about our land, and help us build on it. That is rare, and it works.",
    name: "Aggrey Griffins",
    role: "Community Farmer",
    location: "Kendu Bay, Kenya",
    photo: "/images/people/testimonials/aggrey-griffins.jpg",
  },
  {
    quote:
      "The training programmes changed how I see myself. I went from surviving to leading — and now I train other women in my community to do the same.",
    name: "Mariam Olorundare",
    role: "Women Empowerment Lead",
    location: "Maripha, Nigeria",
    photo: "/images/people/team/mariam-olorundare.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <RevealOnScroll>
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10 text-center">
            From the communities we serve
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={t.name} delay={i * 0.1}>
              <TestimonialCard {...t} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
