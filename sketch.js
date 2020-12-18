let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

const empty_cell = 0;
const player_cell = 1;
const computer_cell = 2;
const p = [' ', 'X', 'O'];
let canPlay;
let isPlayerTurn;

function setup() {
    let canvas = createCanvas(400, 400);
    const x = (windowWidth - width) / 2;
    const y = (windowHeight - height) / 2;
    canvas.position(x, y);
    canPlay = true;
    isPlayerTurn = true;
}

function possibleMoves() {
    var moves = [];

    for (let row = 0; row < 3; ++row) {
        for (let col = 0; col < 3; ++col) {
            if (board[row][col] == 0)
                moves.push(new Cell(row, col));
        }
    }

    return moves;
}

function drawBoard() {
    drawBase();
    fillBoard();
}

function drawBase() {
    for (let i = 1; i < 3; ++i) {
        stroke(255);
        strokeWeight(5);
        line(0, i * height / 3, width, i * height / 3);
        line(i * width / 3, 0, i * width / 3, height);
    }
}

function fillBoard() {
    for (let row = 0; row < 3; ++row) {
        for (let col = 0; col < 3; ++col) {
            cur = p[board[row][col]];
            let x = (col * width / 3) + width / 6;
            let y = (row * height / 3) + height / 6;
            let s = 35;

            if (cur == 'X') {
                line(x - s, y - s, x + s, y + s);
                line(x + s, y - s, x - s, y + s);
            }
            else if (cur == 'O') {
                noFill();
                ellipse(x, y, 2 * s, 2 * s);
            }
        }
    }
}

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

class Strike {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

function cellToPosition(c) {
    let y = (c.row * height / 3) + height / 6;
    let x = (c.col * width / 3) + width / 6;

    return { x, y };
}

function checkWinner() {
    for (var row = 0; row < 3; ++row)
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2] && board[row][0] != empty_cell)
            return new Strike(new Cell(row, 0), new Cell(row, 2));

    for (var col = 0; col < 3; ++col)
        if (board[0][col] == board[1][col] && board[1][col] == board[2][col] && board[0][col] != empty_cell)
            return new Strike(new Cell(0, col), new Cell(2, col));

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != empty_cell)
        return new Strike(new Cell(0, 0), new Cell(2, 2));

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != empty_cell)
        return new Strike(new Cell(0, 2), new Cell(2, 0));

    return undefined;
}

function handleWinner() {
    moves = possibleMoves();
    curWinner = checkWinner();

    if (curWinner) {
        let start = curWinner.start;
        let end = curWinner.end;

        let x1 = cellToPosition(start).x;
        let y1 = cellToPosition(start).y;
        let x2 = cellToPosition(end).x;
        let y2 = cellToPosition(end).y;

        line(x1, y1, x2, y2);

        canPlay = false;
        textSize(120);
        textAlign(CENTER, CENTER);
        fill(255);
        stroke(41);
        strokeWeight(20);
        text(p[board[curWinner.start.row][curWinner.start.col]] + " wins", width / 2, height / 2);
    }
    else if (moves.length == 0) {
        canPlay = false;
        textSize(120);
        textAlign(CENTER, CENTER);
        fill(255);
        stroke(41);
        strokeWeight(20);
        text("Draw", width / 2, height / 2);
    }
}

function draw() {
    background(41);
    drawBoard();
    handleWinner();
    handlePlayer();
}

function handlePlayer() {
    if (!canPlay)
        return;

    if (!isPlayerTurn)
        computerMove();
}

function computerMove() {
    moves = possibleMoves();

    let bestMove = moves[0];
    let bestScore = Infinity;
    let score = Infinity;

    moves.forEach(m => {
        board[m.row][m.col] = computer_cell;
        score = minimax(0, true);
        board[m.row][m.col] = empty_cell;

        if (score < bestScore) {
            bestScore = score;
            bestMove = m;
        }
    });

    board[bestMove.row][bestMove.col] = computer_cell;
    isPlayerTurn = true;
}

minimaxScores = [0, 1, -1];

function minimax(depth, isMaximizing) {
    let curWinner = checkWinner();
    if (curWinner)
        return minimaxScores[board[curWinner.start.row][curWinner.start.col]];

    moves = possibleMoves();
    if (moves.length == 0)
        return minimaxScores[0];

    let bestScore;
    let score;

    if (isMaximizing) {
        bestScore = -Infinity;

        moves.forEach(m => {
            board[m.row][m.col] = player_cell;
            score = minimax(depth + 1, false);
            board[m.row][m.col] = empty_cell;

            bestScore = max(bestScore, score);
        });
    }
    else {
        bestScore = Infinity;

        moves.forEach(m => {
            board[m.row][m.col] = computer_cell;
            score = minimax(depth + 1, true);
            board[m.row][m.col] = empty_cell;

            bestScore = min(bestScore, score);
        });
    }

    return bestScore;
}

function playerMove() {
    let x = floor(mouseX / (width / 3));
    let y = floor(mouseY / (height / 3));

    if (board[y][x] != empty_cell)
        return;

    board[y][x] = 1;

    isPlayerTurn = false;
}

function mousePressed() {
    if (canPlay && isPlayerTurn)
        playerMove();

    if (!canPlay) {
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]
        canPlay = true;
        isPlayerTurn = true;
    }
}
