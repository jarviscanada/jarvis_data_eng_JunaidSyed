function solution(a: number, b: number, c: number): boolean {
  return a + b == c || a / b == c || a - b == c || a * b == c;
}
