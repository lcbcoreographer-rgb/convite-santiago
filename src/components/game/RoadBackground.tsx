import { forwardRef } from 'react';
import {
  CURB_WIDTH_BOTTOM_PCT,
  CURB_WIDTH_TOP_PCT,
  LANES,
  laneAreaEdges,
  lerp,
} from '../../lib/gameConfig';

const TOP_Y = 15;
const BOTTOM_Y = 100;
const CURB_SEGMENTS = 16;

function boundaryX(i: number, t: number): number {
  const { left, right } = laneAreaEdges(t);
  return left + (i / LANES) * (right - left);
}

function curbSegments(side: 'left' | 'right') {
  const segments = [];
  for (let i = 0; i < CURB_SEGMENTS; i++) {
    const t0 = i / CURB_SEGMENTS;
    const t1 = (i + 1) / CURB_SEGMENTS;
    const y0 = lerp(TOP_Y, BOTTOM_Y, t0);
    const y1 = lerp(TOP_Y, BOTTOM_Y, t1);
    const inner0 = laneAreaEdges(t0)[side];
    const inner1 = laneAreaEdges(t1)[side];
    const curbW0 = lerp(CURB_WIDTH_TOP_PCT, CURB_WIDTH_BOTTOM_PCT, t0);
    const curbW1 = lerp(CURB_WIDTH_TOP_PCT, CURB_WIDTH_BOTTOM_PCT, t1);
    const sign = side === 'left' ? -1 : 1;
    const outer0 = inner0 + sign * curbW0;
    const outer1 = inner1 + sign * curbW1;
    const fill = i % 2 === 0 ? '#dc2626' : '#f5f5f5';
    segments.push(
      <polygon
        key={`${side}-${i}`}
        points={`${inner0},${y0} ${outer0},${y0} ${outer1},${y1} ${inner1},${y1}`}
        fill={fill}
      />
    );
  }
  return segments;
}

export const RoadBackground = forwardRef<SVGSVGElement>(function RoadBackground(_props, svgRef) {
  const topEdges = laneAreaEdges(0);
  const bottomEdges = laneAreaEdges(1);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04050a" />
          <stop offset="100%" stopColor="#0a0d16" />
        </linearGradient>
        <linearGradient id="asphalt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6d76" />
          <stop offset="100%" stopColor="#46484e" />
        </linearGradient>
        <radialGradient id="horizonGlow" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="100" height="100" fill="url(#sky)" />
      <rect x="0" y={TOP_Y - 6} width="100" height="14" fill="url(#horizonGlow)" />

      {curbSegments('left')}
      {curbSegments('right')}

      <polygon
        points={`${topEdges.left},${TOP_Y} ${topEdges.right},${TOP_Y} ${bottomEdges.right},${BOTTOM_Y} ${bottomEdges.left},${BOTTOM_Y}`}
        fill="url(#asphalt)"
      />

      {Array.from({ length: LANES - 1 }, (_, idx) => {
        const i = idx + 1;
        const x1 = boundaryX(i, 0);
        const x2 = boundaryX(i, 1);
        return (
          <line
            key={i}
            data-lane-line={i}
            x1={x1}
            y1={TOP_Y}
            x2={x2}
            y2={BOTTOM_Y}
            stroke="#ffffff"
            strokeOpacity={0.7}
            strokeWidth={0.4}
            strokeDasharray="3 2.4"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
});
