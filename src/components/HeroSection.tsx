import { ArrowDownRight, Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { CREDENTIAL_METRICS, PORTFOLIO_OWNER } from '../data/portfolio';
import {
  sectionContainerVariants,
  slideUpItemVariants,
  STAGGER_EASE,
} from '../lib/motion';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  copiedEmail: boolean;
  onCopyEmail: () => void;
}

export function HeroSection({ copiedEmail, onCopyEmail }: HeroSectionProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-[#232732] bg-[#090A0D]"
    >
      {/* Subtle Architectural Grid Backdrop */}
      <div
        aria-hidden="true"
        className="hero-grid-surface pointer-events-none absolute inset-0"
      />

      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-[1200px] px-6 py-14 lg:px-8 lg:py-20"
      >
        {/* Split Hero */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Intro Copy */}
          <div className="flex flex-col justify-center lg:col-span-8">
            <motion.p
              variants={slideUpItemVariants}
              className="text-sm font-medium tracking-wide text-[#60A5FA]"
            >
              {PORTFOLIO_OWNER.roleLine}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={slideUpItemVariants}
              className="mt-4 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-[#F4F5F7]"
            >
              {PORTFOLIO_OWNER.headline}
            </motion.h1>

            <motion.p
              variants={slideUpItemVariants}
              className="mt-5 max-w-[58ch] text-base leading-relaxed text-[#9CA3AF] sm:text-[17px]"
            >
              {PORTFOLIO_OWNER.heroLead}
            </motion.p>

            <motion.div
              variants={slideUpItemVariants}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <motion.a
                href="#work"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition-colors duration-150 hover:bg-[#3B82F6] whitespace-nowrap shrink-0"
              >
                <span>Explore Selected Work</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>

              <motion.button
                type="button"
                onClick={onCopyEmail}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#232732] bg-[#13161C] px-5 py-2.5 text-sm font-medium text-[#F4F5F7] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors duration-150 hover:border-[#313644] hover:bg-[#1A1E26] whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
                    <span>{PORTFOLIO_OWNER.email} copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[#9CA3AF]" aria-hidden="true" />
                    <span>{PORTFOLIO_OWNER.email}</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Right Compact Circular Portrait */}
          <motion.div
            variants={slideUpItemVariants}
            className="flex flex-col items-center justify-center lg:col-span-4"
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.25, ease: STAGGER_EASE }}
              className="h-52 w-52 overflow-hidden rounded-full border border-[#232732] bg-[#13161C] p-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-colors duration-200 hover:border-[#60A5FA]/60 sm:h-60 sm:w-60"
            >
              <ResilientImage
                src={PORTFOLIO_OWNER.portraitImage}
                alt={PORTFOLIO_OWNER.portraitAlt}
                title="Arham Ali Portrait"
                loading="eager"
                containerClassName="h-full w-full rounded-full"
                className="h-full w-full rounded-full object-cover object-top"
              />
            </motion.div>
            <p className="mt-4 text-center text-xs text-[#9CA3AF]">
              <span className="font-medium text-[#F4F5F7]">{PORTFOLIO_OWNER.name}</span>
              <span aria-hidden="true"> · </span>
              <span>22</span>
              <span aria-hidden="true"> · </span>
              <span>{PORTFOLIO_OWNER.degree}</span>
            </p>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Credential Strip */}
        <motion.div
          variants={slideUpItemVariants}
          aria-label="Credentials and focus areas"
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#232732] bg-[#232732] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {CREDENTIAL_METRICS.map((metric) => (
            <motion.div
              key={metric.value}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.18, ease: STAGGER_EASE }}
              className="group relative bg-[#13161C] px-6 py-4 transition-colors duration-150 hover:bg-[#171B22]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[1.5px] origin-left scale-x-0 bg-[#60A5FA]/70 transition-transform duration-200 ease-out group-hover:scale-x-100"
              />
              <div className="font-mono text-lg font-medium tracking-tight text-[#F4F5F7] tabular-nums">
                {metric.value}
              </div>
              <div className="mt-0.5 text-xs text-[#9CA3AF] sm:text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
