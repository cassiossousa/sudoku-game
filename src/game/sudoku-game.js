import { Sudoku, Tile } from '../sudoku';

export default class SudokuGame {
  constructor(boardElement, initialValues) {
    this.boardElement = boardElement;
    this.initialValues = initialValues;
    this.sudoku = null;
    this.activeTileRow = null;
    this.activeTileCol = null;
    this.keypadEl = document && document.querySelector('div.keypad');
  }

  start() {
    this.sudoku = new Sudoku(this.boardElement);
    this.sudoku.restart(this.initialValues);
    this.updateSudoku();
    this.addListenersToKeypad();
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
      this.keypadEl.classList.add('hidden');
    } else {
      this.deactivateTile();

      tile.element.classList.add('active');
      this.activeTileRow = tile.row;
      this.activeTileCol = tile.col;

      if (this.keypadEl) {
        const rect = tile.element.getBoundingClientRect();
        this.repositionKeypad(rect, this.activeTileRow, this.activeTileCol);
        this.keypadEl.classList.remove('hidden');
      }
    }
  }

  deactivateTile() {
    if (this.activeTileRow === null || this.activeTileCol === null) return;
    const activeTile = this.sudoku.board[this.activeTileRow][this.activeTileCol];
    activeTile.element.classList.remove('active');
    this.activeTileRow = null;
    this.activeTileCol = null;
  }

  addListenersToKeypad() {
    if (!this.keypadEl) return;

    this.keypadEl.addEventListener('click', (e) => {
      if (this.activeTileRow === null || this.activeTileCol === null) return;

      const activeTile = this.sudoku.board[this.activeTileRow][this.activeTileCol];
      const key = e.target.dataset.key;

      if (key === 'clear') {
        activeTile.value = null;
      } else if (key) {
        activeTile.value = parseInt(key, 10);
      }

      // Hide keypad after selection
      this.keypadEl.classList.add('hidden');
      this.deactivateTile();
      this.updateSudoku();
    });

    if (!document) return;

    document.addEventListener('click', (e) => {
      if (!e.target.closest('div.tile') && !e.target.closest('div.keypad')) {
        this.keypadEl.classList.add('hidden');
        this.deactivateTile();
      }
    });
  }

  /**
   * @param {DOMRect} rect
   * @param {number} activeTileRow
   * @param {number} activeTileCol
   */
  repositionKeypad(rect, activeTileRow, activeTileCol) {
    if (!this.keypadEl) return;

    if (activeTileRow < 4) {
      this.keypadEl.style.top = `${rect.top + rect.height / 2.0 + window.scrollY}px`;
    } else {
      this.keypadEl.style.top = `${rect.bottom - rect.height / 2.0 + window.scrollY - this.keypadEl.clientHeight}px`;
    }

    if (activeTileCol < 4) {
      this.keypadEl.style.left = `${rect.right - rect.width / 2.0 + window.scrollX}px`;
    } else {
      this.keypadEl.style.left = `${rect.left + rect.width / 2.0 + window.scrollX - this.keypadEl.clientWidth}px`;
    }
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
