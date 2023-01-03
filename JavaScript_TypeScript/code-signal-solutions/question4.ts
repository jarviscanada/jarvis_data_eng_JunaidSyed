function solution(
  nCols: number,
  nRows: number,
  col: number,
  row: number
): number {
  let length = nCols - col + 1;
  let width = nRows - row;
  return length * width;
}
