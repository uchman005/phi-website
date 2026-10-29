import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BlogCard from "@/components/blog/BlogCard";
import { getLatestPosts } from "@/lib/blog-posts";

/** "Latest from the field": the newest posts, picked automatically by date. */
export default function LatestPosts({
  count = 3,
  className = "bg-paper",
}: {
  count?: number;
  className?: string;
}) {
  const posts = getLatestPosts(count);
  return (
    <section className={`${className} py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-[1200px] mx-auto">
        <RevealOnScroll>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl sm:text-3xl text-ink">Latest from the field</h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-green-d hover:text-green-dd"
            >
              All news <TbArrowRight aria-hidden />
            </Link>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
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
  );
}
