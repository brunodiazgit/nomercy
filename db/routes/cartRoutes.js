import express from "express"
import { addToCart, cartQuantity, deleteCartProduct, editQuantity, getCart } from "../controller/cartController.js"
import { authenticateToken } from "../middlewares/auth.js"
const router = express.Router()

export default (pool)=>{
    router.get('/product', authenticateToken, (req, res)=> getCart(req, res, pool))
    router.get('/quantity', authenticateToken, (req, res)=> cartQuantity(req, res, pool))
    router.put('/product', authenticateToken, (req, res)=> editQuantity(req, res, pool))
    router.post('/product', authenticateToken, (req, res)=> addToCart(req, res, pool))
    router.delete('/product', authenticateToken, (req, res)=> deleteCartProduct(req, res, pool))
    return router
}