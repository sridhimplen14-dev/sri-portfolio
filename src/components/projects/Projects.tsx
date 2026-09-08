import { useId, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  ChartColumn,
  ExternalLink,
  FolderGit2,
  ImageIcon,
  Search,
  Users,
} from 'lucide-react';
import { portfolio, type Project } from '../../data/portfolio';
import { useIsTouch, usePrefersReducedMotion } from '../../hooks/useMedia';
import { easeOutExpo, sectionViewport } from '../../lib/motion';
import { FadeIn, SectionHeading } from '../ui/SectionHeading';
import { GithubIcon } from '../ui/BrandIcons';

const CATEGORY_ICON: Record<string, typeof Users> = {
  'FULL-STACK': Users,
  'MACHINE LEARNING': ChartColumn,
  'GENERATIVE AI': Search,
  'AGENTIC AI': Bot,
};

function ProjectLinkButton({
  kind,
  href,
  label,
  icon,
}: {
  kind: 'github' | 'demo';
  href: string;
  label: string;
  icon: ReactNode;
}) {
  const [showTip, setShowTip] = useState(false);
  const tipId = useId();
  const ready = Boolean(href.trim());
  const reduced = usePrefersReducedMotion();
  const isDemo = kind === 'demo';
  const tipTimer = useRef<number | null>(null);

  const className = `relative z-20 inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded border px-3 py-2.5 font-mono text-xs font-medium transition-colors ${
    isDemo
      ? 'border-orange/70 bg-orange/15 text-orange shadow-[0_0_16px_rgba(249,115,22,0.12)] hover:border-orange hover:bg-orange/25 hover:shadow-[0_0_24px_rgba(249,115,22,0.28)]'
      : 'border-border bg-bg-elevated text-text hover:border-orange/55 hover:bg-orange/10 hover:text-orange hover:shadow-[0_0_18px_rgba(249,115,22,0.18)]'
  }`;

  const motionProps = reduced
    ? {}
    : {
        whileHover: { y: -2, scale: 1.03 },
        whileTap: { scale: 0.97 },
        transition: { duration: 0.18, ease: easeOutExpo },
      };

  const flashTip = () => {
    setShowTip(true);
    if (tipTimer.current) window.clearTimeout(tipTimer.current);
    tipTimer.current = window.setTimeout(() => setShowTip(false), 1600);
  };

  const tip = (
    <AnimatePresence>
      {showTip && (
        <motion.span
          id={tipId}
          role="tooltip"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded border border-orange/30 bg-bg-elevated px-2.5 py-1 font-mono text-[10px] text-orange shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
        >
          Coming Soon
        </motion.span>
      )}
    </AnimatePresence>
  );

  if (ready) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={className}
        {...motionProps}
      >
        {icon}
        {isDemo ? 'Live Demo' : 'GitHub'}
      </motion.a>
    );
  }

  return (
    <span className="relative inline-flex flex-1">
      <motion.button
        type="button"
        aria-label={`${label} — coming soon`}
        aria-describedby={showTip ? tipId : undefined}
        className={className}
        onClick={flashTip}
        {...motionProps}
      >
        {icon}
        {isDemo ? 'Live Demo' : 'GitHub'}
      </motion.button>
      {tip}
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = usePrefersReducedMotion();
  const isTouch = useIsTouch();
  const cardRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const Icon = CATEGORY_ICON[project.category] ?? FolderGit2;
  const hasImage = Boolean(project.image.trim());

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (isTouch || reduced || !cardRef.current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--mouse-x', `${x}%`);
      el.style.setProperty('--mouse-y', `${y}%`);
    });
  };

  const onLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--mouse-x', '50%');
    cardRef.current.style.setProperty('--mouse-y', '50%');
  };

  return (
    <motion.article
      ref={cardRef}
      className="project-card group flex min-h-0 flex-col rounded-lg border border-border bg-[var(--card-background)] shadow-[0_10px_28px_rgba(0,0,0,0.25)] transition-[border-color,box-shadow,transform] duration-200 hover:border-orange/45 hover:shadow-[0_14px_32px_rgba(249,115,22,0.1)]"
      style={
        {
          '--card-background': 'color-mix(in srgb, #1a1a1d 94%, transparent)',
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        } as CSSProperties
      }
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={sectionViewport}
      transition={{ duration: 0.45, delay: reduced ? 0 : index * 0.08, ease: easeOutExpo }}
      whileHover={
        reduced || isTouch
          ? undefined
          : { y: -4, transition: { duration: 0.2, ease: easeOutExpo } }
      }
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="project-card-top pointer-events-none" aria-hidden="true" />
      <span className="project-card-corner pointer-events-none" aria-hidden="true" />

      {/* Image slot — leave empty until you set project.image */}
      <div className="project-card-media relative aspect-[16/10] w-full overflow-hidden border-b border-border-subtle bg-bg-elevated">
        {hasImage ? (
          <img
            src={project.image}
            alt=""
            width={960}
            height={600}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-text-dim">
            <ImageIcon size={22} strokeWidth={1.5} aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-wider">Add image</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <header className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-widest text-orange">{project.number}</p>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-text-dim">
              {project.category}
            </p>
          </div>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border bg-bg-elevated text-orange transition group-hover:border-orange/40 group-hover:brightness-110">
            <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
          </span>
        </header>

        <h3 className="font-sans text-base font-semibold tracking-tight text-white sm:text-[1.05rem]">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 font-sans text-[13px] leading-relaxed text-text-muted">
          {project.description}
        </p>

        <div className="relative z-20 mt-5 flex gap-2.5 border-t border-border-subtle pt-4">
          <ProjectLinkButton
            kind="github"
            href={project.github}
            label={`GitHub repository for ${project.title}`}
            icon={<GithubIcon size={15} />}
          />
          <ProjectLinkButton
            kind="demo"
            href={project.demo}
            label={`Live demo for ${project.title}`}
            icon={<ExternalLink size={15} />}
          />
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const projects = portfolio.projects;

  return (
    <section
      id="projects"
      className="portfolio-section relative scroll-mt-8 overflow-x-clip"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div id="projects-heading">
            <SectionHeading
              icon={<FolderGit2 size={22} />}
              command="$ portfolio projects --featured"
            />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
