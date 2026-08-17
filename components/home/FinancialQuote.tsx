import { TbHeart } from "react-icons/tb";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function FinancialQuote() {
  return (
    <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <RevealOnScroll>
            <div className="bg-green-ll rounded-lg p-8 flex flex-col gap-4 h-full">
              <div className="w-12 h-12 rounded-lg bg-green flex items-center justify-center shrink-0">
                <TbHeart className="text-white text-2xl" aria-hidden />
              </div>
              <h3 className="font-sans font-bold text-xl text-ink">
                100% of gifts reach the mission
              </h3>
              <p className="text-ink-2 text-sm leading-relaxed">
                Administrative costs are covered by our board and dedicated
                operational supporters. Every dollar you give goes directly to
                community programmes, training, and infrastructure.
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-1.5 flex-1 bg-green-l rounded-pill overflow-hidden">
                  <div className="h-full w-full bg-green rounded-pill" />
                </div>
                <span className="font-mono text-xs text-green-d font-semibold">
                  100%
                </span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <blockquote className="bg-cream rounded-lg p-8 flex flex-col justify-between h-full border border-line">
              <p className="font-display text-xl sm:text-2xl text-ink leading-snug italic">
                &ldquo;The poor themselves can create a poverty-free world — all
                we have to do is free them from the chains that we have
                put on them.&rdquo;
              </p>
              <footer className="mt-6">
                <cite className="not-italic">
                  <span className="block font-sans font-semibold text-sm text-ink">
                    Muhammad Yunus
                  </span>
                  <span className="block font-sans text-xs text-ink-3 mt-0.5">
                    Nobel Peace Prize Laureate · Founder, Grameen Bank
                  </span>
                </cite>
              </footer>
            </blockquote>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
