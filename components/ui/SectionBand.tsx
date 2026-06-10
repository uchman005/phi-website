import { type ReactNode } from "react";

type BandVariant = "white" | "cream" | "cream-2" | "green-ll" | "dark";

interface SectionBandProps {
  variant?: BandVariant;
  children: ReactNode;
  className?: string;
  id?: string;
}

const bgMap: Record<BandVariant, string> = {
  white: "bg-paper",
  cream: "bg-cream",
  "cream-2": "bg-cream-2",
  "green-ll": "bg-green-ll",
  dark: "bg-green-ddd",
};

export default function SectionBand({
  variant = "white",
  children,
  className = "",
  id,
}: SectionBandProps) {
  return (
    <section id={id} className={`${bgMap[variant]} ${className}`}>
      {children}
    </section>
  );
}
