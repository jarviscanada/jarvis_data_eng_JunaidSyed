function solution(n: number): number {
  let digits: string[] = n.toString().split("");
  return parseInt(digits[0]) + parseInt(digits[1]);
}
