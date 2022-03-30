// constants
const CTX_WIDTH = 500;
const CTX_HEIGHT = 300;
const BUFFER = 10;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 50;
const BALL_SIZE = 10;

// json to keep track
var gameState = {
    P1: {
        // left paddle
        x: BUFFER,
        y: BUFFER,
        score: 0,
        speed: 0,
    },
    P2: {
        // right paddle
        x: CTX_WIDTH - (2 * BUFFER),
        y: CTX_HEIGHT - PADDLE_HEIGHT - BUFFER,
        score: 0,
        speed: 0,
    },
    Ball: {
        x: (CTX_WIDTH / 2),
        y: (CTX_HEIGHT / 2),
        xSpeed: -6,
        ySpeed: -6,
    }
}

// setup
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var p1Score = document.getElementById("P1Score");
var p2Score = document.getElementById("P2Score");

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, CTX_WIDTH, CTX_HEIGHT);

    ctx.fillStyle = "white";
    ctx.fillRect(gameState.P1.x, gameState.P1.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(gameState.P2.x, gameState.P2.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(gameState.Ball.x, gameState.Ball.y, BALL_SIZE, BALL_SIZE);

    p1Score.innerHTML = gameState.P1.score;
    p2Score.innerHTML = gameState.P2.score;
}

function startGame() {
    startButton.style.display = "none";
    var intervalID = setInterval(function update() {
        // update paddle position
        gameState.P1.y += gameState.P1.speed;
        gameState.P2.y += gameState.P2.speed;

        // update ball position
        gameState.Ball.x += gameState.Ball.xSpeed;
        gameState.Ball.y += gameState.Ball.ySpeed;

        // check for paddles outside of canvas area
        if (gameState.P1.y < 0) {
            gameState.P1.y = 0;
        }
        if (gameState.P2.y < 0) {
            gameState.P2.y = 0;
        }
        if (gameState.P1.y > CTX_HEIGHT - PADDLE_HEIGHT) {
            gameState.P1.y = CTX_HEIGHT - PADDLE_HEIGHT;
        }
        if (gameState.P2.y > CTX_HEIGHT - PADDLE_HEIGHT) {
            gameState.P2.y = CTX_HEIGHT - PADDLE_HEIGHT;
        }

        // check for ball window constraints and paddle hits
        if (gameState.Ball.y < 0) {
            gameState.Ball.ySpeed *= -1;
        }
        if (gameState.Ball.y > CTX_HEIGHT - BALL_SIZE) {
            gameState.Ball.ySpeed *= -1;
        }
        if ((gameState.Ball.x > gameState.P1.x + 5 && gameState.Ball.x < gameState.P1.x + 13 && gameState.Ball.y > gameState.P1.y - 2 && gameState.Ball.y < gameState.P1.y + PADDLE_HEIGHT + 2)) {
            gameState.Ball.xSpeed *= -1;
        }
        if ((gameState.Ball.x > gameState.P2.x - 13 && gameState.Ball.x < gameState.P2.x + 5 && gameState.Ball.y > gameState.P2.y - 2 && gameState.Ball.y < gameState.P2.y + PADDLE_HEIGHT + 2)) {
            gameState.Ball.xSpeed *= -1;
        }

        // check for ball score
        if (gameState.Ball.x < -10) {
            gameState.P2.score++;
            gameState.Ball.x = CTX_WIDTH / 2;
            gameState.Ball.y = CTX_HEIGHT / 2;
        }
        if (gameState.Ball.x > CTX_WIDTH + 10) {
            gameState.P1.score++;
            gameState.Ball.x = CTX_WIDTH / 2;
            gameState.Ball.y = CTX_HEIGHT / 2;
        }

        // draw to screen
        draw();

    }, 1000 / 20); // 20 frames per second
}

var startButton = document.getElementById("start-btn");
startButton.addEventListener("click", startGame);

document.addEventListener("keydown", function(e) {
    if (e.key === "w") {
        gameState.P1.speed = -10;
    }
    if (e.key === "s") {
        gameState.P1.speed = 10;
    }
    if (e.key === "o") {
        gameState.P2.speed = -10;
    }
    if (e.key === "l") {
        gameState.P2.speed = 10;
    }
})

document.addEventListener("keyup", function(e) {
    if (e.key === "w") {
        gameState.P1.speed = 0;
    }
    if (e.key === "s") {
        gameState.P1.speed = 0;
    }
    if (e.key === "o") {
        gameState.P2.speed = 0;
    }
    if (e.key === "l") {
        gameState.P2.speed = 0;
    }
})


