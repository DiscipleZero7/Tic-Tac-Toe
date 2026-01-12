function createTicTacToe() {
  // turn function. May need to refactor and move
  let activePlayer = "player1";
  function swapTurn() {
    if (activePlayer === "player1") {
      activePlayer = "player2";
    } else {
      activePlayer = "player1";
    }
  }
  //-----------------------------------------------------------------------------------//
  //**
  // check winner function. May need to refactor and move
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


      outerLoop: for (let threeToMatch of winningMatches) {
        innerLoop: for (let coordinates of threeToMatch) {
          if (gameBoard.board[coordinates[0]][coordinates[1]] !==  players[activePlayer].marker) {
            continue outerLoop;
          }
        }
      console.log("Match! Board reset.")
      players[activePlayer].score++
      const results = document.querySelector(".game-results");
      results.textContent = `${players[activePlayer].name} wins the round!`;
      return true;
    }
 
    if (gameBoard.moves === 9) {
      console.log("game tied. board reset")
      const results = document.querySelector(".game-results");
      results.textContent = `It's tie! No one wins...`;
      return true
    }
  }


  // reset function. May need to refactor and move
  function resetBoard() {
    gameBoard.board = [["","",""],
                      ["","",""],
                      ["","",""]]


    gameBoard.moves = 0;
    document.querySelector(".game-results").textContent = "";
    renderBoard();
    renderPlayers()
  }
  //**
  //-----------------------------------------------------------------------------------//


  const gameBoard = {
    board: [["","",""],
            ["","",""],
            ["","",""]],
    moves: 0,


    placeMarker(row, col) {
      if (this.board[row][col] !== "") {
        console.log("This spot is filled! Try again.")
        return;
      }


      this.board[row][col] = players[activePlayer].marker;
      this.moves++;
      renderBoard();
      swapTurn()
     
    }
  }


  //--TODO: CreatePlayer Function-------------------------------------------
  //**
  const player1Input = document.querySelector("#player1").value
  const player2Input = document.querySelector("#player2").value
  const players = {
    player1: {
      name: player1Input,
      marker: "X",
      score: 0,
    },


    player2: {
      name: player2Input,
      marker: "O",
      score: 0,
    },
  }
  //**
  //------------------------------------------------------------------------
  const controller = {
    getPlayers() {
      return JSON.parse(JSON.stringify(players));
    },


    getBoard() {
      return JSON.parse(JSON.stringify(gameBoard.board));
    },


    placeMarker(row, col) {
      gameBoard.placeMarker(row, col)
      return this.getBoard();
    },


    resetBoard() {
      resetBoard()
    }
  }




  // DOM and frontend logic
  renderBoard()
  renderPlayers()


  function renderBoard() {
    const gameBoardContainer = document.querySelector(".game-board-container")
    gameBoardContainer.innerHTML = "";
    const gameOver = checkForWinner()
   
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell")
        gridCell.textContent = gameBoard.board[row][col];
        if(!gameOver) {
        gridCell.addEventListener("click", () => {
          controller.placeMarker(row, col);
        })
      }
        gameBoardContainer.appendChild(gridCell);
      }
    }
    renderPlayers();
  }


  function renderPlayers() {
    const player1 = document.querySelector(".player-1");
    const player2 = document.querySelector(".player-2");


    player1.textContent = `${players.player1.name}: ${players.player1.score}`;
    player2.textContent = `${players.player2.name}: ${players.player2.score}`;
  }


  const resetBoardBtn = document.querySelector(".reset-board-button")
  const resetScoreBtn = document.querySelector(".reset-score-button")


  resetBoardBtn.addEventListener("click", resetBoard);
  resetScoreBtn.addEventListener("click", () => {
    players.player1.score = 0;
    players.player2.score = 0;
    renderPlayers();
  });


  // END DOM LOGIC SECTION
 


  return ({ controller })
}


//Beginning Logic




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