import type { MetadataRoute } from "next";
import { hubs } from "@/lib/hubs";
import { blogPosts } from "@/lib/blog-posts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.passionofhope.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1.0 },
    { path: "/donate", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/impact", priority: 0.8 },
    { path: "/programs/hubs", priority: 0.8 },
    { path: "/programs/feed-africa", priority: 0.8 },
    { path: "/programs/chakula-bora", priority: 0.7 },
    { path: "/programs/kilimo-bunifu", priority: 0.7 },
    { path: "/programs/jiimarishe", priority: 0.7 },
    { path: "/programs/think-global", priority: 0.7 },
    { path: "/heal-the-planet", priority: 0.7 },
    { path: "/build-capacity", priority: 0.7 },
    { path: "/leverage-connections", priority: 0.7 },
    { path: "/legacy", priority: 0.6 },
    { path: "/team", priority: 0.6 },
    { path: "/testimonials", priority: 0.6 },
    { path: "/partners", priority: 0.6 },
    { path: "/strategic-goals", priority: 0.6 },
    { path: "/blog", priority: 0.6 },
    { path: "/gallery", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
  ];

  const hubRoutes = hubs.flatMap((hub) => [
    { path: `/programs/hubs/${hub.slug}`, priority: 0.7 },
    ...hub.projects.map((project) => ({
      path: `/programs/hubs/${hub.slug}/${project.slug}`,
      priority: 0.6,
    })),
  ]);

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.6,
  }));

  return [...staticRoutes, ...hubRoutes, ...blogRoutes].map(
    ({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })
  );
}
