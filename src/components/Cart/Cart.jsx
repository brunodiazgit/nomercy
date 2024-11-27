import { useCart } from "../context/CartContext"
import CartItem from "./CartItem"
import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"

function Cart() {
    const { cart, fetchCart, total } = useCart()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === "/nomercy/cart") {
            fetchCart()
        }
    }, [location, fetchCart])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-5">
            {cart.map(item => (
                <CartItem item={item} key={item.product_id} />
            ))}
            {cart.length ? <Link to={'/nomercy/checkout'}>
                <button className="checkoutbtn mt-5 mb-5">
                    Checkout USD {total}
                </button>
            </Link> : <div style={{ marginTop: "14rem", marginBottom: "14rem" }} className="d-flex flex-column justify-content-center align-items-center"><h1><b>The cart is empty</b></h1> <Link style={{ textDecoration: "underline", color: "blue" }} to={'/nomercy/'}>Go home</Link> </div>}
        </div>
    )
}

export default Cart