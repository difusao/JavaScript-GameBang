export default function RenderElemment(ctx, canvas) {

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  var bull_start = {
    x: cx,
    y: cy,
    angle: 0,
    radians: 0,
    power: 0,
  };

  var targets = [];

  const DistanceEuclidean = function (x1, y1, x2, y2) {
    let x_d = x2 - x1;
    let y_d = y2 - y1;

    return (Math.sqrt(Math.pow(x_d, 2) + Math.pow(y_d, 2)));
  }

  const Ground = function () {
    this.draw = function () {
      ctx.beginPath();
      ctx.fillStyle = "#008000";
      ctx.strokeStyle = "#004000";
      ctx.lineWidth = 2;
      ctx.rect(0, canvas.height - 28, canvas.width, canvas.height);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    };

    this.update = function () {
      this.draw();
    };
  };

  const DrawTest = function () {
    this.draw = function () {
      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(canvas.width / 2, canvas.height / 2, 200, 200);
      ctx.closePath();
    };

    this.update = function () {
      this.draw();
    };
  }

  const Info = function () {
    let row = 10;
    this.config = {};

    this.draw = function () {
      ctx.beginPath();
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.font = this.config.font;
      ctx.fillStyle = this.config.color;

      for (let i = 0; i < this.config.text.length; i++) {
        ctx.fillText(this.config.text[i], 10, row);
        ctx.fillText(this.config.value[i], 80, row);
        row += 20;
      }

      row = 10;

      ctx.closePath();
    };

    this.update = function (infoConfig) {
      this.config = infoConfig;
      this.draw();
    };
  };

  const Gun = function () {
    let x = 0;
    let y = 0;
    let sx = 25;
    let sy = canvas.height - 55;
    let px = 0;
    let py = 0;

    this.draw = function () {
      const trace = {
        draw: function (x1, y1, oldX, oldY, xVel, yVel, g) {
          let b = 0;
          for (let i = 0; i < 100; i++) {
            // var myInterval = setInterval(function () {
            x1 += xVel;
            y1 += yVel;
            yVel += g;

            ctx.beginPath();

            if (b == 0) {
              ctx.strokeStyle = "#ffffff";
              b = 1;
            } else {
              ctx.strokeStyle = "#7092be";
              b = 0;
            }

            ctx.lineWidth = 2;
            ctx.moveTo(oldX, oldY);
            ctx.lineTo(x1, y1);
            ctx.stroke();
            ctx.closePath();

            oldX = x1;
            oldY = y1;
          }
        }
      };

      const cano = {
        draw: function () {
          ctx.beginPath();
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 20;
          // ctx.lineJoin = 'round';
          // ctx.lineCap = 'round';
          ctx.moveTo(sx, sy);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.fill();
          ctx.closePath();
        }
      };

      const baseAro = {
        draw: function () {
          ctx.beginPath();
          ctx.strokeStyle = "#ffffff";
          ctx.fillStyle = "#ffffff";
          ctx.lineWidth = 10;
          // ctx.lineJoin = 'round';
          // ctx.lineCap = 'round';
          ctx.arc(sx, sy, 20, 0, 2 * Math.PI, false);
          ctx.stroke();
          ctx.fill();
          ctx.closePath();
        }
      };

      const basePower = {
        draw: function () {
          ctx.beginPath();
          ctx.strokeStyle = "#ffffff";
          // ctx.fillStyle = "#7092be";
          ctx.lineWidth = 5;
          ctx.arc(sx, sy, 18, 0, 2 * Math.PI, false);
          ctx.stroke();
          // ctx.fill();
          ctx.closePath();

          ctx.beginPath();
          ctx.strokeStyle = "#760202";
          // ctx.fillStyle = "#7092be";
          ctx.lineWidth = 5;
          // ctx.arc(sx, sy, 18, 0, 2 * Math.PI, false);
          ctx.arc(sx, sy, 18, 0, (bull_start.power) * Math.PI, false);
          ctx.stroke();
          // ctx.fill();
          ctx.closePath();
        }
      };

      const basetxt = {
        draw: function () {
          ctx.beginPath();
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "bold 10px Arial";
          ctx.fillText((bull_start.power * 10).toFixed(1), sx, sy);
          ctx.closePath();
        }
      };

      baseAro.draw();
      cano.draw();
      basePower.draw();
      basetxt.draw();
    };

    this.update = function (mousePos, power) {
      bull_start.angle = Math.atan2(mousePos.y - sy, mousePos.x - sx);
      bull_start.radians = Math.atan2(mousePos.y - sy, mousePos.x - sx) * 180 / Math.PI

      x = sx + Math.cos(bull_start.angle) * 52;
      y = sy + Math.sin(bull_start.angle) * 52;

      px = sx + Math.cos(bull_start.angle) * (power < 50 ? power : 50);
      py = sy + Math.sin(bull_start.angle) * (power < 50 ? power : 50);

      bull_start.power = power;
      bull_start.x = x;
      bull_start.y = y;

      this.draw();
    };
  }

  const Bullet = function () {
    this.x = bull_start.x;
    this.y = bull_start.y;
    this.arrowTipCoords = { x: this.x + 50, y: this.y };
    this.speed = bull_start.power * 12;
    this.velX = Math.cos(bull_start.angle) * this.speed;
    this.velY = Math.sin(bull_start.angle) * this.speed;
    var gravity = 0.3;
    this.radius = 50;

    this.draw = function () {
      var angle = Math.atan2(this.velX, this.velY);
      this.arrowTipCoords.x = this.x + 50 * Math.sin(angle);
      this.arrowTipCoords.y = this.y + 50 * Math.cos(angle);
      var arrowTip = { x: this.arrowTipCoords.x, y: this.arrowTipCoords.y }

      this.velY += gravity;
      this.x += this.velX;
      this.y += this.velY;

      ctx.beginPath();
      // ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      // ctx.moveTo(this.x, this.y);
      // ctx.lineTo(arrowTip.x, arrowTip.y);
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.stroke();
      // ctx.fill();
      ctx.closePath();
    };

    this.update = function (bullets) {

      var bullet_index = 0;

      for (var i = 0; i < bullets.length; i++) {
        if (this === bullets[i]) {
          bullet_index = i;
          break;
        }
      }

      // if (this.x > canvas.width / 2 || this.y > canvas.height / 2) {
        this.x = canvas.width / 2 - 27;
        this.y = canvas.height / 2 + 5;
      // }

      // if (this.x > canvas.width || this.y > canvas.height || this.x < 0) {
      //   bullets.splice(bullet_index, 1);
      // }

      this.draw();
    };
  }

  const Bullet2 = function () {
    this.power = bull_start.power;
    this.x = bull_start.x;
    this.y = bull_start.y;

    // this.dx = Math.cos(bull_start.angle) * this.power;
    // this.dy = Math.sin(bull_start.angle) * this.power;

    this.dx = bull_start.x + 20 * Math.sin(bull_start.angle);
    this.dy = bull_start.y + 20 * Math.cos(bull_start.angle);

    this.radius = 10;
    this.velocity = 30;
    this.gravity = 0.3;

    this.sx = bull_start.x;
    this.sy = bull_start.y;
    this.oldX = bull_start.x;
    this.oldY = bull_start.y;
    this.xVel = this.dx;
    this.yVel = this.dy;

    this.angle = Math.atan2(this.dx, this.dy);
    console.log(this.dx, this.dy, this.angle);

    this.g = 1;

    this.draw = function () {
      this.sx += this.xVel;
      this.sy += this.yVel;
      this.yVel += this.g;

      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 10;

      ctx.moveTo(this.oldX, this.oldY);
      ctx.lineTo(this.sx, this.sy);
      // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      // ctx.rect(this.x, this.y, 40, 10);

      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      this.oldX = this.sx;
      this.oldY = this.sy;
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

      // if (this.x > canvas.width || this.y < -848 || this.x < 0) {
      //   bullets.splice(bullet_index, 1);
      // }

      this.draw();
    }
  }

  const Target = function () {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.width = 50;
    this.height = 50;
    this.radius = 50;
    this.ang = (canvas.height / 2) / canvas.width;

    var target_index = 0;
    this.draw = function () {
      // ctx.beginPath();
      // ctx.rect(this.x, this.y, this.width, this.height);
      // ctx.strokeStyle = this.color;
      // ctx.lineWidth = 1;
      // ctx.fillStyle = '#ffffff';
      // ctx.fill();
      // ctx.stroke();
      // ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "#ff0000";
      ctx.lineWidth = 1;
      // ctx.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.radius, 0, Math.PI * 2, false);
      ctx.arc(canvas.width / 2, canvas.height / 2, this.radius, 0, Math.PI * 2, false);
      // ctx.lineWidth = 1;
      ctx.stroke();
      ctx.closePath();
    };

    this.update = function (bullets, targets) {
      for (var i = 0; i < bullets.length; i++) {
        if (DistanceEuclidean(this.x, this.y, bullets[i].x, bullets[i].y) < (this.radius + bullets[i].radius)) {
          console.log("ok", DistanceEuclidean(this.x, this.y, bullets[i].x, bullets[i].y), (this.radius + bullets[i].radius));
          // bullets.splice(i, 1);
          // targets.splice(target_index, 1);

          continue;
        }
      }
      this.draw();
    };
  }


  return {
    Ground,
    Info,
    DrawTest,
    Gun,
    Bullet,
    Target,
    bull_start,
  }
}
