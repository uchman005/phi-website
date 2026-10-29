"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { TbChevronLeft, TbChevronRight, TbPlayerPause, TbPlayerPlay } from "react-icons/tb";

export interface CarouselSlide {
  src: string;
  alt: string;
  caption: string;
  /** Where the caption links, e.g. the edition the image comes from. */
  href?: string;
}

interface ImageCarouselProps {
  slides: CarouselSlide[];
  label: string;
  /** Autoplay interval; autoplay is off for people who prefer reduced motion. */
  intervalMs?: number;
}

export default function ImageCarousel({ slides, label, intervalMs = 6000 }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Hover/focus pause separately from the explicit button, so leaving the
  // carousel doesn't undo a deliberate pause.
  const [hovering, setHovering] = useState(false);
  const reduceMotion = useReducedMotion();
  const playing = !paused && !hovering && !reduceMotion && slides.length > 1;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), intervalMs);
    return () => clearInterval(id);
  }, [playing, intervalMs, slides.length]);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);
  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovering(false);
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-green-ddd">
        {slides.map((s, i) => (
          <div
            key={s.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              // Mixed shapes (collage, slides, boards): show whole images.
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
            />
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-white"
            >
              <TbChevronLeft className="text-xl" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-white"
            >
              <TbChevronRight className="text-xl" aria-hidden />
            </button>
          </>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <p className="font-sans text-xs text-ink-3">
          {slide.href ? (
            <Link href={slide.href} className="hover:text-green-d">
              {slide.caption}
            </Link>
          ) : (
            slide.caption
          )}
        </p>
        {slides.length > 1 && (
          <div className="flex shrink-0 items-center gap-1">
            {!reduceMotion && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                className="mr-1 flex h-7 w-7 items-center justify-center rounded-full text-ink-3 hover:text-green-d"
              >
                {paused ? <TbPlayerPlay aria-hidden /> : <TbPlayerPause aria-hidden />}
              </button>
            )}
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show image ${i + 1}: ${s.caption}`}
                aria-current={i === index}
                className="flex h-7 w-5 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? "w-5 bg-green-d" : "w-2 bg-line hover:bg-ink-3"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
