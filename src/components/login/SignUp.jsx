import { useState } from 'react'
import ShowMessage from './ShowMessage'
import SignupForm from './SignUpForm'

function Signup() {
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        date: '',
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
            const response = await fetch('http://localhost:3900/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                const result = await response.json()
                console.log('Registration successful:', result)
                setFormData({
                    firstname: '',
                    lastname: '',
                    date: '',
                    email: '',
                    password: ''
                })
                setMessage("Your account has been created!")
            } else {
                console.log('Registration failed')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <>
            {message && <ShowMessage message={message} onHide={() => setMessage('')} />}
            <SignupForm handleChange={handleChange} handleSubmit={handleSubmit} formData={formData}/>
        </>
    )
}

export default Signup
