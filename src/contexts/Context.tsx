"use client";

import React, { createContext, ReactNode, useContext } from 'react';
import { useReducer } from 'react';
import { GameState,BoxState, Player } from '@/types';

/**
 * Creo una interfaz para definir el tipo de los valores que se van a compartir en toda la app
 */
interface GameContextType {
  numsBoxes: number;
  board: BoxState[];
  currentPlayer: Player;
  gameStarted: boolean;
  winner: Player | null;
  startGame: (numsBoxes: number) => void;
  handleBoxClick: (index: number) => void;
  resetGame: () => void;
}

const initialState: GameState = {
    numsBoxes: 0,
    board: [],
    currentPlayer:  Math.random() < 0.5 ? Player.RED : Player.BLUE ,
    gameStarted: false,
    winner: null,
};

export const useGame = () => {
    const [state, dispatch] = useReducer(null, initialState);
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ game: ReactNode }> = ({ game }) => {
  const gameState = useGame();
  
  return (
    <GameContext.Provider value={gameState}>
      {game}
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