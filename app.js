const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// canvas 의 크기를 정한다
canvas.width = 800;
canvas.height = 800;

// 채워진 사각형을 그린다
// canvas 에서 왼쪽 모서리가 좌표 0, 0 이다
// moveTo 는 해당 좌표로 이동한다
context.moveTo(50, 50);
// lineTo 는 해당 좌표로 이동하면서 선을 긋는다
context.lineTo(150, 50);
context.lineTo(150, 150);
context.lineTo(50, 150);
context.lineTo(50, 50);
context.stroke();
