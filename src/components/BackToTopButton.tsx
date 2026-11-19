import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

const SCROLL_THRESHOLD_PX = 360;

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;

    const updateVisibility = () => {
      frameId = null;
      setIsVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    const handleScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateVisibility);
      }
    };

    updateVisibility();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <motion.button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 10,
        scale: isVisible ? 1 : 0.92,
      }}
      whileHover={isVisible ? { y: -2, scale: 1.05 } : undefined}
      whileTap={isVisible ? { scale: 0.94 } : undefined}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed bottom-[78px] right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#232732] bg-[#13161C]/95 text-[#F4F5F7] shadow-lg backdrop-blur-md transition-colors duration-150 hover:border-[#60A5FA] hover:text-[#60A5FA] cursor-pointer ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </motion.button>
  );
}
