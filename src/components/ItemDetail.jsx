/* eslint-disable react/prop-types */
import ItemCount from "./ItemCount"

function ItemDetail({ product }) {
    return (
        <div className="d-flex justify-content-center gap-5">
            <div>
                <img className="" src={product.image_link} alt={product.name} />
            </div>
            <div className="detail-info">
                <h1 className=" ">{product.name}</h1>
                <p className="">{product.description}</p>
                <p className="">U$S {product.price}</p>
                <label htmlFor="quantity" className="mb-3">
                    Quantity:
                </label>
                <ItemCount product={product} />
            </div>
        </div>
    )
}

export default ItemDetail