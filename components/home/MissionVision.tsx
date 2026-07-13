import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function MissionVision() {
  return (
    <section className="bg-green-ll py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealOnScroll delay={0}>
            <div className="bg-green rounded-lg p-8 h-full">
              <span className="inline-block font-mono text-xs text-white uppercase tracking-widest mb-3">
                Our Vision
              </span>
              <p className="font-display text-xl sm:text-2xl text-white leading-snug">
                An empowered Africa with resilient and food sovereign communities.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="bg-paper rounded-lg p-8 border border-green-l h-full">
              <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-3">
                Our Mission
              </span>
              <p className="font-display text-xl sm:text-2xl text-ink leading-snug">
                To invest in knowledge and people in rural communities, building climate-resilient, and sustainable food systems.
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}
