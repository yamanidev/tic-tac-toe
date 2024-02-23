import { PlayerMove } from './types';

export function isHistoryDuplicateOfLast(history: PlayerMove[][], newEntry: PlayerMove[]): boolean {
  if (history.length === 0) return false;
  const lastEntry = history[history.length - 1];
  return lastEntry.join('') === newEntry.join('');
}

// For testing
export function displayBoard(board: PlayerMove[]) {
  if (!board || board.length === 0) return;
  console.log(`
    ${board[0] || '-'} ${board[1] || '-'} ${board[2] || '-'}
    ${board[3] || '-'} ${board[4] || '-'} ${board[5] || '-'}
    ${board[6] || '-'} ${board[7] || '-'} ${board[8] || '-'}
  `);
}

// For testing
export function displayBoardHistory(boardHistory: PlayerMove[][]) {
  if (!boardHistory || boardHistory.length === 0) return;
  for (const board of boardHistory) {
    displayBoard(board);
  }
  console.log('-----------');
}

export function getWinner(boardState: PlayerMove[], moves: number) {
  // Minimum number of moves to victory
  if (moves < 5) return;

  const correctIndices = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < correctIndices.length; i++) {
    const [a, b, c] = correctIndices[i];

    if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }

  return null;
}
