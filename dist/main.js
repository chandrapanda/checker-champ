//grab canvas through variable instantiation
var canvas = document.querySelector("canvas");

//set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//context variable
var c = canvas.getContext("2d");

//Create rectangles for game board
// c.fillStyle = "rgba(60, 179, 113, 0.5)";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "rgba(60, 60, 60, 0.5)";
// c.fillRect(300, 300, 100, 100);

//instantiate mouse position
let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

//object for square on game board
function Square(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  //create method within object to draw each square
  this.draw = function () {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    // c.stroke();
    // c.fill();
  };

  //this is where interactivity occurs
  if (
    mouse.x - this.xAxis < 50 &&
    mouse.x - this.xAxis > -50 &&
    mouse.y - this.yAxis < 50 &&
    mouse.y - this.yAxis > -50
  ) {
    if (this.radius < maxRadius) {
      this.radius += 1;
    }
  } else if (this.radius > this.minRadius) {
    this.radius -= 1;
  }

  this.draw();
}

function init() {
  for (let i = 0; i < canvas.width; i += 200) {
    for (let j = 0; j < canvas.height; j += 200) {
      let square = new Square(i, j, 100, 100, "rgba(60, 179, 113, 0.5)");
      square.draw();
    }
  }
  for (let i = 100; i < canvas.width; i += 200) {
    for (let j = 100; j < canvas.height; j += 200) {
      let square = new Square(i, j, 100, 100, "rgba(60, 60, 60, 0.5)");
      square.draw();
    }
  }
}

// function animate() {
//   //requestAnimationFrame takes another function has argument
//   requestAnimationFrame(animate);
//   //clear canvas
//   c.clearRect(0, 0, innerWidth, innerHeight);
//   console.log("animate is being called");
//   for (let i = 0; i < circleArray.length; i++) {
//     circleArray[i].update();
//   }
// }
// animate();
init();

//procedurally generate circles using a for loop
// for (let i = 0; i < 8; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   let colorR = Math.random() * 255;
//   let colorB = Math.random() * 255;
//   let colorG = Math.random() * 255;
//   let colorA = Math.random();
//   let randomColor = `rgba(${colorR}, ${colorB}, ${colorG}, ${colorA} )`;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = randomColor;
//   c.stroke();
// }

//
