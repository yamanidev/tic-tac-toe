import { PlayerMove } from './types';

export function isHistoryDuplicateOfLast(history: PlayerMove[][], newEntry: PlayerMove[]): boolean {
  if (history.length === 0) return false;
  const lastEntry = history[history.length - 1];
  return lastEntry.join('') === newEntry.join('');
}

// For testing
export function displayGrid(grid: PlayerMove[]) {
  if (!grid || grid.length === 0) return;
  console.log(`
    ${grid[0] || '-'} ${grid[1] || '-'} ${grid[2] || '-'}
    ${grid[3] || '-'} ${grid[4] || '-'} ${grid[5] || '-'}
    ${grid[6] || '-'} ${grid[7] || '-'} ${grid[8] || '-'}
  `);
}

// For testing
export function displayGridHistory(gridHistory: PlayerMove[][]) {
  if (!gridHistory || gridHistory.length === 0) return;
  for (const grid of gridHistory) {
    displayGrid(grid);
  }
  console.log('-----------');
}

// Probably can be made a lot simpler (TODO?)
export function getWinner(boardState: PlayerMove[], moves: number) {
  // Indices:
  // 0 1 2
  // 3 4 5
  // 6 7 8
  // 0 3 6
  // 1 4 7
  // 2 5 8
  // 0 4 8
  // 2 4 6

  // Minimum number of moves to victory
  if (moves < 5) return;

  // Horizontal
  for (let i = 0; i < 9; i += 3) {
    const sequence = boardState.slice(i, i + 3);
    if (sequence[0] === sequence[1] && sequence[0] === sequence[2]) {
      return sequence[0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    const sequence = [boardState[i], boardState[i + 3], boardState[i + 6]];
    if (sequence[0] === sequence[1] && sequence[0] === sequence[2]) {
      return sequence[0];
    }
  }

  // Diagonal
  // Index 4 is the middle cell
  if (
    (boardState[4] === boardState[0] && boardState[4] === boardState[8]) ||
    (boardState[4] === boardState[2] && boardState[4] === boardState[6])
  ) {
    return boardState[4];
  }
}
