export default function Sckt() {
    const socket = io();

    socket.on('connect', () => {
        console.log('Connected in server: ', socket.id);
    });
    
    socket.on('setup', (state) => {
        console.log(state);
    });
}