import { istanbulMap } from '@/data/map';
import { areas, type Area } from '@/data/site';

const hoodArea: Record<string, Area['id']> = { Kurtköy: 'pendik', Kavakpınar: 'pendik', Aydınlı: 'tuzla', Orhanlı: 'tuzla' };
const byMap = Object.fromEntries(areas.map((a) => [a.mapName, a]));

// Hand-placed cartographic labels (viewBox units): neighbourhood names sit beside their small
// shapes, context districts are muted. A porcelain halo keeps every label legible on any fill.
const LABELS: { t: string; x: number; y: number; k: 'd' | 'h' | 'm'; a?: 'start' | 'end' }[] = [
  { t: 'Çekmeköy', x: 408, y: 236, k: 'd' },
  { t: 'Sancaktepe', x: 300, y: 452, k: 'd' },
  { t: 'Sultanbeyli', x: 400, y: 588, k: 'd' },
  { t: 'Kurtköy', x: 486, y: 729, k: 'h', a: 'start' },
  { t: 'Kavakpınar', x: 381, y: 835, k: 'h', a: 'end' },
  { t: 'Orhanlı', x: 642, y: 746, k: 'h', a: 'start' },
  { t: 'Aydınlı', x: 572, y: 902, k: 'h' },
  { t: 'Ümraniye', x: 72, y: 402, k: 'm' },
  { t: 'Ataşehir', x: 66, y: 512, k: 'm' },
  { t: 'Maltepe', x: 128, y: 640, k: 'm' },
  { t: 'Kartal', x: 226, y: 734, k: 'm' },
  { t: 'Pendik', x: 760, y: 560, k: 'm' },
  { t: 'Tuzla', x: 742, y: 930, k: 'm' },
];

// Accurate district outlines of the Anatolian side (OpenStreetMap). Full districts are filled,
// Pendik and Tuzla are only outlined, and inside them only the served neighbourhoods are filled.
export function AreaMap({ selected, onSelect, compact }: { selected?: Area['id']; onSelect?: (id: Area['id']) => void; compact?: boolean }) {
  const label = 'Harita: hizmet verilen bölgeler. Sancaktepe, Sultanbeyli ve Çekmeköy’ün tamamı; Pendik’te Kurtköy ve Kavakpınar; Tuzla’da Aydınlı ve Orhanlı.';
  const pick = (id?: Area['id']) => (id && onSelect ? () => onSelect(id) : undefined);
  return (
    <svg className={`amap ${compact ? 'amap--compact' : ''}`} viewBox={istanbulMap.viewBox} role="img" aria-label={label}>
      <defs>
        <pattern id="amap-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="9" className="amap__hatch" />
        </pattern>
      </defs>
      <g className="amap__districts">
        {istanbulMap.districts.map((d) => {
          const a = byMap[d.name];
          const state = a ? a.scope : 'none';
          return (
            <path
              key={d.name}
              d={d.d}
              className={`amap__d amap__d--${state}${a && a.id === selected ? ' is-selected' : ''}`}
              onClick={pick(a?.id)}
            />
          );
        })}
      </g>
      <g className="amap__hoods">
        {istanbulMap.hoods.map((h) => {
          const id = hoodArea[h.name];
          return <path key={h.name} d={h.d} className={`amap__h${id === selected ? ' is-selected' : ''}`} onClick={pick(id)} />;
        })}
      </g>
      <g className="amap__labels" aria-hidden="true">
        {LABELS.map((l) => (
          <text key={l.t} x={l.x} y={l.y} textAnchor={l.a ?? 'middle'} className={`amap__label amap__label--${l.k}`}>{l.t}</text>
        ))}
      </g>
    </svg>
  );
}
