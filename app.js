// dom selector ----------------------------------------------------------------
const canvas = document.querySelector("canvas");
const lineWidthInput = document.getElementById("line-width-input");
const colorInput = document.querySelector("#color-input");
const colorOptions = document.querySelectorAll(".color-options");
const changeModeButton = document.querySelector("#change-mode-button");
const currentModeSpan = document.querySelector("#current-mode-span");
const destroyButton = document.querySelector("#destory-button");
const eraserButton = document.querySelector("#eraser-button");
const fileInput = document.querySelector("#file-input");

// 텍스트 인풋 찾기
const textInput = document.querySelector("#text-input");

// grobal variable -------------------------------------------------------------
const context = canvas.getContext("2d");
context.lineWidth = lineWidthInput.value;
context.lineCap = "round";
context.font = "50px 'gugi'";
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

function onChangeFile(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = () => {
    context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

// 더블 클릭시 실행할 함수
function onDoubleClickCanvas(event) {
  // 텍스트 인풋에서 데이터를 가져온다
  const text = textInput.value;

  // 텍스트 인풋의 데이터가 없다면 종료한다
  if (text.trim() === "") {
    return;
  } else {
    // 콘텍스트 임시 저장 = 현재 콘텍스트의 값들을 저장한다
    context.save();

    // 라인 너비를 수정한다
    context.lineWidth = 1;

    // 텍스트 폰트를 설정한다
    context.font = "50px 'gugi'";

    // 텍스트를 캔버스에 그린다
    context.fillText(text, event.offsetX, event.offsetY);

    // 콘텍스트를 원래대로 돌린다
    context.restore();
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
changeModeButton.addEventListener("click", onClickChangeModeButton);
canvas.addEventListener("click", onClickCanvas);
destroyButton.addEventListener("click", onClickDestroyButton);
eraserButton.addEventListener("click", onClickEraserButton);
fileInput.addEventListener("change", onChangeFile);

// 이벤트는 canvas 에 추가한다
canvas.addEventListener("dblclick", onDoubleClickCanvas);
