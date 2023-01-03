function solution(n: number, firstNumber: number): number {
  let output = n / 2 + firstNumber;
  if (output >= n) return output - n;
  return output;
}
