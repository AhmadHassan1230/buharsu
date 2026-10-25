import type { ReactNode } from 'react';

// Three rising strokes: the steam on the storefront sign, reduced to a mark.
export function SteamMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M7 21c-1.6-2.4 1.6-4.2 0-6.6S8.6 10.2 7 7.8" />
        <path d="M12 21c-1.8-2.8 1.8-4.8 0-7.6s1.8-4.8 0-7.6S13.8 1 12 1" />
        <path d="M17 21c-1.6-2.4 1.6-4.2 0-6.6s1.6-4.2 0-6.6" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark ${className ?? ''}`}>
      <SteamMark className="wordmark__mark" />
      <span className="wordmark__text">BUHARSU</span>
    </span>
  );
}

export function Arrow({ className, dir = 'right' }: { className?: string; dir?: 'right' | 'down' | 'up-right' }) {
  const d = dir === 'down' ? 'M12 4v16m0 0-6-6m6 6 6-6' : dir === 'up-right' ? 'M7 17 17 7m0 0H8m9 0v9' : 'M4 12h16m0 0-6-6m6 6-6 6';
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.03.8.81-2.95-.2-.31a8.2 8.2 0 1 1 6.92 3.79Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06 4.82 4.82 0 0 0 1 2.56 11 11 0 0 0 4.22 3.73c1.57.68 2.19.74 2.98.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z"
      />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        d="M5 3.5h3.2l1.6 4.2-2.1 1.3a11.6 11.6 0 0 0 7.3 7.3l1.3-2.1 4.2 1.6V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5Z"
      />
    </svg>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  tone?: 'ink' | 'light' | 'night';
  icon?: 'wa' | 'phone' | 'arrow' | 'none';
  external?: boolean;
  className?: string;
  label?: string;
};

/** Primary action. The fill floods in from the pointer side (motion/fill.ts); the arrow travels. */
export function Btn({ href, children, tone = 'ink', icon = 'arrow', external, className, label }: BtnProps) {
  const ext = external ?? href.startsWith('http');
  return (
    <a
      className={`btn btn--${tone} ${className ?? ''}`}
      href={href}
      data-fill
      aria-label={label}
      {...(ext ? { target: '_blank', rel: 'noopener' } : {})}
    >
      <span className="btn__fill" aria-hidden="true" />
      {icon === 'wa' && <WaIcon className="btn__icon" />}
      {icon === 'phone' && <PhoneIcon className="btn__icon" />}
      <span className="btn__label">{children}</span>
      {icon !== 'none' && <Arrow className="btn__arrow" />}
    </a>
  );
}

/** Secondary text action with a lane underline. */
export function TextLink({ href, children, className, external }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  const ext = external ?? href.startsWith('http');
  return (
    <a className={`tlink ${className ?? ''}`} href={href} {...(ext ? { target: '_blank', rel: 'noopener' } : {})}>
      <span className="tlink__label">{children}</span>
      <Arrow className="tlink__arrow" />
    </a>
  );
}
