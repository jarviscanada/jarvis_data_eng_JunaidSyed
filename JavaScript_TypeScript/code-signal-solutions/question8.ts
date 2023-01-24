function solution(
  min1: number,
  min2_10: number,
  min11: number,
  s: number
): number {
  if ((s = s - min1) < 0) return 0;
  if (s / (min2_10 * 9) < 1) return Math.floor(s / min2_10) + 1;
  s -= min2_10 * 9;
  return Math.floor(s / min11) + 10;
}
