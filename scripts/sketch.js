var game;
var canvas;
var maxUISize = 400;
var curUISize;

function setup() {
    canvas = createCanvas(maxUISize, maxUISize);

    game = new GameManager();
    game.reset();

    setCanvas();
}

function draw() {
    game.update();
}

function setCanvas() {
    let shortest = min(windowWidth, windowHeight);
    curUISize = min(maxUISize, shortest);
    resizeCanvas(curUISize, curUISize);

    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    canvas.position(x, y);

    game.setStrokes();
}

function windowResized() {
    setCanvas();
}
