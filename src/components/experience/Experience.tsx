import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Calendar, ChevronDown, Terminal } from 'lucide-react';
import { portfolio, type Experience as ExperienceRole } from '../../data/portfolio';
import { useIsMobile, usePrefersReducedMotion } from '../../hooks/useMedia';
import { easeOutExpo, sectionViewport } from '../../lib/motion';
import { FadeIn, SectionHeading } from '../ui/SectionHeading';

function formatRange(start: string, end: string) {
  const fmt = (d: string) => {
    if (d === 'Present') return 'Present';
    const [y, m] = d.split('-');
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = months[Number(m) - 1] ?? m;
    return `${month} ${y}`;
  };
  return `${fmt(start)} – ${fmt(end)}`;
}

function ExperienceCard({
  role,
  active,
  reduced,
}: {
  role: ExperienceRole;
  active: boolean;
  reduced: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = (role.moreAchievements?.length ?? 0) > 0;

  return (
    <article
      className={`rounded-lg border bg-bg-panel/90 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition ${
        active ? 'border-orange/50' : 'border-border hover:border-orange/30'
      }`}
    >
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs text-orange">Role {role.roleNumber}</span>
        <span className="font-mono text-[11px] text-text-dim">
          {role.company}
          {role.location ? ` · ${role.location}` : ''}
        </span>
      </header>

      <h3 className="text-lg font-semibold text-white">
        {role.title} <span className="text-text-muted">@ {role.company}</span>
      </h3>

      <p className="mt-3 max-w-prose text-sm leading-relaxed text-text-muted">{role.summary}</p>

      <ul className="mt-4 space-y-2">
        {role.achievements.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-text-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {expanded && hasMore && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="overflow-hidden"
          >
            <ul className="mt-2 space-y-2">
              {role.moreAchievements!.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {hasMore && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex min-h-11 items-center gap-1 font-mono text-xs text-orange hover:underline"
        >
          {expanded ? 'Show less' : 'More details'}
          <ChevronDown
            size={14}
            className={`transition ${expanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {role.technologies.map((tech) => (
          <span
            key={tech}
            className="inline-flex min-h-0 items-center rounded border border-orange/40 bg-orange-muted px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-orange transition hover:-translate-y-0.5 hover:border-orange hover:bg-orange/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

export function Experience() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState(portfolio.experience[0]?.id);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 70%', 'end 40%'],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: reduced ? 400 : 90,
    damping: 24,
  });
  const lineScaleY = useTransform(lineScale, [0, 1], [0, 1]);

  useEffect(() => {
    const nodes = portfolio.experience
      .map((role) => itemRefs.current[role.id])
      .filter(Boolean) as HTMLLIElement[];

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.getAttribute('data-role-id');
        if (id) setActiveId(id);
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: [0.15, 0.4, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="portfolio-section relative scroll-mt-8 overflow-x-clip"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div id="experience-heading">
            <SectionHeading
              icon={<Terminal size={22} />}
              command="$ careerctl history --latest-first"
            />
          </div>
        </FadeIn>

        <ol ref={listRef} className="relative space-y-10">
          {/* Desktop timeline line (draws on scroll) */}
          <div
            className="absolute bottom-0 left-[7.25rem] top-2 hidden w-px overflow-hidden bg-border/60 md:block"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-orange via-orange/50 to-orange/10"
              style={{ scaleY: reduced ? 1 : lineScaleY }}
            />
          </div>

          {/* Mobile far-left line */}
          <div
            className="absolute bottom-0 left-3 top-2 w-px overflow-hidden bg-border/60 md:hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-orange via-orange/50 to-transparent"
              style={{ scaleY: reduced ? 1 : lineScaleY }}
            />
          </div>

          {portfolio.experience.map((role, index) => {
            const active = activeId === role.id;
            return (
              <li
                key={role.id}
                data-role-id={role.id}
                ref={(el) => {
                  itemRefs.current[role.id] = el;
                }}
                className="relative grid gap-3 pl-8 md:grid-cols-[10.5rem_1.5rem_1fr] md:gap-0 md:pl-0"
              >
                {/* Mobile marker */}
                <span
                  className={`absolute left-1.5 top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 md:hidden ${
                    active
                      ? 'border-orange bg-orange shadow-[0_0_12px_rgba(249,115,22,0.7)]'
                      : 'border-orange/50 bg-bg'
                  }`}
                  aria-hidden="true"
                />

                <motion.div
                  className="md:pr-4 md:text-right"
                  initial={reduced ? false : { opacity: 0, x: isMobile ? 0 : -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={sectionViewport}
                  transition={{ duration: 0.5, delay: 0.04 * index, ease: easeOutExpo }}
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/40 bg-bg-panel px-3 py-1.5 font-mono text-[11px] text-orange">
                    <Calendar size={12} aria-hidden="true" />
                    {formatRange(role.startDate, role.endDate)}
                  </span>
                </motion.div>

                <div className="relative hidden md:flex md:justify-center">
                  <span
                    className={`relative z-10 mt-2 h-3.5 w-3.5 rounded-full border-2 transition ${
                      active
                        ? 'border-orange bg-orange shadow-[0_0_12px_rgba(249,115,22,0.7)]'
                        : 'border-orange/50 bg-bg'
                    }`}
                    aria-hidden="true"
                  />
                </div>

                <motion.div
                  className="md:pl-6"
                  initial={reduced ? false : { opacity: 0, x: isMobile ? 0 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={sectionViewport}
                  transition={{ duration: 0.55, delay: 0.06 * index, ease: easeOutExpo }}
                >
                  <ExperienceCard role={role} active={active} reduced={reduced} />
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
