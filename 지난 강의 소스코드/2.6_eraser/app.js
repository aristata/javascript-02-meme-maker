// dom selector ----------------------------------------------------------------
const canvas = document.querySelector("canvas");
const lineWidthInput = document.getElementById("line-width-input");
const colorInput = document.querySelector("#color-input");
const colorOptions = document.querySelectorAll(".color-options");
const changeModeButton = document.querySelector("#change-mode-button");
const currentModeSpan = document.querySelector("#current-mode-span");
const destroyButton = document.querySelector("#destory-button");
const eraserButton = document.querySelector("#eraser-button");

const context = canvas.getContext("2d");
context.lineWidth = lineWidthInput.value;

// grobal variable -------------------------------------------------------------
let isPainting = false;
let isFilling = false;
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

// functions -------------------------------------------------------------------
function onMoveMouse(event) {
  if (isPainting) {
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    return;
  }
  context.moveTo(event.offsetX, event.offsetY);
}

function onStartPainting() {
  isPainting = true;
}

function onCancelPainting() {
  isPainting = false;
  context.beginPath();
}

function onChangeLineWidth(event) {
  context.lineWidth = event.target.value;
}

function changeColor(newColor) {
  context.strokeStyle = newColor;
  context.fillStyle = newColor;
}

function onChangeColor(event) {
  changeColor(event.target.value);
}

function onClickColorOption(event) {
  changeColor(event.target.dataset.color);
  colorInput.value = event.target.dataset.color;
}

function onClickChangeModeButton() {
  if (isFilling) {
    isFilling = false;
    currentModeSpan.innerText = '현재 모드는 "그리기" 모드';
  } else {
    isFilling = true;
    currentModeSpan.innerText = '현재 모드는 "채우기" 모드';
  }
}

function onClickCanvas() {
  if (isFilling) {
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onClickDestroyButton() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onClickEraserButton() {
  context.strokeStyle = "white";
  colorInput.value = "#ffffff";
  isFilling = false;
  currentModeSpan.innerText = '현재 모드는 "그리기" 모드';
}

// event listener --------------------------------------------------------------
canvas.addEventListener("mousemove", onMoveMouse);
canvas.addEventListener("mousedown", onStartPainting);
canvas.addEventListener("mouseup", onCancelPainting);
canvas.addEventListener("mouseleave", onCancelPainting);
lineWidthInput.addEventListener("change", onChangeLineWidth);
colorInput.addEventListener("change", onChangeColor);
Array.from(colorOptions).forEach((colorOption) =>
  colorOption.addEventListener("click", onClickColorOption)
);
changeModeButton.addEventListener("click", onClickChangeModeButton);
canvas.addEventListener("click", onClickCanvas);
destroyButton.addEventListener("click", onClickDestroyButton);
eraserButton.addEventListener("click", onClickEraserButton);
