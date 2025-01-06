import { Tile } from '.';

export default class Sudoku {
  /**
   * @param {HTMLElement} element
   * @param {number[][]} initialValues
   */
  constructor(element) {
    this.element = element;
    this.board = Array.from({ length: 9 }, () => Array(9).fill(null));
  }

  /**
   * Restarts the Sudoku board with the given initial values.
   *
   * @param {number[][]} initialValues
   */
  restart(initialValues) {
    this.board = Array.from({ length: 9 }, () => Array(9).fill(null));

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        let tile;

        if (initialValues && initialValues[row] && initialValues[row][col]) {
          tile = new Tile(row, col, initialValues[row][col]);
        } else {
          tile = new Tile(row, col, null);
        }

        this.board[row][col] = tile;
      }
    }
  }

  render() {
    const boardDiv = document.createElement('div');
    boardDiv.classList.add('board');

    // First, we generate divs for each 3x3 box.
    for (let boardRow = 0; boardRow < 3; boardRow++) {
      const boardRowDiv = document.createElement('div');
      boardRowDiv.classList.add('board-row');
      boardDiv.appendChild(boardRowDiv);

      for (let boardCol = 0; boardCol < 3; boardCol++) {
        const boxDiv = document.createElement('div');
        boxDiv.classList.add('box');
        boardRowDiv.appendChild(boxDiv);

        // Then we generate the 9 tiles inside each 3x3 box.
        for (let boxRow = 0; boxRow < 3; boxRow++) {
          const boxRowDiv = document.createElement('div');
          boxRowDiv.classList.add('box-row');
          boxDiv.appendChild(boxRowDiv);

          for (let boxCol = 0; boxCol < 3; boxCol++) {
            const row = 3 * boardRow + boxRow;
            const col = 3 * boardCol + boxCol;
            const tileDiv = this.board[row][col].render();
            boxRowDiv.appendChild(tileDiv);
          }
        }
      }
    }

    return boardDiv;
  }

  update() {
    const newBoard = this.render();

    const parentElement = this.element.parentNode;
    parentElement.removeChild(this.element);

    this.element = newBoard;
    parentElement.appendChild(this.element);
  }
}
