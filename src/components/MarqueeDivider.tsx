import { motion } from 'motion/react';

const MARQUEE_ITEMS = [
  'Selected Works',
  'Full-Stack Engineering',
  'UI/UX Systems',
  'WCAG AA Accessibility',
  'Graphic Identity',
  'Interaction Craft',
];

export function MarqueeDivider() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-b border-[#232732] bg-[#0B0D11] py-3.5 select-none"
    >
      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 32,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-8">
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={`${copyIndex}-${item}`}
                className="flex items-center gap-8 text-xs font-medium tracking-wider text-[#9CA3AF]"
              >
                <span>{item}</span>
                <span className="text-[#60A5FA]" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
