import type { Metadata } from "next";
import DonateClient from "@/components/donate/DonateClient";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Donate — Tax-Deductible Giving to Rural Africa",
  description:
    "Make a secure, tax-deductible donation to Passion of Hope International, a US 501(c)(3) charity. Fund food security, clean cookstoves, school gardens, and women's enterprise in Kenya, Nigeria, and the DRC — 100% of your gift reaches the mission.",
  openGraph: {
    title: "Donate | Passion of Hope International",
    description:
      "Secure, tax-deductible giving. 100% of your donation reaches communities in rural Africa.",
  },
};

const faqs = [
  {
    q: "Is my donation tax-deductible?",
    a: "Yes. Passion of Hope International is a registered US 501(c)(3) nonprofit, so donations are tax-deductible to the extent permitted by law. You will receive a receipt for your records.",
  },
  {
    q: "How much of my donation reaches the mission?",
    a: "Every gift to a programme or the General Fund goes straight to project costs in Kenya, Nigeria, and the Democratic Republic of Congo. Day-to-day administrative expenses are covered separately by our board and by Sustaining Supporters who choose to fund that overhead directly.",
  },
  {
    q: "Can I give monthly?",
    a: "Yes. Choose “Monthly” on the form to set up a recurring gift through PayPal. Monthly giving provides the steady funding our hubs rely on, and you can cancel at any time from your PayPal account.",
  },
  {
    q: "Can I choose which project my donation supports?",
    a: "Yes. Select any project on the form — from FEED Africa and Jiimarishe to Kilimo Bunifu Workshops and Chakula Bora School Clubs — and your gift will be directed to that work. The General Fund lets us apply your gift wherever the need is greatest.",
  },
  {
    q: "What is a Sustaining Supporter?",
    a: "Sustaining Supporters cover PHI's core operating costs — the overhead every programme depends on — with a recurring monthly gift, so more of every other donor's contribution reaches the field.",
  },
  {
    q: "Is there a minimum donation?",
    a: "Yes. To keep processing costs low relative to the funds that reach our programmes, the minimum gift is $100.",
  },
  {
    q: "How do I donate from Europe?",
    a: "Our secure PayPal checkout accepts international cards and PayPal balances in your local currency, converted to USD. Donors in East Africa can also give by mobile money via M-Changa.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function DonatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-green-ddd py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <span className="inline-block font-mono text-xs text-green-bright uppercase tracking-widest mb-3">
            Support our work
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-white max-w-xl leading-tight">
            Every gift goes directly to communities in need
          </h1>
        </div>
      </section>

      {/* Donate form + summary */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <DonateClient />
        </div>
      </section>

      {/* Donor FAQ */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[900px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-8">
              Giving, answered
            </h2>
          </RevealOnScroll>
          <div className="flex flex-col gap-4">
            {faqs.map((f, i) => (
              <RevealOnScroll key={f.q} delay={Math.min(i * 0.05, 0.2)}>
                <details className="group bg-paper rounded-lg border border-line p-5">
                  <summary className="font-sans font-semibold text-sm text-ink cursor-pointer list-none flex items-center justify-between gap-4">
                    {f.q}
                    <span
                      className="text-green-d transition-transform group-open:rotate-45 text-lg leading-none"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-ink-2 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
