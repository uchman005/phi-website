import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DarkCTA from "@/components/home/DarkCTA";
import {
  TbBook,
  TbFlask,
  TbUsers,
  TbBuildingCommunity,
  TbChartLine,
  TbSchool,
  TbCoin,
  TbPlant2,
} from "react-icons/tb";

export const metadata: Metadata = {
  title: "FEED Africa",
  description:
    "The Farmer Entrepreneurship and Ecosystem Development (FEED) Africa program empowers the next generation of agro-entrepreneurs — building food sovereignty in Nigeria and Kenya.",
  openGraph: {
    title: "FEED Africa | Passion of Hope International",
    description:
      "Cultivating a sovereign and prosperous future — FEED Africa in Nigeria and Kenya.",
  },
};

const nigeriaPillars = [
  {
    icon: TbBook,
    title: "Develop curricula",
    text: "Integrate regenerative agricultural practices and business acumen into academic programs.",
  },
  {
    icon: TbFlask,
    title: "Foster research",
    text: "Conduct African-led research to develop sustainable farming methods tailored to local ecosystems and indigenous knowledge.",
  },
  {
    icon: TbUsers,
    title: "Empower youth & women",
    text: "Serve as a hub for training, mentorship, and agribusiness incubation, equipping the next generation with the skills and resources to thrive.",
  },
  {
    icon: TbBuildingCommunity,
    title: "Strengthen community",
    text: "Act as a living laboratory where students, farmers, and researchers collaborate to create practical solutions for real-world agricultural challenges.",
  },
];

const kenyaOutcomes = [
  {
    icon: TbChartLine,
    title: "Rural economic development",
    text: "Strengthening local value chains with processing facilities and cooperative marketplaces that keep wealth within the community — creating jobs and fostering entrepreneurship.",
  },
  {
    icon: TbUsers,
    title: "Next-generation mentorship",
    text: "Hands-on training, internships, and an incubator space to launch new agri-businesses — guided by program alumni and international experts.",
  },
  {
    icon: TbSchool,
    title: "Chakula Bora Schools Program",
    text: "An innovative after-school program introducing students in Grades 4 to 8 to practical agro-ecology and farm-to-table skills — cultivating a passion for agriculture from a young age.",
  },
  {
    icon: TbCoin,
    title: "Access to capital & land",
    text: "Innovative financing and advocacy for land access — empowering smallholder farmers and marginalized groups to scale their businesses.",
  },
];

export default function FeedAfricaPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Programs", href: "/programs/feed-africa" },
          { label: "FEED Africa" },
        ]}
        headline="FEED Africa: cultivating a sovereign and prosperous future"
        sub="The Farmer Entrepreneurship and Ecosystem Development (FEED) Africa program tackles food insecurity, youth unemployment, and environmental degradation — empowering the next generation of agro-entrepreneurs and restoring ecological balance."
      />

      {/* Overview */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-3">
                The program
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">
                Food systems in African hands
              </h2>
              <p className="text-ink-2 leading-relaxed mb-4">
                FEED Africa is a transformative initiative designed to tackle
                the continent&apos;s pressing challenges of food insecurity,
                youth unemployment, and environmental degradation. By empowering
                the next generation of agro-entrepreneurs and restoring
                ecological balance, FEED Africa is building a future where
                African communities are prosperous, resilient, and in control of
                their food systems.
              </p>
              <p className="text-ink-2 leading-relaxed">
                The program creates a dynamic synergy between higher education,
                local government, and the farming community — establishing a
                replicable model for food sovereignty across the continent, and
                contributing directly to the African Union&apos;s Agenda 2063
                for resilient food systems and empowered rural communities.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Nigeria */}
      <section className="bg-green-ll py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <RevealOnScroll>
              <div>
                <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-3">
                  🇳🇬 Nigeria
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">
                  A landmark partnership takes root
                </h2>
                <p className="text-ink-2 leading-relaxed mb-4">
                  In Nigeria, a powerful tripartite partnership is bringing the
                  FEED program to life. The University of Ilorin (UNILORIN),
                  Maripha Empowerment Foundation (MEF), and Passion of Hope
                  International (PHI) have formalized a collaborative framework
                  to establish a Farmer Entrepreneur Institute at Maripha Farms
                  in Kwara State.
                </p>
                <p className="text-ink-2 leading-relaxed">
                  Launched in 2025, this flagship initiative serves as a
                  Research and Incubator Center focused on advancing food
                  sovereignty — a testament to the power of sustained
                  collaboration, poised to become a model for agricultural
                  transformation in Nigeria.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/programs/feed-africa/unilorin-1.jpg"
                  alt="PHI, MEF, and UNILORIN partners at Maripha Farms"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {nigeriaPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <RevealOnScroll key={p.title} delay={(i % 2) * 0.1}>
                  <div className="bg-paper rounded-lg p-6 border border-line flex gap-4">
                    <div className="w-11 h-11 rounded-lg bg-green-ll text-green-d flex items-center justify-center shrink-0">
                      <Icon className="text-xl" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-ink mb-1.5">
                        {p.title}
                      </h3>
                      <p className="text-sm text-ink-2 leading-relaxed">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* UNILORIN photo strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {[
              {
                src: "/images/programs/feed-africa/unilorin-2.jpg",
                alt: "UNILORIN and MEF teams during the partnership visit",
              },
              {
                src: "/images/programs/feed-africa/unilorin-3.jpg",
                alt: "Partnership meeting at the University of Ilorin",
              },
              {
                src: "/images/programs/feed-africa/unilorin-4.jpg",
                alt: "UNILORIN delegation at Maripha Farms",
              },
              {
                src: "/images/programs/feed-africa/unilorin-dean-visit.jpg",
                alt: "Photo with the Dean and departmental heads",
              },
            ].map((img, i) => (
              <RevealOnScroll key={img.src} delay={(i % 4) * 0.08}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Kenya */}
      <section className="bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <span className="inline-block font-mono text-xs text-green-d uppercase tracking-widest mb-3">
              🇰🇪 Kenya
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">
              Building a smart sustainable agricultural city
            </h2>
            <div className="max-w-3xl">
              <p className="text-ink-2 leading-relaxed mb-4">
                In Kenya, the FEED Africa program is being implemented through a
                consortium of partners in the Ndhiwa Municipality, with a vision
                to transform the region into a model of sustainable agriculture.
              </p>
              <p className="text-ink-2 leading-relaxed mb-10">
                The program&apos;s heart is the &ldquo;Mother Farm&rdquo; — a
                fully integrated, profit-making campus for training in
                agro-ecology and business principles, designed as the
                cornerstone of the Odinga Campus at Tom Mboya University. It is
                a holistic ecosystem addressing the entire agricultural value
                chain.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {kenyaOutcomes.map((o, i) => {
              const Icon = o.icon;
              return (
                <RevealOnScroll key={o.title} delay={(i % 2) * 0.1}>
                  <div className="bg-cream rounded-lg p-6 border border-line flex gap-4 h-full">
                    <div className="w-11 h-11 rounded-lg bg-terra-l text-terra-d flex items-center justify-center shrink-0">
                      <Icon className="text-xl" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-ink mb-1.5">
                        {o.title}
                      </h3>
                      <p className="text-sm text-ink-2 leading-relaxed">
                        {o.text}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agenda 2063 band */}
      <section className="bg-green-dd py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[900px] mx-auto text-center">
          <RevealOnScroll>
            <TbPlant2 className="text-3xl text-white/80 mx-auto mb-4" aria-hidden />
            <p className="font-display text-xl sm:text-2xl text-white leading-relaxed">
              A replicable model for food sovereignty — and a direct
              contribution to the African Union&apos;s Agenda 2063 to build
              resilient food systems and empower rural communities.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <DarkCTA
        headline="Feed a family. Fund a farmer."
        sub="Your support grows farmer-entrepreneurs, research institutes, and food sovereignty across Nigeria and Kenya."
        primary={{ label: "Donate to FEED Africa", href: "/donate" }}
        secondary={{ label: "Impact stories", href: "/impact" }}
      />
    </>
  );
}
