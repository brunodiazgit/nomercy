/* eslint-disable react/prop-types */
import { useCart } from "../context/CartContext"

function CartItem({ item }) {

    const { updateProductQuantity, removeFromCart } = useCart()

    const handleQuantityChange = (change) => {
        const newQuantity = item.quantity + change
        if (newQuantity > 0) {
            updateProductQuantity(item.product_id, newQuantity)
        }
    }

    return (
        <div className="cart-item d-flex align-items-center justify-content-center gap-5">
            <img src={item.image_link} alt={item.name} />
            <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                <h1 style={{ fontSize: "1.5rem" }}>{item.name}</h1>
                <p style={{ fontSize: "1.5rem" }} className="text-center">USD {item.price}</p>
                <div>
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="qty-btn"
                    >-</button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="qty-btn "
                    >+</button>
                </div>
            </div>
            <button
                onClick={() => removeFromCart(item.product_id)}
                style={{ border: "none" }}
            >
                <img className="trashbtn" style={{ height: "2rem" }} src={`${import.meta.env.BASE_URL}cross-icon.svg`} alt="cross icon" />
            </button>
        </div>
    )
}

export default CartItem