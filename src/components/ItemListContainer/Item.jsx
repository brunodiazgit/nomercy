/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Link } from "react-router-dom"

function Item({ item }) {
    return (
        <Link to={`/item/${item.id}`}>
            <div className="item-box d-flex flex-column justify-content-center align-items-center text-center">
                <img src={item.image_link} alt={item.name} />
                <p>{item.name}</p>
                <p>USD {item.price}</p>
            </div>
        </Link>
    )
}

export default Item 