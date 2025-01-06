export class Tile {
  /**
   * @param {number} row
   * @param {number} col
   * @param {number} value
   * @param {boolean} isInitial
   */
  constructor(row, col, value, isInitial) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.isInitial = isInitial;
    this.element = null;
    this.guesses = [];
    this.isActive = false;
    this.isInvalid = false;
  }

  render() {
    const tileDiv = document.createElement('div');
    tileDiv.classList.add('tile');

    if (this.value) {
      tileDiv.textContent = this.value;
    }

    if (this.isInitial) {
      tileDiv.classList.add('initial');
    }

    if (this.isActive) {
      tileDiv.classList.add('active');
    }

    if (this.isInvalid) {
      tileDiv.classList.add('invalid');
    }

    this.element = tileDiv;
    return tileDiv;
  }
}
