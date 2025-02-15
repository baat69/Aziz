const platform = document.getElementById('platform');
const ball = document.getElementById('ball');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');

let platformAngle = 0;
let ballPosition = 0;
let ballVelocity = 0;
let player1Points = 0;
let player2Points = 0;
let gameActive = true;

const GRAVITY = 0.08;
const FRICTION = 0.995;
const MAX_ANGLE = 30;
const BALL_MAX_SPEED = 3;

let isFalling = false;

function updateBallPhysics() {
    if (!gameActive) return;
    
    // More realistic ball physics with speed limit
    const gravityEffect = Math.sin(platformAngle * Math.PI / 180) * GRAVITY;
    ballVelocity += gravityEffect;
    
    // Apply friction
    ballVelocity *= FRICTION;
    
    // Limit ball speed
    if (Math.abs(ballVelocity) > BALL_MAX_SPEED) {
        ballVelocity = Math.sign(ballVelocity) * BALL_MAX_SPEED;
    }
    
    ballPosition += ballVelocity;
    
    // Keep ball within limits
    const maxDistance = 50;
    if (Math.abs(ballPosition) > maxDistance) {
        if (Math.abs(ballPosition) > maxDistance + 20) {
            const fellOnLeft = ballPosition < 0;
            if (fellOnLeft) {
                player2Points++;
            } else {
                player1Points++;
            }
            updateScores();
            resetRound(fellOnLeft ? 'Player 2 scores!' : 'Player 1 scores!');
            return;
        }
    }
    
    // Update ball position
    ball.style.transform = `translateX(calc(-50% + ${ballPosition}px))`;
}

function updateScores() {
    player1Score.textContent = `Player 1: ${player1Points}`;
    player2Score.textContent = `Player 2: ${player2Points}`;
}

function resetRound(message) {
    gameActive = false;
    alert(message);
    platformAngle = 0;
    ballPosition = 0;
    ballVelocity = 0;
    platform.style.transform = `translateX(-50%) rotate(${platformAngle}deg)`;
    ball.style.transform = `translateX(-50%)`;
    setTimeout(() => gameActive = true, 1000);
}

// Update autoTilt for smoother movement
function autoTilt() {
    if (!gameActive) return;
    
    // More gradual tilting
    platformAngle += (Math.random() - 0.5) * 2; // Reduced from 3
    platformAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, platformAngle));
    platform.style.transform = `translateX(-50%) rotate(${platformAngle}deg)`;
}

// Reverse controls for competitive gameplay
leftBtn.addEventListener('click', () => {
    if (!gameActive) return;
    platformAngle = Math.min(MAX_ANGLE, platformAngle + 8);
    platform.style.transform = `translateX(-50%) rotate(${platformAngle}deg)`;
});

rightBtn.addEventListener('click', () => {
    if (!gameActive) return;
    platformAngle = Math.max(-MAX_ANGLE, platformAngle - 8);
    platform.style.transform = `translateX(-50%) rotate(${platformAngle}deg)`;
});

// Adjust game loop timing
clearInterval(updateBallPhysics); // Clear any existing intervals
clearInterval(autoTilt);
setInterval(updateBallPhysics, 20); // Slightly slower updates (was 16)
setInterval(autoTilt, 2000); // Slower tilting (was 1500)

// Initialize game
updateScores();
