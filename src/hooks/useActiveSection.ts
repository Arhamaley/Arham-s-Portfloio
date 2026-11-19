import { useEffect, useState } from 'react';

export type SectionId = 'top' | 'work' | 'capabilities' | 'about' | 'contact';

const SECTION_IDS: SectionId[] = ['top', 'work', 'capabilities', 'about', 'contact'];

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('top');

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (elements.length === 0) return;

    const visibilityMap = new Map<SectionId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          visibilityMap.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        // If scrolled near the very bottom of the page, highlight Contact
        const nearBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 48;
        if (nearBottom) {
          setActiveSection('contact');
          return;
        }

        let bestId: SectionId = 'top';
        let bestRatio = -1;
        for (const id of SECTION_IDS) {
          const ratio = visibilityMap.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio > 0) {
          setActiveSection(bestId);
        }
      },
      {
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
