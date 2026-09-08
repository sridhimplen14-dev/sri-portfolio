import { ArrowUp } from 'lucide-react';
import { hasValidGithub, hasValidLinkedIn, portfolio } from '../../data/portfolio';
import { scrollToSection } from '../../hooks/useActiveSection';
import { GithubIcon, LinkedInIcon } from '../ui/BrandIcons';

export function Footer() {
  const year = new Date().getFullYear();
  const { personal } = portfolio;
  const showGithub = hasValidGithub(personal.socials.github);
  const showLinkedIn = hasValidLinkedIn(personal.socials.linkedin);

  return (
    <footer className="border-t border-border bg-bg-elevated/50 px-4 py-8 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:px-8 min-[900px]:px-12 min-[900px]:pb-8 xl:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center font-mono text-xs text-text-muted sm:text-left">
          <span className="text-orange">&lt;/&gt;</span> {personal.displayName} |{' '}
          {personal.shortTitle}
          <span className="mt-1 block text-text-dim sm:mt-0 sm:ml-2 sm:inline">
            © {year}
          </span>
        </p>

        <div className="flex items-center gap-4">
          {showGithub && (
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition hover:text-orange"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
          )}
          {showLinkedIn && (
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition hover:text-orange"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={18} />
            </a>
          )}
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="inline-flex items-center gap-1.5 rounded border border-border px-2.5 py-1.5 font-mono text-[11px] text-text-muted transition hover:border-orange hover:text-orange"
            aria-label="Back to top"
          >
            <ArrowUp size={12} />
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
