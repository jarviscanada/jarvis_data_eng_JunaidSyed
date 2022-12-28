let input = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

let output = [
  ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
  ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
  ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
  ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
  ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
  ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
  ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
  ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
  ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
];

function checkRow(board: string[][], rowNum: number, value: number): boolean {
  for (let col = 0; col < 9; col++) {
    if (board[rowNum][col] == value.toString()) return false;
  }
  return true;
}

function checkCol(board: string[][], colNum: number, value: number): boolean {
  for (let row = 0; row < 9; row++) {
    if (board[row][colNum] == value.toString()) return false;
  }
  return true;
}

function checkSquare(
  board: string[][],
  rowNum: number,
  colNum: number,
  value: number
): boolean {
  let rowStart = Math.floor(rowNum / 3) * 3;
  let colStart = Math.floor(colNum / 3) * 3;
  for (let row = rowStart; row < rowStart + 3; row++) {
    for (let col = colStart; col < colStart + 3; col++) {
      if (board[row][col] == value.toString()) return false;
    }
  }
  return true;
}

function isSolved(board: string[][]): number[] {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == ".") return [row, col];
    }
  }
  return [-1, -1];
}

function solveSudoku(board: string[][]): string[][] {
  let emptySpot = isSolved(board);
  let row = emptySpot[0];
  let col = emptySpot[1];

  if (row === -1 && col === -1) {
    // board is full, return the solution
    return board;
  }
  for (let num = 1; num <= 9; num++) {
    if (
      checkCol(board, col, num) &&
      checkRow(board, row, num) &&
      checkSquare(board, row, col, num)
    ) {
      board[row][col] = num.toString();
      solveSudoku(board);
    }
  }

  if (isSolved(board)[0] !== -1) board[row][col] = ".";

  return board;
}
console.log(input);
console.log("___________________________________________");
console.log(solveSudoku(input));
