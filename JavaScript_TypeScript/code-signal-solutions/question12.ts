function solution(a: number, b: number): boolean {
  return !(b >= a && a % 2 == b % 2);
}
