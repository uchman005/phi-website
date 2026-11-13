import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  TbArrowRight,
  TbHeart,
  TbHeartHandshake,
  TbHome,
  TbMail,
  TbMapPin,
  TbNews,
  TbPlant2,
  TbUsers,
} from "react-icons/tb";
import Button from "@/components/ui/Button";
import FieldScene from "@/components/ui/FieldScene";

// Shown for any URL the site doesn't have, and wherever a page calls notFound().
// Next.js sends a 404 status and a noindex tag.
export const metadata: Metadata = {
  title: "Page not found",
  description: "We couldn't find that page. Here are some good places to start.",
  robots: { index: false, follow: true },
};

const places: { href: string; title: string; blurb: string; icon: IconType }[] = [
  { href: "/programs/kilimo-bunifu", title: "Kilimo Bunifu", blurb: "Conversations on sustainable farming and food sovereignty", icon: TbPlant2 },
  { href: "/programs/hubs", title: "Our Hubs", blurb: "Our work in Kenya, Nigeria and the DRC", icon: TbMapPin },
  { href: "/impact", title: "Impact Stories", blurb: "What the work looks like on the ground", icon: TbHeartHandshake },
  { href: "/team", title: "Meet the Team", blurb: "The people behind Passion of Hope", icon: TbUsers },
  { href: "/blog", title: "Blog", blurb: "News and updates", icon: TbNews },
  { href: "/donate", title: "Donate", blurb: "Support the work", icon: TbHeart },
];

export default function NotFound() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {/* Soft glow behind the illustration */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-green-l/60 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="mb-4 inline-flex items-center gap-2 rounded-pill bg-ochre-l px-3 py-1 font-mono text-xs uppercase tracking-widest text-ochre-d">
              Error 404 · Page not found
            </p>
            <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              This path hasn&apos;t been{" "}
              <em className="text-green-d">planted</em> yet.
            </h1>
            <p className="mt-5 max-w-lg font-sans text-lg leading-relaxed text-ink-2">
              The page you&apos;re looking for may have moved, or the link may be out of date.
              Let&apos;s get you back on solid ground.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/">
                <TbHome aria-hidden /> Back to home
              </Button>
              <Button href="/contact" variant="ghost">
                <TbMail aria-hidden /> Contact us
              </Button>
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:order-2 lg:max-w-[480px]">
            <FieldScene variant="lost" />
          </div>
        </div>
      </section>

      <section aria-labelledby="popular-places" className="bg-paper px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="popular-places" className="font-display text-2xl text-ink sm:text-3xl">
            Popular places
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {places.map(({ href, title, blurb, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full items-center gap-4 rounded-lg border border-line bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-green-l hover:bg-green-ll hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl text-green-d shadow-sm transition-colors group-hover:bg-green-d group-hover:text-white">
                    <Icon aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-sans text-base font-semibold text-ink">{title}</span>
                    <span className="block text-sm text-ink-3">{blurb}</span>
                  </span>
                  <TbArrowRight
                    aria-hidden
                    className="shrink-0 text-lg text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-green-d"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
