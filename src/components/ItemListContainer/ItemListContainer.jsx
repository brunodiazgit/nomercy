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
                    response = await fetch(`http://localhost:4100/api/products/category/${category}`)
                } else {
                    response = await fetch('http://localhost:4100/api/products')
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()

                setProducts(data.products)
            } catch (error) {
                console.log("there was an error: " + error)
            } finally {
                setLoading(false)
            }
        }
        fetchApi()
    }, [category])

    if (loading) {
        return <Loader loading={loading} />
    }

    return (
        <Container className="il-container">
            <ItemList products={products} />
        </Container>
    )
}

export default ItemListContainer