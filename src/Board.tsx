import { useEffect, useState } from 'react';
import Cell from './Cell';
import { PlayerMove } from './types';
import { displayBoardHistory, getWinner } from './utils';

function Board() {
  const [boardHistory, setBoardHistory] = useState<PlayerMove[][]>([new Array(9).fill('')]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const playerTurn: PlayerMove = currentStep % 2 === 0 ? 'X' : 'O';
  const winner = getWinner(boardHistory[currentStep], boardHistory.length);

  // For testing
  useEffect(() => {
    displayBoardHistory(boardHistory);
  }, [boardHistory]);

  function handleCellClick(value: PlayerMove, index: number) {
    if (!value && !winner) {
      setBoardHistory((prev) => {
        const newBoardState = [
          ...prev[currentStep].slice(0, index),
          playerTurn,
          ...prev[currentStep].slice(index + 1)
        ];

        return [...prev.slice(0, currentStep + 1), newBoardState];
      });
      setCurrentStep((prev) => ++prev);
    }
  }

  function resetBoard() {
    setCurrentStep(0);
  }

  function handleHistory(step: number) {
    setCurrentStep(step);
  }

  return (
    <div>
      <p>{winner ? `${winner} won` : `It's the turn of ${playerTurn}`}</p>
      <div className="flex items-start gap-10">
        <div className="grid w-max grid-cols-3 text-2xl font-bold">
          {boardHistory[currentStep].map((squareValue, index) => (
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
          {boardHistory.slice(1).map((_, index) => (
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
