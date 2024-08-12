import jwt from "jwt-simple"
import moment from "moment"
import libjwt from "../services/jwt"

const key = libjwt.key


export const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: "error",
            message: "request needs headers",
        })
    }
    let token = req.headers.authorization.replace(/ ['"]+/g, '')
    try {
        let payload = jwt.decode(token, key)

        //comprobar expiracion del token
        if (payload.exp <= moment().unix()) {
            return res.status(401).json({
                status: "error",
                message: "Token has expired",
            })
        }

        // agregar datos de usuario a request
        req.user = payload

        // pasar a ejecucion de accion
        next()


    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: "Token invalido",
            error
        })
    }

}