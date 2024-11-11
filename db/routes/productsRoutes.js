import express from "express"
import { getProducts, getProductById, getProductByCategory, createProduct, editProduct, deleteProduct } from "../controller/productsController.js"
import { authenticateToken, authorizeRole } from "../middlewares/auth.js"
const router = express.Router()
import { upload } from "../controller/productsController.js"

export default (pool)=>{
    router.get('/products', (req, res)=> getProducts(req, res, pool))
    router.get('/products/:id', (req, res)=> getProductById(req, res, pool))
    router.get('/products/category/:category', (req, res)=> getProductByCategory(req, res, pool))
    router.put('/products/:id', authenticateToken, authorizeRole('admin'), (req, res)=> editProduct(req, res, pool))
    router.post('/products', authenticateToken, authorizeRole('admin'), upload.single('image'), (req, res) => createProduct(req, res, pool))
    router.delete('/products/:id', authenticateToken, authorizeRole('admin'), (req, res)=> deleteProduct(req, res, pool))
    return router
}