const canvas = document.querySelector("canvas");

// context 는 일종의 붓이다
// canvas 에서 getContext 함수를 사용해 canvas 에 내용물을 그릴 수 있는 붓을 얻는다
// 우리는 canvas 가 제공하는 붓(context) 중 2D 를 그릴 것이기 때문에 아규먼트로 "2d" 를 넘겼다
const context = canvas.getContext("2d");

// canvas 의 크기를 정한다
canvas.width = 800;
canvas.height = 800;

// 채워진 사각형을 그린다
// canvas 에서 왼쪽 모서리가 좌표 0, 0 이다
context.fillRect(50, 50, 100, 200);
