/* eslint-disable react/prop-types */
import { cartContext } from "./CartContext"
import { useState } from "react"

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (obj) => {
        setCart((prevCart) => {
            const itemIndex = prevCart.findIndex(item => item.id === obj.id)
            if (itemIndex !== -1) {
                const updatedCart = [...prevCart]
                updatedCart[itemIndex].quantity += obj.quantity
                return updatedCart
            } else {
                return [...prevCart, obj]
            }
        })
    }

    const updateCartQuantity = (id, quantity) => {
        setCart((prevCart) => {
            return prevCart.map(item => 
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + quantity) } : item
            )
        })
    }

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id))
    }

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)
    
    const getTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)

    return (
        <cartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart, setCart, totalQuantity, getTotal }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartProvider