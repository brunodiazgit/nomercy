import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

function CartWidget() {
    let { totalQuantity } = useCart()

    return (
        <Link to={'/cart'}>
            <div className="d-flex justify-content-center align-items-center gap-2">
                <img style={{ height: "2rem", marginLeft: "1rem" }} src="../../../public/bag.svg" alt="cart svg" />
                <p style={{width: "5rem"}}>{totalQuantity}</p>
            </div>
        </Link>
    )
}

export default CartWidget