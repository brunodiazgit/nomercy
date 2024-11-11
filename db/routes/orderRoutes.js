import express from "express"
import { createOrder } from "../controller/orderController.js"
import { authenticateToken, authorizeRole } from "../middlewares/auth.js"

const router = express.Router()

export default (pool)=>{
    router.post('/create/', authenticateToken, authorizeRole('user'), (req, res)=> createOrder(req, res, pool))

    return router
}