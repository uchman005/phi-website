import type { Metadata } from "next";
import HeroCarousel from "@/components/home/HeroCarousel";
import EquationBanner from "@/components/home/EquationBanner";
import MissionVision from "@/components/home/MissionVision";
import HowWeHelp from "@/components/home/HowWeHelp";
import OurWork from "@/components/home/OurWork";
import NakuruLegacy from "@/components/home/NakuruLegacy";
import FinancialQuote from "@/components/home/FinancialQuote";
import Testimonials from "@/components/home/Testimonials";
import DarkCTA from "@/components/home/DarkCTA";

export const metadata: Metadata = {
  title: {
    absolute:
      "Passion of Hope International — Donate to a 501(c)(3) Charity for Rural Africa",
  },
  description:
    "A US 501(c)(3) nonprofit building food security, clean energy, and women's economic empowerment in Kenya, Nigeria, and the DRC. Tax-deductible donations — 100% of your gift reaches the mission.",
  openGraph: {
    title: "Passion of Hope International — Charity for Rural Africa",
    description:
      "Food security, clean energy, and women's empowerment in Kenya, Nigeria, and the DRC. 100% of your donation reaches the mission.",
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
      <NakuruLegacy />
      <FinancialQuote />
      <Testimonials />
      <DarkCTA />
    </>
  );
}
