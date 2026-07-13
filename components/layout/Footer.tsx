import Image from "next/image";
import Link from "next/link";
import {
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const footerLinks = [
  {
    heading: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Meet the Team", href: "/team" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Impact Areas", href: "/impact-areas" },
      { label: "Strategic Goals", href: "/strategic-goals" },
    ],
  },
  {
    heading: "Programs",
    links: [
      { label: "FEED Africa", href: "/programs/feed-africa" },
      { label: "Think Global", href: "/programs/think-global" },
      { label: "Our Hubs", href: "/programs/hubs" },
      { label: "Impact Stories", href: "/impact" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Donate", href: "/donate" },
      { label: "Partner with Us", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedin,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebook,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: FaYoutube,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: FaXTwitter,
  },
];

export default function Footer() {
  return (
    <footer className="bg-green-ddd text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-4"
              aria-label="Passion of Hope International — home"
            >
              <Image
                src="/images/logos/phi-logo.jpeg"
                alt=""
                width={36}
                height={36}
                className="rounded-xl shrink-0 object-cover"
              />
              <span className="font-sans font-semibold text-sm text-white leading-tight">
                Passion of Hope International
                <span className="block font-normal text-xs text-white/60">
                  501(c)(3)
                </span>
              </span>
            </Link>
            <p className="text-sm text-white/70 font-sans leading-relaxed max-w-xs">
              Catalyzing appropriate and sustainable development in rural Africa
              — community-owned, planet-first, people-centred.
            </p>
            {/* Social icons */}
            <nav aria-label="Social media" className="mt-6">
              <ul className="flex items-center gap-3" role="list">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                    >
                      <Icon className="text-base" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3 className="font-sans font-semibold text-sm text-white mb-4 uppercase tracking-wider">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {col.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 hover:text-white transition-colors font-sans"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50 font-sans text-center sm:text-left">
            &copy; {new Date().getFullYear()} Passion of Hope International.
            All rights reserved.
          </p>
          <p className="text-xs text-white/40 font-sans text-center sm:text-right">
            Registered 501(c)(3) non-profit · EIN: 88-XXXXXXX
          </p>
        </div>
      </div>
    </footer>
  );
}
