import RevealOnScroll from "@/components/ui/RevealOnScroll";

const testimonials = [
  {
    quote:
      "PHI doesn't come to us with ready-made solutions. They sit with us, listen to what we know about our land, and help us build on it. That is rare, and it works.",
    name: "Aggrey Griffins",
    role: "Community Farmer",
    location: "Kendu Bay, Kenya",
    initials: "AG",
    accent: "bg-green text-white",
  },
  {
    quote:
      "The training programmes changed how I see myself. I went from surviving to leading — and now I train other women in my community to do the same.",
    name: "Mariam Olorundare",
    role: "Women Empowerment Lead",
    location: "Maripha, Nigeria",
    initials: "MO",
    accent: "bg-terra text-white",
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
              <blockquote className="bg-paper rounded-lg p-8 border border-line flex flex-col gap-6 h-full">
                <p className="font-display text-lg text-ink leading-relaxed italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-sans font-bold text-sm shrink-0 ${t.accent}`}
                    aria-hidden
                  >
                    {t.initials}
                  </div>
                  <cite className="not-italic">
                    <span className="block font-sans font-semibold text-sm text-ink">
                      {t.name}
                    </span>
                    <span className="block font-sans text-xs text-ink-3">
                      {t.role} · {t.location}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
