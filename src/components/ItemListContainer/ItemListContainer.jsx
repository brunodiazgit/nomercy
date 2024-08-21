import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container'
import ItemList from "./ItemList"
import { useParams } from "react-router-dom"
import Loader from "../Loader"

function ItemListContainer() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    let { category } = useParams()

    useEffect(() => {
        const fetchApi = async () => {
            try {
                let response
                if (category) {
                    response = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&product_type=${category}`)
                } else {
                    response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline')
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.log("there was an error: " + error)
            } finally {
                setLoading(false)
            }
        }
        fetchApi()
    }, [category])

    if(loading){
        return <Loader loading={loading}/>
    }

    return (
        <Container className="il-container">
            <ItemList products={products} />
        </Container>
    )
}

export default ItemListContainer