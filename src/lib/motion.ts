import type { Variants } from 'motion/react';

export const STAGGER_EASE = [0.16, 1, 0.3, 1] as const;

export const sectionContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

export const fastStaggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const slideUpItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: STAGGER_EASE,
    },
  },
};

export const cardEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: STAGGER_EASE,
    },
  },
};
