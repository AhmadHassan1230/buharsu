import { areas, nav, services, site, wa } from '@/data/site';
import { Arrow } from './ui';

export function Footer() {
  const year = 2026;
  return (
    <footer className="footer" data-tone="dark">
      <div className="footer__top">
        <div className="footer__intro">
          <p className="footer__lead">
            Kumaşına uygun temizlik, Anadolu Yakası’nda.
          </p>
          <a className="footer__wa" href={wa()} target="_blank" rel="noopener">
            WhatsApp’tan teklif al <Arrow />
          </a>
        </div>

        <div className="footer__cols">
          <div>
            <h2 className="footer__h">Site</h2>
            <ul>
              {nav.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h2 className="footer__h">Hizmetler</h2>
            <ul>
              {services.map((s) => <li key={s.slug}><a href={`/hizmetler/${s.slug}`}>{s.name}</a></li>)}
            </ul>
          </div>
          <div>
            <h2 className="footer__h">Hizmet bölgeleri</h2>
            <ul>
              {areas.map((a) => (
                <li key={a.id}>
                  <a href={`/bolgeler/${a.page}`}>
                    {a.district}
                    <span className="footer__sub">{a.scope === 'full' ? 'Tüm mahalleler' : a.parts.join(', ')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer__h">İletişim</h2>
            <ul className="footer__contact">
              <li>
                <a className="footer__phone" href={site.phones.primary.tel}>{site.phones.primary.display}</a>
                <span className="footer__sub">Telefon ve WhatsApp</span>
              </li>
              <li>
                <a className="footer__phone footer__phone--alt" href={site.phones.secondary.tel}>{site.phones.secondary.display}</a>
                <span className="footer__sub">Alternatif hat</span>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener">Instagram<br />@buharsu_hali_<wbr />koltuk_04</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Decorative wordmark, drawn as SVG so it scales to the exact content width. */}
      <svg className="footer__mark" viewBox="0 0 664 78" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className="footer__steam" transform="translate(-4 -2) scale(3.3)">
          <path d="M7 21c-1.6-2.4 1.6-4.2 0-6.6S8.6 10.2 7 7.8" />
          <path d="M12 21c-1.8-2.8 1.8-4.8 0-7.6s1.8-4.8 0-7.6S13.8 1 12 1" />
          <path d="M17 21c-1.6-2.4 1.6-4.2 0-6.6s1.6-4.2 0-6.6" />
        </g>
        <text x="88" y="73" textLength="574" lengthAdjust="spacingAndGlyphs" className="footer__word">BUHARSU</text>
      </svg>

      <div className="footer__base">
        <p>© {year} {site.legalName}</p>
        <p className="footer__legal">
          <a href="/kvkk">KVKK ve gizlilik</a>
        </p>
      </div>
    </footer>
  );
}
