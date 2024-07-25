import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

function ItemDetailContainer(){
    let { id } = useParams()
    const [detail, setDetail] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await fetch(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json?brand=maybelline`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setDetail(data)
            } catch (e) {
                console.log("there was an error: " + e)
            }

        }
        fetchApi()
    }, [id])
    return(
        <div>
            <ItemDetail product={detail}/>
        </div>
    )
}

export default ItemDetailContainer