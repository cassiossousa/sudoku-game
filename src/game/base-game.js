import { Sudoku } from '../sudoku/sudoku';
import { Tile } from '../sudoku/tile';

export class BaseGame {
  constructor(boardElement, initialValues) {
    this.boardElement = boardElement;
    this.initialValues = initialValues;
    this.sudoku = null;
    this.activeTileRow = null;
    this.activeTileCol = null;
  }

  start() {
    this.sudoku = new Sudoku(this.boardElement);
    this.sudoku.restart(this.initialValues);
    this.updateSudoku();
  }

  updateSudoku() {
    this.sudoku.update();
    this.addListenersAndValidatorsToSudokuTiles();
  }

  addListenersAndValidatorsToSudokuTiles() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const tile = this.sudoku.board[row][col];

        if (this.isInitial(tile)) {
          tile.element.classList.add('initial');
        } else {
          tile.element.addEventListener('click', () => this.toggleActivateTile(tile));
        }

        if (tile.value !== null && !this.isValidMove(row, col, tile.value)) {
          tile.element.classList.add('invalid');
        }
      }
    }
  }

  isInitial(tile) {
    return Boolean(tile && tile.value && this.initialValues[tile.row][tile.col] === tile.value);
  }

  /**
   * If not active, activates the clicked tile for keyboard input.
   * Otherwise, deactivates the keyboard event listeners.
   *
   * @param {Tile} tile
   */
  toggleActivateTile(tile) {
    if (this.activeTileRow === tile.row && this.activeTileCol === tile.col) {
      tile.element.classList.remove('active');
      this.activeTileRow = null;
      this.activeTileCol = null;
      this.removeKeyboardListener();
    } else {
      if (this.activeTileRow !== null && this.activeTileCol !== null) {
        const activeTile = this.sudoku.board[this.activeTileRow][this.activeTileCol];
        activeTile.element.classList.remove('active');
      } else {
        this.addKeyboardListener();
      }

      tile.element.classList.add('active');
      this.activeTileRow = tile.row;
      this.activeTileCol = tile.col;
    }
  }

  deactivateTile() {
    if (this.activeTileRow === null || this.activeTileCol === null) return;
    const activeTile = this.sudoku.board[this.activeTileRow][this.activeTileCol];
    activeTile.element.classList.remove('active');
    this.activeTileRow = null;
    this.activeTileCol = null;
  }

  addKeyboardListener() {
    if (document) document.addEventListener('keydown', this.handleKeyboardEvent);
  }

  removeKeyboardListener() {
    if (document) document.removeEventListener('keydown', this.handleKeyboardEvent);
  }

  handleKeyboardEvent = (event) => {
    if (this.activeTileRow === null || this.activeTileCol === null) return;

    const value = Number(event.key);

    if (value >= 1 && value <= 9) {
      this.fillActiveTile(value);
      this.deactivateTile();
      this.removeKeyboardListener();
      this.updateSudoku();
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      this.fillActiveTile(null);
      this.deactivateTile();
      this.removeKeyboardListener();
      this.updateSudoku();
    } else if (event.key === 'Escape') {
      this.deactivateTile();
      this.removeKeyboardListener();
    }
  };

  /**
   * Fills active tile with the provided value
   *
   * @param {number | null} value
   */
  fillActiveTile(value) {
    if (this.activeTileRow === null || this.activeTileCol === null) return;
    const activeTile = this.sudoku.board[this.activeTileRow][this.activeTileCol];
    activeTile.value = value;
  }

  /**
   * Checks if a tile can be filled with a given value.
   *
   * @param {number} row
   * @param {number} col
   * @param {number} value
   */
  isValidMove(row, col, value) {
    const board = this.sudoku.board;

    // Check row
    for (let c = 0; c < 9; c++) {
      if (board[row][c].value === value && c !== col) return false;
    }

    // Check column
    for (let r = 0; r < 9; r++) {
      if (board[r][col].value === value && r !== row) return false;
    }

    // Check 3x3 box
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (board[r][c].value === value && r !== row && c !== col) return false;
      }
    }

    return true;
  }
}
