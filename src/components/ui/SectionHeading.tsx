import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useMedia';
import { sectionReveal, sectionViewport, staggerContainer } from '../../lib/motion';

interface SectionHeadingProps {
  icon?: ReactNode;
  command: string;
  id?: string;
  className?: string;
}

export function SectionHeading({
  icon,
  command,
  className = '',
}: SectionHeadingProps) {
  return (
    <h2
      className={`section-title mb-8 flex flex-wrap items-center gap-3 font-mono font-semibold tracking-tight text-white sm:mb-10 ${className}`}
    >
      {icon && (
        <span className="text-orange" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{command}</span>
    </h2>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      {children}
    </motion.div>
  );
}

interface WindowChromeProps {
  title: string;
  children: ReactNode;
  className?: string;
  rightLabel?: string;
}

export function WindowChrome({
  title,
  children,
  className = '',
  rightLabel,
}: WindowChromeProps) {
  return (
    <div
      className={`panel overflow-hidden rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-border-subtle bg-bg-elevated px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center font-mono text-xs text-text-muted">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
          {title}
        </span>
        {rightLabel && (
          <span className="font-mono text-[10px] text-text-dim">{rightLabel}</span>
        )}
      </div>
      {children}
    </div>
  );
}

export function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex min-h-0 items-center rounded border border-orange/40 bg-orange-muted px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-orange transition hover:-translate-y-0.5 hover:border-orange hover:bg-orange/20">
      {label}
    </span>
  );
}
