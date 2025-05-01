const express = require('express')
const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/cliente/index.html')
})

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado')
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
        io.emit('chat message', msg)
    })
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado')
    })
})

server.listen(3000, () => {
    console.log('Server corriendo en el puerto 3000')
})