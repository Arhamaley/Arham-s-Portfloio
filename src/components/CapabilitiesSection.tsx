import { motion } from 'motion/react';
import { CAPABILITIES } from '../data/portfolio';
import {
  sectionContainerVariants,
  slideUpItemVariants,
  STAGGER_EASE,
} from '../lib/motion';

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-16 border-b border-[#232732] bg-[#090A0D]"
    >
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-24"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <motion.div variants={slideUpItemVariants} className="lg:col-span-4">
            <p className="text-sm font-medium text-[#60A5FA]">Disciplines</p>
            <h2
              id="capabilities-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F4F5F7] sm:text-4xl"
            >
              Engineering meets visual craft
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#9CA3AF]">
              Four years of shipping production web software alongside brand and interface design
              means every layout decision is grounded in real DOM, API, and performance constraints.
            </p>
          </motion.div>

          <div className="space-y-4 lg:col-span-8">
            {CAPABILITIES.map((capability, index) => (
              <motion.div
                key={capability.index}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -3 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: STAGGER_EASE,
                }}
                className="group grid grid-cols-1 gap-4 rounded-2xl border border-[#232732] bg-[#13161C] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors duration-200 hover:border-[#3B82F6]/45 sm:grid-cols-12 sm:items-start sm:gap-6"
              >
                <div className="sm:col-span-5">
                  <span className="font-mono text-sm font-medium text-[#60A5FA] tabular-nums">
                    {capability.index}.
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-[#F4F5F7] transition-colors duration-150 group-hover:text-[#60A5FA]">
                    {capability.title}
                  </h3>
                </div>

                <div className="sm:col-span-7">
                  <p className="text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
                    {capability.summary}
                  </p>
                  <p className="mt-3 text-xs font-medium text-[#D1D5DB]">
                    {capability.practices.join(' · ')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
