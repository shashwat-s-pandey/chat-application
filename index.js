const express = require("express")
const http = require("http")
const path = require("path")
const {Server} = require("socket.io")

const app = express()
const PORT = 8000
const server = http.createServer(app)
const io = new Server(server)

io.on("connection", (socket) => {
    // console.log("New user connected")
    socket.on("Client message", (mssg) => {
        // console.log("Server message", mssg)
        io.emit("Server message", mssg)
    })
})

app.use(express.static(path.resolve('./public')))

app.get('/', (req, res) => {
    return res.sendFile('/public/index.html')
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))