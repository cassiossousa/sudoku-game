let board = Array.from({ length: 9 }, () => Array(9).fill(null));
let activeTile = null; // Track the active tile for input

export function setupBoard(initialValues) {
  initialValues.forEach(({ row, col, value }) => {
    board[row][col] = value;
  });
}

export function renderBoard(container) {
  container.innerHTML = ''; // Clear existing tiles
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.row = row;
      tile.dataset.col = col;

      if (board[row][col] !== null) {
        tile.textContent = board[row][col];
        tile.classList.add('filled');
      } else {
        tile.addEventListener('click', () => activateTile(tile));
      }
      container.appendChild(tile);
    }
  }
}

// Activate the clicked tile for keyboard input
function activateTile(tile) {
  if (tile.classList.contains('filled')) return;

  if (activeTile) {
    activeTile.classList.remove('active'); // Deactivate previous tile
  }
  tile.classList.add('active');
  activeTile = tile;
}

// Listen for keyboard events to fill the active tile
document &&
  document.addEventListener('keydown', (event) => {
    if (!activeTile) return;

    const value = Number(event.key);
    const row = activeTile.dataset.row;
    const col = activeTile.dataset.col;

    if (value >= 1 && value <= 9 && isValidMove(row, col, value)) {
      board[row][col] = value;
      activeTile.textContent = value;
      activeTile.classList.add('filled');
      activeTile.classList.remove('active');
      activeTile = null;
    } else if (event.key === 'Escape') {
      activeTile.classList.remove('active'); // Deselect on Escape
      activeTile = null;
    }
  });

// Validate the move (row, column, 3x3 box)
export function isValidMove(row, col, value) {
  row = Number(row);
  col = Number(col);

  // Check row
  if (board[row].includes(value)) return false;

  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === value) return false;
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === value) return false;
    }
  }
  return true;
}
