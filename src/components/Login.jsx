import FormInput from "./FormInput"
import { useState } from "react"

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
                window.location.href = '/'
            }else{
                console.log("the email or the password are wrong")
            }
        } catch(error){
            console.error('Error:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center justify-content-center gap-4'>
            <div className='d-flex flex-column'>
                <label htmlFor="email">Email Address</label>
                <FormInput
                    className="input-login"
                    type='email'
                    ph='   Enter email address'
                    id='email'
                    onChange={handleChange}
                />
            </div>

            <div className='d-flex flex-column'>
                <label htmlFor="password">Password</label>
                <FormInput
                    className="input-login"
                    type='password'
                    ph='   Enter password'
                    id='password'
                    onChange={handleChange}
                />
            </div>
            <button className='loginbtn mt-3'>LOG IN</button>
        </form>
    )
}

export default Login