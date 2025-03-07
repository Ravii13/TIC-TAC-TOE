let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerO, playerX
let count = 0;

let player1Name = "";
let player2Name = "";

let againstComputer = false;

let gameDiv = document.getElementById("game");
let playerSelection = document.getElementById("player-selection");
let popup = document.getElementById("popup");
let playButton = document.getElementById("playButton");
let turnDisplay = document.getElementById("turn");

playButton.addEventListener("click", () => {
    popup.style.display = "none";
    playerSelection.style.display = "flex"; // Show player selection
});

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

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    gameDiv.classList.add("hidden");
    playerSelection.style.display = "flex";
    boxes.forEach((box) => {
        box.innerText = "";
    });
    turnDisplay.innerText = ""; // Clear turn display on reset
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
        box.style.pointerEvents = "none";
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.style.pointerEvents = "auto";
    });
};

const showWinner = (winner) => {
    if (winner === "O") {
        msg.innerText = `${player1Name} wins!`;
    } else if (winner === "X") {
        msg.innerText = `${player2Name} wins!`;
    } else {
        msg.innerText = "Game was a draw.";
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    if (count === 9) {
        showWinner("Draw");
        return true;
    }
    return false;
};

const computerMove = () => {
    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        let selectedBoxIndex = emptyBoxes[randomIndex];
        boxes[selectedBoxIndex].innerText = "X";
        count++;
        if (!checkWinner()) {
            turnO = !turnO;
            updateTurnDisplay();
        }
    }
};

const boxClickHandler = (box) => {
    if (turnO) {
        box.innerText = "O";
    } else {
        box.innerText = "X";
    }
    console.log('Box clicked:', box);
    box.disabled = true;
    count++;
    if (!checkWinner()) {
        turnO = !turnO;
        updateTurnDisplay();
        if (againstComputer && !turnO && count < 9) {
            setTimeout(computerMove, 500); // Delay computer move
        }
    }
};

const boxClick = (box) => {
    if (box.innerText === "") {
        boxClickHandler(box);
    }
}

const updateTurnDisplay = () => {
    if (turnO) {
        turnDisplay.innerText = `Turn: ${player1Name} (O)`;
    } else {
        turnDisplay.innerText = `Turn: ${player2Name} (X)`;
    }
};

const startGame = (computer) => {
    player1Name = document.getElementById("player1").value.trim() || "Player 1";
    player2Name = computer ? "Computer" : (document.getElementById("player2").value.trim() || "Player 2");
    againstComputer = computer;
    if (!player1Name || (!computer && !player2Name)) {
        alert("Please enter player names.");
        return;
    }
    playerSelection.style.display = "none";
    gameDiv.classList.remove("hidden");
    updateTurnDisplay();
    enableBoxes(); // Enable boxes for player to start playing
};

playButton.addEventListener("click", () => {
    popup.style.display = "none";
    playerSelection.style.display = "flex";
});

boxes.forEach((box) => {
    box.addEventListener("click", () => boxClick(box));
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

resetGame(); // Initialize the game