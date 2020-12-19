function DisplayManager() {
    this.repr = [' ', 'X', 'O'];
    this.maxStrokeWeight = 5;
    this.maxSymbolSize = 35;

    this.maxAnnouncementStrokeWeight = 20;
    this.maxAnnouncementTextSize = 100;

    this.symbolSize;
    this.announcementStrokeWeight;
    this.announcementTextSize;

    this.reset = function () {
        stroke(255);
        noFill();

        let curWeight = map(curUISize, 0, maxUISize, 0, this.maxStrokeWeight);
        strokeWeight(curWeight);

        this.symbolSize = map(curUISize, 0, maxUISize, 0, this.maxSymbolSize);
        this.announcementStrokeWeight = map(curUISize, 0, maxUISize, 0, this.maxAnnouncementStrokeWeight);
        this.announcementTextSize = map(curUISize, 0, maxUISize, 0, this.maxAnnouncementTextSize);
    }

    this.pixel = function (row, col) {
        let x = (col * width / 3) + width / 6;
        let y = (row * height / 3) + height / 6;
        return { x, y };
    }

    this.doublePixel = function (start, end) {
        let x1 = (start.col * width / 3) + width / 6;
        let y1 = (start.row * height / 3) + height / 6;

        let x2 = (end.col * width / 3) + width / 6;
        let y2 = (end.row * height / 3) + height / 6;

        return { x1, x2, y1, y2 };
    }

    this.drawX = function (row, col, size) {
        let { x, y } = this.pixel(row, col);
        line(x - size, y - size, x + size, y + size);
        line(x + size, y - size, x - size, y + size);
    }

    this.drawO = function (row, col, size) {
        let { x, y } = this.pixel(row, col);
        ellipse(x, y, 2 * size, 2 * size);
    }

    this.drawBoard = function (board) {
        background(41);
        this.drawBase();
        this.fillBoard(board);
    }

    this.drawBase = function () {
        for (let i = 1; i < 3; ++i) {
            line(0, i * height / 3, width, i * height / 3);
            line(i * width / 3, 0, i * width / 3, height);
        }
    }

    this.fillBoard = function (board) {
        for (let row = 0; row < 3; ++row) {
            for (let col = 0; col < 3; ++col) {
                cur = this.repr[board[row][col]];

                if (cur == 'X')
                    this.drawX(row, col, this.symbolSize);
                else if (cur == 'O')
                    this.drawO(row, col, this.symbolSize);
            }
        }
    }

    this.drawWinner = function (winner) {
        let start = winner.start;
        let end = winner.end;

        let { x1, y1, x2, y2 } = this.doublePixel(start, end);

        line(x1, y1, x2, y2);
    }

    this.announce = function (message) {
        textSize(this.announcementTextSize);
        textFont('Consolas');
        textAlign(CENTER, CENTER);
        fill(255);
        stroke(41);
        strokeWeight(this.announcementStrokeWeight);
        text(message, width / 2, height / 2);
        this.reset();
    }
}