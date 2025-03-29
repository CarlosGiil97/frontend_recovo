/**
 * Posible valor de una casilla
 */
export enum BoxState {
    EMPTY = "EMPTY",
    RED = "RED",
    BLUE = "BLUE",
  }
  
  /**
   * Tipos de jugadores
   */
  export enum Player {
    RED = "RED",
    BLUE = "BLUE",
    EMPATE = "EMPATE",
  }
  
  /**
   * Estado del juego
   */
  export interface GameState {
    numsBoxes: number;
    board: BoxState[];
    currentPlayer: Player;
    gameStarted: boolean;
    winner: Player | null;
  }
  /**
   * Acciones del juego
   *  */
  export type GameAction =
  | { type: "START"; payload: { numsBoxes: number } }
  | { type: "MOVE"; payload: { index: number } }
  | { type: "RESET" };