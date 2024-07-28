import { useCart } from "./context/CartContext"
import CartItem from "./CartItem"
import { Link } from "react-router-dom"

function Cart() {
    const { cart, getTotal } = useCart()

    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-5">
            {cart.map(item => (
                <CartItem item={item} key={item.id} />
            ))}
            {cart.length ? <Link to={'/checkout'}>
                <button className="checkoutbtn mt-5 mb-5">
                    Checkout  U$S {getTotal}
                </button>
            </Link> : <div style={{marginTop: "14rem", marginBottom: "14rem"}}className="d-flex flex-column justify-content-center align-items-center"><h1><b>The cart is empty</b></h1> <Link style={{textDecoration:"underline", color: "blue"}} to={'/'}>Go home</Link> </div>}
        </div>
    );
}

export default Cart