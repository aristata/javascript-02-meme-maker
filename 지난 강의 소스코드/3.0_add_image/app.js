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

function onChangeFile(event) {
  // 파일을 배열로 입력받을 수 있다.
  // multiple 속성을 사용하면 여러개의 파일을 선택할 수 있는데,
  // 이 경우를 대비하여 배열로 데이터를 받도록 설계되어 있다
  // 여기에서는 multiple 속성을 사용하지 않았기 때문에 첫번째 데이터만 있다고 확신할 수 있다
  const file = event.target.files[0];

  // file 에서 URL 을 생성한다
  // 이 URL 은 해당 브라우저에서만 접근가능한 임시 URL 이다
  const url = URL.createObjectURL(file);

  // image 엘리먼트를 생성한다
  // <image src="" />
  const image = new Image();
  image.src = url;

  // addEventListener 를 화살표 함수로 작성해 보았다
  // onXXX = function 은 addEventListener("XXX", function) 과 같다
  image.onload = () => {
    // 캔버스에 이미지를 그린다
    context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 파일 인풋의 값을 초기화 시킨다
    fileInput.value = null;
  };
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
