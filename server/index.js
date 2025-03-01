import express from 'express'
import { Server } from 'socket.io'

// Setting up the server
const PORT = process.env.PORT || 8080
const app = express()

const expressServer = app.listen(PORT, () => {
    console.log(`Server is up and running! Listening with port ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false :
        ["http://localhost:5173"]
    }
})

// More back-end should go here

// Handles client connection and listens for messages
io.on('connection', socket => {
    console.log(`Connection with ID ${socket.id}`)

    // listening for messages...
})