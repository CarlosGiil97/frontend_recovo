import { useReducer } from 'react';
import { GameState, GameAction, Player  } from '@/types';
import {
    generateBoard,
  } from '../utils/index';
/**
 * Estado inicial del juego
 */
const initialState: GameState = {
  numsBoxes: 0,
  board: [],
  currentPlayer: Math.random() < 0.5 ? Player.RED : Player.BLUE, // esto lo hago para que cada vez que se inicie el juego aleatoriamente empieze un jugador distinto
  gameStarted: false,
  winner: null,
};

/**
 * El juego se basa en empezar , realizar un movimiento y reiniciar/terminar el juego
 */
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START': {
      const { numsBoxes } = action.payload;
      return {
        ...state,
        numsBoxes,
        board: generateBoard(numsBoxes),
        currentPlayer: Math.random() < 0.5 ? Player.RED : Player.BLUE,
        gameStarted: true,
        winner: null,
      };
    }
    
    case 'MOVE': {
      console.log('entro a move')
    }
    
    case 'RESET': {
      return initialState;
    }
    
    default:
      return state;
  }
};


export const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  

  const start = (numsBoxes: number) => {
    dispatch({ type: 'START', payload: { numsBoxes } });
  };

  const handleBoxClick = (index: number) => {
    dispatch({ type: 'MOVE', payload: { index } });
  };
  
  const reset = () => {
    dispatch({ type: 'RESET' });
  };
  
  return {
    ...state,
    start,
    handleBoxClick,
    reset,
  };
};