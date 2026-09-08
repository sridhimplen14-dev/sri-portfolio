import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import { usePrefersReducedMotion } from '../../hooks/useMedia';
import { easeOutExpo } from '../../lib/motion';
import { FadeIn, SectionHeading, WindowChrome } from '../ui/SectionHeading';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.subject.trim()) errors.subject = 'Subject is required.';
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}

export function Contact() {
  const { personal, contactFormEndpoint } = portfolio;
  const reduced = usePrefersReducedMotion();
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      setStatusMessage('Please fix the highlighted fields.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      if (contactFormEndpoint) {
        const res = await fetch(contactFormEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error('Request failed');
        setStatus('success');
        setStatusMessage('Message sent. I will get back to you soon.');
        setValues({ name: '', email: '', subject: '', message: '' });
        return;
      }

      const body = encodeURIComponent(
        `${values.message}\n\n— ${values.name} (${values.email})`,
      );
      const subject = encodeURIComponent(values.subject);
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      setStatusMessage(
        'Opening your email client. Update contactFormEndpoint in portfolio.ts to enable direct form submission.',
      );
    } catch {
      setStatus('error');
      setStatusMessage('Something went wrong. Please email me directly instead.');
    }
  };

  const jsonLines = [
    '{',
    personal.availability
      ? `  "status": "${personal.availability}",`
      : '  // "status": set availability in portfolio.ts',
    `  "name": "${personal.displayName}",`,
    `  "email": "${personal.email}",`,
    `  "location": "${personal.location}",`,
    '  "socials": {',
    `    "github": "${personal.socials.github || ''}",`,
    `    "linkedin": "${personal.socials.linkedin || ''}"`,
    '  }',
    '}',
  ];

  return (
    <section
      id="contact"
      className="portfolio-section relative scroll-mt-8 overflow-x-clip pb-[clamp(5rem,12vw,8rem)]"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div id="contact-heading">
            <SectionHeading icon={<Mail size={22} />} command="$ ./contact.exe" />
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <WindowChrome title="contact_info.json" rightLabel="</>">
              <div className="overflow-x-auto bg-bg p-4 font-mono text-[12px] leading-6 sm:text-[13px]">
                <ol className="min-w-[280px]">
                  {jsonLines.map((line, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="w-5 shrink-0 select-none text-right text-text-dim">
                        {i + 1}
                      </span>
                      <span
                        className={
                          line.trim().startsWith('//')
                            ? 'text-text-dim'
                            : line.includes(':')
                              ? ''
                              : 'text-text'
                        }
                      >
                        {line.includes(':') && !line.trim().startsWith('//') ? (
                          <>
                            <span className="text-orange">
                              {line.slice(0, line.indexOf(':') + 1)}
                            </span>
                            <span className="text-red/90">
                              {line.slice(line.indexOf(':') + 1)}
                            </span>
                          </>
                        ) : (
                          line
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <p className="text-text-dim">
                    // Waiting for connection
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-orange align-middle" />
                  </p>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded border border-border px-3 py-2 font-mono text-[11px] text-text-muted transition hover:border-orange hover:text-orange"
                  >
                    {copied ? <Check size={12} className="text-green" /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy email'}
                  </button>
                </div>
              </div>
            </WindowChrome>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="panel overflow-hidden rounded-lg">
              <div className="flex items-center border-b border-border-subtle bg-bg-elevated">
                <div className="flex items-center gap-2 border-b-2 border-orange px-4 py-2.5 font-mono text-xs text-text">
                  <span className="rounded bg-[#3178c6] px-1 text-[9px] font-bold text-white">
                    TS
                  </span>
                  sendMessage.ts
                </div>
              </div>

              <form onSubmit={onSubmit} className="space-y-4 bg-bg p-5" noValidate>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3">
                  <div>
                    <p className="font-mono text-sm text-white">mail.compose</p>
                    <p className="font-mono text-[11px] text-text-dim">to: {personal.email}</p>
                  </div>
                  <p className="font-mono text-[11px] text-text-dim">response: within 24h</p>
                </div>

                {(
                  [
                    ['name', 'NAME', 'Your Name', 'text'],
                    ['email', 'EMAIL', 'your@email.com', 'email'],
                    ['subject', 'SUBJECT', 'Project inquiry / Collaboration', 'text'],
                  ] as const
                ).map(([key, label, placeholder, type]) => (
                  <div key={key} className="field-shell">
                    <label
                      htmlFor={`contact-${key}`}
                      className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-text-dim transition-colors"
                    >
                      {label}
                    </label>
                    <input
                      id={`contact-${key}`}
                      type={type}
                      name={key}
                      autoComplete={key === 'name' ? 'name' : key}
                      placeholder={placeholder}
                      value={values[key]}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [key]: e.target.value }))
                      }
                      aria-invalid={Boolean(errors[key])}
                      aria-describedby={errors[key] ? `${key}-error` : undefined}
                      className={`w-full rounded border bg-bg-elevated px-3 py-2.5 font-sans text-sm text-text placeholder:text-text-dim focus:outline-none ${
                        errors[key] ? 'border-red' : 'border-border'
                      }`}
                    />
                    <AnimatePresence>
                      {errors[key] && (
                        <motion.p
                          id={`${key}-error`}
                          initial={reduced ? false : { opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-1 font-mono text-[11px] text-red"
                          role="alert"
                        >
                          {errors[key]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="field-shell">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-text-dim transition-colors"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell me about the role, project, or collaboration..."
                    value={values.message}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, message: e.target.value }))
                    }
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full resize-y rounded border bg-bg-elevated px-3 py-2.5 font-sans text-sm text-text placeholder:text-text-dim focus:outline-none ${
                      errors.message ? 'border-red' : 'border-border'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        id="message-error"
                        initial={reduced ? false : { opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-1 font-mono text-[11px] text-red"
                        role="alert"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <p className="font-mono text-[11px] text-text-dim">
                  // Protected by spam filters and rate limits
                </p>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center gap-2 rounded bg-orange px-4 py-3 font-mono text-sm font-semibold text-bg transition hover:bg-orange-dim disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send size={14} aria-hidden="true" className={status === 'submitting' ? 'animate-pulse' : ''} />
                  {status === 'submitting' ? 'SENDING…' : 'SEND MESSAGE'}
                </button>

                <div aria-live="polite" className="min-h-[1.25rem]">
                  <AnimatePresence mode="wait">
                    {statusMessage && (
                      <motion.p
                        key={statusMessage}
                        initial={reduced ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: easeOutExpo }}
                        className={`font-mono text-xs ${
                          status === 'success' ? 'text-green' : 'text-red'
                        }`}
                      >
                        {statusMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
