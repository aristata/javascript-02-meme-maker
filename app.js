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
// context.fillRect(50, 50, 100, 200);

// 위의 방식은 축약형 이다
// 원래 대로라면 하나씩 컨트롤 한다
context.rect(50, 50, 100, 100);
context.rect(150, 150, 100, 100);
context.rect(250, 250, 100, 100);

// fill 함수를 호출할 때 화면에 그려진다
// fill 은 내용을 채운다
context.fill();

// 테두리만 그릴땐 stroke 를 사용한다
// context.stroke();

// 빨간색을 적용해서 그렸다
context.rect(350, 350, 100, 100);
context.fillStyle = "red";
context.fill();
// 우리가 의도한 바는 앞의 3개는 검은색이고, 마지막 사각형만 빨간색인 것이다
// 하지만 앞서 그린 사각형들도 빨간색으로 변했다
// 그 이유는 fillStyle 을 적용할때 기존의 context 까지 모두 적용되었기 때문이다

context.beginPath();
context.rect(450, 450, 100, 100);
context.fillStyle = "blue";
context.fill();
// beginPath 함수를 사용하면 이후 새로운 경로로 그린다
// 앞의 context 는 무시하고, 이후의 context 에만 적용되는 것이다
