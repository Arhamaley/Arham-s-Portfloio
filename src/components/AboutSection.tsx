import { motion } from 'motion/react';
import { ENGINEERING_STANDARDS, PORTFOLIO_OWNER } from '../data/portfolio';
import { sectionContainerVariants, slideUpItemVariants } from '../lib/motion';

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-16 border-b border-[#232732] bg-[#0E1015]"
    >
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-24"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <motion.div variants={slideUpItemVariants} className="lg:col-span-5">
            <p className="text-sm font-medium text-[#60A5FA]">About &amp; Standards</p>
            <h2
              id="about-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F4F5F7] sm:text-4xl"
            >
              Built for clarity, speed, and everyone using the web
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-[#9CA3AF]">
              <p>
                I am {PORTFOLIO_OWNER.name}, a {PORTFOLIO_OWNER.age}-year-old Computer Science
                graduate with {PORTFOLIO_OWNER.experienceYears} years of hands-on experience
                building front-end and back-end web applications alongside graphic and UI/UX
                design.
              </p>
              <p>
                My current focus sits at the intersection of modern web engineering and interaction
                design—creating intuitive interfaces where clean architecture, visual restraint,
                and accessibility reinforce each other from the very first prototype.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {ENGINEERING_STANDARDS.map((standard) => (
              <motion.div
                key={standard.title}
                variants={slideUpItemVariants}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#232732] bg-[#13161C] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors duration-200 hover:border-[#3B82F6]/45"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight text-[#F4F5F7]">
                  {standard.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#9CA3AF]">
                  {standard.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
