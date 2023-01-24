function solution(score1: number, score2: number): boolean {
  if (score2 > 7 || score1 > 7) return false;
  if (score1 == 7 || score2 == 7)
    return Math.abs(score1 - score2) >= 1 && Math.abs(score1 - score2) < 3;
  else if (score1 == 6 || score2 == 6) return Math.abs(score1 - score2) >= 2;
  return false;
}
