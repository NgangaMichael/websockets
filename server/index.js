const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST",]
    }
});

io.on('connection', (socket) => {
    console.log(`user conncted: ${socket.id}`)

    // sending message to specific people 
    socket.on('join_roon', (data) => {
        socket.join(data)
    })

    // sending t evryone 
    socket.on('send_message', (data) => {
        console.log(data)
        // sending message to everyone except your self 
        socket.broadcast.emit('receive_message', data);
        
    })
})

server.listen(3001, () => {
    console.log('Server is running')
})