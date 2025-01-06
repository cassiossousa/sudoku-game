import { Sudoku, Tile } from './sudoku';

/**
 * Activates the clicked tile for keyboard input.
 *
 * @param {Sudoku} sudoku
 * @param {Tile} tile
 * @returns
 */
export function activateTile(sudoku, tile) {
  if (tile.isActive) {
    tile.isActive = false;
    sudoku.activeTileRow = null;
    sudoku.activeTileCol = null;
  } else {
    tile.isActive = true;

    if (sudoku.activeTileCol !== null && sudoku.activeTileRow !== null) {
      const activeTile = sudoku.board[sudoku.activeTileRow][sudoku.activeTileCol];
      activeTile.isActive = false;
    }

    sudoku.activeTileRow = tile.row;
    sudoku.activeTileCol = tile.col;
  }

  sudoku.update();
}

// Listen for keyboard events to fill the active tile
document &&
  document.addEventListener('keydown', (event) => {
    if (!activeTile) return;

    const value = Number(event.key);
    const row = activeTile.dataset.row;
    const col = activeTile.dataset.col;

    if (value >= 1 && value <= 9) {
      if (isValidMove(row, col, value)) {
        board[row][col] = value;
        activeTile.textContent = value;
        activeTile.classList.add('filled');
        activeTile.classList.remove('active');
        activeTile = null;
      } else {
        highlightInvalidTile(activeTile, value);
      }
    } else if (event.key === 'Escape') {
      activeTile.classList.remove('active'); // Deselect on Escape
      activeTile = null;
    }
  });

// Highlight tile red for 1 second
export function highlightInvalidTile(tile, value) {
  tile.classList.add('invalid');
  tile.textContent = value;
  setTimeout(() => {
    tile.textContent = '';
    tile.classList.remove('invalid');
  }, 1000);
}

// Find all valid numbers for the given tile
export function findAllValidNumbersFor(row, col) {
  const allValiNumbers = [];
  for (let num = 1; num <= 9; num++) {
    if (isValidMove(row, col, num)) {
      allValiNumbers.push(num);
    }
  }
  return allValiNumbers;
}

// Validate the move (tile, row, column, 3x3 box)
export function isValidMove(row, col, value) {
  row = Number(row);
  col = Number(col);

  // Check tile
  if (board[row][col] !== null) return false;

  // Check row
  if (board[row].includes(value)) return false;

  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === value) return false;
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === value) return false;
    }
  }
  return true;
}

export function resetBoard() {
  board = Array.from({ length: 9 }, () => Array(9).fill(null));
}

export function getBoard() {
  return board;
}
