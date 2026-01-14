// Start button
const gameStartBtn = document.querySelector(".game-start-button");
gameStartBtn.addEventListener("click", () => {
  const modal = document.querySelector(".modal")
  modal.showModal();
  const confirmBtn = document.querySelector("#confirm")
  confirmBtn.addEventListener("click", () => {
    createTicTacToe();
    modal.close();
  })
})

function createTicTacToe() {
  // Variables and Objects
  const dom = {
    player1NameInput: document.querySelector("#player1").value,
    player2NameInput: document.querySelector("#player2").value,
    player1NameDisplay: document.querySelector(".player-1"),
    player2NameDisplay: document.querySelector(".player-2"),
    gameResults: document.querySelector(".game-results"),
    gameBoardContainer: document.querySelector(".game-board-container"),
    resetBoardBtn: document.querySelector(".reset-board-button"),
    resetScoreBtn: document.querySelector(".reset-score-button"),
  }

  const players = {
    player1: {
      name: dom.player1NameInput,
      marker: "X",
      score: 0,
    },


    player2: {
      name: dom.player2NameInput,
      marker: "O",
      score: 0,
    },
  }

  let activePlayer = "player1";

  const gameBoard = {
    board: [["","",""],
            ["","",""],
            ["","",""]],
    moves: 0,
    placeMarker(row, col) {
      if (this.board[row][col] !== "") {
        console.log("This spot is filled! Try again.")
        return false;
      }

      this.board[row][col] = players[activePlayer].marker;
      this.moves++;
      return true;
    }
  }

  const controller = {
    placeMarker(row, col) {
      if (gameBoard.placeMarker(row, col)) {
        renderScore(checkForWinner());
        swapTurn();
      }
    },

    resetBoard() {
      clearBoard();
      renderScore();
    }
  }

  // Functions and Methods
  function swapTurn() {
    (activePlayer === "player1") ? activePlayer = "player2" : activePlayer = "player1";
  }

  function checkForWinner() {
    const winningMatches = [
    [[0,0],[0,1],[0,2]],
    [[0,0],[1,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[2,0],[1,1],[0,2]]]

      
    for (let threeToMatch of winningMatches){
      if ((threeToMatch.every(([row, col]) => gameBoard.board[row][col] === players[activePlayer].marker))) {
        console.log("win")
        players[activePlayer].score++;
        const cells = dom.gameBoardContainer.children;
        for (const cell of cells ) {
          cell.classList.add("no-input")
        }
        return `${players[activePlayer].name} is the winner!`;
      }
    }

    if (gameBoard.moves === 9) {
      console.log("tie")
      const cells = dom.gameBoardContainer.children;
        for (const cell of cells ) {
          cell.classList.add("no-input")
        }
      return "The game is a tie!";
    }

    return null;
  }

  function clearBoard() {
    gameBoard.board = [["","",""],
                      ["","",""],
                      ["","",""]]

    gameBoard.moves = 0;
    const cells = dom.gameBoardContainer.children;
      for (const cell of cells ) {
        cell.textContent = "";
        cell.classList.remove("no-input");
      }
  }

  // DOM and frontend
  function renderBoard() {
    if (dom.gameBoardContainer.childElementCount === 1) {
      dom.gameBoardContainer.innerHTML = "";
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const gridCell = document.createElement("div");
          gridCell.classList.add("grid-cell")
          gridCell.addEventListener("click", () => {
            controller.placeMarker(row, col)
            gridCell.textContent = gameBoard.board[row][col]})
          dom.gameBoardContainer.appendChild(gridCell);
        }
      }
    }
  }

  function renderScore(results) {
    dom.player1NameDisplay.textContent = `${players.player1.name}: ${players.player1.score}`;
    dom.player2NameDisplay.textContent = `${players.player2.name}: ${players.player2.score}`;
    dom.gameResults.textContent = results;
  }

  dom.resetBoardBtn.addEventListener("click", controller.resetBoard);
  dom.resetScoreBtn.addEventListener("click", () => {
    players.player1.score = 0;
    players.player2.score = 0;
    renderScore();
  });

  renderBoard()
  renderScore()
  
  return ({ controller })
}