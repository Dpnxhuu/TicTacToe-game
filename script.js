const boxes = document.querySelectorAll(".box");
const boxText = document.querySelectorAll(".textBox");
const resetBtn = document.getElementById("reset");
const winnerDiv = document.getElementById("winner");
const who = document.getElementById("who");

let turn = "X";
let gameOver = false;

// start me winner hide
winnerDiv.style.display = "none";

// winning patterns (indexes)
const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// box click logic
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (boxText[index].innerText !== "" || gameOver) return;

    boxText[index].innerText = turn;

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
      who.innerText = boxText[a].innerText;
      winnerDiv.style.display = "flex";
      gameOver = true;

      // highlight winning boxes
      boxes[a].style.background = "#ffc6f5";
      boxes[b].style.background = "#ffc6f5";
      boxes[c].style.background = "#ffc6f5";
      return;
    }
  }

  // draw
  if ([...boxText].every(b => b.innerText !== "")) {
    who.innerText = "DRAW";
    winnerDiv.style.display = "flex";
    gameOver = true;
  }
}


  // draw check
  const isDraw = Array.from(boxText).every(
    box => box.innerText !== ""
  );

  if (isDraw) {
    who.innerText = "DRAW";
    winnerDiv.style.display = "block";
    gameOver = true;
  }


// reset game
resetBtn.addEventListener("click", () => {
  boxText.forEach(b => b.innerText = "");
  boxes.forEach(b => b.style.background = "");
  turn = "X";
  gameOver = false;
  winnerDiv.style.display = "none";
});
