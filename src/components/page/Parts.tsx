import type { ReactNode } from 'react';
import Image from 'next/image';
import type { Faq, Media } from '@/data/site';
import { breadcrumbLd, faqLd, ldScript } from '@/lib/schema';

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: 'Anasayfa', href: '/' }, ...items];
  return (
    <>
      <nav className="crumbs" aria-label="Sayfa konumu">
        <ol>
          {all.map((c, i) => (
            <li key={c.href}>
              {i < all.length - 1 ? <a href={c.href}>{c.name}</a> : <span aria-current="page">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(breadcrumbLd(all))} />
    </>
  );
}

/** Light page hero for every inner page: title as the image, an optional media panel. */
export function PageHero({ crumbs, title, lead, media, children, aside }: {
  crumbs: Crumb[];
  title: ReactNode;
  lead?: ReactNode;
  media?: Media;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  // The intro runs in CSS (globals.css, .motion .phero__*), so the LCP text paints without JS.
  return (
    <section className={`phero ${media ? 'phero--media' : ''} ${aside ? 'phero--aside' : ''}`}>
      <Breadcrumbs items={crumbs} />
      <div className="phero__copy">
        <h1 className="phero__title">{title}</h1>
        {lead && <p className="phero__lead">{lead}</p>}
        {children && <div className="phero__actions">{children}</div>}
      </div>
      {media && (
        <figure className="phero__media">
          <Image src={media.src} alt={media.alt} width={media.w} height={media.h} sizes="(max-width: 767px) 100vw, 44vw" quality={80} priority />
        </figure>
      )}
      {aside && !media && <div className="phero__aside">{aside}</div>}
    </section>
  );
}

export function Faqs({ items, title = 'Sık sorulan sorular' }: { items: Faq[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section className="faqs" aria-labelledby="faq-title">
      <h2 id="faq-title" className="faqs__title" data-split="lines">{title}</h2>
      <div className="faqs__list">
        {items.map((f) => (
          <details key={f.q} className="faq">
            <summary>
              <span>{f.q}</span>
              <span className="faq__icon" aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(faqLd(items))} />
    </section>
  );
}

/** A titled band with content on the right: the shared inner-page section. */
export function Band({ title, children, tone, id, aside }: { title: ReactNode; children: ReactNode; tone?: 'stone' | 'dark'; id?: string; aside?: ReactNode }) {
  return (
    <section className={`band ${tone ? `band--${tone}` : ''}`} id={id} data-tone={tone === 'dark' ? 'dark' : undefined}>
      <div className="band__head">
        <h2 className="band__title" data-split="lines">{title}</h2>
        {aside}
      </div>
      <div className="band__body">{children}</div>
    </section>
  );
}
