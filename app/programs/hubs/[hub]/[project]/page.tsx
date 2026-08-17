import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import HubImage from "@/components/hubs/HubImage";
import { getProject, getHubProjectParams } from "@/lib/hubs";
import { TbUser, TbArrowRight } from "react-icons/tb";

interface ProjectPageProps {
  params: Promise<{ hub: string; project: string }>;
}

export function generateStaticParams() {
  return getHubProjectParams();
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { hub: hubSlug, project: projectSlug } = await params;
  const found = getProject(hubSlug, projectSlug);
  if (!found) return {};
  const { hub, project } = found;
  return {
    title: `${project.name} — ${hub.shortName}`,
    description: project.summary,
    openGraph: {
      title: `${project.name} | ${hub.shortName} | Passion of Hope International`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { hub: hubSlug, project: projectSlug } = await params;
  const found = getProject(hubSlug, projectSlug);

  if (!found) {
    notFound();
  }

  const { hub, project } = found;

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Our Hubs", href: "/programs/hubs" },
          { label: hub.shortName, href: `/programs/hubs/${hub.slug}` },
          { label: project.name },
        ]}
        headline={project.name}
        sub={project.summary}
      />

      {/* Base image + description */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[900px] mx-auto">
          <RevealOnScroll>
            <HubImage
              image={project.baseImage}
              aspectRatio="aspect-[16/9]"
              className="mb-10"
              sizes="900px"
              priority
            />
          </RevealOnScroll>

          <div className="flex items-center gap-2 mb-8">
            <TbUser className="text-green-d shrink-0" aria-hidden />
            <p className="font-sans text-sm text-ink-2">
              A project of the{" "}
              <Link
                href={`/programs/hubs/${hub.slug}`}
                className="font-semibold text-ink hover:text-green-dd transition-colors"
              >
                {hub.shortName}
              </Link>{" "}
              · Led by {hub.leader}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {project.description.map((para, i) => (
              <RevealOnScroll key={i} delay={Math.min(i * 0.05, 0.3)}>
                <p className="text-ink-2 leading-relaxed">{para}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1200px] mx-auto">
            <RevealOnScroll>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">
                Gallery
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((img, i) => (
                <RevealOnScroll key={i} delay={(i % 3) * 0.1}>
                  <HubImage
                    image={img}
                    aspectRatio="aspect-[4/3]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </RevealOnScroll>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href={`/programs/hubs/${hub.slug}`}
                className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-green-d hover:text-green-dd transition-colors"
              >
                <TbArrowRight className="rotate-180" aria-hidden />
                Back to {hub.shortName}
              </Link>
            </div>
          </div>
        </section>
      )}

      <DarkCTA
        headline="Fuel work like this"
        sub={`Your support helps ${hub.leader} and the ${hub.shortName} team grow projects that transform communities.`}
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "Explore all hubs", href: "/programs/hubs" }}
      />
    </>
  );
}
