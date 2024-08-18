import express from "express"
import { createOrder } from "../controller/orderController.js"
import { findOrders} from "../controller/orderController.js"
const router = express.Router()

router.post("/create", createOrder)
router.get("/find/:email", findOrders)

export default router