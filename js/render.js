function ElemmentsRender(canvasname) {
    const canvas = document.getElementById(canvasname);

    function Ground(ctx) {
        // ground
        ctx.beginPath();
        ctx.fillStyle = "#008000";
        ctx.strokeStyle = "#000000";
        ctx.rect(0, canvas.height - 20, canvas.width, 25);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    return {
        canvas,
        Ground,
    }
}