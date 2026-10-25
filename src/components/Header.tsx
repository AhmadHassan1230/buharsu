'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { nav, site, wa } from '@/data/site';
import { startScroll, stopScroll } from '@/engine';
import { Arrow, PhoneIcon, WaIcon, Wordmark } from './ui';

const isCurrent = (path: string, href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`));

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Close on navigation.
  useEffect(() => { setOpen(false); }, [path]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('menu-open', open);
    if (!open) { startScroll(); return; }
    stopScroll();
    const menu = menuRef.current!;
    const focusables = () => [...menu.querySelectorAll<HTMLElement>('a, button')];
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); return; }
      if (e.key !== 'Tab') return;
      const f = [btnRef.current!, ...focusables()];
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="header" data-open={open || undefined}>
        <a className="header__logo" href="/" aria-label="BUHARSU anasayfa">
          <Wordmark />
        </a>
        <nav className="header__nav" aria-label="Ana menü">
          <ul>
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <a className="draw" href={n.href} aria-current={isCurrent(path, n.href) ? 'page' : undefined}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__actions">
          <a className="header__wa" href={wa()} target="_blank" rel="noopener" data-fill>
            <span className="btn__fill" aria-hidden="true" />
            <WaIcon className="btn__icon" />
            <span className="header__wa-label">WhatsApp</span>
          </a>
          <button
            ref={btnRef}
            className="header__menu"
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="header__menu-label">{open ? 'Kapat' : 'Menü'}</span>
            <span className="header__menu-icon" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </header>

      <div id="site-menu" ref={menuRef} className="menu" data-open={open || undefined} aria-hidden={!open} inert={!open}>
        <div className="menu__lanes" aria-hidden="true"><i /><i /><i /></div>
        <nav className="menu__inner" aria-label="Mobil menü">
          <ul className="menu__list">
            {nav.map((n, i) => (
              <li key={n.href} style={{ '--i': i } as React.CSSProperties}>
                <a href={n.href} aria-current={isCurrent(path, n.href) ? 'page' : undefined} onClick={() => setOpen(false)}>
                  <span>{n.label}</span>
                  <Arrow className="menu__arrow" />
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__contact">
            <a className="menu__wa" href={wa()} target="_blank" rel="noopener">
              <WaIcon /> WhatsApp’tan yazın
            </a>
            <a className="menu__tel" href={site.phones.primary.tel}>
              <PhoneIcon /> {site.phones.primary.display}
            </a>
            <a className="menu__tel menu__tel--alt" href={site.phones.secondary.tel}>
              Alternatif hat: {site.phones.secondary.display}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
