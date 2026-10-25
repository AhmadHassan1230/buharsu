'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Media } from '@/data/site';

type Props = { before: Media; after: Media; labels: { before: string; after: string }; caption?: string };

// Before/after comparison. The handle is a wand head: dragging it "passes" across the fabric.
// Pointer drag anywhere on the frame, keyboard arrows on the handle (role="slider").
// touch-action: pan-y keeps vertical page scroll working on phones.
export function Compare({ before, after, labels, caption }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [hinted, setHinted] = useState(false);
  const drag = useRef<{ id: number; x0: number; y0: number; locked: boolean | null } | null>(null);

  const setFromX = useCallback((clientX: number) => {
    const r = frame.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const el = frame.current!;
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, locked: e.pointerType === 'mouse' ? true : null };
      if (e.pointerType === 'mouse') { el.setPointerCapture(e.pointerId); setFromX(e.clientX); }
      setHinted(true);
    };
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || d.id !== e.pointerId) return;
      if (d.locked === null) {
        const dx = Math.abs(e.clientX - d.x0), dy = Math.abs(e.clientY - d.y0);
        if (dx < 6 && dy < 6) return;
        d.locked = dx > dy; // horizontal intent drags, vertical intent scrolls the page
        if (d.locked) el.setPointerCapture(e.pointerId);
        else { drag.current = null; return; }
      }
      if (d.locked) setFromX(e.clientX);
    };
    const up = (e: PointerEvent) => {
      const d = drag.current;
      if (d && d.locked === null) setFromX(e.clientX); // a tap moves the handle there
      drag.current = null;
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', () => { drag.current = null; });
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
    };
  }, [setFromX]);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setPos((p) => Math.max(0, p - step)); }
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setPos((p) => Math.min(100, p + step)); }
    if (e.key === 'Home') { e.preventDefault(); setPos(0); }
    if (e.key === 'End') { e.preventDefault(); setPos(100); }
    setHinted(true);
  };

  return (
    <figure className="compare">
      <div ref={frame} className="compare__frame" style={{ '--pos': `${pos}%` } as React.CSSProperties} data-hinted={hinted || undefined} data-compare>
        <Image className="compare__img" src={after.src} alt={after.alt} width={after.w} height={after.h} sizes="(max-width: 767px) 100vw, 86vw" quality={80} />
        <div className="compare__before">
          <Image className="compare__img" src={before.src} alt={before.alt} width={before.w} height={before.h} sizes="(max-width: 767px) 100vw, 86vw" quality={80} />
        </div>
        <span className="compare__label compare__label--before" aria-hidden="true">{labels.before}</span>
        <span className="compare__label compare__label--after" aria-hidden="true">{labels.after}</span>
        <div
          className="compare__handle"
          role="slider"
          tabIndex={0}
          aria-label="Öncesi ve sonrası karşılaştırma"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`Yüzde ${Math.round(pos)} öncesi görünüyor`}
          onKeyDown={onKey}
        >
          <span className="compare__line" aria-hidden="true" />
          <span className="compare__head" aria-hidden="true"><i /><i /><i /></span>
        </div>
      </div>
      {caption && <figcaption className="compare__caption">{caption}</figcaption>}
    </figure>
  );
}
