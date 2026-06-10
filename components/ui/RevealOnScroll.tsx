"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealOnScrollProps) {
  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
