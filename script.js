console.log("Welcome to TicTacToe game");
let ting = new Audio("ting.mp3");
ting.preload = "auto";
let music = new Audio("music.mp3");
let gameover = new Audio("gameover.mp3");
gameover.preload = "auto";
let turn = "X";
let Isgameover = false;

const game = document.getElementById("game");
let changeTurn = () => {
  return turn === "X" ? "O" : "X";
};
const winner = document.getElementById("winner");
const winnerIs = document.getElementById('who');
let checkWinner = () => {
  let textBox = document.getElementsByClassName("textBox");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  wins.forEach((e) => {
    if (
      textBox[e[0]].innerText === textBox[e[1]].innerText &&
      textBox[e[2]].innerText === textBox[e[1]].innerText &&
      textBox[e[0]].innerText !== ""
    ) {
      game.style.display = "none";
      winner.style.display = "flex";
      Isgameover = true;
      gameover.play();
    }
  });
};

// music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let textBox = element.querySelector(".textBox");
  element.addEventListener("click", () => {
    if (textBox.innerText === "") {
      textBox.innerText = turn;
      turn = changeTurn();
      ting.currentTime = 0;
      ting.play();
      checkWinner();
      if(!Isgameover){
        winnerIs.textContent = turn;
        // console.log(turn);
      }
    }
  });
});

document.getElementById("reset").addEventListener("click", () => {
  const textBox = document.querySelectorAll(".textBox");
  Array.from(textBox).forEach((element) => {
    if (element.textContent === "") return;
    else {
      element.textContent = "";
      gameover.currentTime = 0;
      // gameover.play();
      game.style.display = "grid";
      winner.style.display = "none";
    }
  });
  turn = "X";
});
