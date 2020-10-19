const express = require('express');
const app = express()
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app)
const sockets = socketio(server)
const port = 3000;

app.use(express.static('./public'))

sockets.on('connection', (socket) => {

    console.log('Connected: ' + socket.id);

    socket.on('disconnect', () => {
        console.log('Client desconnected of server: ' + socket.id)
    });
});

server.listen(port, () => {
    console.log('Listen server on', port);
});