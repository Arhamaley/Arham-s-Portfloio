import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PROJECTS, ProjectItem, WorkCategory } from '../data/portfolio';
import {
  sectionContainerVariants,
  slideUpItemVariants,
  STAGGER_EASE,
} from '../lib/motion';
import { ResilientImage } from './ResilientImage';

interface WorkGalleryProps {
  onSelectProject: (project: ProjectItem, triggerEl: HTMLButtonElement) => void;
}

type FilterOption = 'All Work' | WorkCategory;

const FILTER_OPTIONS: FilterOption[] = [
  'All Work',
  'AI & Machine Learning',
  'Web Engineering',
  'UI/UX Systems',
  'Graphic Design',
];

export function WorkGallery({ onSelectProject }: WorkGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All Work');

  const categoryCounts = useMemo(() => {
    const counts: Record<FilterOption, number> = {
      'All Work': PROJECTS.length,
      'AI & Machine Learning': 0,
      'Web Engineering': 0,
      'UI/UX Systems': 0,
      'Graphic Design': 0,
    };
    for (const project of PROJECTS) {
      counts[project.category] += 1;
    }
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All Work') {
      return PROJECTS;
    }
    return PROJECTS.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-16 border-b border-[#232732] bg-[#0E1015]"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-24">
        <motion.div
          variants={sectionContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <motion.div variants={slideUpItemVariants}>
            <p className="text-sm font-medium text-[#60A5FA]">Selected Case Studies</p>
            <h2
              id="work-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F4F5F7] sm:text-4xl"
            >
              Visual Gallery &amp; UI/UX Breakdowns
            </h2>
            <p className="mt-3 max-w-[58ch] text-base text-[#9CA3AF]">
              Select any project to inspect the problem framing, interaction decisions, accessibility
              architecture, and production stack.
            </p>
          </motion.div>

          {/* Compact Segmented Filter Tabs with Counts */}
          <motion.div
            variants={slideUpItemVariants}
            role="group"
            aria-label="Filter projects by discipline"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-[#232732] bg-[#13161C] p-1 self-start md:self-auto"
          >
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeFilter === option;
              const count = categoryCounts[option];
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(option)}
                  className={`relative min-h-[30px] rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive ? 'text-white font-semibold' : 'text-[#9CA3AF] hover:text-[#F4F5F7]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="work-filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-md bg-[#2563EB] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]"
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    <span>{option}</span>
                    <span
                      className={`font-mono text-[10px] tabular-nums ${
                        isActive ? 'text-white/85' : 'text-[#6B7280]'
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Compact 3-Column Project Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, amount: 0.12 }}
                whileHover={{ y: -4 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.06, 0.3),
                  ease: STAGGER_EASE,
                  layout: { duration: 0.3, ease: STAGGER_EASE },
                }}
              >
                <button
                  type="button"
                  onClick={(e) => onSelectProject(project, e.currentTarget)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#232732] bg-[#13161C] text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors duration-200 hover:border-[#3B82F6]/50 cursor-pointer"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden border-b border-[#232732] bg-[#090A0D]">
                    <ResilientImage
                      src={project.imagePath}
                      alt={project.imageAlt}
                      title={project.title}
                      containerClassName="h-full w-full"
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF]">
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{project.year}</span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#60A5FA] opacity-90 transition-transform duration-150 group-hover:translate-x-0.5 whitespace-nowrap shrink-0">
                          <span>Breakdown</span>
                          <ArrowUpRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                        </span>
                      </div>

                      <div className="mt-2.5 flex items-baseline gap-2">
                        <h3 className="font-display text-lg font-semibold tracking-tight text-[#F4F5F7] transition-colors duration-150 group-hover:text-[#60A5FA]">
                          {project.title}
                        </h3>
                        {project.badge && (
                          <span className="inline-block rounded-full border border-[#3B82F6]/30 bg-[#2563EB]/10 px-2 py-0.5 text-[10px] font-medium text-[#60A5FA] whitespace-nowrap shrink-0">
                            {project.badge}
                          </span>
                        )}
                      </div>

                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#9CA3AF] sm:text-sm">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-[#232732] pt-3 text-[11px] text-[#9CA3AF]">
                      {project.stack.slice(0, 3).map((tech, techIndex) => (
                        <span key={tech} className="inline-flex items-center gap-2">
                          {techIndex > 0 && <span aria-hidden="true">·</span>}
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
