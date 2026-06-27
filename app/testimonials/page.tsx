import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import TestimonialCard from "@/components/testimonials/TestimonialCard";

export const metadata: Metadata = {
  title: "Testimonials & Endorsements",
  description:
    "Real stories from the communities PHI serves — and formal endorsements from partner organizations recognizing PHI's work in food security and education.",
  openGraph: {
    title: "Testimonials & Endorsements | Passion of Hope International",
    description:
      "Real stories from the communities PHI serves across rural Africa.",
  },
};

const testimonials = [
  {
    quote:
      "When PHI gave us the opportunity to attend the World Food Day event at the Kendu Bay Showground, everything changed.",
    name: "Aggrey Griffins",
    role: "Community Farmer",
    location: "Kamser Seka",
    photo: "/images/people/testimonials/aggrey-griffins.jpg",
    kind: "person" as const,
  },
  {
    quote:
      "Since Passion of Hope International (PHI) came on board, our lives have greatly changed.",
    name: "Grace Adede",
    role: "Chairlady, Kamser Seka Blessed Widows Group",
    location: "Kamser Seka",
    photo: "/images/people/testimonials/grace-adede.jpg",
    kind: "person" as const,
  },
  {
    quote: "It has restored my dignity and given me hope for the future.",
    name: "Syprina Auma",
    role: "Widow",
    location: "Wang' Chieng Ward, Homa Bay County",
    photo: "/images/people/testimonials/syprina-auma.jpg",
    kind: "person" as const,
  },
  {
    quote: "It was an eye-opening experience for me.",
    name: "Braxton Odera",
    role: "Youth",
    location: "Kamser Seka",
    photo: "/images/people/testimonials/braxton-odera.jpg",
    kind: "person" as const,
  },
  {
    quote:
      "It was one of the most meaningful and eye-opening experiences of my life.",
    name: "Juliet Wanjiru Njagi",
    role: "Communications & Media Student, Egerton University",
    photo: "/images/people/testimonials/juliet-wanjiru-njagi.jpg",
    kind: "person" as const,
  },
  {
    quote:
      "This visit greatly inspired me, and I plan to introduce these innovative ideas.",
    name: "Luiza",
    role: "Chakula Bora Club Member",
    photo: "/images/people/testimonials/luiza.jpg",
    kind: "person" as const,
  },
  {
    quote:
      "Homabay County Peace Network formally recognizes PHI's partnership and impact in food security and education across the region.",
    name: "Homabay County Peace Network",
    role: "Organizational Endorsement",
    photo: "/images/logos/partners/hcpn.png",
    kind: "organization" as const,
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Testimonials" }]}
        headline="From the communities we serve"
        sub="Real stories and formal endorsements from the people and organizations PHI walks alongside."
      />

      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <RevealOnScroll key={t.name} delay={(i % 4) * 0.08}>
                <TestimonialCard {...t} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Your support writes the next story"
        sub="Every contribution helps another community move from survival to enterprise."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "Read impact stories", href: "/impact" }}
      />
    </>
  );
}
