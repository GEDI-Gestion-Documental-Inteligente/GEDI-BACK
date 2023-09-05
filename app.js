import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
config()

import authRoutes from './src/routes/auth.routes.js'
import peopleRoutes from './src/routes/people.routes.js'
import { connectDB } from './src/database.js'

// Connect to DB
connectDB()

// Settings

const port = 4000
const app = express()

// Middlewares
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser({
    httpOnly: true,
    secure: false,
}))


// Rutas
app.use(authRoutes)
app.use(peopleRoutes)

// Not Found Routes
app.use((req, res) => res.send(`<p>La ruta no válida: <strong>${req.url}</strong></p>`))

// Server on listen
app.listen(port, () => console.log(`server on http://localhost:${port}`))