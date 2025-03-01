import express, { Router } from 'express'
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
const stars = []

const TICK_RATE = 5000;
const ROTATE = {
    x: 1000,
    y: 1000,
    theta: 0.1
}

// Rotates all stars about the point ROTATE
function rotateStars() {
    sinTheta = Math.sin(ROTATE.theta)
    cosTheta = Math.cos(ROTATE.theta)
    stars.forEach(star => {
        // translate point back to origin
        star.x -= ROTATE.x
        star.y -= ROTATE.y

        // rotate point
        rotatedX = star.x * cosTheta - star.y * sinTheta
        rotatedY = star.x * sinTheta + star.y * cosTheta

        // translate point back
        star.x = rotatedX + ROTATE.x
        star.y = rotatedY + ROTATE.y
    })
}
function keepStarCondition(star) {
    return star.x >= 0
}

function tick() {
    rotateStars()
    stars.filter(keepStarCondition)

    io.emit('stars-update', (JSON.stringify(stars)))

    setTimeout(tick, TICK_RATE)
}
tick()

// Handles client connection and listens for messages
io.on('connection', socket => {
    console.log(`Connection with ID ${socket.id}`)

    // listening for messages...
    socket.on('star-add', (star) => {
        stars.push(star)
    })
})