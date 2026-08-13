// let btn = document.querySelectorAll(".boxgame");
// let player1 = true;
// let reset = document.getElementById("gamereset");
// let msgwin = document.querySelector("#winnmae");
// let msgbox = document.querySelector(".winner-wrapper");
// let newgame = document.getElementById("gamenew");
// let gamewins = [
//   [0, 1, 2],
//   [0, 3, 6],
//   [0, 4, 8],
//   [1, 4, 7],
//   [2, 5, 8],
//   [2, 4, 6],
//   [3, 4, 5],
//   [6, 7, 8],
// ];

// const resetame = () => {
//   player1 = true;
//   anablebox();
// };

// btn.forEach((box) => {
//   box.addEventListener("click", function () {
//     if (player1 === true) {
//       box.innerText = "0";
//       player1 = false;
//     } else {
//       box.innerText = "X";
//       player1 = true;
//     }
//     box.disabled = true;
//     checkthwinner();
//     reset.addEventListener("click", function () {
//       box.innerText = "";
//       player1 = true;
//     });
//   });
// });

// const empybox = () => {
//   for (let box of btn) {
//     box.disabled = true;
//   }
// };
// const anablebox = () => {
//   for (let box of btn) {
//     box.disabled = false;
//     box.innerText = "";
//     // msgbox.classList.add("hide");
//   }
// };
// const winername = (winner) => {
//   msgwin.innerText = `Congrats Winner is, ${winner})`;
//   msgbox.classList.remove("hide");
//   empybox();
// };
// const checkthwinner = () => {
//   for (let wins of gamewins) {
//     let win1 = btn[wins[0]].innerText;
//     let win2 = btn[wins[1]].innerText;
//     let win3 = btn[wins[2]].innerText;
//     if (win1 != "" && win2 != "" && win3 != "") {
//       if (win1 === win2 && win2 === win3) {
//         console.log("winner", win1);
//         winername(win1);
//         resetame();
//         newgame.addEventListener("click", function () {
//           player1 = true;
//           box.innerText = "";
//           msgbox.classList.add("hide");
//         });
//       }
//     }
//   }
// };

let boxes = document.querySelectorAll(".boxgame");
let resetBtn = document.getElementById("gamereset");
let newGameBtn = document.getElementById("gamenew");

let msgBox = document.querySelector(".winner-wrapper");
let msgWin = document.getElementById("winnmae");
let player1 = true;
let count = 0;
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
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (player1) {
      box.innerText = "O";
      player1 = false;
    } else {
      box.innerText = "X";
      player1 = true;
    }
    box.disabled = true;
    count++;
    checkWinner();
  });
});
const resetGame = () => {
  player1 = true;
  count = 0;
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
  msgBox.classList.add("hide");
};
const showWinner = (winner) => {
  msgWin.innerText = `Congrats! Winner is ${winner}`;
  msgBox.classList.remove("hide");
  disableBoxes();
};
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};
const showDraw = () => {
  msgWin.innerText = `Draw Game`;
  msgBox.classList.remove("hide");
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
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