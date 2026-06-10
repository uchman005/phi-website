import type { Metadata } from "next";
import HeroCarousel from "@/components/home/HeroCarousel";
import EquationBanner from "@/components/home/EquationBanner";
import MissionVision from "@/components/home/MissionVision";
import HowWeHelp from "@/components/home/HowWeHelp";
import OurWork from "@/components/home/OurWork";
import FinancialQuote from "@/components/home/FinancialQuote";
import Testimonials from "@/components/home/Testimonials";
import DarkCTA from "@/components/home/DarkCTA";

export const metadata: Metadata = {
  title: "Passion of Hope International — Catalyzing Rural Africa",
  description:
    "PHI is a US 501(c)(3) non-profit partnering with rural African communities to build food sovereignty, human capacity, and lasting, community-owned development.",
  openGraph: {
    title: "Passion of Hope International",
    description:
      "Catalyzing appropriate and sustainable development in rural Africa.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <EquationBanner />
      <MissionVision />
      <HowWeHelp />
      <OurWork />
      <FinancialQuote />
      <Testimonials />
      <DarkCTA />
    </>
  );
}
