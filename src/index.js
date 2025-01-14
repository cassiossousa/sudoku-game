import { SudokuGame, examples } from './game';

const randomExample = examples[Math.floor(Math.random() * examples.length)];
const game = new SudokuGame(document.querySelector('.board'), randomExample);

game.start();
