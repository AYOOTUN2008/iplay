let currentPlayer = 'X';
let mode = 'human'; // Default mode is human vs human
let moves = 0;
let gameEnded = false;
let rounds = 1; // Default rounds
let scoreX = 0;
let scoreO = 0;

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

const cells = document.querySelectorAll('.cell');
const turnDisplay = document.getElementById('turn');
const scoreDisplay = document.getElementById('score');
const winnerDisplay = document.getElementById('winner');
const restartBtn = document.getElementById('restartBtn');
const humanBtn = document.getElementById('humanBtn');
const botBtn = document.getElementById('botBtn');
const roundsInput = document.getElementById('roundsInput');

// Event listeners for game mode buttons and rounds input
humanBtn.addEventListener('click', () => setMode('human'));
botBtn.addEventListener('click', () => setMode('bot'));
roundsInput.addEventListener('change', () => {
    rounds = parseInt(roundsInput.value) || 1;
    restartGame();
});

// Function to set game mode
function setMode(selectedMode) {
    mode = selectedMode;
    restartGame();
    if (mode === 'bot' && currentPlayer === 'O') {
        makeBotMove();
    }
}

// Function to handle player move
function makeMove(index) {
    if (gameEnded || cells[index].textContent !== '') return;

    cells[index].textContent = currentPlayer;
    moves++;

    if (checkWin()) {
        winnerDisplay.textContent = `Player ${currentPlayer} wins!`;
        if (currentPlayer === 'X') {
            scoreX++;
        } else {
            scoreO++;
        }
        updateScore();
        gameEnded = true;
    } else if (moves === 9) {
        winnerDisplay.textContent = 'It\'s a draw!';
        gameEnded = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnDisplay.textContent = `Turn: ${currentPlayer}`;

        if (mode === 'bot' && currentPlayer === 'O') {
            makeBotMove();
        }
    }

    // Check if a round has ended
    if (gameEnded && moves !== 0 && rounds > 1) {
        setTimeout(() => {
            rounds--;
            restartGame();
        }, 1000);
    }
}

// Function to make bot move (random move)
function makeBotMove() {
    let emptyCells = [...cells].filter(cell => cell.textContent === '');
    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        makeMove(Array.from(cells).indexOf(emptyCells[randomIndex]));
    }
}

// Function to check for a win
function checkWin() {
    return winCombos.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

// Function to update score display
function updateScore() {
    scoreDisplay.textContent = `Score - Player X: ${scoreX} | Player O: ${scoreO}`;
}

// Function to restart the game
function restartGame() {
    currentPlayer = 'X';
    moves = 0;
    gameEnded = false;
    turnDisplay.textContent = `Turn: ${currentPlayer}`;
    winnerDisplay.textContent = '';
    cells.forEach(cell => cell.textContent = '');

    if (mode === 'bot' && currentPlayer === 'O') {
        makeBotMove();
    }
}
