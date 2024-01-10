import { PlayerMove } from './types';

type Props = {
  value: PlayerMove;
  onClick: () => void;
};

function Cell({ value, onClick }: Props) {
  return (
    <button onClick={onClick} className="flex h-10 w-10 items-center justify-center border">
      {value}
    </button>
  );
}

export default Cell;
