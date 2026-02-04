const boxes = document.querySelectorAll(".box");
const boxText = document.querySelectorAll(".textBox");
const resetBtn = document.getElementById("reset");
const winnerDiv = document.getElementById("winner");
const who = document.getElementById("who");
const game = document.getElementById("game");
const winnerBox = document.getElementById("winner-box");
let tune = new Audio("ting.mp3");
let gOverSound = new Audio("gameover.mp3");
let music = new Audio("music.mp3");
// music.play();
gOverSound.preload = "auto";
tune.preload = "auto";

let turn = "X";
let gameOver = false;

// start me winner hide
game.style.display = "grid";
winnerDiv.style.display = "none";
winnerBox.textContent = "";
// winning patterns (indexes)
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// box click logic
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (boxText[index].innerText !== "" || gameOver) return;

    boxText[index].innerText = turn;
    tune.currentTime = 0;
    tune.play();
    checkWinner();

    if (!gameOver) {
      turn = turn === "X" ? "O" : "X";
    }
  });
});

// winner / draw check
function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    if (
      boxText[a].innerText &&
      boxText[a].innerText === boxText[b].innerText &&
      boxText[b].innerText === boxText[c].innerText
    ) {
      // show winner
      gOverSound.play();
      who.innerText = boxText[a].innerText;
      winnerBox.textContent = "WINNER!";
      game.style.display = "none";
      winnerDiv.style.display = "flex";
      gameOver = true;
      gOverSound.currentTime = 0;

      // highlight winning boxes
      boxes[a].style.background = "#ffc6f5";
      boxes[b].style.background = "#ffc6f5";
      boxes[c].style.background = "#ffc6f5";
      return;
    }
  }

  // draw
  if ([...boxText].every((b) => b.innerText !== "")) {
    who.innerText = "XO";
    winnerBox.textContent = "DRAW";
    game.style.display = "none";
    winnerDiv.style.display = "flex";
    gameOver = true;
  }
}

// draw check
const isDraw = Array.from(boxText).every((box) => box.innerText !== "");

if (isDraw) {
  winnerBox.textContent = "DRAW";
  who.innerText = "XO";
  winnerDiv.style.display = "flex";
  gameOver = true;
}

// reset game
resetBtn.addEventListener("click", () => {
  boxText.forEach((b) => (b.innerText = ""));
  boxes.forEach((b) => (b.style.background = ""));
  turn = "X";
  gameOver = false;
  winnerDiv.style.display = "none";
  game.style.display = "grid";
});
