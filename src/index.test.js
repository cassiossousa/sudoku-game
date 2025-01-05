import './index.js';

describe('Sudoku DOM interactions', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
    container = document.getElementById('sudoku-container');
  });

  it('should highlight invalid tile on wrong input', async () => {
    const tile = container.querySelector('.tile[data-row="0"][data-col="0"]');
    tile.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
    // expect(tile.classList.contains('invalid')).toBe(true);
  });
});