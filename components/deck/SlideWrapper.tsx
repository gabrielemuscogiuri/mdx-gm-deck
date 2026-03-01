"use client";

import { motion, type Variants } from "framer-motion";
import type { SlideAnimation } from "@/lib/mdx";

const variants: Record<SlideAnimation, Variants> = {
  fade: {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 80 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
  },
  slideRight: {
    initial: { opacity: 0, x: -80 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 80 },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  },
  slideDown: {
    initial: { opacity: 0, y: -40 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
  },
  none: {
    initial: { opacity: 1 },
    enter: { opacity: 1 },
    exit: { opacity: 1 },
  },
};

interface SlideWrapperProps {
  animation: SlideAnimation;
  children: React.ReactNode;
}

export function SlideWrapper({ animation, children }: SlideWrapperProps) {
  const v = variants[animation] ?? variants.fade;

  return (
    <motion.div
      key={animation}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={v}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="slide-container flex h-[max(100dvh,66.67vw)] w-[max(100vw,150dvh)] flex-col items-center justify-center bg-background shadow-lg"
    >
      {children}
    </motion.div>
  );
}
