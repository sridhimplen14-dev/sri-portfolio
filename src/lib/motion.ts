import type { Transition, Variants } from 'framer-motion';

export const easeOutExpo: Transition['ease'] = [0.22, 1, 0.36, 1];

export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easeOutExpo,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeOutExpo,
    },
  },
};

/** ~15–20% of section in view, animate once */
export const sectionViewport = {
  once: true,
  amount: 0.18,
} as const;
