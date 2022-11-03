// dom selector ----------------------------------------------------------------
const canvas = document.querySelector("canvas");
const lineWidthInput = document.getElementById("line-width-input");
const colorInput = document.querySelector("#color-input");
const colorOptions = document.querySelectorAll(".color-options");
const changeModeButton = document.querySelector("#changeModeButton");
const currentModeSpan = document.querySelector("#currentModeSpan");

const context = canvas.getContext("2d");
context.lineWidth = lineWidthInput.value;

// grobal variable -------------------------------------------------------------
let isPainting = false;
let isFilling = false;

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

// 모드 변경 함수
function onClickChangeModeButton() {
  if (isFilling) {
    // 채우기 모드인 경우 그리기 모드로 변경한다
    isFilling = false;
    currentModeSpan.innerText = '현재 모드는 "그리기" 모드';
  } else {
    // 그리기 모드인 경우 채우기 모드로 변경한다
    isFilling = true;
    currentModeSpan.innerText = '현재 모드는 "채우기" 모드';
  }
}

function onClickCanvas() {
  if (isFilling) {
    context.fillRect(0, 0, 800, 800);
  }
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

// 버튼에 이벤트 걸기
changeModeButton.addEventListener("click", onClickChangeModeButton);

// 캔버스에 이벤트 걸기
canvas.addEventListener("click", onClickCanvas);
