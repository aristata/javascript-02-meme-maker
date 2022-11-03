const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

// 라인의 굵기
context.lineWidth = 2;

// 컬러
const colors = [
  "#f03e3e",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14"
];

let moveToX = 0;
let moveToY = 0;

function getRandomLoc() {
  return Math.floor(Math.random() * 800);
}

function moveToClickPoint(e) {
  moveToX = getRandomLoc();
  moveToY = getRandomLoc();
}

canvas.addEventListener("click", moveToClickPoint);

function drawLineToMousePoint(e) {
  context.beginPath();

  context.moveTo(moveToX, moveToY);

  const randomNumber = Math.floor(Math.random() * colors.length);
  const color = colors[randomNumber];
  context.strokeStyle = color;

  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
}

canvas.addEventListener("mousemove", drawLineToMousePoint);
