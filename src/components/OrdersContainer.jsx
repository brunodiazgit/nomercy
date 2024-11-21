import Container from "react-bootstrap/Container"
import { useCart } from "./context/CartContext"

function OrdersContainer() {
    const { orders } = useCart()

    return (
        <Container className="d-flex">
            <div className="orders-container">
                <h2 className="orders">ORDERS</h2>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.order_id} className="order-item">
                            <h3>Order ID: {order.order_id}</h3>
                            <h3>Created At: {order.date}</h3>
                            <div className="items">
                                {order.details.map((detail) => (
                                    <div key={detail.product_id}>
                                        <p><b>Product Name: </b>{detail.product_name}</p>
                                        <p><b>Quantity: </b> {detail.quantity}</p>
                                        <p><b>Price USD </b> {detail.price}</p>
                                    </div>
                                ))}
                                <p><b>Total USD </b>{order.total}</p>
                                <hr />
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
