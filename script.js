const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const render = () => {
        const gameBoardDiv = document.querySelector('.game-board');
        gameBoardDiv.innerHTML = '';
        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.index = index;
            cellElement.textContent = cell;

            if (cell === 'X') {
                cellElement.classList.add('X');
            } else if (cell === 'O') {
                cellElement.classList.add('O');
            }
            gameBoardDiv.appendChild(cellElement);
        });
    };

    const updateCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            render();
            return true;
        }
        return false;
    };

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        render();
    };

    return {
        getBoard,
        render,
        updateCell,
        reset
    };
})();


const Player = (name, marker) => {
    return {name, marker};
}


const GameController = (() => {
    const playerX = Player("Player X", "X");
    const playerO = Player("Player O", "O");
    let currentPlayer = playerX;

    const winConditions = [
        //lines
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
         // columns
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
         //diagonals
        [0, 4, 8], [2, 4, 6]            
    ];

    let gameActive = true;
    let playerXScore = 0;
    let playerOScore = 0;

    let messageDisplay;
    let playerXScoreDisplay;
    let playerOScoreDisplay;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
        messageDisplay.textContent = `${currentPlayer.name}'s Turn!`;
    };

    const initializeGame = () => {
        messageDisplay = document.getElementById('message');
        playerXScoreDisplay = document.getElementById('playerXScore'); 
        playerOScoreDisplay = document.getElementById('playerOScore');   

        Gameboard.render();
        messageDisplay.textContent = `${currentPlayer.name}'s Turn!`;

        const gameBoardDiv = document.querySelector('.game-board');
        gameBoardDiv.addEventListener('click', (event) => {
            if(!gameActive) return;

            if (event.target.classList.contains('cell')) {
                const index = parseInt(event.target.dataset.index);
                if (Gameboard.updateCell(index, currentPlayer.marker)) {
                    const winnerFound = checkWin();
                    if (winnerFound) {
                        return;
                    }

                    const drawFound = checkDraw();
                    if (drawFound) {
                        return;
                    }
                    switchPlayer();
                }
            }
        });

        const startButton = document.getElementById('startButton');
        const resetButton = document.getElementById('resetButton');

        startButton.addEventListener('click', () => {
            Gameboard.reset();
            currentPlayer = playerX;
            messageDisplay.textContent = `${currentPlayer.name}'s Turn!`;
            gameActive = true;
        });

        resetButton.addEventListener('click', () => {
            Gameboard.reset();
            currentPlayer = playerX;
            messageDisplay.textContent = `${currentPlayer.name}'s Turn!`;
            gameActive = true;
            playerXScore = 0;
            playerOScore = 0;
            playerXScoreDisplay.textContent = playerXScore;
            playerOScoreDisplay.textContent = playerOScore;
        });
    };

    const checkWin = () => {
        const board = Gameboard.getBoard();

        for (let i = 0; i < winConditions.length; i++) {
            const condition = winConditions[i];
            const cellA = board[condition[0]];
            const cellB = board[condition[1]];
            const cellC = board[condition[2]];

            if (cellA === "" || cellB === "" || cellC === "") {
                continue;
            }
            if (cellA === cellB && cellB === cellC) {
                gameActive = false;
                messageDisplay.textContent = `${currentPlayer.name} Wins!`;
                if (currentPlayer.marker === 'X') {
                    playerXScore++;
                    playerXScoreDisplay.textContent = playerXScore;
                } else {
                    playerOScore++;
                    playerOScoreDisplay.textContent = playerOScore;
                }
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        const board = Gameboard.getBoard();
        if (!board.includes("")) {
            gameActive = false;
            messageDisplay.textContent = "It's a Draw!";
            return true;
        }
        return false;
    };

    document.addEventListener('DOMContentLoaded', initializeGame);

    return {
        initializeGame
    };
})();