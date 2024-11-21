/* eslint-disable react/prop-types */
import { cartContext } from "./CartContext"
import { useState, useEffect } from "react"


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [cartQuantity, setCartQuantity] = useState(0)
    const [total, setTotal] = useState(0)
    const [orders, setOrders] = useState([])

    const fetchCart = async ()=>{
        try {
            const response =  await fetch('http://localhost:4100/api/cart/product',{
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
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
    
            if (response.ok) {
                const addedItem = await response.json()
                console.log('Producto añadido:', addedItem)
    
            } else {
                console.log('No se pudo añadir el producto')
            }
        } catch (error) {
            console.log(error)
        }
    }
    


    useEffect(()=>{
        fetchCart()
    },[])

    const updateProductQuantity = async(id, newQuantity) => {

        try {
            const response = await fetch('http://localhost:4100/api/cart/product',{
                method: 'PUT',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    product_id: id,
                    quantity: newQuantity
                })
            })

            const data = await response.json()

            if(response.ok){
                setCart((prevCart) => {
                    return prevCart.map(item => 
                        item.id === id ? { ...item, quantity: newQuantity } : item
                    )
                })
            }  else {
                console.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const removeFromCart = async (id) => {
        try {
            const response = await fetch(`http://localhost:4100/api/cart/product`,{
                method: 'DELETE',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({product_id: id})
            })

            const data = await response.json()

            if(response.ok){
                setCart((prevCart) => prevCart.filter(item => item.id !== id))

            }  else {
                console.error(data.message)
            }

        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(() => {
        const fetchCartQuantity = async () => {
            try {
                const response = await fetch('http://localhost:4100/api/cart/quantity', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })

                if (!response.ok) {
                    throw new Error("Error")
                }

                const data = await response.json()
                if(data.status === 'success'){
                    setCartQuantity(data.cartQuantity)
                }
            } catch (error) {
                console.error("Error fetching cart quantity:", error)
            } 
        }
        fetchCartQuantity()
    }, [])

    useEffect(() => {
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

        fetchOrders()
    }, [])


    return (
        <cartContext.Provider value={{ cart, addToCart, setCart, updateProductQuantity, removeFromCart, cartQuantity, fetchCart, total, orders }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartProvider