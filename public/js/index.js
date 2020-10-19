import RenderScreen from './RenderScreen.js'
import RenderElemment from './RenderElemment.js'
import MainFunctions from './MainFunctions.js'

var mousePos = { x: 190, y: 495 };
var mouseDown = false;
var mouseUp = false;
let power = 2;

let secondsPassed;
let oldTimeStamp;
let fps;

const renderScr = RenderScreen({
    id: 'mycanvas',
    bgcolor: "#000000", //'#7092be',
});
const ctx = renderScr.ctx;
const mainFunc = MainFunctions();

const canvas = {
    width: renderScr.canvas.width,
    height: renderScr.canvas.height,
    ctx: renderScr.ctx,
};

const renderElemm = RenderElemment(ctx, canvas);
const w = window;
let bullets = [];
let targets = [];

var ground = new renderElemm.Ground();
var gun = new renderElemm.Gun();
var info = new renderElemm.Info();

requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    start();
});

document.addEventListener("mousemove", function (evt) {
    mousePos = mainFunc.getMousePos(renderScr.canvas, evt);
}, false);

document.addEventListener("click", function (evt) {
    bullets.push(new renderElemm.Bullet());
    // console.log(bullets);
    // const montain = new renderElemm.Montain();
    // new renderElemm.Montain().update();
}, false);

document.addEventListener("mouseup", function (evt) {

}, false);

document.addEventListener("wheel", function (evt) {
    power += (event.deltaY * -0.001) / 10;

    if (power > 2) {
        power = 2;
    } else if (power < 1) {
        power = 1;
    }
}, false);

const update = function (timeStamp) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    fps = Math.round(1 / secondsPassed);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < bullets.length; i++)
        bullets[i].update(bullets);

    for (var i = 0; i < targets.length; i++)
        targets[i].update(bullets, targets);
        
    // console.log(bullets);

    // ground.update();
    // montain.update(bullets);

    gun.update(mousePos, power);
    info.update({
        text: ['FPS:', 'Mouse X:', 'Mouse Y:', 'Power:', 'Angle (R):', 'Angle (G):'],
        value: [fps, mousePos.x, mousePos.y, renderElemm.bull_start.power, renderElemm.bull_start.radians, renderElemm.bull_start.angle],
        color: "#535353",
        font: "normal 12px Helvetica",
    });
}

const start = function () {
    // ground = new renderElemm.Ground();
    targets.push(new renderElemm.Target());
    gun = new renderElemm.Gun();
    info = new renderElemm.Info();    
    main();
}

const main = function (timeStamp) {
    update(timeStamp);

    // requestAnimationFrame(main);
    setTimeout(function () {
        requestAnimationFrame(main);
    }, 1000 / 60);
};

start();