function GameManager() {
    var board = new Board();
    var display = new DisplayManager();
    var ai = new AI();

    this.reset = function () {
        board.reset();
        this.canPlay = true;
        this.isPlayerTurn = true;
    }

    this.setStrokes = function () {
        display.reset();
    }

    this.handleWinner = function () {
        moves = board.possibleMoves();
        curWinner = board.checkWinner();

        if (curWinner) { // Somebody wins the game
            display.drawWinner(curWinner);

            this.canPlay = false;
            display.announce(display.repr[curWinner.winner] + " wins");
        }
        else if (moves.length == 0) { // The game is a draw
            this.canPlay = false;
            display.announce("Draw");
        }
    }

    this.handleMoves = function () {
        if (!this.canPlay)
            return;

        if (!this.isPlayerTurn) {
            this.handleAI();
            this.isPlayerTurn = true;
        }
    }

    this.handleAI = function () {
        let bestMove = ai.aiMove(board);
        board.aiMove(bestMove.row, bestMove.col);
    }

    this.update = function () {
        display.drawBoard(board.board);
        this.handleWinner();
        this.handleMoves();
    }

    this.playerMove = function () {
        if (this.canPlay && this.isPlayerTurn) {
            let row = floor(mouseY / (height / 3));
            let col = floor(mouseX / (width / 3));

            if (board.playerMove(row, col))
                this.isPlayerTurn = false;
        }
    }
}

function mousePressed() {
    if (!game.canPlay)
        game.reset();
    else
        game.playerMove();
}
