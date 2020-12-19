function Board() {
    this.emptyCell = 0;
    this.playerCell = 1;
    this.aiCell = 2;

    this.reset = function () {
        this.board = [
            [this.emptyCell, this.emptyCell, this.emptyCell],
            [this.emptyCell, this.emptyCell, this.emptyCell],
            [this.emptyCell, this.emptyCell, this.emptyCell],
        ];
    }

    this.playerMove = function (row, col) {
        if (this.board[row][col] == this.emptyCell) {
            this.board[row][col] = this.playerCell;
            return true;
        }

        return false;
    }

    this.aiMove = function (row, col) {
        if (this.board[row][col] == this.emptyCell)
            this.board[row][col] = this.aiCell;
    }

    this.clearCell = function (row, col) {
        if (this.board[row][col] != this.emptyCell)
            this.board[row][col] = this.emptyCell;
    }

    this.possibleMoves = function () {
        var moves = [];

        for (let row = 0; row < 3; ++row) {
            for (let col = 0; col < 3; ++col) {
                if (this.board[row][col] == this.emptyCell)
                    moves.push(new Cell(row, col));
            }
        }

        return moves;
    }

    this.hasWon = function (a, b, c) {
        return (a === b && b === c) && (a != this.emptyCell);
    }

    this.checkWinner = function () {
        for (var row = 0; row < 3; ++row)
            if (this.hasWon(this.board[row][0], this.board[row][1], this.board[row][2]))
                return new Winner(this.board[row][0], new Cell(row, 0), new Cell(row, 2));

        for (var col = 0; col < 3; ++col)
            if (this.hasWon(this.board[0][col], this.board[1][col], this.board[2][col]))
                return new Winner(this.board[0][col], new Cell(0, col), new Cell(2, col));

        if (this.hasWon(this.board[0][0], this.board[1][1], this.board[2][2]))
            return new Winner(this.board[0][0], new Cell(0, 0), new Cell(2, 2));

        if (this.hasWon(this.board[0][2], this.board[1][1], this.board[2][0]))
            return new Winner(this.board[0][2], new Cell(0, 2), new Cell(2, 0));
    }
}