import { BoxState, Player } from '@/types';


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

 
  export const isValidMove = (board: BoxState[], index: number, player: Player): boolean => {
    const boxState = board[index];
    const playerState = player === Player.RED ? BoxState.RED : BoxState.BLUE;
    if (boxState === playerState) {
      console.log('No puedes pintar una casilla que ya es tuya');
      return false;
    }
    
    return true;
  };

  export const makeMove = (board: BoxState[], index: number, player: Player): BoxState[] => {
    if (!isValidMove(board, index, player)) {
      return board;
    }
    
    // Se pinta la casilla
    let newBoard = [...board];
    newBoard[index] = player === Player.RED ? BoxState.RED : BoxState.BLUE;
    
    // Compruebo si hay casillas que se pueden pintar automáticamente
    newBoard = checkBoxesJoin(newBoard, player);
    
    // Compruebo si hay casillas del rival consecutivas entre las del jugador , siempre y cuando no haya vacias
    newBoard = checkRivalBoxesJoin(newBoard, player);
    
    return newBoard;
  };

  export const checkBoxesJoin = (board: BoxState[], player: Player): BoxState[] => {
    const newBoard = [...board];
    const playerState = player === Player.RED ? BoxState.RED : BoxState.BLUE;
    
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] !== BoxState.EMPTY) continue;
      
      // Hay que comprobar al principio por la izquierda
      let hasLeftBoundary = false;
      for (let left = i - 1; left >= 0; left--) {
        if (newBoard[left] === playerState) {
          hasLeftBoundary = true;
          break;
        } else if (newBoard[left] !== BoxState.EMPTY) {
          break;
        }
      }
      
      // Hay que comprobar al final por la derecha
      let hasRightBoundary = false;
      for (let right = i + 1; right < newBoard.length; right++) {
        if (newBoard[right] === playerState) {
          hasRightBoundary = true;
          break;
        } else if (newBoard[right] !== BoxState.EMPTY) {
          break;
        }
      }
      
      if (hasLeftBoundary && hasRightBoundary) {
        newBoard[i] = playerState;
      }
    }
    
    return newBoard;
  };

  export const checkRivalBoxesJoin = (board: BoxState[], player: Player): BoxState[] => {
    const newBoard = [...board];
    const playerState = player === Player.RED ? BoxState.RED : BoxState.BLUE;
    const opponentState = getNextPlayer(player) === Player.RED ? BoxState.RED : BoxState.BLUE;
    
    // Buscar secuencias de casillas del oponente delimitadas por casillas del jugador
    let i = 0;
    while (i < newBoard.length) {
      // Si encontramos una casilla del jugador actual
      if (newBoard[i] === playerState) {
        const start = i;
        
        // Buscar secuencia de casillas del oponente
        let j = i + 1;
        while (j < newBoard.length && newBoard[j] === opponentState) {
          j++;
        }
        
        // Si terminamos en otra casilla del jugador actual y hay casillas del oponente en medio
        if (j < newBoard.length && newBoard[j] === playerState && j > start + 1) {
          // Capturar todas las casillas del oponente en medio
          for (let k = start + 1; k < j; k++) {
            newBoard[k] = playerState;
          }
        }
        
        i = j;
      } else {
        i++;
      }
    }
    
    return newBoard;
  };

  export const getNextPlayer = (currentPlayer: Player): Player => {
    return currentPlayer === Player.RED ? Player.BLUE : Player.RED;
  };

  export const isWinning = (board: BoxState[]): Player | null => {
    let redCount = 0;
    let blueCount = 0;
    let emptyCount = 0;
    
    // Contar casillas de cada tipo
    board.forEach(cell => {
      if (cell === BoxState.RED) redCount++;
      else if (cell === BoxState.BLUE) blueCount++;
      else emptyCount++;
    });
    
    // Comprobar tambien el empate
    if (emptyCount === 0) {
      if(redCount === blueCount) return Player.EMPATE;
      if (redCount > blueCount) return Player.RED;
      if (blueCount > redCount) return Player.BLUE;
    }
    
    const totalOccupied = redCount + blueCount;
    const initialPercentage = Math.floor(board.length * 0.4); // 20% de cada color al inicio
    if (totalOccupied > initialPercentage) {
      if (redCount === 0) return Player.BLUE;
      if (blueCount === 0) return Player.RED;
    }
    
    return null;
  };