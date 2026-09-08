import { Cpu } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { FadeIn, SectionHeading } from '../ui/SectionHeading';

const SkillsGlobeCanvas = lazy(() =>
  import('./SkillsGlobeCanvas').then((m) => ({ default: m.SkillsGlobeCanvas })),
);

function GlobeFallback() {
  return (
    <div
      className="skills-globe flex items-center justify-center rounded-full border border-orange/20 bg-bg-panel/40"
      role="status"
      aria-live="polite"
    >
      <p className="font-mono text-xs text-text-dim">Loading skills universe…</p>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="portfolio-section relative scroll-mt-8 overflow-x-clip"
      aria-labelledby="skills-heading"
    >
      <div className="relative z-10">
        <FadeIn>
          <div id="skills-heading">
            <SectionHeading icon={<Cpu size={22} />} command="# Skills.json" />
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="relative mx-auto mb-[clamp(2rem,5vw,3.5rem)]">
            <Suspense fallback={<GlobeFallback />}>
              <SkillsGlobeCanvas />
            </Suspense>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
