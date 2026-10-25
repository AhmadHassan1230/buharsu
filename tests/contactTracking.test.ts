import assert from 'node:assert/strict';
import test from 'node:test';
import {
  contactIntentFromHref,
  pageLocationWithoutQuery,
  sendContactConversion,
  updateGoogleAdsConsent,
  validConversionLabel,
  validGoogleAdsId,
} from '../src/lib/contactTracking.ts';

test('validates public Google Ads identifiers without accepting arbitrary script input', () => {
  assert.equal(validGoogleAdsId('AW-123456789'), 'AW-123456789');
  assert.equal(validGoogleAdsId('G-123456789'), null);
  assert.equal(validGoogleAdsId('AW-123?x=1'), null);
  assert.equal(validConversionLabel('AbC_123-xy'), 'AbC_123-xy');
  assert.equal(validConversionLabel('label/query'), null);
});

test('restores measurement consent after accept, withdraw, and reaccept', () => {
  const calls: unknown[][] = [];
  const gtag = (...args: unknown[]) => { calls.push(args); };

  assert.equal(updateGoogleAdsConsent(gtag, 'accepted'), true);
  assert.equal(updateGoogleAdsConsent(gtag, 'rejected'), true);
  assert.equal(updateGoogleAdsConsent(gtag, 'accepted'), true);

  assert.deepEqual(calls, [
    ['consent', 'update', {
      ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'denied',
    }],
    ['consent', 'update', {
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    }],
    ['consent', 'update', {
      ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'denied',
    }],
  ]);
});

test('gates runtime conversions on consent and sends one query-free, PII-free payload', () => {
  const calls: unknown[][] = [];
  const labels = { whatsapp: 'wa_label', phone: 'phone_label' };
  const gtag = (...args: unknown[]) => { calls.push(args); };

  assert.equal(sendContactConversion({
    intent: 'whatsapp', consent: 'rejected', adsId: 'AW-123', labels, gtag,
    pageLocation: 'https://www.buharsuyikama.com/iletisim?phone=secret',
  }), false);
  assert.equal(calls.length, 0);

  assert.equal(sendContactConversion({
    intent: 'whatsapp', consent: 'accepted', adsId: 'AW-123', labels, gtag,
    pageLocation: 'https://www.buharsuyikama.com/iletisim?phone=secret',
  }), true);
  assert.deepEqual(calls, [[
    'event',
    'conversion',
    { send_to: 'AW-123/wa_label', page_location: 'https://www.buharsuyikama.com/iletisim' },
  ]]);
  assert.equal(JSON.stringify(calls).includes('secret'), false);
  assert.equal(pageLocationWithoutQuery('https://example.com/path?a=1#private'), 'https://example.com/path');
});

test('swallows Google tag failures so contact navigation can continue', () => {
  const sent = sendContactConversion({
    intent: 'phone',
    consent: 'accepted',
    adsId: 'AW-123',
    labels: { whatsapp: 'wa_label', phone: 'phone_label' },
    gtag: () => { throw new Error('blocked'); },
    pageLocation: 'https://www.buharsuyikama.com/',
  });

  assert.equal(sent, false);
});

test('classifies contact links without exposing their personal or query content', () => {
  assert.equal(contactIntentFromHref('tel:+905051888063'), 'phone');
  assert.equal(contactIntentFromHref('https://wa.me/905051888063?text=private-message'), 'whatsapp');
  assert.equal(contactIntentFromHref('https://api.whatsapp.com/send?phone=1&text=secret'), 'whatsapp');
  assert.equal(contactIntentFromHref('https://example.com/?phone=905051888063'), null);
});
