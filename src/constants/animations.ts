import { Variants } from "framer-motion";

export const FADE_IN: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  whileInView: { opacity: 1 },
};

export const FADE_IN_UP: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
};

export const FADE_IN_DOWN: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
};

export const FADE_IN_LEFT: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  whileInView: { opacity: 1, x: 0 },
};

export const FADE_IN_RIGHT: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  whileInView: { opacity: 1, x: 0 },
};

export const SCALE_IN: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  whileInView: { opacity: 1, scale: 1 },
};

export const STAGGER_CHILDREN: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.2,
};

export const HOVER_LIFT = {
  whileHover: { y: -10 },
};

export const FLOAT_ANIMATION = {
  animate: {
    y: [0, -20, 0],
    opacity: [0.3, 0.5, 0.3],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const GENTLE_FLOAT = {
    animate: {
      y: [0, 30, 0],
      opacity: [0.2, 0.4, 0.2],
    },
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

export const POP_IN: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const POP_IN_TRANSITION = {
  type: "spring",
  stiffness: 400,
  damping: 25,
} as const;

export const TOP_PROGRESS_BAR: Variants = {
  initial: { width: "0%", opacity: 0 },
  animate: { width: "100%", opacity: 1 },
  exit: { opacity: 0 },
};
