import type { Metadata } from "next";
import DonateClient from "@/components/donate/DonateClient";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give to Passion of Hope International. 100% of your donation reaches the mission — supporting food sovereignty, education, health, and community enterprise across rural Africa.",
  openGraph: {
    title: "Donate | Passion of Hope International",
    description:
      "100% of your donation reaches the mission. Support PHI's work across rural Africa.",
  },
};

export default function DonatePage() {
  return (
    <>
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
    </>
  );
}
