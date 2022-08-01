const PADDLE_COLOR = "white";
const PADDLE_SPEED = 1;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
let paddle;

function initPaddle() {
  console.log("initPaddle");
  paddle = {
    dim: {
      x : PADDLE_WIDTH,
      y : PADDLE_HEIGHT,
    },
    halfDim: {
      x : PADDLE_WIDTH / 2,
      y : PADDLE_HEIGHT / 2,
    },
    pos: {
      x: can.width / 2,
      y: can.height - 40,
    },
  };
}

function drawPaddle() {
  con.fillStyle = PADDLE_COLOR;
  con.translate(paddle.pos.x, paddle.pos.y);
  con.fillRect(-paddle.halfDim.x, -paddle.halfDim.y, paddle.dim.x, paddle.dim.y);
  con.translate(-paddle.pos.x, -paddle.pos.y);
}

function updatePaddle(timeChange) {
  paddle.pos.x += PADDLE_SPEED * timeChange * (keyState.right - keyState.left);
  if (paddle.pos.x > can.width - paddle.halfDim.x) {
    paddle.pos.x = can.width - paddle.halfDim.x;
  }
  if (paddle.pos.x < paddle.halfDim.x) {
    paddle.pos.x = paddle.halfDim.x;
  }
}
