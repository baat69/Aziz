const platform = document.getElementById('platform');
const ball = document.getElementById('ball');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');

let ballPosition = 0;
let ballVelocity = 0;
let player1Points = 0;
let player2Points = 0;
let gameActive = true;

const IMPULSE_FORCE = 2;
const FRICTION = 0.98;
const PLATFORM_WIDTH = 380; // Updated from 300
const MAX_BALL_MOVEMENT = (PLATFORM_WIDTH - 30) / 2; // Now based on platform width

function updateBall() {
    if (!gameActive) return;

    // Apply friction to gradually slow down
    ballVelocity *= FRICTION;

    // Update position based on velocity
    ballPosition += ballVelocity;

    // Check if ball reaches platform edges
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

function pushBall(direction) {
    if (!gameActive) return;
    ballVelocity += direction * IMPULSE_FORCE;
}

function updateScores() {
    player1Score.textContent = `Player 1: ${player1Points}`;
    player2Score.textContent = `Player 2: ${player2Points}`;
}

function resetRound(message) {
    gameActive = false;
    alert(message);
    ballPosition = 0;
    ballVelocity = 0;
    ball.style.transform = `translateX(-50%) rotate(0deg)`;
    setTimeout(() => gameActive = true, 1000);
}

// Button controls
leftBtn.addEventListener('click', () => pushBall(-1));
rightBtn.addEventListener('click', () => pushBall(1));

// Game loop
setInterval(updateBall, 16);

// Initialize
updateScores();
