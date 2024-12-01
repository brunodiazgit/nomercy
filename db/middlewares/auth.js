/* eslint-disable no-undef */

import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] // getting token 

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // Verifying
        req.user = decoded 
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' })
    }
}

export const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: `Access denied. Requires ${role} role.` })
        }
        next()
    }
}
