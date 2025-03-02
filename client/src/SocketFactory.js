import { io } from 'socket.io-client'

const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://a-brighter-future.onrender.com'

export const socket = io(URL, {
    transports: ["websocket", "polling"], // Ensure fallback works
    withCredentials: true, // Send credentials if needed
})