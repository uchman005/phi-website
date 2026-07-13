import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/lib/blog-posts";
import {
  TbArrowRight,
  TbDroplet,
  TbHeart,
  TbSchool,
  TbUsers,
  TbHome,
  TbPlant2,
} from "react-icons/tb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "PHI's impact — the areas we work across and the families behind the figures. From clean water and education to Syprina's honey harvest in Kendu Bay.",
  openGraph: {
    title: "Impact | Passion of Hope International",
    description:
      "The areas we work across and the real stories of change behind every figure.",
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

const areas = [
  {
    icon: TbDroplet,
    accent: "bg-blue-50 text-blue-600",
    title: "Clean Water",
    description:
      "Access to safe, reliable water is foundational to health, agriculture, and human dignity. PHI installs bore-holes, rainwater harvesting systems, and trains community water committees.",
    metric: "3 water projects",
  },
  {
    icon: TbHeart,
    accent: "bg-red-50 text-red-500",
    title: "Health",
    description:
      "Mobile health clinics, community health worker training, and partnerships with local medical facilities expand access to preventive and primary care in remote communities.",
    metric: "4 health outreaches",
  },
  {
    icon: TbSchool,
    accent: "bg-ochre-l text-ochre",
    title: "Education",
    description:
      "Adopt-a-School builds and equips rural classrooms, trains teachers, and provides learning materials — because every child deserves a quality education regardless of geography.",
    metric: "20+ schools supported",
  },
  {
    icon: TbUsers,
    accent: "bg-terra-l text-terra",
    title: "Empowering Women",
    description:
      "Women are at the centre of every PHI intervention. Entrepreneurship training, savings groups, legal literacy, and leadership programmes unlock women's full economic potential.",
    metric: "5× income increase",
  },
  {
    icon: TbHome,
    accent: "bg-green-ll text-green",
    title: "Housing",
    description:
      "Dignified, climate-resilient housing built with local materials and labour. PHI integrates solar energy, rainwater collection, and ventilation into affordable community housing.",
    metric: "Community-built",
  },
  {
    icon: TbPlant2,
    accent: "bg-green-ll text-green-d",
    title: "Agriculture",
    description:
      "Agro-ecological farming restores soil health, reduces input costs, and increases yields. Farmer field schools train smallholders as scientists — experimenting, recording, and sharing results.",
    metric: "Kilimo Bunifu model",
  },
];

const stories = [
  {
    quote:
      "Since Passion of Hope International came on board, our lives have greatly changed. It has restored our dignity and given us hope for the future.",
    name: "Grace Adede",
    role: "Chairlady, Kamser Seka Blessed Widows Group",
    location: "Kamser Seka, Kenya",
    photo: "/images/people/testimonials/grace-adede.jpg",
  },
  {
    quote:
      "It was one of the most meaningful and eye-opening experiences of my life. I plan to carry these ideas forward in my own work.",
    name: "Juliet Wanjiru Njagi",
    role: "Communications & Media Student, Egerton University",
    location: "Kenya",
    photo: "/images/people/testimonials/juliet-wanjiru-njagi.jpg",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Impact" }]}
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

      {/* Impact areas */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-3">
              Impact areas
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
              Let&apos;s change lives through any of these projects
            </h2>
            <p className="text-ink-3 font-sans mb-10 max-w-xl">
              Six interconnected dimensions of rural development — each one
              essential, all of them interdependent.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <RevealOnScroll key={area.title} delay={(i % 3) * 0.1}>
                  <article className="bg-cream rounded-lg p-8 border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4 h-full">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${area.accent}`}
                    >
                      <Icon className="text-2xl" aria-hidden />
                    </div>
                    <h3 className="font-sans font-bold text-base text-ink">
                      {area.title}
                    </h3>
                    <p className="text-sm text-ink-2 leading-relaxed flex-1">
                      {area.description}
                    </p>
                    <span className="inline-block font-mono text-xs text-green bg-green-ll px-3 py-1 rounded-pill w-fit">
                      {area.metric}
                    </span>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured story */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <span className="inline-block font-mono text-xs text-green uppercase tracking-widest mb-3">
              Impact stories
            </span>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll delay={0.05}>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/people/testimonials/syprina-auma.jpg"
                  alt="Syprina Auma — Kendu Bay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
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

          {/* More stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
            {stories.map((s, i) => (
              <RevealOnScroll key={s.name} delay={i * 0.1}>
                <figure className="bg-paper rounded-lg p-8 border border-line h-full flex flex-col gap-5">
                  <blockquote className="font-display text-lg text-ink italic leading-relaxed flex-1">
                    &ldquo;{s.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={s.photo}
                        alt={s.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-sm text-ink">
                        {s.name}
                      </p>
                      <p className="font-sans text-xs text-ink-3">
                        {s.role}
                        {s.location ? ` · ${s.location}` : ""}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Blog cards */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
              Latest from the field
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <RevealOnScroll key={post.slug} delay={i * 0.1}>
                <BlogCard
                  href={`/blog/${post.slug}`}
                  thumbnail={post.thumbnail}
                  tag={post.tag}
                  date={post.date}
                  title={post.title}
                  excerpt={post.excerpt}
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Your investment creates stories like these"
        sub="Every donation funds the training, tools, and time that communities need to transform their lives."
        primary={{ label: "Donate now", href: "/donate" }}
        secondary={{ label: "Meet our team", href: "/team" }}
      />
    </>
  );
}
