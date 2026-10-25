import { areas, home } from '@/data/site';
import { Arrow } from '../ui';
import { HeroFilm } from './HeroFilm';

export function Hero() {
  const h = home.hero;
  return (
    <section className="hero" data-header-over aria-labelledby="hero-title" data-tone="dark">
      <HeroFilm />
      <div className="hero__content">
        {/* Intro runs in CSS (no JS needed), so the headline paints at first frame on slow phones.
            The slogan is the visual headline; the H1 is the keyword line underneath (SEO). */}
        <p className="hero__title">
          {h.title.map((line, i) => (
            <span key={line} className="hl"><span style={{ '--i': i } as React.CSSProperties}>{line}</span></span>
          ))}
        </p>
        <h1 id="hero-title" className="hero__sub">{h.sub}</h1>
        <div className="hero__actions">
          <a className="btn btn--light hero__cta" href="#hizmetler" data-fill>
            <span className="btn__fill" aria-hidden="true" />
            <span className="btn__label">{h.secondary}</span>
            <Arrow dir="down" className="btn__arrow hero__cta-arrow" />
          </a>
        </div>
      </div>
      <dl className="hero__areas">
        <dt>Hizmet bölgeleri</dt>
        {areas.map((a) => (
          <dd key={a.id}>
            <a href={`/bolgeler/${a.page}`}>
              {a.district}
              {a.scope === 'partial' && <span>{a.parts.join(', ')}</span>}
            </a>
          </dd>
        ))}
      </dl>
    </section>
  );
}
