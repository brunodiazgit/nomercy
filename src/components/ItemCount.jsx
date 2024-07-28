/* eslint-disable react/prop-types */
import { useCart } from './context/CartContext'
import { useState } from 'react'

function ItemCount({ product }) {
    const [quantity, setQuantity] = useState(1)
    const { addToCart} = useCart()
    
    const handleAddToCart = () => {
        if (quantity > 0) {
            addToCart({ ...product, quantity })
            setQuantity(1)
        }
    }

    const handleInputValue = e => {
        const value = parseInt(e.target.value, 10)
        setQuantity(value >= 1 ? value : 1)
    }

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1)
    }

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))
    }

    return (
        <div className="d-flex flex-column gap-3">
            <div className='d-flex gap-2'>
                <button onClick={decrementQuantity} className='qty-btn'>-</button>
                <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    className="input-item"
                    onChange={handleInputValue}
                />
                <button onClick={incrementQuantity} className='qty-btn'>+</button>
            </div>
            <button onClick={handleAddToCart} className="atc-btn">Add to cart</button>
        </div>
    )
}

export default ItemCount
