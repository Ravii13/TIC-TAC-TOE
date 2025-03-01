let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector("#newGame");
let msgcontainer = document.querySelector(".msg-container");
let msgs = document.querySelector("#msg");

const popup = document.querySelector("#popup");
const playButton = document.querySelector("#playButton");
const PopupText=document.querySelector("#popupText")

let turnO = true; // playerO, playerX
let count = 0; // add a count to check for draw

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

const closePopup=()=>{
    popup.style.display = "none";
}
const playGame=()=>{
    popup.style.display = "none";
}

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; 
        count++; //Increment count after each click
        checkWinner();
        if(count === 9 && !checkWinner()){
            showDraw();
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true; 
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; 
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = `It's a draw!Play Again`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                // return true;
            }
        }
    }
    return false; 
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
playButton.addEventListener("click", closePopup);