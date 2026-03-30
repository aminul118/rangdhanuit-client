import { Variants, Transition } from "framer-motion";

/**
 * Standard Fade In/Out Variants
 */
 const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

 const fadeInTransition: Transition = { duration: 0.3 };

/**
 * Scale + Fade Variants (Modern Entrances)
 */
const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

 const scaleInTransition: Transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
};

/**
 * Slide Up + Fade Variants
 */
 const slideUp: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const slideUpTransition: Transition = {
  duration: 0.4,
  ease: "easeOut" as const,
};

/**
 * Table Top Progress Bar Variants (Responsive 0-90-100%)
 */
 const topProgressBar: Variants = {
  initial: { width: "0%", opacity: 1 },
  animate: {
    width: "90%",
    opacity: 1,
    transition: { duration: 2, ease: "easeOut" },
  },
  exit: {
    width: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/**
 * Pop Scaling Variants (Used for buttons/icons)
 */
const popIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

 const popInTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

/**
 * Smooth Transition Configurations (Recursive/Infinite)
 * Optional: Used for other infinite animations
 */
 const smoothTransition: Transition = {
  duration: 0.8,
  repeat: Infinity,
  ease: "easeInOut" as const,
  repeatDelay: 0.2,
};

export const animations = {
  fadeIn,
  scaleIn,
  slideUp,
  topProgressBar,
  popIn,
  smoothTransition,
  fadeInTransition,
  scaleInTransition,
  slideUpTransition,
  popInTransition,
};
