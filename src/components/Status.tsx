import { Player } from '@/types';

interface GameStatusProps {
  winner: Player | null;
  currentPlayer: Player;
}

const Status = ({ winner, currentPlayer }: GameStatusProps) => {
  const getPlayerColorClass = (player: Player): string => {
    return player === Player.RED ? 'text-red-500' : 'text-blue-500';
  };

  const getPlayerText = (player: Player): string => {
    return player === Player.RED ? 'Rojo' : 'Azul';
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <h2 className={`text-${winner ? '2xl' : 'xl'} text-black ${winner ? 'font-bold' : ''}`}>
        {winner ? 'Ganador: ' : 'Turno del jugador: '}
        <span className={getPlayerColorClass(winner || currentPlayer)}>
          {getPlayerText(winner || currentPlayer)}
        </span>
      </h2>
    </div>
  );
};

export default Status;