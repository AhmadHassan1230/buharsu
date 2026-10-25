# BUHARSU İstanbul: design plan

## Brief

- **Subject:** BUHARSU, a carpet, upholstery and home-textile cleaning business from Şanlıurfa,
  now opening in Istanbul's Asian side.
- **Audience:** households in Sancaktepe, Sultanbeyli, Çekmeköy, Kurtköy/Kavakpınar (Pendik) and
  Aydınlı/Orhanlı (Tuzla). They mostly arrive on a phone, from Google, Instagram or a WhatsApp link.
- **Job:** turn a visit into a WhatsApp message or a phone call, while reading as the premium
  choice in a market full of template sites.
- **Language:** Turkish only.
- **Constraints:** exact coverage everywhere; no invented reviews, stats, prices, addresses or
  hours; the hero is a Google Flow video the owner will generate; the services section comes
  straight after the hero; the phone layout is the primary design, not an afterthought.

## Three concepts

| | Idea | Anchor | Signature | O / F / Fe / P |
|---|---|---|---|---|
| A. Material | **Tek geçiş (one pass).** Everything arrives in straight, overlapping lanes, the way an extraction wand leaves clean stripes on fabric | the satisfying clean lane every upholstery cleaner's Instagram is built on | the light services page sweeps up over the dark hero film in three staggered lanes | 4 / 5 / 5 / 1 |
| B. Name | **Buhar + su.** The site condenses and clears like steam on glass | the name means steam + water | blurred type that clears on scroll | 3 / 4 / 3 / 3 |
| C. Trade object | **Kartela.** The site is an upholstery sample book; each service is a swatch | the fabric sample cards every upholsterer carries | swatches fan open on hover | 3 / 4 / 4 / 2 |

**Pick A.** It is the one idea that only a cleaning company could own, it produces layout,
motion and copy decisions, and it is cheap to build well (clip-path lanes, no GL). The steam
idea (B) is a blur effect that this owner's taste would read as "AI". From C we keep one detail:
the swatch thumbnails in the services index.

## Concept card

```
Idea:        Every reveal is a cleaning pass: content arrives in straight, overlapping lanes,
             like the clean stripes an extraction wand leaves on fabric.
Metaphor:    the extractor's pass across a sofa seat, lane by lane.
Signature:   hero → services handoff. The light ground is pulled up over the dark film in
             three staggered lanes (scroll-scrubbed clip-path). The same lane language runs the
             page transition (three ink lanes), image reveals, and the before/after slider,
             whose handle is a wand head.
Emotion:     cool, quiet, freshly aired. "Ferah".
Motion verb: pass. One steady stroke that accelerates in, travels evenly and settles softly;
             lanes overlap with a 60–90 ms stagger.
Screenshot:  the hero mid-pass: the film above, three pale lanes rising with the services
             heading riding the first lane.
```

## Art direction

**Palette** (from the storefront render: charcoal cladding, white letters, cool blue light):

| Role | Name | Hex | Use |
|---|---|---|---|
| ground | porselen | `#F1F2EF` | main light ground (cool, not cream) |
| ground-2 | taş | `#E5E7E4` | alternate light band, cards |
| ink | kömür | `#0E1216` | text, curtain, CTA fill |
| night | gece | `#151E27` | dark story sections |
| muted | kül | `#5A626B` | secondary text (5.6:1 on porselen) |
| line | — | `rgb(14 18 22 / .12)` | hairlines (sparingly) |
| accent | buhar | `#8EC3EE` | on dark only: steam mark, focus, active marks |
| accent-ink | derin buhar | `#235E93` | accent on light grounds (focus ring, current page) |

Blue is a signal, never a fill for whole sections; no glows, no gradients beyond the hero scrim.

**Type:** Mona Sans only (Google, variable `wdth` 75–125, `wght` 200–900, latin-ext for Turkish).
- Wordmark and small labels: expanded (`wdth` 125), 700, caps, +0.04em. This echoes the wide
  geometric letters on the storefront sign.
- Headlines: normal width, 520, tracking −0.035em to −0.045em, leading 0.98, sentence case.
  Medium weight on purpose (the owner rejected hairline display faces).
- Text: 400, 17 px, 1.55 leading, 60ch measure.
- UI labels: 13 px, 560, `wdth` 112, normal case. They only carry real information
  (district names, step names, captions).

**Grid:** 12 columns, fluid gutter. Hang lines on col 1, col 5 and col 9. Phones: 4 columns,
20 px margin.

**Rhythm:** tight (services list), normal (process, areas), airy (statement), full viewport
(hero, CTA).

**Shape:** one radius, `--radius: 6px`, on buttons, media frames and the composer. Full-bleed
sections are square.

**Motion:** ease family expo; a custom `pass` curve (`M0,0 C0.55,0 0.25,1 1,1`) for lanes.
Durations: hover 0.35 s, lane reveal 1.1 s, page transition 0.75 s each way. The hero film is
the idle motion (with a visible pause toggle). Lenis smooth scroll, off under reduced motion.

**Micro-interactions (one per role):**
- Primary CTA: the fill floods in from the pointer side (ink ↔ porselen) and the arrow travels.
- Nav: an underline draws in like a lane, and the current page keeps it.
- Service cards and images: the image scales inside its clipped frame and the title slides
  4 px. Index rows: the swatch opens like a lane.
- Inline links: underlined at rest, and the underline thickens.

## Composition (home)

```
01 HERO (film, 100svh, sticky stage)
   [logo]                         [nav ......] [WhatsApp]
   
   Yaşam alanlarınıza
   yeniden ferahlık.              
   sub line                                   coverage list (small)
   [WhatsApp'tan teklif al] Hizmetler →       [|| film]
02 SERVICES (light, rises in 3 lanes over the hero)
   heading (cols 1–7)                         lead (cols 9–12)
   [ Koltuk yıkama  4:5, cols 1–7 ]   [ Halı yıkama 4:5, cols 8–12, offset down ]
   index rows: swatch | name | one line | →   (Yatak, Sandalye & puf, Perde, Battaniye & yorgan, Overlok)
03 STATEMENT (airy): oversized two-line statement, macro image hung on col 9
04 TRANSFORMATION (night): heading + full-width before/after slider with wand handle
05 PROCESS (light): a horizontal lane that draws through 4 steps (phone: vertical lane)
06 CRAFT (night, full-bleed macro): heading + 6 care principles as a typographic list
07 WORK (light): gallery wall, varied proportions, Instagram link
08 AREAS (ground-2): accurate OSM map of the Anatolian side + district selector + contextual CTA
09 TRUST (light): honest trust points; real reviews render here only when supplied
10 CTA (ink poster, full viewport): headline + WhatsApp / Ara
11 FOOTER (ink): giant wordmark, links, both phones, Instagram, coverage summary, legal
```

Every layout family is used once. Phones get their own composition per section (see
`globals.css`, the `@media (max-width: 767px)` blocks).

## Genericness test

- A generic model would put a blue gradient hero and three icon cards here. Instead, film,
  type and lanes.
- A generic model would use counters ("5000+ mutlu müşteri"). None here: the numbers are
  unverified.
- Swapped the reflexive cream background for cool porcelain, and Inter/Manrope for Mona Sans
  with its width axis.
- No eyebrow above every heading. Small labels appear only where they carry information.

## Idle motion

The hero film loops (and has a pause toggle). Elsewhere the page is still at rest, by decision:
this is a home-service brand and the hovers, lanes and slider carry the life.
