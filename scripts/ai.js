function AI() {
    minimaxScores = [0, 1, -1];

    this.aiMove = function (board) {
        moves = board.possibleMoves();
        let bestMoves = [];

        let bestScore = Infinity;
        let score = Infinity;

        moves.forEach(m => {
            board.aiMove(m.row, m.col);
            score = minimax(board, 0, true);
            board.clearCell(m.row, m.col);

            if (score < bestScore) {
                bestScore = score;
                bestMoves = [m];
            }
            else if (score == bestScore)
                bestMoves.push(m);
        });

        return bestMoves[floor(random(bestMoves.length))];
    }

    function minimax(board, depth, isMaximizing) {
        let curWinner = board.checkWinner();
        if (curWinner)
            return minimaxScores[board.board[curWinner.start.row][curWinner.start.col]];

        moves = board.possibleMoves();
        if (moves.length == 0)
            return this.minimaxScores[0];

        let bestScore;
        let score;

        if (isMaximizing) {
            bestScore = -Infinity;

            moves.forEach(m => {
                board.playerMove(m.row, m.col);
                score = minimax(board, depth + 1, false);
                board.clearCell(m.row, m.col);

                bestScore = max(bestScore, score);
            });
        }
        else {
            bestScore = Infinity;

            moves.forEach(m => {
                board.aiMove(m.row, m.col);
                score = minimax(board, depth + 1, true);
                board.clearCell(m.row, m.col);

                bestScore = min(bestScore, score);
            });
        }

        return bestScore;
    }
}