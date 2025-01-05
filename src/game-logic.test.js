import { setupBoard, isValidMove, placeNumber, resetBoard, getBoard } from './game-logic.js';

describe('Sudoku Game Logic', () => {
  describe('setupBoard()', () => {
    test('should set initial values on the board', () => {
      setupBoard([{ row: 0, col: 0, value: 5 }]);
      const board = getBoard();
      expect(board[0][0]).toBe(5);
    });

    test('should overwrite existing values when resetting board', () => {
      setupBoard([{ row: 0, col: 0, value: 5 }]);
      setupBoard([{ row: 0, col: 1, value: 3 }]);
      const board = getBoard();
      expect(board[0][0]).toBeNull();
      expect(board[0][1]).toBe(3);
    });
  });

  describe('resetBoard()', () => {
    test('should reset the board to null values', () => {
      setupBoard([{ row: 0, col: 0, value: 5 }]);
      resetBoard();
      const board = getBoard();
      expect(board[0][0]).toBeNull();
    });
  });

  describe('isValidMove()', () => {
    beforeEach(() => {
      resetBoard();
    });

    test('should return true for a valid move', () => {
      const result = isValidMove(0, 0, 5);
      expect(result).toBe(true);
    });

    test('should return false for placing a duplicate value in the same row', () => {
      setupBoard([{ row: 0, col: 1, value: 5 }]);
      const result = isValidMove(0, 0, 5);
      expect(result).toBe(false);
    });

    test('should return false for placing a duplicate value in the same column', () => {
      setupBoard([{ row: 1, col: 0, value: 5 }]);
      const result = isValidMove(0, 0, 5);
      expect(result).toBe(false);
    });

    test('should return false for placing a duplicate value in the same 3x3 grid', () => {
      setupBoard([{ row: 1, col: 1, value: 5 }]);
      const result = isValidMove(0, 0, 5);
      expect(result).toBe(false);
    });
  });

  describe('placeNumber()', () => {
    beforeEach(() => {
      resetBoard();
    });

    test('should place a number if the move is valid', () => {
      const result = placeNumber(0, 0, 5);
      const board = getBoard();
      expect(result).toBe(true);
      expect(board[0][0]).toBe(5);
    });

    test('should not place a number if the move is invalid', () => {
      setupBoard([{ row: 0, col: 1, value: 5 }]);
      const result = placeNumber(0, 0, 5);
      const board = getBoard();
      expect(result).toBe(false);
      expect(board[0][0]).toBeNull();
    });
  });
});
