const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cx = canvas.width / 2;
const cy = canvas.height / 2;
const bgd = new Bgd();
const gun = new Gun();
const pnl = new Panel();

var bullets = [];

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

var bull_start = {
    x: cx,
    y: cy,
    angle: 0,
    power: 50,
};

canvas.addEventListener("keydown", function (evt) {
    if (evt.key == "ArrowUp" && bull_start.power < 100) {
        bull_start.power += 1;
    } else if (evt.key == "ArrowDown" && bull_start.power > 0) {
        bull_start.power -= 1;
    }
}, false);

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

canvas.addEventListener('click', function (evt) {
    bullets.push(new Bullet());
})

function Panel() {
    this.draw = function () {
    }

    this.update = function () {
        this.draw();
    }
}

function Bullet() {
    this.x = bull_start.x;
    this.y = bull_start.y;
    this.dx = Math.cos(bull_start.angle) * Math.floor(bull_start.power / 4);
    this.dy = Math.sin(bull_start.angle) * Math.floor(bull_start.power / 4);
    this.color = "#ffffff";
    this.radius = 20;
    this.velocity = 5;
    this.gravity = 0.3;

    this.color = "#ffffff";
    this.radius = 15;
    this.velocity = 5;
    this.gravity = 0.3;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    this.update = function (bullets) {
        var bullet_index = 0;

        for (var i = 0; i < bullets.length; i++) {
            if (this === bullets[i]) {
                bullet_index = i;
                break;
            }
        }

        this.x += this.dx;
        this.y += this.dy;
        this.dy += this.gravity;

        if (this.x > canvas.width || this.y > canvas.height - 40) {
            bullets.splice(bullet_index, 1);
        }

        this.draw();
    }
}

function Gun() {
    this.x = 0;
    this.y = 0;
    this.kx = 0;
    this.ky = 0;
    this.sx = 20;
    this.sy = canvas.height;
    this.gx = 0;
    this.gy = 0;
    this.length = 50;
    this.color = "#ffffff";

    this.draw = function () {
        // arc
        for (let i = 0; i < 16; i++) {
            ctx.beginPath();
            ctx.save();
            ctx.strokeStyle = "#808080";
            ctx.fillStyle = "#ffffff";
            ctx.lineWidth = 2;

            ctx.arc(cx, cy, 220, 1.5 * Math.PI, 0, false);

            ctx.setTransform(1, 0, 0, 1, cx, cy);
            ctx.rotate(-i / 9.53);

            ctx.fillRect(225, 0, 10, 3);

            ctx.stroke();
            ctx.restore();
            ctx.closePath();
        }

        // Showgun
        ctx.beginPath();
        ctx.save();

        ctx.fillStyle = "#808080";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;

        // arrow
        ctx.moveTo(cx, cy);
        ctx.lineTo(this.gx, this.gy);

        ctx.setTransform(1, 0, 0, 1, 50, canvas.height - 50);
        ctx.rotate(bull_start.angle - 1.57);

        ctx.rect(-15, 0, 30, 35);
        ctx.arc(0, 0, 15, 1 * Math.PI, 0);

        ctx.stroke();
        ctx.fill();

        // Brilho linha
        ctx.beginPath();
        ctx.fillStyle = "#c0c0c0";
        ctx.fillRect(10, 1, 2, 32);
        ctx.closePath();

        // Brilho curva
        ctx.beginPath();
        ctx.strokeStyle = "#c0c0c0";
        ctx.arc(-2, 1, 13, 1.7 * Math.PI, 0);
        ctx.stroke();
        ctx.closePath();

        // Shadow
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(-13, 0, 2, 32);
        ctx.closePath();

        // Display
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(-8, -2, 14, 32);
        ctx.closePath();

        // Power
        ctx.beginPath();
        if (bull_start.power < 1) {

        } else if (bull_start.power < 20) {
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(-6, 0, 10, 3);
        } else if (bull_start.power < 40) {
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(-6, 0, 10, 3);
            ctx.fillRect(-6, 5, 10, 3);
        } else if (bull_start.power < 60) {
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(-6, 0, 10, 3);
            ctx.fillRect(-6, 5, 10, 3);
            ctx.fillStyle = "#ffff00";
            ctx.fillRect(-6, 10, 10, 3);
        } else if (bull_start.power < 80) {
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(-6, 0, 10, 3);
            ctx.fillRect(-6, 5, 10, 3);
            ctx.fillStyle = "#ffff00";
            ctx.fillRect(-6, 10, 10, 3);
            ctx.fillRect(-6, 15, 10, 3);
        } else if (bull_start.power < 90) {
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(-6, 0, 10, 3);
            ctx.fillRect(-6, 5, 10, 3);
            ctx.fillStyle = "#ffff00";
            ctx.fillRect(-6, 10, 10, 3);
            ctx.fillRect(-6, 15, 10, 3);
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(-6, 20, 10, 3);
        } else if (bull_start.power >= 90) {
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(-6, 0, 10, 3);
            ctx.fillRect(-6, 5, 10, 3);
            ctx.fillStyle = "#ffff00";
            ctx.fillRect(-6, 10, 10, 3);
            ctx.fillRect(-6, 15, 10, 3);
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(-6, 20, 10, 3);
            ctx.fillRect(-6, 25, 10, 3);
        }

        ctx.restore();
        ctx.closePath();

        // base
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#000000";
        ctx.arc(this.sx + 25, canvas.height - 25, 15, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = "#c0c0c0";
        ctx.fillStyle = "#c0c0c0";
        ctx.arc(this.sx + 25, canvas.height - 25, 8, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = "#808080";
        //ctx.fillStyle = "#ffffff";
        ctx.arc(this.sx + 25, canvas.height - 23, 14, 1.5 * Math.PI, -.8);
        ctx.stroke();
        //ctx.fill();
        ctx.closePath();

        // ground
        ctx.beginPath();
        ctx.fillStyle = "#008000";
        ctx.strokeStyle = "#000000";
        ctx.rect(0, canvas.height - 25, canvas.width, 50);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.font = "20px Teko";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Angle: " + bull_start.angle * 180 / Math.PI + " (" + bull_start.angle + ") ", 30, 30);
        ctx.fillText("Power: " + bull_start.power, 30, 50);
        ctx.closePath();
    }

    this.update = function () {
        bull_start.angle = Math.atan2(mouse.y - cy, mouse.x - cx);

        if (bull_start.angle > 0) bull_start.angle = 0;
        if (bull_start.angle < -1.57) bull_start.angle = -1.57;

        this.x = 50 + Math.cos(bull_start.angle) * 40;
        this.y = canvas.height - 50 + Math.sin(bull_start.angle) * 40;

        this.gx = cx + Math.cos(bull_start.angle) * 250;
        this.gy = cy + Math.sin(bull_start.angle) * 250;

        bull_start.x = this.x;
        bull_start.y = this.y;

        this.draw();
    }
}

function Bgd() {
    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = "#7092be"
        // ctx.fillStyle = "#00ffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
    }

    this.update = function () {
        this.draw();
    }
}

function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bgd.update();
    gun.update();
    pnl.update();

    for (var i = 0; i < bullets.length; i++) {
        bullets[i].update(bullets);
    }
}

function start() {
    init();
    loop();
}

function init() {

}

start();