
export class Tile {
  /**
   * @param {number} row
   * @param {number} col
   * @param {number} value
   * @param {boolean} isInitial
   * @param {number[]} guesses
   */
  constructor(row, col, value, isInitial, guesses = []) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.isInitial = isInitial;
    this.guesses = guesses;
  }

  render() {
    const tileDiv = document.createElement('div');
    tileDiv.classList.add('tile');

    if (this.isInitial) {
      tileDiv.classList.add('initial');
    }

    if (this.value) {
      tileDiv.textContent = this.value;
    }

    return tileDiv;
  };
}