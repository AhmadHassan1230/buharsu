'use client';

import { useEffect, useState } from 'react';
import {
  CONTACT_CONSENT_KEY,
  type ConsentChoice,
  type ContactIntent,
  type GoogleTag,
  contactIntentFromHref,
  sendContactConversion,
  updateGoogleAdsConsent,
  validConversionLabel,
  validGoogleAdsId,
} from '@/lib/contactTracking';

const adsId = validGoogleAdsId(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID);
const labels = {
  whatsapp: validConversionLabel(process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL),
  phone: validConversionLabel(process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL),
} satisfies Record<ContactIntent, string | null>;

const configured = Boolean(adsId && (labels.whatsapp || labels.phone));

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GoogleTag;
  }
}

function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONTACT_CONSENT_KEY);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return null;
  }
}

function writeConsent(value: ConsentChoice) {
  try {
    window.localStorage.setItem(CONTACT_CONSENT_KEY, value);
  } catch {
    // Storage can be unavailable in private or locked-down browser contexts.
  }
}

function enableGoogleAds() {
  if (!adsId) return;

  const createdQueue = !window.gtag;
  if (createdQueue) {
    window.dataLayer = window.dataLayer ?? [];
    // Google documents the command queue as `dataLayer.push(arguments)`.
    // eslint-disable-next-line prefer-rest-params
    window.gtag = function googleTag() { window.dataLayer?.push(arguments); };
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.gtag('js', new Date());
  }

  const gtag = window.gtag;
  if (!gtag) return;
  updateGoogleAdsConsent(gtag, 'accepted');

  if (document.querySelector('script[data-buharsu-google-ads]')) return;

  gtag('config', adsId, {
    send_page_view: false,
    allow_ad_personalization_signals: false,
    page_location: `${window.location.origin}${window.location.pathname}`,
  });

  if (!document.querySelector('script[data-buharsu-google-ads]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(adsId)}`;
    script.dataset.buharsuGoogleAds = 'true';
    document.head.append(script);
  }
}

function withdrawGoogleAdsConsent() {
  updateGoogleAdsConsent(window.gtag, 'rejected');
}

export function trackContactIntent(intent: ContactIntent) {
  if (!configured) return;
  sendContactConversion({
    intent,
    consent: readConsent(),
    adsId,
    labels,
    gtag: window.gtag,
    pageLocation: window.location.href,
  });
}

export function ContactTracking() {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<ConsentChoice | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!configured) return;
    const stored = readConsent();
    if (stored === 'accepted') enableGoogleAds();
    queueMicrotask(() => {
      setConsent(stored);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!configured) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      const intent = anchor ? contactIntentFromHref(anchor.getAttribute('href')) : null;
      if (intent) trackContactIntent(intent);
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  if (!configured || !ready) return null;

  const choose = (choice: ConsentChoice) => {
    writeConsent(choice);
    setConsent(choice);
    setEditing(false);
    if (choice === 'accepted') enableGoogleAds();
    else withdrawGoogleAdsConsent();
  };

  const panelOpen = consent === null || editing;

  return (
    <>
      {panelOpen && (
        <section className="consent" id="tracking-preferences" role="region" aria-label="Ölçüm tercihleri">
          <div className="consent__copy">
            <h2>Ölçüm tercihiniz</h2>
            <p>
              İzninizle, WhatsApp veya telefon düğmesine tıkladığınızı Google Ads ile ölçeriz. Yazdığınız mesajı,
              telefon numarasını veya adres bilgisini göndermeyiz. <a href="/kvkk">Ayrıntıları okuyun</a>.
            </p>
          </div>
          <div className="consent__actions">
            <button type="button" className="consent__reject" onClick={() => choose('rejected')}>Reddet</button>
            <button type="button" className="consent__accept" onClick={() => choose('accepted')}>Kabul et</button>
          </div>
        </section>
      )}
      {!panelOpen && (
        <button
          type="button"
          className="consent-toggle"
          aria-expanded="false"
          aria-controls="tracking-preferences"
          onClick={() => setEditing(true)}
        >
          Çerez tercihleri
        </button>
      )}
    </>
  );
}

