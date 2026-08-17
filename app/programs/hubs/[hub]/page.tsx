import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import HubImage from "@/components/hubs/HubImage";
import { getHub, getHubParams } from "@/lib/hubs";
import { TbMapPin, TbUser, TbArrowRight } from "react-icons/tb";

interface HubPageProps {
  params: Promise<{ hub: string }>;
}

export function generateStaticParams() {
  return getHubParams();
}

export async function generateMetadata({
  params,
}: HubPageProps): Promise<Metadata> {
  const { hub: hubSlug } = await params;
  const hub = getHub(hubSlug);
  if (!hub) return {};
  return {
    title: `${hub.shortName} — ${hub.name}`,
    description: hub.tagline,
    openGraph: {
      title: `${hub.shortName} | Passion of Hope International`,
      description: hub.tagline,
    },
  };
}

export default async function HubPage({ params }: HubPageProps) {
  const { hub: hubSlug } = await params;
  const hub = getHub(hubSlug);

  if (!hub) {
    notFound();
  }

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Our Hubs", href: "/programs/hubs" },
          { label: hub.shortName },
        ]}
        headline={`${hub.flag} ${hub.name}`}
        sub={hub.tagline}
      />

      {/* Overview */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <HubImage
                image={hub.heroImage}
                aspectRatio="aspect-[4/3]"
                priority
              />
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div>
                <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-3">
                  What we do
                </span>
                {hub.description.map((para, i) => (
                  <p key={i} className="text-ink-2 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}

                {/* Location & leader */}
                <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                  <div className="flex items-start gap-2">
                    <TbMapPin className="text-green-d mt-0.5 shrink-0" aria-hidden />
                    <p className="font-sans text-sm text-ink-2">
                      {hub.city} · {hub.region}, {hub.country}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <TbUser className="text-green-d mt-0.5 shrink-0" aria-hidden />
                    <p className="font-sans text-sm text-ink-2">
                      <span className="font-semibold text-ink">
                        {hub.leader}
                      </span>{" "}
                      — {hub.leaderRole}
                    </p>
                  </div>
                </div>

                {/* Focus tags */}
                <ul className="flex flex-wrap gap-2 mt-6">
                  {hub.focus.map((tag) => (
                    <li
                      key={tag}
                      className="font-mono text-xs text-green-d bg-green-ll px-3 py-1 rounded-pill"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
              Projects
            </h2>
            <p className="text-ink-3 font-sans mb-10 max-w-xl">
              The work {hub.leader} and the {hub.shortName} team lead on the
              ground. Click any project to see its story and gallery.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hub.projects.map((project, i) => (
              <RevealOnScroll key={project.slug} delay={(i % 3) * 0.1}>
                <Link
                  href={`/programs/hubs/${hub.slug}/${project.slug}`}
                  className="group block bg-paper rounded-lg overflow-hidden border border-line hover:border-green-l hover:-translate-y-1 transition-all duration-200 h-full"
                >
                  <HubImage
                    image={project.baseImage}
                    aspectRatio="aspect-[16/9]"
                    className="rounded-none"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="p-6 flex flex-col gap-3">
                    <h3 className="font-sans font-bold text-base text-ink">
                      {project.name}
                    </h3>
                    <p className="text-sm text-ink-2 leading-relaxed">
                      {project.summary}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-sans font-semibold text-green-d group-hover:text-green-dd transition-colors">
                      View project
                      <TbArrowRight
                        className="group-hover:translate-x-0.5 transition-transform"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/programs/hubs"
              className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-green-d hover:text-green-dd transition-colors"
            >
              <TbArrowRight className="rotate-180" aria-hidden />
              All hubs
            </Link>
          </div>
        </div>
      </section>

      <DarkCTA
        headline={`Support the ${hub.shortName}`}
        sub="Back a locally led team and the projects rooted in the community it serves."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "See all hubs", href: "/programs/hubs" }}
      />
    </>
  );
}
