import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import { useAuth } from "./context/AuthContext"

function OrdersContainer() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user, loading: authLoading } = useAuth()


    useEffect(() => {
        const fetchOrders = async () => {
            if (authLoading) return // Espera a que termine la autenticación
            if (!user) {
                setError("User not authenticated")
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`http://localhost:3900/api/orders/find/${user.email}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                })

                if (!response.ok) {
                    throw new Error("Failed to fetch orders")
                }

                const data = await response.json()
                setOrders(data.orders)
                console.log(data.orders)
            } catch (error) {
                setError('Failed to fetch orders')
                console.error('Error fetching orders:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [user, authLoading])

    if (loading) return <div>Loading...</div>
    if (error) return <div className="text-center">{error}</div>

    return (
        <Container className="d-flex">
            <div className="orders-container">
                <h2>Orders</h2>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="order-item">
                            <h3 className="">Order ID: {order._id}</h3>
                            <p>Created At: {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p>Total Amount: USD {order.totalAmount.toFixed(2)}</p>
                            <div className="items">
                                {order.items.length === 0 ? (
                                    <p>No items in this order.</p>
                                ) : (
                                    order.items.map((item) => (
                                        <div key={item.id} className="item">
                                            <p>Item: {item.name}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: USD   {item.price.toFixed(2)}</p>
                                            <hr />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="orders-logo">
                <h1 className="orders-brand">NO MERCY</h1>
            </div>
        </Container>
    )
}

export default OrdersContainer
