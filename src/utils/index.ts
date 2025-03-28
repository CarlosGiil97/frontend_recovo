import { BoxState } from '@/types';


export const generateBoard = (size: number): BoxState[] => {
    const board: BoxState[] = Array(size).fill(BoxState.EMPTY);
    
    const redCellsCount = Math.floor(size * 0.2);  //esto es para el 20%
    const blueCellsCount = Math.floor(size * 0.2);
    
    const placeRandomCells = (state: BoxState, count: number) => {
      let placed = 0;
      while (placed < count) {
        const randomIndex = Math.floor(Math.random() * size);
        if (board[randomIndex] === BoxState.EMPTY) {
          board[randomIndex] = state;
          placed++;
        }
      }
    };
    
    placeRandomCells(BoxState.RED, redCellsCount);
    placeRandomCells(BoxState.BLUE, blueCellsCount);
    
    return board;
  };