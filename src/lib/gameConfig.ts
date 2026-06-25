export const LANES = 4;

export const RACE_DURATION_MS = 15000;
export const FINISH_APPROACH_MS = 3000;

export const OBSTACLE_TRAVEL_MS = 2000;
export const SPAWN_INTERVAL_BASE_MS = 1300;
export const SPAWN_INTERVAL_MIN_MS = 1000;
export const STOP_SPAWN_AT_MS = RACE_DURATION_MS - 3500;

export const LIVES_START = 3;

export const TOP_EDGE_HALF_WIDTH_PCT = 15; // top edge spans 50% +/- 15% => 35%..65%
export const TOP_Y_PCT = 15;
export const BOTTOM_Y_PCT = 92;

// Lanes are inset from the absolute screen edges so a curb border can be drawn outside them.
export const BOTTOM_EDGE_MARGIN_PCT = 6;
export const CURB_WIDTH_BOTTOM_PCT = 6;
export const CURB_WIDTH_TOP_PCT = 2;

export const PLAYER_LANE_T = 1;
export const PLAYER_VISUAL_TOP_PCT = 90;
export const COLLISION_T = 0.95;
export const REMOVE_T = 1.1;

export const SCALE_FAR = 0.12;
export const SCALE_NEAR = 1;

// Base car footprint at full (near) scale, sized as a fraction of one lane's
// width so vehicles visibly fill their lane instead of floating with empty
// margins on either side.
export const CAR_WIDTH_CSS = 'clamp(58px, 17vw, 260px)';
export const CAR_HEIGHT_CSS = 'clamp(104px, 30.6vw, 468px)';

export const DEPTH_EASE_POWER = 1.8;

export function depthEase(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return Math.pow(clamped, DEPTH_EASE_POWER);
}

export function laneAreaEdges(t: number): { left: number; right: number } {
  const left = lerp(50 - TOP_EDGE_HALF_WIDTH_PCT, BOTTOM_EDGE_MARGIN_PCT, t);
  const right = lerp(50 + TOP_EDGE_HALF_WIDTH_PCT, 100 - BOTTOM_EDGE_MARGIN_PCT, t);
  return { left, right };
}

export function laneCenterX(easedT: number, lane: number): number {
  const { left: leftEdge, right: rightEdge } = laneAreaEdges(easedT);
  const laneWidth = (rightEdge - leftEdge) / LANES;
  return leftEdge + laneWidth * (lane + 0.5);
}

export function depthY(easedT: number): number {
  return lerp(TOP_Y_PCT, BOTTOM_Y_PCT, easedT);
}

export function depthScale(easedT: number): number {
  return lerp(SCALE_FAR, SCALE_NEAR, easedT);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
