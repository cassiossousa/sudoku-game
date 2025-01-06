import { activateTile } from "../game-logic";
import { Tile } from "./tile";

export class Sudoku {

  /**
   * @param {HTMLElement} element 
   * @param {number[][]} initialValues 
   */
  constructor(element, initialValues) {
    this.element = element;
    this.initialValues = initialValues;
    this.board = Array.from({ length: 9 }, () => Array(9).fill(null));

    this.activeTileRow = null;
    this.activeTileCol = null;
  }

  start() {
    this.restart();
    this.update();
  }

  restart() {
    this.board = Array.from({ length: 9 }, () => Array(9).fill(null));

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        let tile;

        if (this.initialValues && this.initialValues[row] && this.initialValues[row][col]) {
          tile = new Tile(row, col, [this.initialValues[row][col]], true);
        } else {
          tile = new Tile(row, col, [], false);
        }

        this.board[row][col] = tile;
      }
    }
  };

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

            if (!this.board[row][col].isInitial) {
              tileDiv.addEventListener('click', () => {
                activateTile(this, this.board[row][col]);
              });
            }

            boxRowDiv.appendChild(tileDiv);
          }
        }
      }
    }

    return boardDiv;
  };

  update() {
    const newBoard = this.render();

    const parentElement = this.element.parentNode;
    parentElement.removeChild(this.element);

    this.element = newBoard;
    parentElement.appendChild(this.element);
  }
}
