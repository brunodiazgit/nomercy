import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

function CartWidget() {
    let { totalQuantity } = useCart()

    return (
        <Link to={'/cart'}>
            <div className="d-flex justify-content-center align-items-center gap-2 cartwidget">
                <img style={{ height: "2rem", marginLeft: "1rem" }}
                    src={`${import.meta.env.BASE_URL}bag.svg`}
                    alt="cart svg" />
                <p style={{ width: "2.5rem" }}>{totalQuantity}</p>
            </div>
        </Link>
    )
}

export default CartWidget
