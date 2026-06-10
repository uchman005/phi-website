import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function MissionVision() {
  return (
    <section className="bg-green-ll py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealOnScroll delay={0}>
            <div className="bg-paper rounded-lg p-8 border border-green-l h-full">
              <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-3">
                Our Mission
              </span>
              <p className="font-display text-xl sm:text-2xl text-ink leading-snug">
                To be a catalyst for appropriate and sustainable development in
                rural Africa, equipping communities with the tools, knowledge,
                and networks to build resilient, self-sufficient futures.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="bg-green rounded-lg p-8 h-full">
              <span className="inline-block font-mono text-xs text-green-bright uppercase tracking-widest mb-3">
                Our Vision
              </span>
              <p className="font-display text-xl sm:text-2xl text-white leading-snug">
                Resilient communities across Africa that are food-sovereign,
                economically empowered, and leading their own development — for
                generations to come.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
