import { useEffect, useState } from 'react';

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId: number | null = null;

    const updateProgress = () => {
      frameId = null;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }
      const nextProgress = Math.min(1, Math.max(0, window.scrollY / scrollableHeight));
      setProgress(nextProgress);
    };

    const handleScrollOrResize = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    const resizeObserver = new ResizeObserver(handleScrollOrResize);
    resizeObserver.observe(document.documentElement);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-[2px] bg-[#232732]/60"
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-[#2563EB] to-[#60A5FA] will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
