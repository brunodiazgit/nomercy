import { useState } from "react"
import { useAuth } from '../context/AuthContext'

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { login } = useAuth()

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
            const response = await fetch('http://localhost:3900/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                const result = await response.json()
                console.log('Login successful:', result)
                localStorage.setItem('token', result.token)
                login(result.token)
                window.location.href = '/'
            } else {
                console.log("the email or the password are wrong")
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center justify-content-center gap-4 p-4'>
            <div className='d-flex flex-column'>
                <label htmlFor="email">Email Address</label>
                <input
                    className="input-login p-2"
                    type='email'
                    placeholder='Enter email address'
                    id='email'
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='d-flex flex-column'>
                <label htmlFor="password">Password</label>
                <input
                    className="input-login p-2"
                    type='password'
                    placeholder='Enter password'
                    id='password'
                    onChange={handleChange}
                    required
                />
            </div>
            <button className='loginbtn mt-3'>LOG IN</button>
        </form>
    )
}

export default Login