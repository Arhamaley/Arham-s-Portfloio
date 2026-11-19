import { Dribbble, Github, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import { SOCIAL_LINKS } from '../data/portfolio';
import { STAGGER_EASE } from '../lib/motion';

const RAIL_SOCIALS = [
  {
    label: 'LinkedIn',
    ariaLabel: 'LinkedIn profile',
    icon: Linkedin,
    href: SOCIAL_LINKS.find((s) => s.label === 'LinkedIn')?.href ?? 'https://linkedin.com',
  },
  {
    label: 'GitHub',
    ariaLabel: 'GitHub profile',
    icon: Github,
    href: SOCIAL_LINKS.find((s) => s.label === 'GitHub')?.href ?? 'https://github.com',
  },
  {
    label: 'Dribbble',
    ariaLabel: 'Dribbble profile',
    icon: Dribbble,
    href: SOCIAL_LINKS.find((s) => s.label === 'Dribbble')?.href ?? 'https://dribbble.com',
  },
];

export function SocialRail() {
  return (
    <motion.aside
      aria-label="Social media profiles"
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.2, ease: STAGGER_EASE }}
      className="fixed left-3 2xl:left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-2xl border border-[#232732] bg-[#13161C]/90 p-1.5 shadow-lg backdrop-blur-md xl:flex"
    >
      {RAIL_SOCIALS.map((item) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={item.ariaLabel}
            title={item.label}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.15 }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#9CA3AF] transition-colors duration-150 hover:bg-[#1A1E26] hover:text-[#60A5FA]"
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </motion.a>
        );
      })}
    </motion.aside>
  );
}
