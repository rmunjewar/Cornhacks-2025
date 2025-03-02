import express, { Router } from 'express'
import { Server } from 'socket.io'
import { exampleStars } from '../client/src/ExampleStars.js'

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

let stars = exampleStars

const TICK_RATE = 1000;
const ROTATE = {
    x: 50,
    y: 100,
    theta: -0.001
}

const SHOOTING_STAR_CHANCE = 0
const SUPERNOVA_CHANCE = 0.1
const UFO_CHANCE = 0

// Function to define the amount of time the client has to wait before placing another star, in milliseconds
function getTimeout() {
    return 5000 + 55 * Math.pow(stars.length, 2)
}

// Rotates all stars about the point ROTATE
function rotateStars() {
    const sinTheta = Math.sin(ROTATE.theta)
    const cosTheta = Math.cos(ROTATE.theta)
    stars.forEach(star => {
        // translate point back to origin
        star.x -= ROTATE.x
        star.y -= ROTATE.y

        // rotate point
        const rotatedX = star.x * cosTheta - star.y * sinTheta
        const rotatedY = star.x * sinTheta + star.y * cosTheta

        // translate point back
        star.x = rotatedX + ROTATE.x
        star.y = rotatedY + ROTATE.y
    })
}
function keepStarCondition(star) {
    return star.x > -5 && star.y < 101
}

function triggerRandomEvents() {
    // shooting star
    if (Math.random() <= SHOOTING_STAR_CHANCE) {
        console.log("Look! A shooting star!")
        triggerShootingStar()
    }

    // supernova
    if (Math.random() <= SUPERNOVA_CHANCE) {
        console.log("Uh oh, a supernova. Stay safe for the next 22 minutes.")
        triggerSupernova()
    }

    // ufo
    if (Math.random() <= UFO_CHANCE) {
        console.log("Look! A UFO!")
        triggerUFO()
    }
}

function triggerShootingStar() {
    const shootingStar = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        direction: Math.random() * 2 * Math.PI,
        speed: Math.random() * 10,
        duration: Math.random * 900 + 100
    }
    io.emit('shooting-star', (shootingStar))
}
function triggerSupernova() {
    if (stars.length > 0) {
        const starIdx = Math.floor(Math.random() * stars.length)
        const supernova = stars.splice(starIdx, 1)[0]
        io.emit('supernova', supernova)
    }
}
function triggerUFO() {
    const startingSides = ["top", "bottom", "left", "right"]
    const startingSide = startingSides[Math.floor(Math.random() * startingSides.length)]
    const possibleObjects = ["cow", "corn", "spaceship", "galileo", "ufo"]
    const chosenObject = possibleObjects[Math.floor(Math.random() * possibleObjects.length)]
    let ufo = null

    switch(startingSide) {
        case "top":
            ufo = {
                x: Math.random() * 100,
                y: -10,
                direction: Math.random() * Math.PI + Math.PI,
            }
        case "bottom":
            ufo = {
                x: Math.random * 100,
                y: 110,
                direction: Math.random() * Math.PI,
            }
            break
        case "left":
            ufo = {
                x: -10,
                y: Math.random() * 100,
                direction: Math.random() * Math.PI + Math.PI * 3/2,
            }
            break
        case "right":
            ufo = {
                x: 110,
                y: Math.random() * 100,
                direction: Math.random() * Math.PI + Math.PI / 2,
            }
            break
    }

    if (ufo) {
        ufo.speed = Math.random() + 1
        ufo.object = chosenObject
        io.emit('ufo', (ufo))
    }
}

function tick() {
    // Update and filter stars
    rotateStars()
    stars = stars.filter(keepStarCondition)

    // Calculate random events
    triggerRandomEvents()

    // debug message for tracking ticks
    // console.log("tick")
    
    io.emit('stars-update', (JSON.stringify(stars)))
    setTimeout(tick, TICK_RATE)
}
tick() // starts ticking every TICK_RATE milliseconds

// Handles client connection and listens for messages
io.on('connection', socket => {
    console.log(`Connection with ID ${socket.id}`)
    socket.emit('timeout-update', getTimeout())

    // listening for messages...
    socket.on('star-add', (star) => {
        stars.push(star)
        io.emit('stars-update', JSON.stringify(stars))
        io.emit('timeout-update', getTimeout())
    })
})