import { setupBoard, renderBoard } from './game-logic.js';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const container = document.createElement('div');
    container.id = 'sudoku-container';
    container.classList.add('sudoku-grid');
    root.appendChild(container);

    setupBoard([
        { row: 0, col: 0, value: 5 },
        { row: 1, col: 3, value: 7 },
        { row: 4, col: 4, value: 6 },
    ]);

    renderBoard(container);
});
