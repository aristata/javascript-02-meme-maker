const canvas = document.querySelector("canvas");
const lineWidthInput = document.getElementById("line-width-input");

// color input 선택하기
const colorInput = document.querySelector("#color-input");

const context = canvas.getContext("2d");
context.lineWidth = lineWidthInput.value;

let isPainting = false;
function moveMouse(event) {
  if (isPainting) {
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    return;
  }
  context.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  context.beginPath();
}

function changeLineWidth(event) {
  context.lineWidth = event.target.value;
}

// color 변경 함수 추가하기
function onChangeColor(event) {
  context.strokeStyle = event.target.value;
  context.fillStyle = event.target.value;
}

canvas.addEventListener("mousemove", moveMouse);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidthInput.addEventListener("change", changeLineWidth);

// color input 에 이벤트 추가하기
colorInput.addEventListener("change", onChangeColor);
