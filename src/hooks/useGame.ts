import { useReducer } from 'react';
import { GameState, GameAction, Player , BoxState } from '@/types';

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
    console.log('entro a start')
      const { numsBoxes } = action.payload;

      console.log({
        ...state,
        numsBoxes,
        board: [
            ...Array(numsBoxes).fill(BoxState.EMPTY),
        ],
        currentPlayer: Math.random() < 0.5 ? Player.RED : Player.BLUE,
        gameStarted: true,
        winner: null,
      })
      return {
        ...state,
        numsBoxes,
        board: [
            ...Array(numsBoxes).fill(BoxState.EMPTY),
        ],
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