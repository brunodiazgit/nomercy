/* eslint-disable react/prop-types */
import { cartContext } from "./CartContext"
import { useState, useEffect } from "react"

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [cartQuantity, setCartQuantity] = useState(0)
    const [total, setTotal] = useState(0)
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetchCartQuantity()
    }, [])

    const fetchCartQuantity = async () => {
        try {
            const response = await fetch('http://localhost:4100/api/cart/quantity', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json()

            if (response.ok) {
                setCartQuantity(data.cartQuantity)
            }
        } catch (error) {
            console.error("Error fetching cart quantity:", error)
        }
    }

    const fetchCart = async () => {
        try {
            const response = await fetch('http://localhost:4100/api/cart/product', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (!response.ok) {
                throw new Error("Error fetching cart data")
            }

            const data = await response.json()

            setCart(data.cart)
            setTotal(Number(data.total).toFixed(2))
        } catch (error) {
            console.log("error: ", error)
        }
    }

    const addToCart = async (product, quantity) => {
        try {
            const response = await fetch('http://localhost:4100/api/cart/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: quantity
                })
            })

            const addedItem = await response.json()

            if (response.ok) {
                console.log('Producto añadido:', addedItem)
                setCartQuantity((prev) => prev + quantity)
            } else {
                setMessage("You must be logged in to use this feature")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const updateProductQuantity = async (product_id, newQuantity) => {
        try {
            const response = await fetch('http://localhost:4100/api/cart/product', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    product_id: product_id,
                    quantity: newQuantity
                })
            })

            const data = await response.json()

            if (response.ok) {
                setCart((prevCart) => {
                    return prevCart.map(item =>
                        item.product_id === product_id ? { ...item, quantity: newQuantity } : item
                    )
                })
                const oldItem = cart.find(item => item.product_id === product_id)
                const difference = newQuantity - oldItem.quantity
                setCartQuantity(prev => prev + difference)
            } else {
                console.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const removeFromCart = async (product_id) => {
        try {
            const response = await fetch(`http://localhost:4100/api/cart/product`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ product_id: product_id })
            })

            const data = await response.json()

            if (response.ok) {
                const removedItem = cart.find(item => item.product_id === product_id)
                setCart((prevCart) => prevCart.filter(item => item.product_id !== product_id))
                setCartQuantity((prev) => prev - removedItem.quantity)
            } else {
                console.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {

        try {
            const response = await fetch(`http://localhost:4100/api/orders/details`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            if (!response.ok) {
                throw new Error("Failed to fetch orders")
            }
            const data = await response.json()
            setOrders(data.orders)
        } catch (error) {
            console.error('Error fetching orders:', error)
        }
    }




    return (
        <cartContext.Provider value={{ cart, addToCart, setCart, updateProductQuantity, removeFromCart, cartQuantity, setCartQuantity, fetchCart, total, orders, fetchOrders, message }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartProvider