function solution(lastNumberOfDays: number): number[] {
  if (lastNumberOfDays == 31) return [28, 30, 31];
  return [31];
}
