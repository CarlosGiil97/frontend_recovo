"use client";

import React, { createContext, ReactNode, useContext } from 'react';
import { useGame } from '@/hooks/useGame';
import { BoxState, Player } from '@/types';

/**
 * Creo una interfaz para definir el tipo de los valores que se van a compartir en toda la app
 */
interface GameContextType {
  numsBoxes: number;
  board: BoxState[];
  currentPlayer: Player;
  gameStarted: boolean;
  winner: Player | null;
  start: (numsBoxes: number) => void;
  handleBoxClick: (index: number) => void;
  reset: () => void;
}


const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const gameState = useGame();
  
  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
};


export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  
  if (context === undefined) {
    throw new Error('error');
  }
  
  return context;
};