import { useState } from 'react';
import FormInput from './FormInput';

function Signup() {
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
            } else {
                console.log('Registration failed')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='signup'>
            <div className="signup-input">
                <div className='d-flex flex-column'>
                    <label htmlFor="firstname">First Name</label>
                    <FormInput
                        className="input-login"
                        type='text'
                        ph='   Enter first name'
                        id='firstname'
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="lastname">Last Name</label>
                    <FormInput
                        className="input-login"
                        type='text'
                        ph='   Enter last name'
                        id='lastname'
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="signup-input">
                <div className='d-flex flex-column'>
                    <label htmlFor="date">Date of Birth</label>
                    <FormInput
                        className="input-login"
                        type='date'
                        ph='   Select date'
                        id='date'
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="email">Email Address</label>
                    <FormInput
                        className="input-login"
                        type='email'
                        ph='   Enter email address'
                        id='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='d-flex flex-column'>
                <label htmlFor="password">Password</label>
                <FormInput
                    className="input-login"
                    type='password'
                    ph='   Enter password'
                    id='password'
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <button className='loginbtn mt-3'>CREATE ACCOUNT</button>
        </form>
    )
}

export default Signup
