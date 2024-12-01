/* eslint-disable no-undef */

import express from "express"
import cors from "cors"
import pkg from "pg"
import userRoutes from "./db/routes/userRoutes.js"
import productsRoutes from "./db/routes/productsRoutes.js"
import cartRoutes from "./db/routes/cartRoutes.js"
import orderRoutes from "./db/routes/orderRoutes.js"
import dotenv from "dotenv";

dotenv.config()

console.log("Starting Node app.")

const app = express()

const port = 4100

app.use(cors())

app.use(express.json())

// DATABASE 

const { Pool } = pkg

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

//ROUTES 

app.use('/api/orders', orderRoutes(pool))
app.use('/api', productsRoutes(pool))
app.use('/api/user', userRoutes(pool))
app.use('/api/cart', cartRoutes(pool))

app.listen(port, () => {
    console.log("The server is running on port: " + port)
})