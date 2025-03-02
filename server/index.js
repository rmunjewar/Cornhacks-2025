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

const TICK_RATE = 200;
const ROTATE = {
    x: 50,
    y: 100,
    theta: -0.0002
}

const SHOOTING_STAR_CHANCE = 0
const SUPERNOVA_CHANCE = 0.0001
const UFO_CHANCE = 0.001

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

// diff paths for objects
const PATH_TYPES = [
  "straight", //  straight line
  "wavy", // wavy pattern
  "zigzag", //  zigzag pattern
  "diagonal-up", //  diagonally upward
  "diagonal-down", //  diagonally downward
];

function triggerUFO() {
    // this is to generate a random height
    const randomY = Math.floor(Math.random() * 80) + 5;
    const randomImageIndex = Math.floor(Math.random() * 6);

    const sides = ["left", "right"];
    const randomSide = sides[Math.floor(Math.random() * sides.length)];
    const randomPathType =
      PATH_TYPES[Math.floor(Math.random() * PATH_TYPES.length)];

    let startX, startY, direction;

    // choosing random left or right side for object
    if (randomSide === "left") {
      startX = -5;
      startY = randomY;
      direction = "right";
    } else {
      startX = 105;
      startY = randomY;
      direction = "left";
    }

    // create new object
    const ufo = {
      id: Date.now(),
      image: randomImageIndex,
      x: startX,
      y: startY,
      direction: direction,
      pathType: randomPathType,
      speed: Math.random() * 0.5 + 0.2,
      amplitude: Math.random() * 2 + 1,
      frequency: Math.random() * 0.1 + 0.05,
      phase: 0,
      originalY: startY,
      rotation: 0,
      rotationSpeed: Math.random() * 2 - 1,
    };

    io.emit('ufo', (ufo))
}

setInterval(() => {
    // Update and filter stars
    rotateStars()
    stars = stars.filter(keepStarCondition)

    // Calculate random events
    triggerRandomEvents()

    // debug message for tracking ticks
    // console.log("tick")
    
    io.emit('stars-update', (JSON.stringify(stars)))
}, TICK_RATE)

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