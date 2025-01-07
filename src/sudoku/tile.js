export default class Tile {
  /**
   * @param {number} row
   * @param {number} col
   * @param {number} value
   */
  constructor(row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.element = null;
    this.pencilMarks = [];
  }

  render() {
    const tileEl = document.createElement('div');
    tileEl.classList.add('tile');

    if (this.value) {
      tileEl.textContent = this.value;
    }

    this.element = tileEl;
    return tileEl;
  }
}
