export type ContactIntent = 'whatsapp' | 'phone';
export type ConsentChoice = 'accepted' | 'rejected';

export const CONTACT_CONSENT_KEY = 'buharsu_google_ads_consent';

const ADS_ID_PATTERN = /^AW-\d+$/;
const CONVERSION_LABEL_PATTERN = /^[A-Za-z0-9_-]+$/;

export function validGoogleAdsId(value: string | undefined): string | null {
  const candidate = value?.trim();
  return candidate && ADS_ID_PATTERN.test(candidate) ? candidate : null;
}

export function validConversionLabel(value: string | undefined): string | null {
  const candidate = value?.trim();
  return candidate && CONVERSION_LABEL_PATTERN.test(candidate) ? candidate : null;
}

export function contactIntentFromHref(href: string | null): ContactIntent | null {
  if (!href) return null;

  const candidate = href.trim();
  if (/^tel:/i.test(candidate)) return 'phone';

  try {
    const url = new URL(candidate, 'https://www.buharsuyikama.com');
    const host = url.hostname.toLowerCase();
    return host === 'wa.me' || host === 'api.whatsapp.com' || host === 'web.whatsapp.com'
      ? 'whatsapp'
      : null;
  } catch {
    return null;
  }
}

export type GoogleTag = (...args: unknown[]) => void;

const GOOGLE_ADS_CONSENT = {
  accepted: {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'denied',
  },
  rejected: {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  },
} as const;

export function updateGoogleAdsConsent(gtag: GoogleTag | undefined, choice: ConsentChoice): boolean {
  if (!gtag) return false;
  try {
    gtag('consent', 'update', GOOGLE_ADS_CONSENT[choice]);
    return true;
  } catch {
    return false;
  }
}

export function pageLocationWithoutQuery(href: string): string | null {
  try {
    const url = new URL(href);
    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
}

export function sendContactConversion({
  intent,
  consent,
  adsId,
  labels,
  gtag,
  pageLocation,
}: {
  intent: ContactIntent;
  consent: ConsentChoice | null;
  adsId: string | null;
  labels: Record<ContactIntent, string | null>;
  gtag: GoogleTag | undefined;
  pageLocation: string;
}): boolean {
  const label = labels[intent];
  if (consent !== 'accepted' || !adsId || !label || !gtag) return false;

  try {
    gtag('event', 'conversion', {
      send_to: `${adsId}/${label}`,
      page_location: pageLocationWithoutQuery(pageLocation),
    });
    return true;
  } catch {
    return false;
  }
}

