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

    const messageDisplay = document.getElementById('message');

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
        messageDisplay.textContent = `${currentPlayer.name}'s Turn`;
    };

    const initializeGame = () => {
        Gameboard.render();
        messageDisplay.textContent = `${currentPlayer.name}'s Turn!`;

        const gameBoardDiv = document.querySelector('.game-board');
        gameBoardDiv.addEventListener('click', (event) => {
            if (event.target.classList.contains('cell')) {
                const index = parseInt(event.target.dataset.index);
                if (Gameboard.updateCell(index, currentPlayer.marker)) {
                    switchPlayer();
                }
            }
        });

        const startButton = document.getElementById('startButton');
        const resetButton = document.getElementById('resetButton');
        
        startButton.addEventListener('click', () => {
            Gameboard.reset();
            currentPlayer = playerX;
            messageDisplay.textContent = `${currentPlayer.name}'s Turn`;
        });

        resetButton.addEventListener('click', () => {
            Gameboard.reset();
            currentPlayer = playerX;
            messageDisplay.textContent = `${currentPlayer.anem}'s Turn`;
        });
    };

    document.addEventListener('DOMContentLoaded', initializeGame);
    
    return {
        initializeGame
    };
})();