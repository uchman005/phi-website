import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, partnership announcements, and stories from Passion of Hope International's work across rural Africa.",
  openGraph: {
    title: "Blog | Passion of Hope International",
    description:
      "News, partnership announcements, and stories from PHI's work across rural Africa.",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Blog" }]}
        headline="News and stories from the field"
        sub="Partnership announcements, programme updates, and the people behind them."
      />

      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
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
        secondary={{ label: "Impact stories", href: "/impact" }}
      />
    </>
  );
}
