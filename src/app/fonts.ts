import { Mona_Sans } from 'next/font/google';

// One family, two personalities: expanded caps for the wordmark and labels (wdth 125),
// normal width for headlines and text. latin-ext covers ş, ğ, ı, İ, ç, ö, ü.
export const mona = Mona_Sans({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-mona',
  display: 'swap',
});
