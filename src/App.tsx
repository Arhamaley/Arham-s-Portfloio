import { useCallback, useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { BackToTopButton } from './components/BackToTopButton';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ContactFooter } from './components/ContactFooter';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarqueeDivider } from './components/MarqueeDivider';
import { PortfolioChat } from './components/PortfolioChat';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SocialRail } from './components/SocialRail';
import { WorkGallery } from './components/WorkGallery';
import { PORTFOLIO_OWNER, PROJECTS, ProjectItem } from './data/portfolio';
import { useActiveSection } from './hooks/useActiveSection';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalDirection, setModalDirection] = useState<1 | -1>(1);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const copyTimerRef = useRef<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const activeSection = useActiveSection();

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = useCallback(async () => {
    const email = PORTFOLIO_OWNER.email;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch {
      // Clipboard API may be restricted in certain contexts; still provide clear visual state
    }

    setCopiedEmail(true);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopiedEmail(false);
    }, 2600);
  }, []);

  const handleSelectProject = useCallback(
    (project: ProjectItem, triggerEl: HTMLButtonElement) => {
      lastTriggerRef.current = triggerEl;
      setModalDirection(1);
      setSelectedProject(project);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
    requestAnimationFrame(() => {
      lastTriggerRef.current?.focus();
    });
  }, []);

  const handleNavigateModal = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedProject) return;
      const currentIdx = PROJECTS.findIndex((p) => p.id === selectedProject.id);
      if (currentIdx === -1) return;

      setModalDirection(direction === 'next' ? 1 : -1);
      const nextIdx =
        direction === 'next'
          ? (currentIdx + 1) % PROJECTS.length
          : (currentIdx - 1 + PROJECTS.length) % PROJECTS.length;
      setSelectedProject(PROJECTS[nextIdx]);
    },
    [selectedProject]
  );

  const currentProjectIndex = selectedProject
    ? PROJECTS.findIndex((p) => p.id === selectedProject.id)
    : -1;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#090A0D] text-[#F4F5F7]">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#2563EB] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        {/* Live region announcing clipboard copy state */}
        <div className="sr-only" role="status" aria-live="polite">
          {copiedEmail ? `${PORTFOLIO_OWNER.email} copied to clipboard.` : ''}
        </div>

        <ScrollProgressBar />

        <Header
          copiedEmail={copiedEmail}
          onCopyEmail={handleCopyEmail}
          activeSection={activeSection}
        />

        <main id="main-content">
          <HeroSection copiedEmail={copiedEmail} onCopyEmail={handleCopyEmail} />
          <MarqueeDivider />
          <WorkGallery onSelectProject={handleSelectProject} />
          <CapabilitiesSection />
          <AboutSection />
        </main>

        <ContactFooter copiedEmail={copiedEmail} onCopyEmail={handleCopyEmail} />

        <BackToTopButton />

        <SocialRail />

        <PortfolioChat />

        {/* Visible Copy Confirmation Toast */}
        <AnimatePresence>
          {copiedEmail && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
              className="pointer-events-none fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-[#232732] bg-[#13161C]/95 px-4 py-2.5 text-xs font-medium text-[#F4F5F7] shadow-xl backdrop-blur-md"
            >
              <Check className="h-3.5 w-3.5 text-[#60A5FA]" />
              <span>Copied {PORTFOLIO_OWNER.email} to clipboard</span>
            </motion.div>
          )}
        </AnimatePresence>

        <CaseStudyModal
          project={selectedProject}
          direction={modalDirection}
          onClose={handleCloseModal}
          onNavigate={handleNavigateModal}
          totalCount={PROJECTS.length}
          currentIndex={currentProjectIndex}
        />
      </div>
    </MotionConfig>
  );
}
