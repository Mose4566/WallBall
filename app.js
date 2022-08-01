let can;
let con;
let timePrior = 0;

window.onload = initApp;


function animate(timeNow) {
  let timeChange = timeNow - timePrior;
  updatePaddle(timeChange);
  updateBall(timeChange);
  updateBricks(timeChange);
  con.clearRect(0, 0, can.width, can.height);
  drawPaddle();
  drawBall();
  drawBricks();
  timePrior = timeNow;
  requestAnimationFrame(animate);
}

function initApp() {
  console.log("initApp")
  can = document.getElementById("can");
  can.width = "900";
  can.height = "600";
  con = can.getContext("2d");
  initBall();
  initBricks();
  initController();
  initPaddle();
  requestAnimationFrame(animate);
}

function getRandom(min, max) {
  let r = Math.random();
  r *= max - min;
  r += min;
  return r;
}