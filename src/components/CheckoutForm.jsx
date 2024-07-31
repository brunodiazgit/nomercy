import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import FormInput from "./FormInput"
import { useState } from 'react'
import { useCart } from './context/CartContext'
import { useNavigate } from 'react-router-dom'

const MySwal = withReactContent(Swal)

function CheckoutForm() {
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
            <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                <h1>Checkout</h1>
                <h2 style={{fontSize: "5rem" , color: "rgb(177, 169, 169)"}}>Please fill in your details.</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <h1>NoMercy</h1>
                <FormInput
                    type='text'
                    ph='Name'
                    name='name'
                    value={formValues.name}
                    onChange={handleChange}
                />
                <FormInput
                    type='email'
                    ph='email@example.com'
                    name='email'
                    value={formValues.email}
                    onChange={handleChange}
                />
                <FormInput
                    type='number'
                    ph='Phone number'
                    name='phone'
                    value={formValues.phone}
                    onChange={handleChange}
                />
                <button style={{marginLeft:"1rem"}} type="submit" className="atc-btn">Create order</button>
            </form>
        </div>
    )
}

export default CheckoutForm