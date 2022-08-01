const NUM_BRICK_COLS = 30;
const NUM_BRICK_ROWS = 12;
const BRICK_ASPECT_RATIO = 1.3;
const BRICK_FILL_COLOR = "grey";
const BRICK_STROKE_COLOR = "black";
const BRICK_STROKE_SIZE = 5;

let bricks = [];
let brickWidth, brickHeight;
let brickBottom;
let brickRX;
let brickRY;

function initBricks() {
  console.log("initBricks");
  brickWidth = can.width / NUM_BRICK_COLS;
  brickHeight = brickWidth / BRICK_ASPECT_RATIO;
  brickBottom = NUM_BRICK_ROWS * brickHeight + BRICK_STROKE_SIZE / 2;
  brickRX = (brickWidth + BRICK_STROKE_SIZE) / 2;
  brickRY = (brickHeight + BRICK_STROKE_SIZE) / 2;
  for (let row = 0; row < NUM_BRICK_ROWS; ++row) {
    for (let col = 0; col < NUM_BRICK_COLS; ++col) {
      let brick = {};
      brick.pos = { x: (col + 0.5) * brickWidth, y: (row + 0.5) * brickHeight };
      brick.top = brick.pos.y - brickRY;
      brick.bottom = brick.pos.y + brickRY;
      brick.right = brick.pos.x + brickRX;
      brick.left = brick.pos.x - brickRX;
      bricks.push(brick);
    }
  }
}

function drawBricks() {
  con.fillStyle = BRICK_FILL_COLOR;
  con.strokeStyle = BRICK_STROKE_COLOR;
  con.lineWidth = BRICK_STROKE_SIZE;
  for (let brick of bricks) {
    con.translate(brick.pos.x, brick.pos.y);
    con.fillRect(-brickWidth / 2, -brickHeight / 2, brickWidth, brickHeight);
    con.strokeRect(-brickWidth / 2, -brickHeight / 2, brickWidth, brickHeight);
    con.translate(-brick.pos.x, -brick.pos.y);
  }
}

function updateBricks(timeChange) {}
