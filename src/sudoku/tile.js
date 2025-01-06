export class Tile {
  /**
   * @param {number} row
   * @param {number} col
   * @param {number} value
   * @param {boolean} isInitial
   */
  constructor(row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.element = null;
    this.guesses = [];
  }

  render() {
    const tileDiv = document.createElement('div');
    tileDiv.classList.add('tile');

    if (this.value) {
      tileDiv.textContent = this.value;
    }

    this.element = tileDiv;
    return tileDiv;
  }
}
