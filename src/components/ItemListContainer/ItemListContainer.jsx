import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container'
import ItemList from "./ItemList"
import { useParams } from "react-router-dom"


function ItemListContainer() {
    const [products, setProducts] = useState([])

    let { category } = useParams()

    useEffect(() => {
        const fetchApi = async () => {
            try {
                let response;
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
            }
        }
        fetchApi()
    }, [category])

    return (
        <Container className=" il-container d-flex flex-wrap gap-4">
            <ItemList products={products} />
        </Container>
    )
}

export default ItemListContainer