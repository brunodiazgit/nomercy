import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useState } from 'react'
import { useCart } from './context/CartContext'
import { useNavigate } from 'react-router-dom'
import CheckoutForm from './CheckoutForm'

const MySwal = withReactContent(Swal)

function CheckoutContainer() {
    const { setCart, cart, getTotal } = useCart()
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()  
        try {
            const response = await fetch('http://localhost:3900/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerName: formValues.name,
                    email: formValues.email,
                    phone: formValues.phone,
                    items: cart.map(item => ({
                        id: item.id, 
                        brand: item.brand,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    })),
                    totalAmount: getTotal
                }),
            })
    
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
    
            MySwal.fire({
                title: <p>Order Created</p>,
                text: "Your order has been successfully created!",
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setFormValues({
                    name: '',
                    email: '',
                    phone: ''
                });
                setCart([]); 
                navigate("/"); 
            })
        } catch (error) {           
            MySwal.fire({
                title: <p>Error</p>,
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <CheckoutForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formValues={formValues}
            />
        </div>
    )
}

export default CheckoutContainer