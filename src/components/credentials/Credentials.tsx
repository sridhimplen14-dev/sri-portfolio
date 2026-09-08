import { motion } from 'framer-motion';
import { Award, BookOpen, ExternalLink, GraduationCap, Pin } from 'lucide-react';
import { portfolio, type Certification } from '../../data/portfolio';
import { usePrefersReducedMotion } from '../../hooks/useMedia';
import { sectionViewport, staggerContainer, staggerItem } from '../../lib/motion';
import { FadeIn, SectionHeading } from '../ui/SectionHeading';

function CertificationBadge({ cert }: { cert: Certification }) {
  const alt = `${cert.name} badge`;

  if (cert.badgeImage) {
    return (
      <img
        src={cert.badgeImage}
        alt={alt}
        width={56}
        height={56}
        className="cert-badge h-14 w-14 rounded-xl object-contain transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]"
      />
    );
  }

  const initials = (cert.issuer ?? cert.name)
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className="cert-badge flex h-14 w-14 items-center justify-center rounded-xl border border-orange/50 bg-orange/10 font-mono text-xs font-semibold text-orange transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]"
      role="img"
      aria-label={alt}
    >
      {initials}
    </div>
  );
}

export function Credentials() {
  const { publication, education, certifications } = portfolio;
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="credentials"
      className="portfolio-section relative scroll-mt-8 overflow-x-clip"
      aria-labelledby="credentials-heading"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div id="credentials-heading">
            <SectionHeading
              icon={<BookOpen size={22} />}
              command="$ cat ~/publication.md && ls ~/education"
            />
          </div>
        </FadeIn>

        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <FadeIn className="flex h-full min-h-0">
            <article className="group flex h-full min-h-[28rem] w-full flex-col overflow-hidden rounded-lg border border-orange/35 bg-bg-panel/95 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition duration-200 hover:border-orange/55 hover:shadow-[0_24px_60px_rgba(249,115,22,0.12)] focus-within:border-orange/50 sm:min-h-[32rem] lg:min-h-full">
              <div className="flex items-center justify-between border-b border-border-subtle bg-bg-elevated px-5 py-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-orange">
                  <Pin size={12} aria-hidden="true" />
                  PINNED
                </span>
                <span className="font-mono text-[10px] text-text-dim">publication.json</span>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-8 p-7 sm:p-9 lg:p-10">
                <div className="flex flex-1 flex-col">
                  <p className="font-mono text-xs tracking-wide text-text-dim sm:text-sm">
                    {publication.date} · Peer-reviewed
                  </p>
                  <h3 className="name-shimmer mt-5 text-[clamp(1.65rem,2.8vw,2.85rem)] font-bold leading-[1.15] tracking-tight">
                    {publication.title}
                  </h3>
                  <p className="mt-7 max-w-none text-base leading-relaxed text-text-muted sm:text-lg sm:leading-relaxed">
                    {publication.journal}, {publication.volumeIssue}, {publication.pages}.
                  </p>
                  <p className="mt-5 font-mono text-sm text-text-dim sm:text-base">
                    DOI:{' '}
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="doi-link text-orange"
                    >
                      {publication.doi}
                    </a>
                  </p>
                </div>
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-fit items-center gap-2 border-t border-border-subtle pt-6 font-mono text-sm text-orange transition hover:underline sm:text-base"
                >
                  Read Publication <ExternalLink size={16} />
                </a>
              </div>
            </article>
          </FadeIn>

          <div className="flex h-full min-h-0 flex-col gap-6">
            <FadeIn delay={0.05} className="flex min-h-0 flex-1 flex-col">
              <div className="flex h-full min-h-[12rem] flex-1 flex-col overflow-hidden rounded-lg border border-border bg-bg-panel/90">
                <div className="flex items-center gap-2 border-b border-border-subtle bg-bg-elevated px-4 py-2.5 font-mono text-xs text-text-muted">
                  <GraduationCap size={14} className="text-orange" aria-hidden="true" />
                  education/
                </div>
                <motion.ul
                  className="divide-y divide-border-subtle"
                  variants={reduced ? undefined : staggerContainer}
                  initial={reduced ? undefined : 'hidden'}
                  whileInView={reduced ? undefined : 'visible'}
                  viewport={sectionViewport}
                >
                  {education.map((edu) => (
                    <motion.li
                      key={edu.institution}
                      className="px-5 py-5"
                      variants={reduced ? undefined : staggerItem}
                    >
                      <p className="font-medium text-white">{edu.degree}</p>
                      <p className="mt-1 text-sm text-text-muted">
                        {edu.institution} · {edu.location}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-text-dim">{edu.endDate}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="overflow-hidden rounded-lg border border-border bg-bg-panel/90">
                <div className="flex items-center gap-2 border-b border-border-subtle bg-bg-elevated px-4 py-2.5 font-mono text-xs text-text-muted">
                  <Award size={14} className="text-orange" aria-hidden="true" />
                  certifications/
                </div>
                <ul className="divide-y divide-border-subtle">
                  {certifications.map((cert) => (
                    <li key={cert.name} className="group px-5 py-4">
                      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <CertificationBadge cert={cert} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white">{cert.name}</p>
                          {cert.issuer && (
                            <p className="mt-0.5 font-mono text-[11px] text-text-dim">
                              {cert.issuer}
                            </p>
                          )}
                          {cert.date && (
                            <p className="mt-1 font-mono text-[11px] text-text-muted">
                              {cert.date}
                            </p>
                          )}
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex min-h-11 items-center gap-1 font-mono text-[11px] text-orange hover:underline"
                            >
                              View credential <ExternalLink size={11} />
                            </a>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
