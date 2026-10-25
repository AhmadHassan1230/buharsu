// Global motion for BUHARSU. The motion verb is "pass": everything arrives in straight,
// overlapping lanes, like the clean stripes an extraction wand leaves on fabric.
// Runs once on the client (before the first page); every page effect lives in onPage.
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion, setTransition } from '@/engine';

gsap.registerPlugin(CustomEase, ScrollTrigger);

const LANES = 3;
/** Clip-path with three vertical lanes whose top edges sit at the given percentages. */
const lanePoly = (t: number[]) => {
  const w = 100 / LANES;
  const pts: string[] = [];
  t.forEach((y, i) => { pts.push(`${(i * w).toFixed(3)}% ${y}%`, `${((i + 1) * w).toFixed(3)}% ${y}%`); });
  return `polygon(${pts.join(', ')}, 100% 100%, 0% 100%)`;
};

export function setupMotion() {
  CustomEase.create('pass', 'M0,0 C0.55,0 0.25,1 1,1');
  const reduced = prefersReducedMotion();

  // Page transition: three ink lanes pass down over the page, then continue down off the new one.
  setTransition({
    leave: (c) => {
      const lanes = c.querySelectorAll('.curtain__lane');
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(lanes, { yPercent: -101 }, { yPercent: 0, duration: 0.7, ease: 'pass', stagger: 0.07 })
        .fromTo(c.querySelector('.curtain__mark'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: ease.soft }, 0.45);
    },
    enter: (c) => {
      const lanes = c.querySelectorAll('.curtain__lane');
      return gsap.timeline()
        .to(c.querySelector('.curtain__mark'), { autoAlpha: 0, y: -12, duration: 0.25, ease: ease.soft })
        .to(lanes, { yPercent: 101, duration: 0.75, ease: 'pass', stagger: 0.07 }, 0.1)
        .set(c, { autoAlpha: 0 });
    },
  });

  frame();
  mobileBar();
  if (reduced) return;
  lanesEdge();
  lanesReveal();
  parallax();
  rail();
  buttonFill();
}

// ---------------------------------------------------------------------------------------------
// Header: transparent over the hero film, solid after it; steps aside on scroll down.
function frame() {
  const html = document.documentElement;
  let last = 0;
  onScroll(({ y }) => {
    html.classList.toggle('is-scrolled', y > 8);
    if (Math.abs(y - last) < 6) return;
    html.classList.toggle('frame-away', y > 240 && y > last && !html.classList.contains('menu-open'));
    last = y;
  });
  onPage(() => {
    html.classList.remove('frame-away', 'past-hero');
    const over = document.querySelector<HTMLElement>('[data-header-over]');
    if (!over) return;
    ScrollTrigger.create({
      trigger: over,
      start: 'bottom 64px',
      end: 'max',
      onToggle: (st) => html.classList.toggle('past-hero', st.isActive),
    });
    return () => html.classList.remove('past-hero');
  });
}

// Phone action bar: appears once the first screen is behind you, hides over the final CTA.
function mobileBar() {
  const html = document.documentElement;
  onPage(() => {
    html.classList.remove('bar-on', 'bar-hide');
    ScrollTrigger.create({
      start: () => innerHeight * 0.7,
      end: 'max',
      onToggle: (st) => html.classList.toggle('bar-on', st.isActive),
    });
    document.querySelectorAll('[data-hide-bar], .footer').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'bottom top',
        onToggle: (st) => html.classList.toggle('bar-hide', st.isActive),
      });
    });
    return () => html.classList.remove('bar-on', 'bar-hide');
  });
}

// Signature: the light services ground is pulled up over the hero film in three lanes.
function lanesEdge() {
  onPage(() => {
    const sec = document.querySelector<HTMLElement>('[data-lanes-edge]');
    if (!sec) return;
    const hero = document.querySelector<HTMLElement>('[data-header-over]');
    const depth = () => Math.min(innerHeight * 0.34, 300) / sec.offsetHeight * 100; // lane lag as % of section
    const st = { p: 0 };
    const apply = () => {
      const d = depth();
      const t = [0, 1, 2].map((i) => {
        const local = gsap.utils.clamp(0, 1, (st.p - i * 0.14) / (1 - 0.28));
        return (1 - gsap.parseEase('pass')(local)) * d * (0.55 + i * 0.45);
      });
      sec.style.clipPath = lanePoly(t);
    };
    apply();
    gsap.to(st, {
      p: 1,
      ease: 'none',
      onUpdate: apply,
      scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 12%', scrub: 0.5, invalidateOnRefresh: true },
    });
    if (hero) {
      const media = hero.querySelector('[data-hero-media]');
      const content = hero.querySelector('.hero__content');
      const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top top', scrub: true } });
      if (media) tl.fromTo(media, { scale: 1 }, { scale: 1.08, yPercent: 6, ease: 'none' }, 0);
      if (content) tl.fromTo(content, { autoAlpha: 1, y: 0 }, { autoAlpha: 0.15, y: -60, ease: 'none' }, 0);
    }
    return () => { sec.style.clipPath = ''; };
  });
}

// Image reveal: the frame opens in three overlapping passes from the bottom; the image settles.
function lanesReveal() {
  onPage(() => {
    document.querySelectorAll<HTMLElement>('[data-lanes]').forEach((el) => {
      const img = el.querySelector('img');
      const s = { a: 100, b: 100, c: 100 };
      const draw = () => { el.style.clipPath = lanePoly([s.a, s.b, s.c]); };
      draw();
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => { el.style.clipPath = 'none'; },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
      tl.to(s, { a: 0, duration: 1.05, ease: 'pass', onUpdate: draw }, 0)
        .to(s, { b: 0, duration: 1.05, ease: 'pass', onUpdate: draw }, 0.08)
        .to(s, { c: 0, duration: 1.05, ease: 'pass', onUpdate: draw }, 0.16);
      if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.5, ease: ease.out }, 0);
      el.classList.add('lanes-ready');
    });
  });
}

function parallax() {
  onPage(() => {
    document.querySelectorAll<HTMLElement>('[data-parallax-img]').forEach((img) => {
      const frame = img.parentElement!;
      gsap.fromTo(img, { yPercent: -6 }, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  });
}

// Process: the lane draws through the four steps.
function rail() {
  onPage(() => {
    const track = document.querySelector<HTMLElement>('[data-process]');
    const fill = track?.querySelector<HTMLElement>('[data-rail]');
    if (!track || !fill) return;
    const mm = gsap.matchMedia();
    mm.add({ phone: '(max-width: 767px)', wide: '(min-width: 768px)' }, (ctx) => {
      const phone = ctx.conditions?.phone;
      gsap.fromTo(fill, phone ? { scaleY: 0 } : { scaleX: 0 }, {
        ...(phone ? { scaleY: 1 } : { scaleX: 1 }),
        ease: 'none',
        scrollTrigger: { trigger: track, start: phone ? 'top 70%' : 'top 75%', end: phone ? 'bottom 55%' : 'top 30%', scrub: 0.6 },
      });
    });
    return () => mm.revert();
  });
}

// Primary buttons: the fill floods in from the side the pointer enters.
function buttonFill() {
  onPage(() => {
    if (isTouch()) return;
    const off: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('[data-fill]').forEach((btn) => {
      const fill = btn.querySelector<HTMLElement>('.btn__fill');
      if (!fill) return;
      const at = (e: PointerEvent) => { const r = btn.getBoundingClientRect(); return `${e.clientX - r.left}px ${e.clientY - r.top}px`; };
      let closed = true;
      const open = (p: string) => {
        if (closed) gsap.set(fill, { clipPath: `circle(0% at ${p})` });
        closed = false;
        btn.classList.add('is-filled');
        gsap.to(fill, { clipPath: `circle(150% at ${p})`, duration: 0.55, ease: ease.soft, overwrite: true });
      };
      const close = (p: string) => {
        btn.classList.remove('is-filled');
        gsap.to(fill, { clipPath: `circle(0% at ${p})`, duration: 0.45, ease: ease.soft, overwrite: true, onComplete: () => { closed = true; } });
      };
      const enter = (e: PointerEvent) => open(at(e));
      const leave = (e: PointerEvent) => close(at(e));
      const focus = () => btn.matches(':focus-visible') && open('50% 50%');
      const blur = () => close('50% 50%');
      btn.addEventListener('pointerenter', enter); btn.addEventListener('pointerleave', leave);
      btn.addEventListener('focus', focus); btn.addEventListener('blur', blur);
      off.push(() => {
        btn.removeEventListener('pointerenter', enter); btn.removeEventListener('pointerleave', leave);
        btn.removeEventListener('focus', focus); btn.removeEventListener('blur', blur);
      });
    });
    return () => off.forEach((f) => f());
  });
}
