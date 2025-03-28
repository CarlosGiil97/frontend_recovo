"use client";

import React from 'react';
import Box from './Box';
import { useGameContext } from '@/contexts/Context';


const Board: React.FC = () => {
  const { board, handleBoxClick, gameStarted, winner , reset } = useGameContext();
  
  if (!gameStarted) {
    return null; 
  }
  
  return (
    <div className="w-full  p-4 overflow-x-auto">
      <div className="flex flex-row gap-2 my-4 justify-center">
        {board.map((cellState, index) => (
          <Box
            key={index}
            state={cellState}
            onClick={() => handleBoxClick(index)}
            disabled={!!winner} 
          />
        ))}
      </div>
      {winner && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={reset}
                  className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2"
                >
                  Reiniciar
                </button>
              </div>
            )}
    </div>
  );
};

export default Board;