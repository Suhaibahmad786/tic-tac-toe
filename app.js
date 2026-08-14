let boxes = document.querySelectorAll(".boxgame");
let resetBtn = document.getElementById("gamereset");
let newGameBtn = document.getElementById("gamenew");

let msgBox = document.querySelector(".winner-wrapper");
let msgWin = document.getElementById("winnmae");
let player1 = true;
let count = 0;

let turnBadgeX = document.getElementById("turnBadgeX");
let turnBadgeO = document.getElementById("turnBadgeO");
let scoreXEl = document.getElementById("scoreX");
let scoreOEl = document.getElementById("scoreO");
let scoreDrawEl = document.getElementById("scoreDraw");
let winLine = document.getElementById("winLine");
let winnerSub = document.querySelector(".winner-sub");
let trophyIcon = document.querySelector(".trophy-icon");

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const updateTurnBadge = () => {
  if (player1) {
    turnBadgeX.classList.add("active");
    turnBadgeO.classList.remove("active");
  } else {
    turnBadgeO.classList.add("active");
    turnBadgeX.classList.remove("active");
  }
};

const styleMark = (box, mark) => {
  const span = document.createElement("span");
  span.className = mark === "X" ? "mark-x" : "mark-o";
  span.textContent = mark;
  box.innerHTML = "";
  box.appendChild(span);
};

const highlightWinCells = (pattern) => {
  pattern.forEach((idx) => {
    boxes[idx].classList.add("win-cell");
  });
};

const clearWinVisuals = () => {
  boxes.forEach((box) => box.classList.remove("win-cell"));
  winLine.classList.remove("show");
  winLine.style.width = "";
  winLine.style.height = "";
  winLine.style.left = "";
  winLine.style.top = "";
  winLine.style.transform = "";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (player1) {
      styleMark(box, "O");
      player1 = false;
    } else {
      styleMark(box, "X");
      player1 = true;
    }
    box.disabled = true;
    count++;
    updateTurnBadge();
    checkWinner();
  });
});

const resetGame = () => {
  player1 = true;
  count = 0;
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerHTML = "";
  });
  msgBox.classList.add("hide");
  clearWinVisuals();
  updateTurnBadge();
};

const showWinner = (winner, pattern) => {
  msgWin.innerText = `Congrats! Winner is ${winner}`;
  if (winnerSub) winnerSub.innerText = "Brilliant move!";
  if (trophyIcon) trophyIcon.style.display = "block";
  msgBox.classList.remove("hide");
  highlightWinCells(pattern);
  disableBoxes();
  if (winner === "X") {
    scoreX++;
    if (scoreXEl) scoreXEl.textContent = scoreX;
  } else {
    scoreO++;
    if (scoreOEl) scoreOEl.textContent = scoreO;
  }
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const showDraw = () => {
  msgWin.innerText = `Draw Game`;
  if (winnerSub) winnerSub.innerText = "Great match from both sides!";
  if (trophyIcon) trophyIcon.style.display = "none";
  msgBox.classList.remove("hide");
  scoreDraw++;
  if (scoreDrawEl) scoreDrawEl.textContent = scoreDraw;
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1, pattern);
        return;
      }
    }
  }
  if (count === 9) {
    showDraw();
  }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
