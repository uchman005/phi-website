"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TbArrowRight, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import Link from "next/link";

interface Slide {
  tag: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  imgVariant: "forest" | "terra" | "ochre" | "default";
}

const slides: Slide[] = [
  {
    tag: "Who we are",
    title: "A US non-profit catalyzing rural Africa",
    description:
      "Passion of Hope International partners with local communities to build resilient, self-sustaining systems that address food security, education, health, and economic empowerment.",
    primary: { label: "Learn more", href: "/about" },
    secondary: { label: "Donate now", href: "/donate" },
    imgVariant: "forest",
  },
  {
    tag: "Our approach",
    title: "Change that is owned by communities",
    description:
      "We do not impose solutions. We listen, co-create, and walk alongside the people closest to the challenge — because lasting change must be theirs.",
    primary: { label: "Our story", href: "/about" },
    secondary: { label: "Our hubs", href: "/programs/hubs" },
    imgVariant: "default",
  },
  {
    tag: "Feed Africa",
    title: "Food sovereignty, farm to fork",
    description:
      "Kilimo Bunifu — innovative farming — trains smallholder farmers as scientists, applying agro-ecological principles to increase yields, restore soil, and feed families.",
    primary: { label: "Feed Africa program", href: "/programs/feed-africa" },
    secondary: { label: "Donate", href: "/donate" },
    imgVariant: "terra",
  },
  {
    tag: "Our model",
    title: "A systems integrator for local partners",
    description:
      "PHI connects grassroots organisations, academic institutions, civil society, and government to align resources, share knowledge, and amplify community-led initiatives.",
    primary: { label: "Our partners", href: "/partners" },
    secondary: { label: "Think Global", href: "/programs/think-global" },
    imgVariant: "ochre",
  },
  {
    tag: "Holistic development",
    title: "Agro-ecology + human capacity",
    description:
      "True development heals the planet and its people simultaneously. Our programs integrate ecological restoration with skills training, entrepreneurship, and leadership.",
    primary: { label: "Impact areas", href: "/impact-areas" },
    secondary: { label: "Strategic goals", href: "/strategic-goals" },
    imgVariant: "forest",
  },
  {
    tag: "Impact",
    title: "Lifting communities out of poverty",
    description:
      "From the Jiimarishe honey enterprise in Gilgil to our school adoption programme, every PHI initiative is measured by lasting, community-owned outcomes.",
    primary: { label: "Impact stories", href: "/impact" },
    secondary: { label: "Support our work", href: "/donate" },
    imgVariant: "default",
  },
];

const bgGradients: Record<string, string> = {
  forest:
    "bg-gradient-to-br from-green-d via-green-dd to-green-ddd",
  default:
    "bg-gradient-to-br from-green via-green-d to-green-dd",
  terra:
    "bg-gradient-to-br from-terra-l via-terra to-terra-d",
  ochre:
    "bg-gradient-to-br from-ochre-l via-ochre to-[#b8820f]",
};

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "8%" : "-8%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-8%" : "8%",
    opacity: 0,
    transition: { duration: 0.35 },
  }),
};

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (next: number) => {
      const clamped = (next + slides.length) % slides.length;
      setDirection(next > index ? 1 : -1);
      setIndex(clamped);
    },
    [index]
  );

  useEffect(() => {
    const id = setInterval(() => go(index + 1), 7000);
    return () => clearInterval(id);
  }, [index, go]);

  const slide = slides[index];

  return (
    <section
      aria-label="Hero carousel"
      className="relative overflow-hidden bg-green-ddd min-h-[540px] lg:min-h-[600px]"
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-20 w-full">
              {/* Text */}
              <div>
                <span className="inline-block font-mono text-xs text-green-bright uppercase tracking-widest mb-4">
                  {slide.tag}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg text-white/75 font-sans leading-relaxed mb-8 max-w-lg">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={slide.primary.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-pill font-sans font-semibold text-sm hover:bg-green-d transition-colors shadow-sm"
                  >
                    {slide.primary.label}
                    <TbArrowRight aria-hidden />
                  </Link>
                  <Link
                    href={slide.secondary.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white border border-white/30 rounded-pill font-sans font-semibold text-sm hover:bg-white/25 backdrop-blur-sm transition-colors"
                  >
                    {slide.secondary.label}
                  </Link>
                </div>
              </div>

              {/* Image placeholder */}
              <div
                className={`hidden lg:block rounded-xl overflow-hidden aspect-[4/3] ${bgGradients[slide.imgVariant]} relative`}
                aria-hidden
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.4) 8px, rgba(255,255,255,0.4) 9px)",
                  }}
                />
                <span className="absolute bottom-4 left-4 font-mono text-xs text-white/50 uppercase tracking-widest">
                  PHI Field Photo
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-10">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
        >
          <TbChevronLeft aria-hidden />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-pill transition-all duration-300 ${
                i === index
                  ? "w-6 bg-green-bright"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
        >
          <TbChevronRight aria-hidden />
        </button>
      </div>
    </section>
  );
}
