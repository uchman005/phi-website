import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

interface DarkCTAProps {
  headline?: string;
  sub?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export default function DarkCTA({
  headline = "Be the reason a community breaks the cycle",
  sub = "Every contribution — of time, expertise, or resources — ripples through generations.",
  primary = { label: "Donate today", href: "/donate" },
  secondary = { label: "Partner with us", href: "/partners" },
}: DarkCTAProps) {
  return (
    <section
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, #0F7155 0%, #073429 70%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto text-center relative z-10">
        <RevealOnScroll>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4 max-w-2xl mx-auto">
            {headline}
          </h2>
          {/* white/90, not /70 — the gradient's lightest point (#0F7155,
              where this centered text often lands) only gives white/70 a
              3.79:1 ratio, below AA. /90 clears 5:1 even there. */}
          <p className="text-white/90 font-sans text-lg mb-10 max-w-xl mx-auto">
            {sub}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={primary.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-d text-white rounded-pill font-sans font-semibold hover:bg-green-dd transition-colors shadow-md"
            >
              {primary.label}
              <TbArrowRight aria-hidden />
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 text-white border border-white/30 rounded-pill font-sans font-semibold hover:bg-white/25 backdrop-blur-sm transition-colors"
            >
              {secondary.label}
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
