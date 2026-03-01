import * as R from "remeda";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function clampIndex(index: number, max: number): number {
  if (max <= 0) return 0;
  return R.pipe(index, (i) => clamp(i, 0, max - 1));
}

export function nextIndex(current: number, total: number): number {
  return R.pipe(current + 1, (i) => clampIndex(i, total));
}

export function prevIndex(current: number, total: number): number {
  return R.pipe(current - 1, (i) => clampIndex(i, total));
}
