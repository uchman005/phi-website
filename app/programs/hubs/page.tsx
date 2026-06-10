import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import { TbMapPin, TbUser } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Our Hubs",
  description:
    "PHI operates four community hubs across East and West Africa — in DRC, Nigeria, and Kenya — each embedded in local networks and led by people of the region.",
  openGraph: {
    title: "Our Hubs | Passion of Hope International",
    description:
      "Four community hubs across East and West Africa — embedded, local, and led from within.",
  },
};

const hubs = [
  {
    country: "Democratic Republic of Congo",
    city: "Uvira",
    region: "South Kivu",
    leader: "Guillain Nabahya",
    leaderRole: "Hub Coordinator",
    description:
      "PHI's DRC hub focuses on agro-ecological farming and conflict-sensitive community development in the South Kivu province, building livelihoods in one of the continent's most challenging contexts.",
    programmes: ["Agro-ecology", "Women's groups", "Conflict-sensitive dev"],
    accent: "border-t-green",
    flag: "🇨🇩",
  },
  {
    country: "Nigeria",
    city: "Maripha",
    region: "South-West Nigeria",
    leader: "Mariam Olorundare",
    leaderRole: "CEO, Nigeria Hub",
    description:
      "The Nigeria hub leads women's entrepreneurship and agro-ecological training across Maripha and surrounding communities, scaling the Jiimarishe enterprise model into West Africa.",
    programmes: ["Women's enterprise", "Kilimo Bunifu", "Youth skills"],
    accent: "border-t-terra",
    flag: "🇳🇬",
  },
  {
    country: "Kenya",
    city: "Kendu Bay",
    region: "Homa Bay County",
    leader: "Mary Omega",
    leaderRole: "Hub Leader",
    description:
      "Kendu Bay is PHI's most established hub — home to the original Jiimarishe honey pilot and a growing network of farmer field schools on the shores of Lake Victoria.",
    programmes: ["Jiimarishe apiculture", "Farmer field schools", "Clean water"],
    accent: "border-t-ochre",
    flag: "🇰🇪",
  },
  {
    country: "Kenya",
    city: "Ndhiwa",
    region: "Homa Bay County",
    leader: "Local Leadership Team",
    leaderRole: "Community Coordinators",
    description:
      "Ndhiwa hub extends PHI's Kenya footprint deeper into Homa Bay County, focusing on school adoption, health outreach, and small-scale irrigation for food security.",
    programmes: ["Adopt a School", "Health outreach", "Irrigation"],
    accent: "border-t-green-d",
    flag: "🇰🇪",
  },
];

export default function HubsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Programs", href: "/programs/hubs" },
          { label: "Our Hubs" },
        ]}
        headline="Where we work"
        sub="Four hubs embedded in communities across East and West Africa — each led from within."
      />

      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hubs.map((hub, i) => (
              <RevealOnScroll key={`${hub.city}-${hub.country}`} delay={i * 0.1}>
                <article
                  className={`bg-cream rounded-lg border border-line border-t-4 ${hub.accent} flex flex-col gap-4 p-6 h-full hover:-translate-y-1 transition-transform duration-200`}
                >
                  <div>
                    <span className="text-2xl mb-2 block" aria-hidden>
                      {hub.flag}
                    </span>
                    <div className="flex items-start gap-1.5">
                      <TbMapPin
                        className="text-green mt-0.5 shrink-0"
                        aria-hidden
                      />
                      <div>
                        <h2 className="font-sans font-bold text-sm text-ink">
                          {hub.city}
                        </h2>
                        <p className="font-sans text-xs text-ink-3">
                          {hub.region}, {hub.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-ink-2 leading-relaxed flex-1">
                    {hub.description}
                  </p>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TbUser className="text-ink-3 text-sm" aria-hidden />
                      <div>
                        <p className="font-sans font-semibold text-xs text-ink">
                          {hub.leader}
                        </p>
                        <p className="font-sans text-xs text-ink-3">
                          {hub.leaderRole}
                        </p>
                      </div>
                    </div>
                    <ul className="flex flex-wrap gap-1.5">
                      {hub.programmes.map((prog) => (
                        <li
                          key={prog}
                          className="font-mono text-[10px] text-green bg-green-ll px-2 py-0.5 rounded-pill"
                        >
                          {prog}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <DarkCTA
        headline="Support a hub near you"
        sub="Sponsor a specific hub and build a direct connection to the community it serves."
        primary={{ label: "Donate", href: "/donate" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
