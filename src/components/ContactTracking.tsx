'use client';

import { useEffect } from 'react';
import { contactChannelForUrl, contactConversions, type ContactChannel } from '@/lib/contactTracking';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function ContactTracking() {
  useEffect(() => {
    const record = (channel: ContactChannel) => {
      // Send only the conversion ID, never the phone number or composed message.
      window.gtag?.('event', 'conversion', { send_to: contactConversions[channel] });
    };

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || !(event.target instanceof Element)) return;
      const link = event.target.closest('a[href]');
      const href = link?.getAttribute('href');
      const channel = href ? contactChannelForUrl(href) : null;
      if (channel) record(channel);
    };

    const onSubmit = (event: SubmitEvent) => {
      if (event.target instanceof HTMLFormElement && event.target.dataset.contactChannel === 'whatsapp') {
        record('whatsapp');
      }
    };

    document.addEventListener('click', onClick, true);
    document.addEventListener('submit', onSubmit, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('submit', onSubmit, true);
    };
  }, []);

  return null;
}
