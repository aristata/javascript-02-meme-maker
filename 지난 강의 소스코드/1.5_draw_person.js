const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// canvas 의 크기를 정한다
canvas.width = 800;
canvas.height = 800;

// 팔
context.fillRect(210 - 40, 200 - 40, 15, 100);
context.fillRect(350 - 40, 200 - 40, 15, 100);

// 몸
context.fillRect(260 - 40, 200 - 40, 60, 200);

// 머리
context.arc(250, 100, 50, 0, 2 * Math.PI);
context.fill();

// 눈
context.beginPath();
context.fillStyle = "red";
context.arc(270, 80, 8, 1 * Math.PI, 2 * Math.PI);
context.arc(230, 80, 8, 1 * Math.PI, 2 * Math.PI);
context.fill();
