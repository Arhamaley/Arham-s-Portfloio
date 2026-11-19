import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { PORTFOLIO_OWNER, SOCIAL_LINKS } from '../data/portfolio';
import { sectionContainerVariants, slideUpItemVariants } from '../lib/motion';

interface ContactFooterProps {
  copiedEmail: boolean;
  onCopyEmail: () => void;
}

export function ContactFooter({ copiedEmail, onCopyEmail }: ContactFooterProps) {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-16 bg-[#090A0D]"
    >
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-24"
      >
        <motion.div
          variants={slideUpItemVariants}
          className="rounded-2xl border border-[#232732] bg-[#13161C] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-12"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-[#60A5FA]">Direct Contact</p>
              <h2
                id="contact-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F4F5F7] sm:text-4xl"
              >
                Let&apos;s build something intuitive and enduring
              </h2>
              <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-[#9CA3AF]">
                Available for software development, UI/UX design systems, and full-stack product
                collaborations. Reach out directly by email or connect on any platform below.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.button
                  type="button"
                  onClick={onCopyEmail}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex min-h-[44px] items-center gap-2.5 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition-colors duration-150 hover:bg-[#3B82F6] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Copied: {PORTFOLIO_OWNER.email}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Copy Email · {PORTFOLIO_OWNER.email}</span>
                    </>
                  )}
                </motion.button>

                <motion.a
                  href={`mailto:${PORTFOLIO_OWNER.email}`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#232732] bg-[#0E1015] px-5 py-3 text-sm font-medium text-[#F4F5F7] transition-colors duration-150 hover:border-[#313644] hover:bg-[#1A1E26] whitespace-nowrap shrink-0"
                >
                  <Mail className="h-4 w-4 text-[#9CA3AF]" aria-hidden="true" />
                  <span>Open Email App</span>
                </motion.a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="divide-y divide-[#232732] border-t border-[#232732] lg:border-t-0">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex min-h-[52px] items-center justify-between gap-4 py-3 text-sm transition-colors duration-150"
                  >
                    <div>
                      <div className="font-medium text-[#F4F5F7] transition-colors duration-150 group-hover:text-[#60A5FA]">
                        {social.label}
                      </div>
                      <div className="text-xs text-[#9CA3AF]">{social.handle}</div>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 text-[#9CA3AF] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#60A5FA]"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quiet Minimal Footer */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#232732] pt-8 text-xs text-[#9CA3AF] sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {PORTFOLIO_OWNER.name}. Crafted with semantic HTML,
            accessible contrast, and clean TypeScript.
          </p>
          <a
            href="#top"
            className="font-medium text-[#9CA3AF] transition-colors duration-150 hover:text-[#F4F5F7] whitespace-nowrap"
          >
            Back to top
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
