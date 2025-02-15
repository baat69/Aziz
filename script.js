const platform = document.getElementById('platform');
const ball = document.getElementById('ball');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');

let ballPosition = 0;
let ballDirection = 0;
let player1Points = 0;
let player2Points = 0;
let gameActive = true;

const PLATFORM_WIDTH = 380;
const MAX_BALL_MOVEMENT = (PLATFORM_WIDTH - 30) / 2;
const BALL_SPEED = 1; // Speed calibrated for ~6 seconds cross time

function updateBall() {
    if (!gameActive) return;

    // Update position based on direction
    ballPosition += ballDirection * BALL_SPEED;

    // Check boundaries
    if (Math.abs(ballPosition) >= MAX_BALL_MOVEMENT) {
        const winner = ballPosition < 0 ? 2 : 1;
        player1Points += winner === 1 ? 1 : 0;
        player2Points += winner === 2 ? 1 : 0;
        updateScores();
        resetRound(`Player ${winner} scores!`);
        return;
    }

    // Apply visual updates
    ball.style.transform = `translateX(calc(-50% + ${ballPosition}px)) rotate(${ballPosition * 2}deg)`;
}

function setBallDirection(direction) {
    if (!gameActive) return;
    ballDirection = direction;
}

function updateScores() {
    player1Score.textContent = `Player 1: ${player1Points}`;
    player2Score.textContent = `Player 2: ${player2Points}`;
}

function resetRound(message) {
    gameActive = false;
    alert(message);
    ballPosition = 0;
    ballDirection = 0;
    ball.style.transform = `translateX(-50%) rotate(0deg)`;
    setTimeout(() => gameActive = true, 1000);
}

// Reversed button controls
rightBtn.addEventListener('click', () => setBallDirection(-1)); // Move left when right button pressed
leftBtn.addEventListener('click', () => setBallDirection(1));  // Move right when left button pressed

// Game loop
setInterval(updateBall, 16);

// Initialize
updateScores();
