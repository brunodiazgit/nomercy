import { useState } from 'react'
import SignupForm from './SignUpForm'

function Signup() {
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4100/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json()

            if (response.ok) {
                console.log('Registration successful:', result)
                setFormData({
                    username: '',
                    email: '',
                    password: ''
                })
                setMessage(result.message)
                setMessage("Your account has been created!")
            } else {
                setMessage(result.message)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <>
            <SignupForm handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} message={message} />
        </>
    )
}

export default Signup
