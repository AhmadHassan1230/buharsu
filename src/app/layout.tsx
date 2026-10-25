import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBar } from '@/components/MobileBar';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';
import { businessLd, ldScript, websiteLd } from '@/lib/schema';
import { mona } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Koltuk ve halı yıkama, İstanbul Anadolu Yakası`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: './' },
  openGraph: { type: 'website', siteName: site.name, locale: site.locale, images: ['/og.jpg'] },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
  applicationName: site.name,
  authors: [{ name: site.name }],
  category: 'Ev temizliği',
  // Paste the Search Console / Yandex codes into site.verification once the domain is live.
  verification: {
    ...(site.verification.google ? { google: site.verification.google } : {}),
    ...(site.verification.yandex ? { yandex: site.verification.yandex } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: '#0E1216',
  viewportFit: 'cover',
};

// Before first paint: hidden-until-revealed styles only apply when JS and motion are on.
const flags = `document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="tr" className={mona.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">İçeriğe geç</a>
        <div id="curtain" aria-hidden="true">
          <div className="curtain__lane" />
          <div className="curtain__lane" />
          <div className="curtain__lane" />
          <div className="curtain__mark">
            <span>BUHARSU</span>
          </div>
        </div>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <MobileBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(businessLd())} />
        <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(websiteLd())} />
        <Motion />
      </body>
    </html>
  );
}
