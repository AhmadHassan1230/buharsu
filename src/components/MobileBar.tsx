import { site, wa } from '@/data/site';
import { PhoneIcon, WaIcon } from './ui';

// Contact actions that never leave the screen (client request):
// - phones: a fixed bottom bar, "WhatsApp" + "Tıkla Ara", visible from the first screen to the footer
// - floating round buttons: Instagram everywhere; WhatsApp + Ara on desktop only (phones have them in the bar)
export function MobileBar() {
  return (
    <>
      <div className="mbar" role="region" aria-label="Hızlı iletişim">
        <a className="mbar__wa" href={wa()} target="_blank" rel="noopener">
          <WaIcon /> <span>WhatsApp</span>
        </a>
        <a className="mbar__tel" href={site.phones.primary.tel} aria-label={`Tıkla ara: ${site.phones.primary.display}`}>
          <PhoneIcon /> <span>Tıkla Ara</span>
        </a>
      </div>
      <div className="fab" role="region" aria-label="WhatsApp, Instagram ve telefon">
        <a className="fab__btn fab__btn--wa" href={wa()} target="_blank" rel="noopener" aria-label="WhatsApp’tan yazın">
          <WaIcon />
        </a>
        <a className="fab__btn fab__btn--ig" href={site.instagram.url} target="_blank" rel="noopener" aria-label={`Instagram: ${site.instagram.handle}`}>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.9" />
            <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.9" />
            <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
          </svg>
        </a>
        <a className="fab__btn fab__btn--tel" href={site.phones.primary.tel} aria-label={`Tıkla ara: ${site.phones.primary.display}`}>
          <PhoneIcon />
        </a>
      </div>
    </>
  );
}
