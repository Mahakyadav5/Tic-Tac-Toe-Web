
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
let board, currentPlayer, gameActive;

function startGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
    drawBoard();
}

function drawBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.className = "cell";
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] !== "" || !gameActive) return;
    board[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = gameActive ? `Player ${currentPlayer}'s turn` : statusElement.textContent;
    drawBoard();
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusElement.textContent = `Player ${board[a]} wins!`;
            gameActive = false;
            return;
        }
    }
    if (!board.includes("")) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
    }
}

startGame();
