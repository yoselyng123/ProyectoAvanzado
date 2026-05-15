import type { CartaType } from '../data/entidades';
import LogBatalla from './LogBatalla';

type Props = {
  turno: number;
  p1: CartaType;
  p2: CartaType;
  damage: number;
};

function LogsBatalla({ turno, p1, p2, damage }: Props) {
  return (
    <div className='flex- flex-col border-2 border-black w-[40%] rounded-br-lg rounded-tl-lg max-h-[150px] overflow-scroll'>
      <LogBatalla turno={turno} p1={p1} p2={p2} damage={damage} />
      <LogBatalla turno={turno} p1={p1} p2={p2} damage={damage} />
      <LogBatalla turno={turno} p1={p1} p2={p2} damage={damage} />
    </div>
  );
}

export default LogsBatalla;
