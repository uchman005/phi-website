import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import DarkCTA from "@/components/home/DarkCTA";
import { TbArrowRight } from "react-icons/tb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impact Stories",
  description:
    "Behind every figure is a family. Read PHI's impact stories — from Syprina's honey harvest in Kendu Bay to school transformations across East Africa.",
  openGraph: {
    title: "Impact Stories | Passion of Hope International",
    description:
      "Behind every figure is a family. Real stories of change from PHI's communities.",
  },
};

const metrics = [
  {
    value: "5×",
    label: "Income increase",
    sub: "Jiimarishe apiculture pilot",
    accent: "bg-green-ll text-green",
  },
  {
    value: "4",
    label: "Active hubs",
    sub: "Across East & West Africa",
    accent: "bg-terra-l text-terra",
  },
  {
    value: "3",
    label: "Countries",
    sub: "Kenya · Nigeria · DRC",
    accent: "bg-ochre-l text-ochre",
  },
  {
    value: "20+",
    label: "Communities reached",
    sub: "Direct programme beneficiaries",
    accent: "bg-green-l text-green-d",
  },
];

const blogPosts = [
  {
    tag: "Agriculture",
    variant: "forest" as const,
    date: "March 2024",
    title: "How Kilimo Bunifu is restoring soil health in Kendu Bay",
    excerpt:
      "Three years after adopting agro-ecological methods, farmers in the PHI Kendu Bay hub are reporting 40% higher yields and dramatically lower input costs.",
    href: "/impact",
  },
  {
    tag: "Women's Empowerment",
    variant: "terra" as const,
    date: "January 2024",
    title: "Mariam's entrepreneurship programme trains 120 women in Nigeria",
    excerpt:
      "The Maripha hub's women's enterprise cohort graduates 120 participants — each with a business plan, savings account, and market linkage.",
    href: "/impact",
  },
  {
    tag: "Education",
    variant: "ochre" as const,
    date: "November 2023",
    title: "Adopt-a-School transforms learning in rural DRC",
    excerpt:
      "New classrooms, trained teachers, and learning materials — the Uvira hub's first Adopt-a-School partnership delivers results ahead of schedule.",
    href: "/impact",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Impact Stories" }]}
        headline="Behind every figure is a family"
        sub="Numbers matter — but stories show why they do."
      />

      {/* Metrics band */}
      <section className="bg-green py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <RevealOnScroll key={m.label} delay={i * 0.08}>
                <div className={`rounded-lg p-6 text-center ${m.accent}`}>
                  <div className="font-display text-4xl font-semibold mb-1">
                    {m.value}
                  </div>
                  <div className="font-sans font-semibold text-xs mb-0.5">
                    {m.label}
                  </div>
                  <div className="font-sans text-[10px] opacity-70">
                    {m.sub}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Featured story */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-3">
              Featured story
            </span>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll delay={0.05}>
              <ImagePlaceholder
                variant="forest"
                label="Syprina Auma — Kendu Bay"
                aspectRatio="aspect-[4/3]"
                className="rounded-xl"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4">
                  Syprina Auma: from subsistence to enterprise
                </h2>
                <p className="text-ink-2 leading-relaxed mb-4">
                  Three years ago, Syprina Auma farmed a half-acre plot near
                  Kendu Bay — barely enough to feed her family. When PHI&apos;s
                  Jiimarishe programme arrived, she became one of the first
                  women to complete the apiculture training.
                </p>
                <p className="text-ink-2 leading-relaxed mb-6">
                  Today she manages a cooperative of 12 beehives, earns five
                  times her previous income, and mentors new entrants to the
                  programme. She has paid her children&apos;s school fees in
                  full for two consecutive years.
                </p>
                <blockquote className="border-l-4 border-green pl-4 mb-6">
                  <p className="font-display text-lg text-ink italic">
                    &ldquo;The bees gave me back my confidence. Now I know I can
                    build something — for my family, and for others.&rdquo;
                  </p>
                  <footer className="mt-2 font-sans text-sm text-ink-3">
                    — Syprina Auma, Kendu Bay, Kenya
                  </footer>
                </blockquote>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-green hover:text-green-d transition-colors"
                >
                  Support more stories like Syprina&apos;s
                  <TbArrowRight aria-hidden />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Blog cards */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              Latest from the field
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <RevealOnScroll key={post.title} delay={i * 0.1}>
                <article className="bg-paper rounded-lg overflow-hidden border border-line hover:-translate-y-1 transition-transform duration-200 flex flex-col h-full">
                  <ImagePlaceholder
                    variant={post.variant}
                    label={post.tag}
                    aspectRatio="aspect-[16/9]"
                  />
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-green bg-green-ll px-2 py-0.5 rounded-pill">
                        {post.tag}
                      </span>
                      <span className="text-xs text-ink-3 font-sans">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-sans font-bold text-sm text-ink leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-ink-2 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <Link
                      href={post.href}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-green hover:text-green-d transition-colors"
                    >
                      Read more <TbArrowRight aria-hidden />
                    </Link>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Your investment creates stories like these"
        sub="Every donation funds the training, tools, and time that communities need to transform their lives."
        primary={{ label: "Donate now", href: "/donate" }}
        secondary={{ label: "Read more stories", href: "/impact" }}
      />
    </>
  );
}
