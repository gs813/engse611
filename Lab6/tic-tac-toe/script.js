/* The Constants & Global Variables */

// All tiles
const tiles = Array.from(document.querySelectorAll(".tile"));

// Span to show the current player letter
const currentPlayerSpan = document.querySelector(".current-player");

// Div to display the winner
const announceDiv = document.querySelector(".announce");

// Reset and New Game buttons
const resetButton = document.querySelector("#reset");
const newGameButton = document.querySelector("#newgame");

// Scoreboard elements
const scoreXDisplay = document.querySelector("#scoreX");
const scoreODisplay = document.querySelector("#scoreO");

// Initialize scores
let scoreX = 0;
let scoreO = 0;

// Indexes of winning situations
const winningSituations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// The board, current player, and the game situation
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Update the score display
function updateScoreDisplay() {
  scoreXDisplay.innerText = `Player X: ${scoreX}`;
  scoreODisplay.innerText = `Player O: ${scoreO}`;
}

// Initialize score display
updateScoreDisplay();

/* ------------------------------------------------------------------- */

/* The Game Functions */

// Check if the current tile is empty or not
const isValidClick = (tile) => {
  return !(tile.innerText === "X" || tile.innerText === "O");
};

// Change the current player to alternate between X & O
const changeplayer = () => {
  currentPlayerSpan.classList.remove(`player${currentPlayer}`);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerSpan.innerText = currentPlayer;
  currentPlayerSpan.classList.add(`player${currentPlayer}`);

  // If it's Player O's turn, trigger the bot's move
  if (currentPlayer === "O" && isGameActive) {
    setTimeout(botMove, 500);  // Add a small delay for the bot
  }
};

// Announce the winner or a tie by changing that div text,
const announce = (type) => {
  switch (type) {
    case "X":
      announceDiv.innerHTML = 'Player <span class="playerX">X</span> Won';
      scoreX++;
      break;
    case "O":
      announceDiv.innerHTML = 'Player <span class="playerO">O</span> Won';
      scoreO++;
      break;
    case "TIE":
      announceDiv.innerText = "Tie";
  }
  updateScoreDisplay();
  announceDiv.classList.remove("hide");
};

// Check if the current situation is a winning situation or a tie
const checkWinningSituation = () => {
  let roundWon = false;

  for (let i = 0; i < winningSituations.length; i++) {
    let [a, b, c] = winningSituations[i].map((index) => board[index]);

    if (a && a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    announce(currentPlayer);
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    announce("TIE");
  }
};

// Handle tile click
const userClicked = (tile, index) => {
  if (isValidClick(tile) && isGameActive) {
    tile.innerText = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    board[index] = currentPlayer;
    checkWinningSituation();
    if (isGameActive) changeplayer();
  }
};

// Bot logic to make a random valid move for Player O
const botMove = () => {
  // Get a list of available empty spots
  const emptyTiles = board
    .map((tile, index) => (tile === "" ? index : null))
    .filter((index) => index !== null);

  // If no empty spots are available, exit
  if (emptyTiles.length === 0) return;

  // Randomly select one of the empty spots
  const randomIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  const tile = tiles[randomIndex];
  
  // Simulate the bot's move
  tile.innerText = "O";
  tile.classList.add("playerO");
  board[randomIndex] = "O";
  
  checkWinningSituation();
  if (isGameActive) changeplayer();
};

// Reset the board while keeping scores
const newGame = () => {
  board.fill("");
  isGameActive = true;
  announceDiv.classList.add("hide");
  tiles.forEach((tile) => {
    tile.innerText = "";
    tile.classList.remove("playerX", "playerO");
  });
  if (currentPlayer === "O") {
    changeplayer();
  }
};

// Reset the board and scores
const resetBoard = () => {
  scoreX = 0;
  scoreO = 0;
  updateScoreDisplay();
  newGame();
};

// Add event listeners
newGameButton.addEventListener("click", newGame);
resetButton.addEventListener("click", resetBoard);
tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => userClicked(tile, index));
});
