const board = document.getElementById("board");
        let cells = [];
        let currentPlayer = "X";
        let gameActive = true;
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        function createBoard() {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = i;
                cell.addEventListener("click", handleCellClick);
                board.appendChild(cell);
                cells.push(cell);
            }
        }

        function handleCellClick(event) {
            const cell = event.target;
            if (!gameActive || cell.textContent !== "") return;
            cell.textContent = currentPlayer;
            cell.classList.add("taken");
            if (checkWin()) {
                document.getElementById("status").textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                return;
            }
            if (cells.every(cell => cell.textContent !== "")) {
                document.getElementById("status").textContent = "It's a draw!";
                gameActive = false;
                return;
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("status").textContent = `Player ${currentPlayer}'s turn`;
        }

        function checkWin() {
            return winningCombinations.some(combination => {
                return combination.every(index => cells[index].textContent === currentPlayer);
            });
        }

        function resetGame() {
            cells.forEach(cell => {
                cell.textContent = "";
                cell.classList.remove("taken");
            });
            currentPlayer = "X";
            gameActive = true;
            document.getElementById("status").textContent = "Player X's turn";
        }

        createBoard();