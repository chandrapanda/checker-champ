//grab canvas through variable instantiation
var canvas = document.getElementById("canvasCheckerboard");

console.log("Welcome to the CHECKERBOARD, CHAMP!");

//set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//context variable
var ctx = canvas.getContext("2d");
//context font
ctx.font = "bold 24px Arial";

//instantiate device pixel ratio
const dpr = window.devicePixelRatio;
const { width, height } = canvas.getBoundingClientRect();
canvas.width = Math.round(width * dpr);
canvas.height = Math.round(height * dpr);

//Create squares for game board
// ctx.fillStyle = "rgba(60, 179, 113, 0.5)";
// ctx.fillRect(400, 100, 100, 100);
// ctx.fillStyle = "rgba(60, 60, 60, 0.5)";
// ctx.fillRect(300, 300, 100, 100);

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
  createCheckerBoard();
});

//object for square on game board
// function Square(x, y, width, height, color) {
//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.height = height;
//   this.color = color;
//create method within object to draw each square
//   this.draw = function () {
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//   };
// }

//TODO: two different draws : static (game board) & interactive (pieces)

//circle object for gamepieces
function Circle(x, y, dx, dy, radius, color) {
  this.xAxis = x;
  this.yAxis = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = color;
  //create method within object
  this.draw = function () {
    // Drawing arc / circle
    ctx.beginPath();
    // //arc() takes x, y, radius, startAngle, endAngle, drawCounterClockwise
    ctx.arc(this.xAxis, this.yAxis, this.radius, 0, Math.PI * 2, false);

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.stroke();
    ctx.fill();
  };
  this.update = function () {
    if (this.xAxis + this.radius > innerWidth || this.xAxis - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (
      this.yAxis + this.radius > innerHeight ||
      this.yAxis - this.radius < 0
    ) {
      this.dy = -this.dy;
    }
    this.xAxis += this.dx;
    this.yAxis += this.dy;

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
  };
}
//memory object (array of objects within an array) to access where on the board the pieces lie
//(use object like type:basePiece / kingPiece)
let whiteTeamPiece = "white";
let blackTeamPiece = "black";
let whiteKingPiece = "whiteKing";
let blackKingPiece = "blackKing";

const pieceLocations = [
  //rows & columns
  [{}, { team: whiteTeamPiece }, {}, {}, {}, {}, {}, { team: blackTeamPiece }],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, { team: whiteTeamPiece }, {}, {}, {}, {}, {}, { team: blackTeamPiece }],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, { team: whiteTeamPiece }, {}, {}, {}, {}, {}, { team: blackTeamPiece }],
  [{}, {}, { team: blackTeamPiece }, {}, { team: blackTeamPiece }, {}, {}, {}],
  [{}, {}, {}, {}, {}, { team: whiteKingPiece }, {}, { team: blackTeamPiece }],
  [{ team: blackKingPiece }, {}, {}, {}, {}, {}, {}, {}],
];
console.log(pieceLocations);
//TODO: grab center coordinates for each square drawn so gamepiece objects have a reference point
function createCheckerBoard() {
  console.log("createCheckerBoard called");
  let squareSize = canvas.height / 12;
  let topBoardHorizontal = canvas.height / 12;
  let topBoardVertical = canvas.height / 12;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle =
        (i + j) % 2 == 0 ? "rgba(60, 179, 113, 0.5)" : "rgba(60, 60, 60, 0.8)";
      let x = topBoardHorizontal + j * squareSize;
      let y = topBoardVertical + i * squareSize;
      ctx.fillRect(x, y, squareSize, squareSize);
    }
    drawGamePieces(pieceLocations);
  }
}

function drawGamePieces(pieceLocations) {
  let squareSize = canvas.height / 12;
  //instantiate player pieces and their coordinates to dynamically render
  let playerOnePieces = [];
  let playerTwoPieces = [];
  //iterate through piece locations and stick them where they should go
  for (let row = 0; row < pieceLocations.length; row++) {
    for (let column = 0; column < pieceLocations[row].length; column++) {
      let currentSpace = pieceLocations[row][column];
      if (currentSpace.team == "white") {
        //render game pieces according to axes
        let xCoord = squareSize * (row + 1) + squareSize / 2;
        let yCoord = squareSize * (column + 1) + squareSize / 2;
        console.log(xCoord + "y coord " + yCoord);
        //draw white gamepieces
        let newGamePiece = ctx.beginPath();
        ctx.arc(xCoord, yCoord, 20, 0, Math.PI * 2, false);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        playerOnePieces.push(newGamePiece);
        console.log(
          "column " + column + " row " + row + " THERE IS A WHITE PLAYER HERE"
        );
      } else if (currentSpace.team == "black") {
        let xCoord = squareSize * (row + 1) + squareSize / 2;
        let yCoord = squareSize * (column + 1) + squareSize / 2;
        console.log(xCoord + "y coord " + yCoord);
        //draw white gamepieces
        let newGamePiece = ctx.beginPath();
        ctx.arc(xCoord, yCoord, 20, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        playerTwoPieces.push(newGamePiece);
        console.log(
          "column " + column + " row " + row + " THERE IS A BLACK PLAYER HERE"
        );
      } else if (currentSpace.team == "blackKing") {
        let xCoord = squareSize * (row + 1) + squareSize / 2;
        let yCoord = squareSize * (column + 1) + squareSize / 2;
        console.log(xCoord + "y coord " + yCoord);
        //draw black king gamepieces
        let newGamePiece = ctx.beginPath();
        ctx.arc(xCoord, yCoord, 20, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        playerTwoPieces.push(newGamePiece);
        ctx.font = "bold 14px";
        ctx.strokeText("K", xCoord - 8, yCoord + 8);
      } else if (currentSpace.team == "whiteKing") {
        let xCoord = squareSize * (row + 1) + squareSize / 2;
        let yCoord = squareSize * (column + 1) + squareSize / 2;
        //draw white king gamepieces
        let newGamePiece = ctx.beginPath();
        ctx.arc(xCoord, yCoord, 20, 0, Math.PI * 2, false);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.strokeText("K", xCoord - 8, yCoord + 8);
        playerOnePieces.push(newGamePiece);
      }
    }
  }

  // console.log("drawGamePieces called");

  // for (let i = 0; i < 12; i++) {
  //   //draw black gamepieces
  //   let newGamePiece = ctx.beginPath();
  //   ctx.arc(115 + i * 100, 200 + i * 100, 20, 0, Math.PI * 2, false);
  //   ctx.fillStyle = "black";
  //   ctx.strokeStyle = "white";
  //   ctx.fill();
  //   ctx.stroke();
  //   ctx.closePath();
  //   playerTwoPieces.push(newGamePiece);
  // }
}
// let circleArray = [];

// function init() {
//   circleArray = [];
//   for (let i = 0; i < 400; i++) {
//     var radius = Math.random() * 3 + 1;
//     //set axes so that circles cannot break through borders of screen and get caught on edge where spawned
//     var x = Math.random() * (innerWidth - radius * 2) + radius;
//     var y = Math.random() * (innerHeight - radius * 2) + radius;
//     var dx = Math.random() - 0.5;
//     var dy = Math.random() - 0.5;
//     let colorR = Math.random() * 255;
//     let colorB = Math.random() * 255;
//     let colorG = Math.random() * 255;
//     let colorA = Math.random();
//     let randomColor = `rgba(${colorR}, ${colorB}, ${colorG}, ${colorA} )`;
//     circleArray.push(new Circle(x, y, dx, dy, radius, randomColor));
//     //   var circle = new Circle(200, 200, 3, 3, 30);
//   }
// }

// function animate() {
//   //requestAnimationFrame takes another function has argument
//   requestAnimationFrame(animate);
//   //clear canvas
//   ctx.clearRect(0, 0, innerWidth, innerHeight);
//   console.log("animate is being called");
//   for (let i = 0; i < circleArray.length; i++) {
//     circleArray[i].update();
//   }
// }
// animate();
createCheckerBoard();

//procedurally generate circles using a for loop
// for (let i = 0; i < 8; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   let colorR = Math.random() * 255;
//   let colorB = Math.random() * 255;
//   let colorG = Math.random() * 255;
//   let colorA = Math.random();
//   let randomColor = `rgba(${colorR}, ${colorB}, ${colorG}, ${colorA} )`;
//   ctx.beginPath();
//   ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//   ctx.strokeStyle = randomColor;
//   ctx.stroke();
// }

//
