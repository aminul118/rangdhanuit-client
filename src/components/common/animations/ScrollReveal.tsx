"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-left" | "fade-right" | "zoom-in";
  delay?: number;
  duration?: number;
  distance?: number;
  stagger?: number;
  once?: boolean;
}

const ScrollReveal = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  distance = 40,
  stagger = 0,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: animation === "fade-up" ? distance : 0,
      x:
        animation === "fade-left"
          ? -distance
          : animation === "fade-right"
            ? distance
            : 0,
      scale: animation === "zoom-in" ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a "smart" feel
        staggerChildren: stagger,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
