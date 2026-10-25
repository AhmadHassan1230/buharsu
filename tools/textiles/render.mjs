// Renders the procedural textile placeholders into public/images/textiles/*.jpg.
// These are honest generative textures (not photos of BUHARSU work). Replace them with real
// photography before launch; see MEDIA.md.
//   node tools/textiles/render.mjs            all
//   node tools/textiles/render.mjs koltuk     only names that include "koltuk"
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../../public/images/textiles');
fs.mkdirSync(out, { recursive: true });

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
// mode: 0 linen, 1 carpet, 2 quilt, 3 sheer, 4 knit, 5 boucle, 6 overlock, 7 velvet
const jobs = [
  { name: 'hero-boucle', exp: 1.7, w: 2400, h: 1500, mode: 5, tint: rgb('#3a3f45'), tint2: rgb('#2a2f35'), scale: 1.5, light: [-0.7, 0.6], tilt: .55, dof: 9, focus: .7, band: .25, light: [-0.75, 0.8], tint: rgb('#4a5058'), tint2: rgb('#353b42') },
  { name: 'hero-boucle-portrait', exp: 1.7, w: 1200, h: 2100, mode: 5, tint: rgb('#3a3f45'), tint2: rgb('#2a2f35'), scale: 1.3, light: [-0.7, 0.6], tilt: .5, dof: 8, focus: .72, band: .25, light: [-0.75, 0.8], tint: rgb('#4a5058'), tint2: rgb('#353b42') },
  { name: 'koltuk', w: 1600, h: 2000, mode: 0, tint: rgb('#d6cbb9'), scale: 1.25, light: [-0.6, 0.6], tilt: .45, dof: 7, focus: .6 },
  { name: 'hali', w: 1600, h: 2000, mode: 1, tint: rgb('#b9a48a'), scale: 1.6, light: [-0.5, 0.7], tilt: .5, dof: 6, focus: .62 },
  { name: 'yatak', w: 1200, h: 1200, mode: 2, tint: rgb('#eef0f1'), tint2: rgb('#d9dde2'), scale: 1, light: [-0.6, 0.6], tilt: .35, dof: 6, focus: .6 },
  { name: 'sandalye', w: 1200, h: 1200, mode: 7, tint: rgb('#5f6b63'), tint2: rgb('#7b867c'), scale: 1, light: [-0.5, 0.6], tilt: .3, dof: 6, focus: .6 },
  { name: 'perde', w: 1200, h: 1500, mode: 3, tint: rgb('#f2efe9'), tint2: rgb('#c9c4bb'), scale: 1, light: [-0.4, 0.8] },
  { name: 'battaniye', w: 1200, h: 1200, mode: 4, tint: rgb('#c9bfb1'), scale: 1, light: [-0.6, 0.6], tilt: .4, dof: 6, focus: .62 },
  { name: 'overlok', w: 1200, h: 1200, mode: 6, tint: rgb('#b9a48a'), tint2: rgb('#2b3542'), scale: 1, light: [-0.5, 0.7], tilt: .35, dof: 5, focus: .6 },
  { name: 'buharli', w: 1600, h: 1200, mode: 0, tint: rgb('#8d9298'), scale: 1.6, light: [-0.7, 0.5], tilt: .45, dof: 7, focus: .6 },
  { name: 'statement-linen', w: 1400, h: 1750, mode: 0, tint: rgb('#d9d6cf'), scale: 2.4, light: [-0.8, 0.4], tilt: .5, dof: 8, focus: .55 },
  { name: 'craft-dark', exp: 1.0, w: 2400, h: 1400, mode: 0, tint: rgb('#4a5560'), scale: 2.8, light: [-0.8, 0.35], tilt: .55, dof: 10, focus: .65 },
  { name: 'cta-dark', exp: .8, w: 2400, h: 1400, mode: 1, tint: rgb('#3b3f44'), scale: 1.8, light: [-0.6, 0.6], tilt: .6, dof: 10, focus: .7 },
  // Before/after demo pair (clearly labelled as a demonstration on the site)
  { name: 'demo-after', w: 2000, h: 1250, mode: 0, tint: rgb('#d8cfc1'), scale: 1.7, light: [-0.6, 0.6], tilt: .25, dof: 4, focus: .6, band: .4 },
  { name: 'demo-before', w: 2000, h: 1250, mode: 0, tint: rgb('#d8cfc1'), scale: 1.7, light: [-0.6, 0.6], dirt: 1, tilt: .25, dof: 4, focus: .6, band: .4 },
  // Gallery placeholders
  { name: 'g-1', w: 1200, h: 1500, mode: 1, tint: rgb('#9a8670'), scale: 1, seed: 3, light: [-0.4, 0.7], tilt: .45, dof: 6 },
  { name: 'g-2', w: 1200, h: 900, mode: 7, tint: rgb('#3f4a57'), tint2: rgb('#5a6876'), scale: 0.8, seed: 5, tilt: .3, dof: 5 },
  { name: 'g-3', w: 1200, h: 1200, mode: 4, tint: rgb('#e2ddd5'), scale: 0.8, seed: 2, tilt: .4, dof: 6 },
  { name: 'g-4', w: 1200, h: 1500, mode: 0, tint: rgb('#a9b2ba'), scale: 1.4, seed: 7, tilt: .45, dof: 6 },
  { name: 'g-5', w: 1200, h: 900, mode: 2, tint: rgb('#f1f2f3'), tint2: rgb('#d5dae0'), scale: 0.8, seed: 4, tilt: .35, dof: 5 },
  { name: 'g-6', w: 1200, h: 1200, mode: 5, tint: rgb('#cfc8bd'), tint2: rgb('#bdb4a6'), scale: 1, seed: 6, tilt: .4, dof: 6 },
];

const only = process.argv[2];
const browser = await chromium.launch({ args: ['--use-gl=angle', '--enable-webgl', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
await page.goto('file://' + path.join(here, 'textiles.html'));
for (const j of jobs) {
  if (only && !j.name.includes(only)) continue;
  const data = await page.evaluate((o) => window.render(o), j);
  const png = path.join(out, `${j.name}.png`);
  fs.writeFileSync(png, Buffer.from(data.split(',')[1], 'base64'));
  console.log('rendered', j.name);
}
await browser.close();
