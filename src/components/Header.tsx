import { useState } from 'react';
import { Check, Copy, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PORTFOLIO_OWNER } from '../data/portfolio';
import type { SectionId } from '../hooks/useActiveSection';

interface HeaderProps {
  copiedEmail: boolean;
  onCopyEmail: () => void;
  activeSection: SectionId;
}

const NAV_LINKS: Array<{ id: SectionId; label: string; href: string }> = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'capabilities', label: 'Capabilities', href: '#capabilities' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export function Header({ copiedEmail, onCopyEmail, activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#232732] bg-[#090A0D]/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-[#F4F5F7] transition-colors duration-150 hover:text-[#60A5FA] whitespace-nowrap shrink-0"
        >
          {PORTFOLIO_OWNER.name}
        </a>

        {/* Zone 2: 4 concise single-line text navigation links with active tracking */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`group relative py-1.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#F4F5F7]' : 'text-[#9CA3AF] hover:text-[#F4F5F7]'
                }`}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="header-active-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#60A5FA]"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#60A5FA]/70 transition-transform duration-200 ease-out group-hover:scale-x-100"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.button
            type="button"
            onClick={onCopyEmail}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition-colors duration-150 hover:bg-[#3B82F6] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copiedEmail ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Email Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>Copy Email</span>
              </>
            )}
          </motion.button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#232732] bg-[#13161C] text-[#F4F5F7] transition-colors duration-150 hover:border-[#313644] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[#232732] bg-[#0E1015] px-6 py-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex min-h-[44px] items-center justify-between text-base font-medium transition-colors duration-150 whitespace-nowrap ${
                      isActive
                        ? 'text-[#60A5FA]'
                        : 'text-[#F4F5F7] hover:text-[#60A5FA]'
                    }`}
                  >
                    <span>{link.label}</span>
                  </a>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  onCopyEmail();
                  setMobileMenuOpen(false);
                }}
                className="mt-2 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#3B82F6] whitespace-nowrap cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
