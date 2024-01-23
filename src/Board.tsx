import { useEffect, useState } from 'react';
import Cell from './Cell';
import { PlayerMove } from './types';
import { displayBoardHistory, getWinner, isHistoryDuplicateOfLast } from './utils';

function Board() {
  const [boardState, setBoardState] = useState<PlayerMove[]>(new Array(9).fill(''));
  const [boardHistory, setBoardHistory] = useState<PlayerMove[][]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const playerTurn: PlayerMove = currentStep % 2 === 0 ? 'X' : 'O';
  const winner = getWinner(boardState, boardHistory.length);

  // For testing
  useEffect(() => {
    displayBoardHistory(boardHistory);
  }, [boardHistory]);

  function handleCellClick(value: PlayerMove, index: number) {
    if (!value && !winner) {
      setBoardState((prev) => {
        const newBoardState = [...prev.slice(0, index), playerTurn, ...prev.slice(index + 1)];

        setBoardHistory((prev) => {
          // To avoid adding duplicates with double-invokations (eg: React's strict mode)
          if (isHistoryDuplicateOfLast(prev, newBoardState)) {
            console.log('Duplicate detected. Skipping adding it');
            return prev;
          }
          const newBoardHistory = currentStep === 0 ? [] : boardHistory.slice(0, currentStep);
          newBoardHistory.push(newBoardState);
          return newBoardHistory;
        });

        return newBoardState;
      });
      setCurrentStep((prev) => ++prev);
    }
  }

  function resetBoard() {
    setBoardState(new Array(9).fill(''));
    setCurrentStep(0);
  }

  function handleHistory(step: number) {
    setCurrentStep(step);
    setBoardState(boardHistory[step - 1]);
  }

  return (
    <div>
      <p>{winner ? `${winner} won` : `It's the turn of ${playerTurn}`}</p>
      <div className="flex items-start gap-10">
        <div className="grid w-max grid-cols-3 text-2xl font-bold">
          {boardState.map((squareValue, index) => (
            <Cell
              key={index}
              value={squareValue}
              onClick={() => {
                handleCellClick(squareValue, index);
              }}
            />
          ))}
        </div>
        <ul>
          <li>
            <button onClick={resetBoard} className="bg-gray-100 px-2">
              Go to game start
            </button>
          </li>
          {boardHistory?.map((_, index) => (
            <li key={index} className="my-1">
              <button onClick={() => handleHistory(index + 1)} className="bg-gray-100 px-2">
                Go to move #{index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Board;
