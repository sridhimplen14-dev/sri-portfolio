import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { motion, type Transition } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import { hasValidGithub, hasValidLinkedIn, portfolio } from '../../data/portfolio';
import { useIsTouch, usePrefersReducedMotion } from '../../hooks/useMedia';
import { scrollToSection } from '../../hooks/useActiveSection';
import { easeOutExpo } from '../../lib/motion';
import { TechTag } from '../ui/SectionHeading';
import { GithubIcon, LinkedInIcon } from '../ui/BrandIcons';
import { CodeSignalPanel } from './CodeSignalPanel';

const easeOut: Transition['ease'] = easeOutExpo;

function SocialIcon({
  label,
  href,
  ready,
  reduced,
  delay = 0,
  children,
}: {
  label: string;
  href: string;
  ready: boolean;
  reduced: boolean;
  delay?: number;
  children: ReactNode;
}) {
  const className =
    'touch-compact inline-flex h-9 w-9 items-center justify-center text-text-muted outline-none focus-visible:text-orange';

  const body = (
    <motion.span
      className="inline-flex"
      animate={reduced ? undefined : { y: [0, -2.5, 0] }}
      transition={
        reduced
          ? undefined
          : {
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: delay + 0.5,
            }
      }
    >
      {children}
    </motion.span>
  );

  const hoverMotion = {
    scale: 1.22,
    y: -5,
    rotate: -8,
    color: 'var(--color-orange)',
    filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.55))',
  };

  const sharedMotion = reduced
    ? {
        initial: false as const,
        animate: { opacity: ready ? 1 : 0.5 },
      }
    : {
        initial: { opacity: 0, y: 10, scale: 0.65 },
        animate: { opacity: ready ? 1 : 0.5, y: 0, scale: 1 },
        transition: {
          type: 'spring' as const,
          stiffness: 380,
          damping: 22,
          delay,
        },
        whileHover: hoverMotion,
        whileTap: { scale: 0.88, rotate: 0, y: -1 },
        whileFocus: {
          scale: 1.15,
          y: -3,
          color: 'var(--color-orange)',
          filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.45))',
        },
      };

  if (ready) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={label}
        {...sharedMotion}
      >
        {body}
      </motion.a>
    );
  }

  return (
    <motion.span
      className={`${className} cursor-default`}
      aria-label={`${label} — coming soon`}
      title="Coming Soon"
      {...sharedMotion}
    >
      {body}
    </motion.span>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const isTouch = useIsTouch();
  const { personal, heroModules } = portfolio;
  const githubReady = hasValidGithub(personal.socials.github);
  const linkedInReady = hasValidLinkedIn(personal.socials.linkedin);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: easeOut },
        };

  const onEditorPointer = (e: PointerEvent<HTMLDivElement>) => {
    if (isTouch || reduced || !glowRef.current) return;
    const el = glowRef.current;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--editor-glow-x', `${x}%`);
      el.style.setProperty('--editor-glow-y', `${y}%`);
    });
  };

  return (
    <section
      id="home"
      className="portfolio-section relative flex min-h-[100svh] items-center overflow-x-clip pb-28 pt-16 sm:pb-24 lg:pb-16"
    >
      <div className="pointer-events-none absolute inset-0 glow-orange" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 glow-blue" aria-hidden="true" />
      <p
        className="pointer-events-none absolute bottom-24 left-6 hidden font-mono text-xs text-orange/20 md:block"
        aria-hidden="true"
      >
        while(building) {'{'} ship(); {'}'}
      </p>

      <div className="relative z-10 grid w-full gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="flex flex-col justify-center">
          <motion.p className="font-sans text-lg text-text-muted sm:text-xl" {...enter(0.05)}>
            Hello, I&apos;m
          </motion.p>

          <motion.div
            className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4"
            {...enter(0.1)}
          >
            <h1 className="name-shimmer font-sans text-[clamp(2.25rem,5vw,3.4rem)] font-bold tracking-tight">
              {personal.displayName}
            </h1>
            <div className="flex items-center gap-1.5 pt-1">
              <SocialIcon
                label="GitHub"
                href={personal.socials.github}
                ready={githubReady}
                reduced={reduced}
                delay={0.35}
              >
                <GithubIcon size={20} />
              </SocialIcon>
              <SocialIcon
                label="LinkedIn"
                href={personal.socials.linkedin}
                ready={linkedInReady}
                reduced={reduced}
                delay={0.45}
              >
                <LinkedInIcon size={20} />
              </SocialIcon>
            </div>
          </motion.div>

          <motion.p
            className="mt-4 max-w-xl font-mono text-sm font-medium leading-relaxed text-white sm:text-base lg:text-[1.05rem]"
            {...enter(0.15)}
          >
            {personal.identities.join(' | ')}
          </motion.p>

          <motion.p
            className="mt-5 max-w-prose text-sm leading-relaxed text-text-muted sm:text-[15px]"
            {...enter(0.2)}
          >
            {personal.summary}
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap items-center gap-3" {...enter(0.25)}>
            <a
              href={personal.resumeFile}
              download
              className="clip-corner inline-flex items-center gap-2 border border-orange bg-orange/10 px-5 py-3 font-mono text-sm font-medium text-orange transition hover:bg-orange/25 hover:shadow-[0_0_24px_rgba(249,115,22,0.25)]"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          <motion.div className="mt-8" {...enter(0.3)}>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-dim">
              LOADED_MODULES:
            </p>
            <div className="flex flex-wrap gap-2">
              {heroModules.map((m) => (
                <TechTag key={m} label={m} />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative flex items-center"
          style={
            {
              '--editor-glow-x': '55%',
              '--editor-glow-y': '40%',
            } as CSSProperties
          }
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.65, delay: 0.18, ease: easeOut },
              })}
          onPointerMove={onEditorPointer}
        >
          <div
            ref={glowRef}
            className="editor-glow pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <CodeSignalPanel />
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-text-dim transition hover:text-orange lg:bottom-10"
        onClick={() => scrollToSection('skills')}
        aria-label="Scroll to skills"
        {...(reduced
          ? {}
          : {
              animate: { y: [0, 6, 0] },
              transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
            })}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
