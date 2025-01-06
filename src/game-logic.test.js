import {
  setupBoard,
  renderBoard,
  isValidMove,
  highlightInvalidTile,
  findAllValidNumbersFor,
  resetBoard,
  getBoard
} from './game-logic.js';

describe('Sudoku - Game Logic', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '<div id="sudoku-container"></div>';
    container = document.getElementById('sudoku-container');
    resetBoard();
  });

  describe('setupBoard()', () => {
    it('should set up the board with initial values', () => {
      const initialValues = [
        { row: 0, col: 0, value: 5 },
        { row: 4, col: 4, value: 7 }
      ];

      setupBoard(initialValues);
      const board = getBoard();

      expect(board[0][0]).toBe(5);
      expect(board[4][4]).toBe(7);
      expect(board[1][1]).toBe(null);  // Ensure untouched tiles remain null
    });
  });

  describe('renderBoard()', () => {
    it('should render empty tiles for null values', () => {
      renderBoard(container);
      const tiles = container.querySelectorAll('.tile');
      expect(tiles.length).toBe(81);  // 9x9 grid
      expect(tiles[0].textContent).toBe('');
    });

    it('should render filled tiles with correct values', () => {
      setupBoard([{ row: 0, col: 0, value: 5 }]);
      renderBoard(container);
      const tile = container.querySelector('.tile[data-row="0"][data-col="0"]');

      expect(tile.textContent).toBe('5');
      expect(tile.classList.contains('filled')).toBe(true);
    });
  });

  describe('highlightInvalidTile()', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should highlight a tile as invalid and clear it after timeout', () => {
      renderBoard(container);
      const tile = container.querySelector('.tile[data-row="0"][data-col="0"]');
      highlightInvalidTile(tile, 8);

      expect(tile.classList.contains('invalid')).toBe(true);
      expect(tile.textContent).toBe('8');

      jest.runAllTimers();  // Fast-forward time

      expect(tile.classList.contains('invalid')).toBe(false);
      expect(tile.textContent).toBe('');
    });
  });

  describe('isValidMove()', () => {
    it('should return true for a valid move', () => {
      expect(isValidMove(0, 0, 5)).toBe(true);
    });

    it('should return false if the tile already contains a value', () => {
      setupBoard([{ row: 0, col: 1, value: 5 }]);
    expect(isValidMove(0, 1, 3)).toBe(false);
    });

    it('should return false if the row already contains the value', () => {
      setupBoard([{ row: 0, col: 1, value: 5 }]);
      expect(isValidMove(0, 0, 5)).toBe(false);
    });

    it('should return false if the column already contains the value', () => {
      setupBoard([{ row: 1, col: 0, value: 3 }]);
      expect(isValidMove(0, 0, 3)).toBe(false);
    });

    it('should return false if the 3x3 box already contains the value', () => {
      setupBoard([{ row: 1, col: 1, value: 4 }]);
      expect(isValidMove(0, 0, 4)).toBe(false);
    });
  });

  describe('findAllValidNumbersFor()', () => {
    it('should return all possible valid numbers for an empty tile', () => {
      const validNumbers = findAllValidNumbersFor(0, 0);
      expect(validNumbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should return fewer options if row, col, or box is partially filled', () => {
      setupBoard([{ row: 0, col: 1, value: 3 }]);
      const validNumbers = findAllValidNumbersFor(0, 0);
      expect(validNumbers).not.toContain(3);
    });
  });

  describe('resetBoard()', () => {
    it('should reset the board to all null values', () => {
      setupBoard([{ row: 0, col: 0, value: 9 }]);
      resetBoard();
      const board = getBoard();
      expect(board[0][0]).toBe(null);
    });
  });

  describe('getBoard()', () => {
    it('should return the current state of the board', () => {
      const initialBoard = getBoard();
      expect(initialBoard).toHaveLength(9);
      expect(initialBoard[0]).toHaveLength(9);
    });

    it('should reflect changes made by setupBoard', () => {
      setupBoard([{ row: 1, col: 2, value: 4 }]);
      const board = getBoard();
      expect(board[1][2]).toBe(4);
    });
  });

  describe('Keyboard Event Simulation', () => {
    it('should fill a tile with a valid number when a key is pressed', () => {
      renderBoard(container);
      const tile = container.querySelector('.tile[data-row="0"][data-col="0"]');
      tile.click();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));

      expect(tile.textContent).toBe('5');
      expect(tile.classList.contains('filled')).toBe(true);
    });

    it('should not fill a filled tile', () => {
      setupBoard([{ row: 0, col: 0, value: 5 }]);
      renderBoard(container);
      const tile = container.querySelector('.tile[data-row="0"][data-col="0"]');

      tile.click();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: '3' }));

      expect(tile.textContent).toBe('5');  // Remains unchanged
    });

    it('should deactivate the active tile when Escape is pressed', () => {
      renderBoard(container);
      const tile = container.querySelector('.tile[data-row="0"][data-col="0"]');
      tile.click();

      expect(tile.classList.contains('active')).toBe(true);

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(tile.classList.contains('active')).toBe(false);
    });
  });
});
