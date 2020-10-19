export default function RenderElemment(ctx, canvas) {

  const drawScene = function (groundPoint) {
    // increased groundPoint so arrows stick where they should in the ground
    var ground = groundPoint + 15;

    // sky
    ctx.fillStyle = "rgba(0,0,200,0.2)";
    ctx.fillRect(0, 0, canvas.width, ground);

    // ground
    ctx.beginPath();

    ctx.moveTo(0, ground);
    ctx.lineTo(canvas.width, ground);

    ctx.strokeStyle = "rgba(0,100,50,0.6)";
    ctx.stroke();
    ctx.fillStyle = "rgba(0,200,100,0.6)";
    ctx.fillRect(0, ground, canvas.width, canvas.height);
  };

  const info = function (content) {
    let row = 10;
    ctx.clearRect(0, 0, canvas.Width, canvas.Height);
    ctx.beginPath();
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.font = content.font;
    ctx.fillStyle = content.color;

    for (let i = 0; i < content.text.length; i++) {
      row += content.step;
      ctx.fillText(content.text[i], 10, row);
      ctx.fillText(content.value[i], 60, row);
    }

    ctx.closePath();
  };

  const angleBetween = function (p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  };

  const distBetween = function (p1, p2) {
    return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
  }

  return {
    drawScene,
    info,
    angleBetween,
    distBetween,
  };
}
