/* eslint-disable react/prop-types */
import { authContext } from "./AuthContext"
import { useEffect, useState } from "react"
import {jwtDecode} from 'jwt-decode'

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Comprobar si existe un token en el almacenamiento local
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const decodedToken = jwtDecode(token)
                const currentTime = Date.now() / 1000
                if (decodedToken.exp > currentTime) {
                    setIsAuthenticated(true)
                    setUser(decodedToken)  // Almacenar la información del usuario decodificada
                } else {
                    localStorage.removeItem('token')
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error)
                localStorage.removeItem('token')
            }
        }
        setLoading(false)
    }, [])

    const login = (token) => {
        localStorage.setItem('token', token)
        try {
            const decodedToken = jwtDecode(token)
            setIsAuthenticated(true)
            setUser(decodedToken)
        } catch (error) {
            console.error('Error al decodificar el token:', error)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <authContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider
