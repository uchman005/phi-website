import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ContactForm from "@/components/contact/ContactForm";
import { TbMapPin, TbMail, TbPhone } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Passion of Hope International — for programme partnerships, media enquiries, volunteering, or to learn more about our work across rural Africa.",
  openGraph: {
    title: "Contact Us | Passion of Hope International",
    description:
      "Reach PHI for partnerships, media, volunteering, or general enquiries.",
  },
};

const tiles = [
  {
    icon: TbMapPin,
    title: "Headquarters",
    lines: ["Passion of Hope International", "Maryland, USA"],
    accent: "bg-green-ll text-green-d",
  },
  {
    icon: TbMail,
    title: "Email",
    lines: ["victor@passionofhope.org", "admin@passionofhope.org"],
    accent: "bg-terra-l text-terra-d",
  },
  {
    icon: TbPhone,
    title: "Phone",
    lines: ["+1 (301) 000-0000", "Mon – Fri, 9am – 5pm EST"],
    accent: "bg-ochre-l text-ochre-d",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        headline="We&rsquo;d love to hear from you"
        sub="Whether you want to partner, volunteer, donate, or just learn more — we're here."
      />

      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <RevealOnScroll>
              <ContactForm />
            </RevealOnScroll>

            {/* Contact tiles */}
            <RevealOnScroll delay={0.1}>
              <div className="flex flex-col gap-6">
                <h2 className="font-display text-xl text-ink">
                  Other ways to reach us
                </h2>
                <div className="flex flex-col gap-4">
                  {tiles.map((tile) => {
                    const Icon = tile.icon;
                    return (
                      <div
                        key={tile.title}
                        className="bg-cream rounded-lg p-5 border border-line flex gap-4 items-start"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${tile.accent}`}
                        >
                          <Icon className="text-lg" aria-hidden />
                        </div>
                        <div>
                          <h3 className="font-sans font-semibold text-sm text-ink mb-1">
                            {tile.title}
                          </h3>
                          {tile.lines.map((line) => (
                            <p key={line} className="font-sans text-sm text-ink-2">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Partner interest CTA */}
                <div className="bg-green-ll rounded-lg p-6 border border-green-l mt-2">
                  <h3 className="font-sans font-bold text-base text-ink mb-2">
                    Interested in partnering?
                  </h3>
                  <p className="text-sm text-ink-2 leading-relaxed mb-4">
                    If you represent an organisation looking to partner with PHI
                    — academically, financially, or operationally — please use
                    the form and select &ldquo;Partnership enquiry&rdquo; as
                    your subject.
                  </p>
                  <a
                    href="mailto:admin@passionofhope.org"
                    className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-green-d hover:text-green-dd transition-colors"
                  >
                    admin@passionofhope.org
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
