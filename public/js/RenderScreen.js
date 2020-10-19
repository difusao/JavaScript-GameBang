export default function RenderScreen(cv) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.id = cv.id;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let dimmensions = {
        Width: canvas.width,
        Height: canvas.height,
    };

    function CreateStyle(canvas) {
        document.body.appendChild(canvas);
        document.body.style.padding = 0;
        document.body.style.margin = 0;
        document.body.style.overflow = 'hidden';
        document.body.style.background = cv.bgcolor;
    }

    CreateStyle(canvas);

    return {
        ctx,
        dimmensions,
        canvas,
    }
}




