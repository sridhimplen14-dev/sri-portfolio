import type { SVGProps } from 'react';
import { brandMarks } from '../../data/brandMarks';

function AzureMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.05 4.24 6.72 18.04h5.1l1.26-2.88h6.3L13.05 4.24Zm1.5 3.24 3.54 7.68h-2.76l-2.16-4.68 1.38-3Zm-7.2 9.12 4.32-9.36 1.62 3.48-2.94 5.88H7.35Z" />
    </svg>
  );
}

function OpenAiMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.866-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.504 4.504zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.365-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.409-.672zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.178 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

function PineconeMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2c-.4 2.8-2.2 5-4.8 6.2 2.2.5 3.9 2.1 4.8 4.1.9-2 2.6-3.6 4.8-4.1C14.2 7 12.4 4.8 12 2zm0 9.2c-1.7 2.4-1.7 5.5 0 8.1 1.7-2.6 1.7-5.7 0-8.1zm-5.3 1.1C4.2 13.4 2.5 15.8 2 18.8c2.9-.4 5.3-1.9 6.7-4.3-.9-.3-1.7-.8-2.4-1.5.1-.9.4-1.8.8-2.7zm10.6 0c.4.9.7 1.8.8 2.7-.7.7-1.5 1.2-2.4 1.5 1.4 2.4 3.8 3.9 6.7 4.3-.5-3-2.2-5.4-4.7-6.5zM8.6 20.2c-1 .9-2.3 1.5-3.7 1.7 1.7 1.1 3.8 1.3 5.7.5-.8-.5-1.5-1.2-2-2.2zm6.8 0c-.5 1-1.2 1.7-2 2.2 1.9.8 4 .6 5.7-.5-1.4-.2-2.7-.8-3.7-1.7z" />
    </svg>
  );
}

const CUSTOM: Record<string, { Icon: typeof AzureMark; color: string; wide?: boolean }> = {
  Azure: { Icon: AzureMark, color: '#0078D4', wide: true },
  'Azure OpenAI': { Icon: OpenAiMark, color: '#10A37F' },
  Pinecone: { Icon: PineconeMark, color: '#1B1B1B' },
};

export const skillBrandIcons: Record<string, { color: string; wide?: boolean }> = {
  ...Object.fromEntries(
    Object.entries(brandMarks).map(([name, icon]) => [
      name,
      { color: `#${icon.hex}`, wide: name === 'Go' },
    ]),
  ),
  Azure: { color: '#0078D4', wide: true },
  'Azure OpenAI': { color: '#10A37F' },
  Pinecone: { color: '#1B1B1B' },
};

interface SkillBrandIconProps {
  name: string;
  className?: string;
}

export function SkillBrandIcon({ name, className = '' }: SkillBrandIconProps) {
  const custom = CUSTOM[name];
  const simple = brandMarks[name];

  if (custom) {
    const { Icon, color } = custom;
    return <Icon className={className} style={{ color }} aria-hidden="true" />;
  }

  if (!simple) {
    return (
      <span
        className={`inline-flex items-center justify-center font-mono text-[10px] font-bold text-orange ${className}`}
        aria-hidden="true"
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill={`#${simple.hex}`} d={simple.path} />
    </svg>
  );
}
