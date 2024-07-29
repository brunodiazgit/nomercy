import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import FormInput from "./FormInput"
import { useState } from 'react'
import { useCart } from './context/CartContext'
import { useNavigate } from 'react-router-dom'

const MySwal = withReactContent(Swal)

function CheckoutForm() {
    const { setCart } = useCart()
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

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
            })
            setCart([])
            navigate("/")
        })
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