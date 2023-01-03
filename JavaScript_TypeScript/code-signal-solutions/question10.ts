function solution(
  value1: number,
  weight1: number,
  value2: number,
  weight2: number,
  maxW: number
): number {
  if (weight1 + weight2 <= maxW) return value1 + value2;
  else if (weight2 <= maxW && weight1 <= maxW) return Math.max(value1, value2);
  else if (weight1 <= maxW) return value1;
  else if (weight2 <= maxW) return value2;
  return 0;
}
