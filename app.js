import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import cookieParser from 'cookie-parser'
import { config } from 'dotenv'

import { connectDB } from './src/database.js'

// Rutas
import AuthLogin from './src/modules/authLogin/auth.controllers.js'
import People from './src/modules/people/people.controllers.js'
import Sites from './src/modules/sites/sites.controllers.js'
import Nodes from './src/modules/nodes/nodes.controllers.js'
config()

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
  secure: false
}))
//
app.use('/api/', AuthLogin)
app.use('/api/people', People)
app.use('/api/sites', Sites)
app.use('/api/nodes', Nodes)

// Not Found Routes
app.use((req, res) => res.send(`<p>La ruta no válida: <strong>${req.url}</strong></p>`))

// Server on listen
app.listen(port, () => console.log(`server on http://localhost:${port}`))
