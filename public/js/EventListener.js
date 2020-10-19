export default function EventListener(document) {

    var mousePos = {};

    document.addEventListener('mousemove', (e) => {
        // this.setState({ left: e.pageX, top: e.pageY });
        console.log({ left: e.pageX, top: e.pageY });
        // mousePos = { left: e.pageX, top: e.pageY };
    });
}

/*
class Cursor extends Component {
    state = {
        left: 0,
        top: 0
    }

    componentDidMount() {
        document.addEventListener('mousemove', (e) => {
            // this.setState({ left: e.pageX, top: e.pageY });
            console.log({ left: e.pageX, top: e.pageY });
        });
    }
}

export default Cursor;
*/


/*
var foo = {
    mouse: {},
    mousepos: function (e) {
        this.mouse = {
            x: e.clientX,
            y: e.clientY,
        };

        // console.log(mousePos);
        const mousemove = document.addEventListener("mousemove", this.mousepos, false);
    },
};

export { foo };
*/

/*
export default function EventListener(document) {

    var mousePos = {};

    document.addEventListener("mousemove", function (evt) {
        // mousePos = getMousePos(renderScr.canvas, evt);
        mousePos = {
            x: evt.clientX,
            y: evt.clientY,
        };

    }, false);

    document.addEventListener("mousedown", function (evt) {
        // mousePos = getMousePos(renderScr.canvas, evt);
        // mouseDown = true;
        // mouseUp = false;
    }, false);

    document.addEventListener("mouseup", function (evt) {
        // mousePos = getMousePos(renderScr.canvas, evt);
        // mouseUp = true;
        // mouseDown = false;
    }, false);

    return {
        mousePos,
    };
}
*/