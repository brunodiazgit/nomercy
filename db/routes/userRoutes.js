import express from "express"
import { prueba, register, login} from "../controller/userController.js"
const router = express.Router()


export default (pool)=>{
    router.get('/prueba', (req, res)=> prueba(req, res, pool))
    router.post('/register', (req, res)=> register(req, res, pool))
    router.post('/login', (req, res)=> login(req, res, pool))

    return router
}
