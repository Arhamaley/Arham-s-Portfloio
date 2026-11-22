import { useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ProjectItem } from '../data/portfolio';
import { STAGGER_EASE } from '../lib/motion';
import { ResilientImage } from './ResilientImage';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  direction: 1 | -1;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  totalCount: number;
  currentIndex: number;
}

export function CaseStudyModal({
  project,
  direction,
  onClose,
  onNavigate,
  totalCount,
  currentIndex,
}: CaseStudyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowLeft') {
        onNavigate('prev');
        return;
      }

      if (event.key === 'ArrowRight') {
        onNavigate('next');
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050608]/85 p-4 backdrop-blur-sm sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: STAGGER_EASE }}
            className="relative flex max-h-[92vh] w-full max-w-[920px] flex-col overflow-hidden rounded-2xl border border-[#232732] bg-[#13161C] shadow-2xl"
          >
            {/* Top Modal Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-[#232732] bg-[#0E1015] px-6 py-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF]">
                <span className="font-medium text-[#60A5FA]">{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.role}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{project.year}</span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study breakdown"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#232732] bg-[#13161C] text-[#F4F5F7] transition-colors duration-150 hover:border-[#313644] hover:bg-[#1A1E26] shrink-0 cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Case Study Content */}
            <div
              ref={scrollAreaRef}
              className="overflow-x-hidden overflow-y-auto px-6 py-6 sm:px-8 sm:py-8"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={project.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -20 }}
                  transition={{ duration: 0.22, ease: STAGGER_EASE }}
                >
                  <div className="overflow-hidden rounded-xl border border-[#232732] bg-[#090A0D]">
                    <div className="aspect-[16/9] w-full">
                      <ResilientImage
                        src={project.imagePath}
                        alt={project.imageAlt}
                        title={project.title}
                        loading="eager"
                        containerClassName="h-full w-full"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-4 border-b border-[#232732] pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2
                        id="case-study-title"
                        className="font-display text-2xl font-semibold tracking-tight text-[#F4F5F7] sm:text-3xl"
                      >
                        {project.title}
                      </h2>
                      <p className="mt-2 max-w-[64ch] text-base text-[#9CA3AF]">
                        {project.summary}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#232732] bg-[#0E1015] px-4 py-3 sm:max-w-[260px] shrink-0">
                      <div className="text-xs font-medium text-[#60A5FA]">Measured Outcome</div>
                      <div className="mt-1 text-sm font-medium text-[#F4F5F7]">
                        {project.outcome}
                      </div>
                    </div>
                  </div>

                  {/* 3-Part UI/UX & Engineering Breakdown */}
                  <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-xl border border-[#232732] bg-[#0E1015] p-5">
                      <h3 className="font-display text-sm font-semibold tracking-tight text-[#F4F5F7]">
                        01. Context &amp; Problem
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#9CA3AF]">
                        {project.uxBreakdown.problem}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#232732] bg-[#0E1015] p-5">
                      <h3 className="font-display text-sm font-semibold tracking-tight text-[#F4F5F7]">
                        02. UI/UX &amp; Interaction Craft
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#9CA3AF]">
                        {project.uxBreakdown.interactionDecisions}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#232732] bg-[#0E1015] p-5">
                      <h3 className="font-display text-sm font-semibold tracking-tight text-[#F4F5F7]">
                        03. Accessibility &amp; Code
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#9CA3AF]">
                        {project.uxBreakdown.accessibilityAndCode}
                      </p>
                    </div>
                  </div>

                  {/* Deliverables & Technical Stack */}
                  <div className="mt-7 grid grid-cols-1 gap-6 border-t border-[#232732] pt-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-medium text-[#9CA3AF]">Core Deliverables</h3>
                      <ul className="mt-2.5 space-y-1.5 text-sm text-[#F4F5F7]">
                        {project.deliverables.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs font-medium text-[#9CA3AF]">Technology &amp; Tooling</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#F4F5F7]">
                        {project.stack.join(' · ')}
                      </p>

                      {(project.githubUrl || project.liveUrl) && (
                        <div className="mt-4 flex flex-wrap items-center gap-2.5">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#232732] bg-[#0E1015] px-3 py-1.5 text-xs font-medium text-[#F4F5F7] transition-colors duration-150 hover:border-[#60A5FA] hover:text-[#60A5FA]"
                            >
                              <Github className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>GitHub Repository</span>
                              <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Case Study Stepper */}
            <div className="flex items-center justify-between gap-4 border-t border-[#232732] bg-[#0E1015] px-6 py-3.5">
              <button
                type="button"
                onClick={() => onNavigate('prev')}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#232732] bg-[#13161C] px-3.5 py-2 text-xs font-medium text-[#F4F5F7] transition-colors duration-150 hover:border-[#313644] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>Previous Project</span>
              </button>

              <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                <span className="font-mono tabular-nums text-[#F4F5F7]">
                  {String(currentIndex + 1).padStart(2, '0')} /{' '}
                  {String(totalCount).padStart(2, '0')}
                </span>
                <span className="hidden sm:inline text-[#6B7280]" aria-hidden="true">
                  ·
                </span>
                <span className="hidden sm:inline text-[#9CA3AF]">
                  Arrow keys to browse · Esc to close
                </span>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('next')}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#232732] bg-[#13161C] px-3.5 py-2 text-xs font-medium text-[#F4F5F7] transition-colors duration-150 hover:border-[#313644] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Next Project</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
