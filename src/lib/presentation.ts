// Timing rules for the showcase "Presentation Mode" (used for recording videos).

/** Pause held at each section before moving on. */
export const SECTION_PAUSE_MS = 3000;
/** Wait at the very bottom before gliding back to the top. */
export const BOTTOM_WAIT_MS = 3000;
/** Cruise speed while travelling between sections. */
export const SCROLL_SPEED_PX_PER_S = 260;
export const MIN_TRAVEL_MS = 1600;
export const RETURN_MIN_MS = 2500;
export const RETURN_MAX_MS = 4500;

/** Travel time between two sections: slow and steady, never abrupt. */
export function travelDuration(distancePx: number): number {
  return Math.max(MIN_TRAVEL_MS, (Math.abs(distancePx) / SCROLL_SPEED_PX_PER_S) * 1000);
}

/** Duration of the final glide back to the top of the page. */
export function returnDuration(distancePx: number): number {
  return Math.min(RETURN_MAX_MS, Math.max(RETURN_MIN_MS, Math.abs(distancePx) / 2));
}

/** Gentle ease-in-out so each movement starts and lands softly. */
export function easeInOut(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/**
 * Turn raw section offsets into an ordered list of scroll stops:
 * always starts at the top, always ends at the very bottom, no near-duplicates.
 */
export function buildStops(offsets: number[], maxScroll: number, minGap = 80): number[] {
  const clamped = offsets
    .map((o) => Math.round(Math.min(Math.max(o, 0), maxScroll)))
    .concat([0, maxScroll])
    .sort((a, b) => a - b);
  const stops: number[] = [];
  for (const o of clamped) {
    const last = stops[stops.length - 1];
    if (last === undefined || o - last >= minGap) stops.push(o);
    else if (o === maxScroll) stops[stops.length - 1] = maxScroll;
  }
  return stops;
}
