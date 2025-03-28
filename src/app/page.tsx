"use client";
import Image from 'next/image';
import { useGameContext } from '@/contexts/Context';
import { useState } from 'react';
import Board from '@/components/Board';
import Status from '@/components/Status';

export default function Home() {

  const { gameStarted,start,reset , winner, currentPlayer } = useGameContext();
  const [boardSize, setBoardSize] = useState<number>(10);
  const [error, setError] = useState<string>('');
  const handleStartGame = () => {
    if (boardSize < 1) {
      setError('El tamaño del tablero debe ser mayor a 0');
      return;
    }
    start(boardSize);
  };

  const handleBoardSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    console.log(value)
    setBoardSize(value);
    setError('');
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-[30%] bg-gray-400 p-4 md:p-6 text-white overflow-y-auto">
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <Image
            src="/recovo_logo.jpeg"
            alt="Recovo logo"
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
          <h1 className="text-xl md:text-2xl font-bold text-center text-white">
            RECOVO FRONTEND
          </h1>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-gray-700/50 p-3 md:p-4 rounded-lg">
            <h2 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
              Jugadores
            </h2>
            <p className="text-gray-300">
              <span className="text-red-400 font-bold">Rojo</span> /{" "}
              <span className="text-blue-400 font-bold">Azul</span> 
            </p>
          </div>
          
          <div className="bg-gray-700/50 p-3 md:p-4 rounded-lg">
            <h2 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
              Reglas
            </h2>
            <ul className="text-gray-300 list-disc list-inside space-y-1 md:space-y-2 text-sm md:text-base">
              <li>Haz clic en una casilla para colorearla</li>
              <li>Puedes pintar casillas vacías o del oponente</li>
              <li>No puedes pintar casillas que ya son tuyas</li>
              <li>Las casillas vacías entre tus colores se pintan automáticamente</li>
              <li>Las casillas del oponente rodeadas por tu color se capturan</li>
            </ul>
          </div>

          <div className="bg-gray-700/50 p-3 md:p-4 rounded-lg">
            <h2 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
              Victoria
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-bold">
              Gana quien:
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-1 md:space-y-2 mt-2 text-sm md:text-base">
              <li>Pinte todo el tablero de su color</li>
              <li>Capture todas las casillas del oponente</li>
            </ul>
          </div>
          <div className="bg-gray-700/50 p-3 md:p-4 rounded-lg flex justify-center">
          {!gameStarted ? (
        <div className="flex flex-col space-y-4">
          <label className="block text-gray-300">
            ¿Cuantas casillas quieres?:
            <input
              type="number"
              min="1"
              value={boardSize.toString()}
              onChange={handleBoardSizeChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
            />
          </label>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            onClick={handleStartGame}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-green-700"
          >
            Comenzar
          </button>
        </div>
      ) : (
        <button
          onClick={reset}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 "
        >
          Reiniciar Juego
        </button>
      )}
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 overflow-y-auto min-h-[60vh] md:min-h-screen bg-gray-50">
      {gameStarted && (
          <>
            <Status winner={winner} currentPlayer={currentPlayer} />
            <Board />
          </>
        )}
      </div>
    </div>
  );
}
