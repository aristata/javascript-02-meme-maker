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

/*
 * 유저가 마우스를 움직일 때마다 moveTo 값을 변경한다
 * 유저가 클릭하면, 클릭한 곳에서부터 선을 그린다
 */
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
function onCancelPainting() {
  isPainting = false;
}
canvas.addEventListener("mousemove", moveMouse);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", onCancelPainting);
canvas.addEventListener("mouseleave", onCancelPainting);
