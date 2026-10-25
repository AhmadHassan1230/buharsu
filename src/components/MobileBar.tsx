import { site, wa } from '@/data/site';
import { PhoneIcon, WaIcon } from './ui';

// Phone-only sticky actions. Hidden while the page's own CTAs are on screen (the hero,
// the final CTA) so it never doubles them; motion/bar.ts toggles html.bar-on.
export function MobileBar() {
  return (
    <div className="mbar" role="region" aria-label="Hızlı iletişim">
      <a className="mbar__wa" href={wa()} target="_blank" rel="noopener">
        <WaIcon /> <span>WhatsApp’tan yazın</span>
      </a>
      <a className="mbar__tel" href={site.phones.primary.tel} aria-label={`Ara: ${site.phones.primary.display}`}>
        <PhoneIcon /> <span>Ara</span>
      </a>
    </div>
  );
}
