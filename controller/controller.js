let keyState = {
  left: 0,
  right: 0,
};

function handleKD(e) {
  switch (e.key) {
    case "ArrowLeft":
      keyState.left = 1;
      break;
    case "ArrowRight":
      keyState.right = 1;
      break;
  }
}

function handleKU(e) {
  switch (e.key) {
    case "ArrowLeft":
      keyState.left = 0;
      break;
    case "ArrowRight":
      keyState.right = 0;
      break;
  }
}

function initController() {
  window.addEventListener("keydown", handleKD);
  window.addEventListener("keyup", handleKU);
}
