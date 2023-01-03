function solution(n: number): number {
  let hours = Math.floor(n / 60)
    .toString()
    .split("");
  let mins = (n % 60).toString().split("");
  let sum = 0;
  for (let h of hours) {
    sum += parseInt(h);
  }
  for (let m of mins) {
    sum += parseInt(m);
  }
  return sum;
}
