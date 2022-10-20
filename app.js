const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// canvas 의 크기를 정한다
canvas.width = 800;
canvas.height = 800;

// 벽
context.fillRect(200, 200, 50, 200);
context.fillRect(400, 200, 50, 200);

// 문
context.lineWidth = 2;
context.strokeRect(300, 300, 50, 100);

// 천장
context.fillRect(200, 200, 200, 20);

// 지붕
context.moveTo(200, 200);
context.lineTo(325, 100);
context.lineTo(450, 200);
context.fill();

// 바닥
context.moveTo(100, 400);
context.lineTo(550, 400);
context.stroke();
