import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Passion of Hope International`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.tag }]}
        headline={post.title}
        sub={`${post.author} · ${post.date}`}
      />

      <article className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto">
          <RevealOnScroll>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
                sizes="800px"
                priority
              />
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-6">
            {post.body.map((block, i) =>
              block.type === "p" ? (
                <RevealOnScroll key={i} delay={Math.min(i * 0.05, 0.3)}>
                  <p className="text-ink-2 leading-relaxed">{block.text}</p>
                </RevealOnScroll>
              ) : (
                <RevealOnScroll key={i} delay={Math.min(i * 0.05, 0.3)}>
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      className="object-cover"
                      sizes="800px"
                    />
                  </div>
                </RevealOnScroll>
              )
            )}
          </div>
        </div>
      </article>

      <DarkCTA
        headline="Your investment creates stories like these"
        sub="Every donation funds the training, tools, and time that communities need to transform their lives."
        primary={{ label: "Donate now", href: "/donate" }}
        secondary={{ label: "More from the blog", href: "/blog" }}
      />
    </>
  );
}
