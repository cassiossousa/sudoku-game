import { isValidMove, setupBoard } from './game-logic';

describe('Sudoku Game Logic', () => {
  let board;

  beforeEach(() => {
    board = Array.from({ length: 9 }, () => Array(9).fill(null));
    setupBoard([
      { row: 0, col: 0, value: 5 },
      { row: 1, col: 3, value: 7 },
      { row: 4, col: 4, value: 6 },
    ]);
  });

  it('should set up the board with initial values', () => {
    expect(board[0][0]).toBe(5);
    expect(board[1][3]).toBe(7);
    expect(board[4][4]).toBe(6);
  });

  it('should allow a valid move', () => {
    const isValid = isValidMove(0, 1, 3);
    expect(isValid).toBe(true);
  });

  it('should not allow invalid row move', () => {
    const isValid = isValidMove(0, 1, 5);
    expect(isValid).toBe(false);
  });

  it('should not allow invalid column move', () => {
    const isValid = isValidMove(1, 3, 6);
    expect(isValid).toBe(false);
  });
});
