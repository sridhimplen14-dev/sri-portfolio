import { motion } from 'framer-motion';
import { FolderGit2, Play } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import { usePrefersReducedMotion } from '../../hooks/useMedia';
import { scrollToSection } from '../../hooks/useActiveSection';
import { easeOutExpo } from '../../lib/motion';

type Token = { text: string; className?: string };
type CodeLine = { tokens: Token[] };

function buildLines(): CodeLine[] {
  const { personal } = portfolio;
  return [
    {
      tokens: [
        { text: '// Profile — derived from resume', className: 'text-text-dim' },
      ],
    },
    {
      tokens: [
        { text: 'const', className: 'text-purple' },
        { text: ' ' },
        { text: 'developer', className: 'text-blue' },
        { text: ' = {' },
      ],
    },
    {
      tokens: [
        { text: '  ' },
        { text: 'name', className: 'text-orange' },
        { text: ': ' },
        { text: `"${personal.displayName}"`, className: 'text-green' },
        { text: ',' },
      ],
    },
    {
      tokens: [
        { text: '  ' },
        { text: 'role', className: 'text-orange' },
        { text: ': ' },
        { text: `"${personal.title}"`, className: 'text-green' },
        { text: ',' },
      ],
    },
    {
      tokens: [
        { text: '  ' },
        { text: 'specialties', className: 'text-orange' },
        { text: ': [' },
      ],
    },
    {
      tokens: [
        { text: '    ' },
        { text: '"Backend Engineering"', className: 'text-green' },
        { text: ',' },
      ],
    },
    {
      tokens: [
        { text: '    ' },
        { text: '"Full-Stack Development"', className: 'text-green' },
        { text: ',' },
      ],
    },
    {
      tokens: [
        { text: '    ' },
        { text: '"AI Applications"', className: 'text-green' },
        { text: ',' },
      ],
    },
    { tokens: [{ text: '  ],' }] },
    {
      tokens: [
        { text: '  ' },
        { text: 'stack', className: 'text-orange' },
        { text: ': [' },
        { text: '"Java"', className: 'text-green' },
        { text: ', ' },
        { text: '"Python"', className: 'text-green' },
        { text: ', ' },
        { text: '"React"', className: 'text-green' },
        { text: ', ' },
        { text: '"Node.js"', className: 'text-green' },
        { text: '],' },
      ],
    },
    {
      tokens: [
        { text: '  ' },
        { text: 'experienceYears', className: 'text-orange' },
        { text: ': ' },
        { text: '4', className: 'text-orange' },
        { text: ',' },
      ],
    },
    {
      tokens: [
        { text: '  ' },
        { text: 'location', className: 'text-orange' },
        { text: ': ' },
        { text: `"${personal.location}"`, className: 'text-green' },
        { text: ',' },
      ],
    },
    { tokens: [{ text: '};' }] },
  ];
}

export function CodeSignalPanel() {
  const reduced = usePrefersReducedMotion();
  const lines = buildLines();

  return (
    <motion.div
      className="w-full overflow-hidden rounded-xl border border-orange/40 bg-[#141416] shadow-[0_24px_70px_rgba(0,0,0,0.55),0_0_24px_rgba(249,115,22,0.08)]"
      aria-label="Code editor showing developer profile"
      initial={reduced ? false : { y: 18, opacity: 0.85 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
    >
      <div className="flex items-center gap-3 border-b border-white/5 bg-[#1a1a1d] px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 justify-center">
          <span className="inline-flex items-center gap-2 font-mono text-xs text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
            developer.ts
          </span>
        </div>
        <span className="w-[42px]" aria-hidden="true" />
      </div>

      <div className="overflow-x-auto bg-[#0d0d0f]">
        <pre className="m-0 min-w-0 p-4 font-mono text-[12px] leading-[1.7] sm:p-5 sm:text-[13px]">
          <code className="block">
            {lines.map((line, index) => (
              <motion.div
                key={`line-${index}`}
                className="flex gap-3 sm:gap-4"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.22,
                  delay: reduced ? 0 : 0.08 + index * 0.035,
                  ease: easeOutExpo,
                }}
              >
                <span className="w-5 shrink-0 select-none text-right text-text-dim/55 sm:w-6">
                  {index + 1}
                </span>
                <span className="min-w-0 whitespace-pre text-text">
                  {line.tokens.map((token, tokenIndex) => (
                    <span key={`${index}-${tokenIndex}`} className={token.className}>
                      {token.text}
                    </span>
                  ))}
                  {index === lines.length - 1 && (
                    <span
                      className={`ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-orange align-middle ${
                        reduced ? '' : 'animate-pulse'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </span>
              </motion.div>
            ))}
          </code>
        </pre>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-white/5 bg-[#1a1a1d] px-4 py-3">
        <button
          type="button"
          onClick={() => scrollToSection('experience')}
          className="inline-flex items-center gap-2 rounded border border-orange/70 bg-transparent px-3.5 py-2.5 font-mono text-xs font-medium text-orange transition hover:bg-orange/15 hover:shadow-[0_0_18px_rgba(249,115,22,0.2)]"
        >
          <Play size={12} fill="currentColor" aria-hidden="true" />
          Run Portfolio
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('projects')}
          className="inline-flex items-center gap-2 rounded border border-border px-3.5 py-2.5 font-mono text-xs font-medium text-text transition hover:border-orange/50 hover:text-orange"
        >
          <FolderGit2 size={12} aria-hidden="true" />
          View Projects
        </button>
      </div>
    </motion.div>
  );
}
