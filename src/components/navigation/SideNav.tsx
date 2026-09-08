import { motion } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  Code2,
  Cpu,
  FolderGit2,
  Mail,
} from 'lucide-react';
import { scrollToSection, useActiveSection, type SectionId } from '../../hooks/useActiveSection';
import { portfolio } from '../../data/portfolio';

const navItems: { id: SectionId; label: string; icon: typeof Code2 }[] = [
  { id: 'home', label: 'Home', icon: Code2 },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'credentials', label: 'Publication & Education', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const mobileNavItems = navItems.filter((item) =>
  ['home', 'skills', 'experience', 'projects', 'contact'].includes(item.id),
);

export function SideNav() {
  const { active } = useActiveSection();
  const { initials } = portfolio.personal;
  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.id === active),
  );

  return (
    <>
      {/* Desktop / laptop vertical rail (≥900px) */}
      <nav
        aria-label="Section navigation"
        className="pointer-events-none fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 min-[900px]:block xl:right-6"
      >
        <div className="pointer-events-auto relative flex flex-col items-center">
          <div
            className="absolute left-1/2 top-4 bottom-14 w-px -translate-x-1/2 bg-border"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-1/2 top-4 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-orange to-orange/30"
            style={{
              height: `calc(${(activeIndex / Math.max(navItems.length - 1, 1)) * 100}% - 0.5rem)`,
              maxHeight: 'calc(100% - 4.5rem)',
            }}
            aria-hidden="true"
          />

          <ul className="relative flex flex-col items-center gap-3">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(id)}
                    aria-label={label}
                    aria-current={isActive ? 'true' : undefined}
                    className="group relative flex h-11 w-11 items-center justify-center rounded-full"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-ring"
                        className="absolute inset-1 rounded-full border border-orange bg-orange/15 shadow-[0_0_16px_rgba(249,115,22,0.25)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon
                      size={16}
                      strokeWidth={1.75}
                      className={`relative z-10 transition-colors ${
                        isActive ? 'text-orange' : 'text-text-dim group-hover:text-text'
                      }`}
                    />
                    <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded border border-border bg-bg-panel px-2 py-1 font-mono text-[10px] text-text-muted opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            className="relative z-10 mt-3 flex h-9 w-9 items-center justify-center rounded-full border border-orange/50 bg-bg-panel font-mono text-[10px] font-semibold text-orange"
            aria-hidden="true"
            title={portfolio.personal.displayName}
          >
            {initials}
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-bg bg-green" />
          </div>
        </div>
      </nav>

      {/* Mobile / tablet bottom nav */}
      <nav
        aria-label="Mobile section navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/95 backdrop-blur-md min-[900px]:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <ul className="mx-auto flex max-w-lg items-stretch justify-around px-1 py-1">
          {mobileNavItems.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id} className="flex-1">
                <button
                  type="button"
                  onClick={() => scrollToSection(id)}
                  aria-label={label}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative flex w-full flex-col items-center gap-0.5 rounded-md px-1 py-2 font-mono text-[9px] transition-colors ${
                    isActive ? 'text-orange' : 'text-text-dim'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mobile-nav-active"
                      className="absolute inset-x-2 top-1 bottom-1 rounded-md bg-orange/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon size={16} strokeWidth={1.75} className="relative z-10" />
                  <span className="relative z-10 truncate">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
