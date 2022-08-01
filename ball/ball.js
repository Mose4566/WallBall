const BALL_COLOR = "white";
const BALL_SIZE = 15;
const BALL_SPEED = 0.4;
let ball;

function initBall() {
  console.log("initBall");
  let angle = getRandom(Math.PI / 4, (3 * Math.PI) / 4);
  ball = {
    // canBounce: false,
    willDie: false,
    dim: {
      x: BALL_SIZE,
      y: BALL_SIZE,
    },
    halfDim: {
      x: BALL_SIZE / 2,
      y: BALL_SIZE / 2,
    },
    pos: {
      x: can.width / 2,
      y: can.height / 2,
    },
    vel: { x: BALL_SPEED * Math.cos(angle), y: BALL_SPEED * Math.sin(angle) },
  };
}

function drawBall() {
  con.fillStyle = BALL_COLOR;
  con.translate(ball.pos.x, ball.pos.y);
  con.fillRect(-ball.halfDim.x, -ball.halfDim.y, ball.dim.x, ball.dim.x);
  con.translate(-ball.pos.x, -ball.pos.y);
}

function updateBall(timeChange) {
  let ballTop = ball.pos.y - ball.halfDim.y;
  let ballBottom = ball.pos.y + ball.halfDim.y;
  let ballRight = ball.pos.x + ball.halfDim.x;
  let ballLeft = ball.pos.x - ball.halfDim.x;
  // move the ball
  ball.pos.x += ball.vel.x * timeChange;
  ball.pos.y += ball.vel.y * timeChange;
  // check right wall collision
  if (ballRight > can.width) {
    ball.pos.x = can.width - ball.halfDim.x;
    ball.vel.x *= -1.0007;
  }
  // check left wall collision
  if (ballLeft < 0) {
    ball.pos.x = ball.halfDim.x;
    ball.vel.x *= -1.0007;
  }
  // check top wall collision
  if (ballTop < 0) {
    ball.pos.y = ball.halfDim.y;
    ball.vel.y *= -1.0007;
  }
  // only check paddle or bottom wall if ball moving downward
  if (ball.vel.y > 0) {
    if (ball.willDie) {
      // check bottom wall collision
      if (ballBottom > can.height) {
        ball.pos.y = can.height - ball.halfDim.y;
        ball.vel.y *= -1.0007;
        ball.willDie = false;
        // ball.canBounce = false;
      }
      // } else if (ball.canBounce) {
      //   ball.willDie = true;
    } else if (ballBottom > paddle.pos.y - paddle.halfDim.y) {
      // ball.canBounce = true;
      if (
        ballRight > paddle.pos.x - paddle.halfDim.x &&
        ballLeft < paddle.pos.x + paddle.halfDim.x
      ) {
        ball.pos.y = paddle.pos.y - paddle.halfDim.y - ball.halfDim.y;
        ball.vel.y *= -1.0007;
      } else {
        ball.willDie = true;
      }
    }
  }
  let keepers = [];
  let slopeVel = ball.vel.y / ball.vel.x;
  if (ball.pos.y < brickBottom + ball.halfDim.y) {
    for (let brick of bricks) {
      if (
        ballTop < brick.bottom &&
        ballBottom > brick.top &&
        ballLeft < brick.right &&
        ballRight > brick.left
      ) {
        // need to comapre penetration vector vs velocity vector slopes
        // but for now just randomize
        let dy, dx;
        if (ball.vel.y < 0) {
          dy = ballTop - brick.bottom;
        } else {
          dy = ballBottom - brick.top;
        }
        if (ball.vel.x < 0) {
          dx = ballLeft - brick.right;
        } else {
          dx = ballRight - brick.left;
        }
        let slopePEN = dy / dx;
        if (Math.abs(slopePEN) < Math.abs(slopeVel)) {
          ball.vel.y *= -1.0007;
        } else {
          ball.vel.x *= -1.0007;
        }
      } else {
        keepers.push(brick);
      }
    }
    bricks = keepers;
  }
}
