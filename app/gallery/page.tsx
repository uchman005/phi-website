import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Photos from PHI's projects across rural Africa — water access, agriculture, education, and community life.",
  openGraph: {
    title: "Photo Gallery | Passion of Hope International",
    description: "Photos from PHI's projects across rural Africa.",
  },
};

const photos = [
  {
    src: "/images/gallery/gallery-01.jpg",
    alt: "Collecting water from a water tank, environmental conservation",
    caption: "Collecting water from a water tank — environmental conservation.",
  },
  { src: "/images/gallery/gallery-02.jpg", alt: "PHI project photo" },
  { src: "/images/gallery/gallery-03.jpeg", alt: "PHI project photo" },
  { src: "/images/gallery/gallery-04.jpeg", alt: "PHI project photo" },
  { src: "/images/gallery/gallery-05.jpg", alt: "PHI project photo" },
  { src: "/images/gallery/gallery-06.jpg", alt: "PHI project photo" },
  { src: "/images/gallery/gallery-07.jpg", alt: "PHI project photo" },
  { src: "/images/gallery/gallery-08.jpg", alt: "PHI project photo" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Photo Gallery" }]}
        headline="Photos from our projects"
        sub="A look at the communities, programmes, and people behind PHI's work."
      />

      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, i) => (
              <RevealOnScroll key={photo.src} delay={(i % 6) * 0.08}>
                <div className="relative aspect-square rounded-lg overflow-hidden group">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {photo.caption && (
                    <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-sans px-3 py-3">
                      {photo.caption}
                    </span>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Be part of the next photo"
        sub="Your support funds the projects that make moments like these possible."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "Impact stories", href: "/impact" }}
      />
    </>
  );
}
