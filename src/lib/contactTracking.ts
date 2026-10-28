export const GOOGLE_ADS_ID = 'AW-18536877710';

export const contactConversions = {
  whatsapp: `${GOOGLE_ADS_ID}/LfbsCPL3qK0dEI6diYdF`,
  phone: `${GOOGLE_ADS_ID}/9LDgCPX3qK0dEI6diYdF`,
} as const;

export type ContactChannel = keyof typeof contactConversions;

export function contactChannelForUrl(href: string): ContactChannel | null {
  try {
    const url = new URL(href);
    if (url.protocol === 'tel:') return 'phone';
    if (url.protocol !== 'https:') return null;
    return ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)
      ? 'whatsapp'
      : null;
  } catch {
    return null;
  }
}

// Queue events before the asynchronous Google tag finishes loading.
export const googleAdsBootstrap = `window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GOOGLE_ADS_ID}');`;
