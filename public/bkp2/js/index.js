import RenderScreen from './RenderScreen.js'
import RenderElemment from './RenderElemment.js'

const renderScr = RenderScreen({ id: 'mycanvas', bgcolor: '#7092be', });
const ctx = renderScr.ctx;
const canvas = { width: renderScr.canvas.width, height: renderScr.canvas.height };
const renderElemm = RenderElemment(ctx, canvas);
const w = window;

var mousePos = {};
var mouseDown = false;
var mouseUp = false;
var gravity = 0.3;
var groundPoint = canvas.height - (canvas.height / 4);
var drawnBack = false;
var firedArrow = false;
var mousePos;
var mouseDown = false;
var mouseUp = false;
var arrows = [];
var speedMod = 4;
var power = 0;

const isInCircle = function (mousePos) {
    var distFromCenter = renderElemm.distBetween(drawBackCirc, mousePos);
    if (distFromCenter < drawBackCirc.r) return true;
    else return false;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

addEventListener("mousemove", function (evt) {
    mousePos = getMousePos(renderScr.canvas, evt);
}, false);

addEventListener("mousedown", function (evt) {
    mousePos = getMousePos(renderScr.canvas, evt);
    mouseDown = true;
    mouseUp = false;
}, false);

addEventListener("mouseup", function (evt) {
    mousePos = getMousePos(renderScr.canvas, evt);
    mouseUp = true;
    mouseDown = false;
}, false);

const getAimCoords = function (mousePos) {
    /* NOTE: angleBetween(p1, p2) is 180deg opposite of angleBetween(p2, p1) */
    var angle = Math.PI / 2 - renderElemm.angleBetween(mousePos, shootingCirc);
    var distance = Math.min(renderElemm.distBetween(shootingCirc, mousePos), shootingCirc.r);
    var x = shootingCirc.x + distance * Math.sin(angle);
    var y = shootingCirc.y + distance * Math.cos(angle);
    power = distance;
    return { x: x, y: y };
};

function randomFloat(min, max) {
    return min + (max - min) * Math.random();
}

const drawAimer = function () {
    if (drawnBack) {
        let aimCoords = getAimCoords(mousePos);
        let angle = Math.PI / 2 - renderElemm.angleBetween(mousePos, shootingCirc);
        // console.log(shootingCirc);
        let x = shootingCirc.x + 75 * Math.sin(angle);
        let y = shootingCirc.y + 75 * Math.cos(angle);

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(shootingCirc.x, shootingCirc.y);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(aimCoords.x, aimCoords.y);
        ctx.lineTo(shootingCirc.x, shootingCirc.y);
        // ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 10;
        ctx.strokeStyle = "red";
        ctx.stroke();
    } else {
        power = 0;
    }
};

const shootingCirc = {
    x: 200,
    y: groundPoint - 200,
    r: 75
};

const drawBackCirc = {
    x: shootingCirc.x,
    y: shootingCirc.y,
    r: 10
};

const drawCircles = function () {
    ctx.beginPath();
    ctx.arc(shootingCirc.x, shootingCirc.y, shootingCirc.r, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(drawBackCirc.x, drawBackCirc.y, drawBackCirc.r, 0, 2 * Math.PI);
    ctx.stroke();
    drawAimer();
};

const isFiredArrow = function () {
    if (mousePos && drawnBack && mouseUp) {
        drawnBack = false;
        firedArrow = true;
    }
};

const isDrawnBack = function () {
    if (mousePos && isInCircle(mousePos)) {
        if (mouseDown)
            drawnBack = true;
        else if (mouseUp)
            drawnBack = false;
    }
};

setInterval(() => {
    // mousePos.x = randomFloat(0, canvas.width);
    // mousePos.y = randomFloat(0, canvas.height);
    let shootingCirc = { x: 100, y: 273, r: 75 };
    let angle = 0;
    let x = shootingCirc.x * Math.sin(angle);
    let y = shootingCirc.y * Math.cos(angle);

    // let angle = Math.PI / 2 - renderElemm.angleBetween(mousePos, shootingCirc);

    mousePos.x = x;
    mousePos.y = y;

    // mousePos.x = randomFloat(canvas.width / 2, canvas.width);
    // mousePos.y = randomFloat(canvas.height / 2, canvas.height);

    shot();
    console.log(angle);
}, 5000);

function shot() {
    firedArrow = true;
    isDrawnBack();
    isFiredArrow();

    if (firedArrow) {
        currArrow.fireArrow();
        firedArrow = false;
    }
}

const update = function () {
    isDrawnBack();
    isFiredArrow();

    if (firedArrow) {
        currArrow.fireArrow();
        firedArrow = false;
    }

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const render = function () {
    const info = {
        text: ['Angle:', 'Power:', 'x:', 'y:', 'drag x:', 'drag y:'],
        value: [0, 0, 0, 0, 0, 0],
        color: "#ffffff",
        font: "11px Helvetica",
        step: 15,
    };

    renderElemm.info(info);

    drawCircles();

    for (let i = 0; i < arrows.length; i++)
        arrows[i].drawArrow();

    renderElemm.drawScene(groundPoint);
};

var main = function () {
    update();
    render();
    requestAnimationFrame(main);
};


main();

requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;